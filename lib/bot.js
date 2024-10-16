const pino = require('pino');
const path = require('path');
const fs = require('fs');
const plugins = require('./plugins');
const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, Browsers, delay, makeCacheableSignalKeyStore, DisconnectReason } = require('baileys');
const config = require('../config');
const { serialize } = require('./index');
const { MessageHandler, Greetings } = require('../client');
const { loadMessage, saveMessage, saveChat, getName, getPausedChats } = require('../db');
const { commands } = require('./plugins');

class WhatsAppBot {
 constructor() {
  this.logger = pino({ level: 'silent' });
  this.conn = null;
 }

 async connect() {
  const sessionDir = '../session';
  if (!fs.existsSync(sessionDir)) fs.mkdirSync(sessionDir);
  const { state, saveCreds } = await useMultiFileAuthState(path.join(__dirname, sessionDir));
  const { version } = await fetchLatestBaileysVersion();

  this.conn = makeWASocket({
   auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(state.keys, this.logger),
   },
   printQRInTerminal: true,
   logger: this.logger,
   browser: Browsers.macOS('Desktop'),
   downloadHistory: false,
   syncFullHistory: false,
   markOnlineOnConnect: false,
   emitOwnEvents: true,
   version,
   getMessage: async (key) => (loadMessage(key.id) || {}).message || { conversation: null },
  });

  this.conn.ev.on('connection.update', this.handleConnectionUpdate.bind(this));
  this.conn.ev.on('creds.update', saveCreds);
  const greetingsHandler = new Greetings(this.conn);
  this.conn.ev.on('group-participants.update', (data) => greetingsHandler.handleGroupEvent(data));
  this.conn.ev.on('chats.update', async (chats) => chats.forEach(async (chat) => await saveChat(chat)));
  this.conn.ev.on('messages.upsert', this.handleMessages.bind(this));
  this.conn.ev.on('call', this.handleCalls.bind(this));
  process.on('unhandledRejection', (err) => this.handleErrors(err));
  process.on('uncaughtException', (err) => this.handleErrors(err));

  return this.conn;
 }

 async handleConnectionUpdate(s) {
  const { connection, lastDisconnect } = s;
  if (connection === 'connecting') {
   console.log('Connecting to WhatsApp... Please Wait.');
  } else if (connection === 'open') {
   console.log('Login Successful!');
   const packageVersion = require('../package.json').version;
   const totalPlugins = plugins.commands.length;
   const workType = config.WORK_TYPE;
   const str = `\`\`\`X-asena connected\nVersion: ${packageVersion}\nTotal Plugins: ${totalPlugins}\nWorktype: ${workType}\`\`\``;
   this.conn.sendMessage(this.conn.user.id, { text: str });
  } else if (connection === 'close') {
   if (lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut) {
    this.connect();
    console.log('Reconnecting...');
   } else {
    console.log('Connection closed. Device logged out.');
    await delay(3000);
    process.exit(0);
   }
  }
 }

 async handleMessages(m) {
  if (m.type !== 'notify') return;

  for (const msg of m.messages) {
   const serialized = await serialize(JSON.parse(JSON.stringify(msg)), this.conn);
   await saveMessage(msg, serialized.sender);

   if (config.AUTO_READ_MESSAGE) await this.conn.readMessages([serialized.key]);
   if (config.AUTO_STATUS_READ && serialized.from === 'status@broadcast') await this.conn.readMessages([serialized.key]);
   if (config.PRESENCE_UPDATE) {
    const presenceState = config.PRESENCE_UPDATE;
    await this.conn.sendPresenceUpdate(presenceState, serialized.from);
   }

   const isResume = new RegExp(`${config.PREFIX}( ?resume)`, 'i').test(serialized.body);
   const pausedChats = await getPausedChats();
   if (pausedChats.some((chat) => chat.chatId === serialized.from && !isResume)) continue;
   if (config.LOGS) this.logMessage(serialized);

   for (const command of commands) {
    const privilege = serialized.isOwner || serialized.sudo;
    const canExecute = config.WORK_TYPE === 'private' ? privilege : config.WORK_TYPE === 'public' ? !command.fromMe || privilege : false;
    const execute = (Instance, args) => command.function(new Instance(this.conn, serialized), ...args, serialized, this.conn, serialized[0]);

    if (command.on) {
     const handlers = {
      text: () => serialized.body && execute(MessageHandler, [serialized.body]),
      delete: () => {
       if (serialized.type === 'protocolMessage' && serialized.message.protocolMessage.type === 'MESSAGE_DELETE') {
        const whatsappMsg = new MessageHandler(this.conn, serialized);
        whatsappMsg.message = serialized.message.protocolMessage.key?.id;
        command.function(whatsappMsg, serialized, this.conn, serialized[0]);
       }
      },
     };
     handlers[command.on]?.();
    }

    if (canExecute && serialized.body && command.pattern) {
     const matched = serialized.body.match(command.pattern);
     if (matched) {
      serialized.prefix = matched[1];
      serialized.command = matched[1] + matched[2];
      execute(MessageHandler, [matched[3] || false]);
      break;
     }
    }
   }
  }
 }

 async handleCalls(call) {
  const { from, id: callId, status } = call[0];

  if (config.ANTI_CALL && status === 'offer') {
   if (config.ANTI_CALL === 'true') {
    await this.conn.rejectCall(callId, from);
    await this.conn.sendMessage(from, { text: '_Calls not allowed._' });
   } else if (config.ANTI_CALL === 'block') {
    await this.conn.rejectCall(callId, from);
    await this.conn.sendMessage(from, { text: '_Calls are not allowed, You have been blocked._' });
    return await this.conn.updateBlockStatus(from, 'block');
   }
  }
 }

 async handleErrors(err, msg = {}) {
  const { message, stack } = err;
  const fileName = stack?.split('\n')[1]?.trim();
  const errorText = `─━❲ ERROR REPORT ❳━─\nMessage: ${message}\nFrom: ${fileName}`;
  console.error('Error:', err);
  await this.conn.sendMessage(this.conn.user.id, { text: '```' + errorText + '```' });
 }

 async logMessage(msg) {
  const name = await getName(msg.sender);
  const groupName = msg.from.endsWith('@g.us') ? (await this.conn.groupMetadata(msg.from)).subject : msg.from;
  const messageType = Object.keys(msg.message)[0];
  console.log(`At: ${groupName}\nFrom: ${name}`);
  if (messageType === 'conversation' || messageType === 'extendedTextMessage' || msg.message[messageType]?.text) {
   const text = msg.message.conversation || msg.message.extendedTextMessage?.text || msg.message[messageType].text;
   console.log(`Message: ${text}`);
  } else {
   console.log(`Message: ${messageType}`);
  }
 }
}

module.exports = WhatsAppBot;
