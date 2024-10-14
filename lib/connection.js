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
const logger = pino({ level: 'silent' });
const connect = async () => {
 const sessionDir = './session';
 if (!fs.existsSync(sessionDir)) fs.mkdirSync(sessionDir);

 const { state, saveCreds } = await useMultiFileAuthState(path.join(__basedir, sessionDir));
 const { version } = await fetchLatestBaileysVersion();

 const conn = makeWASocket({
  auth: {
   creds: state.creds,
   keys: makeCacheableSignalKeyStore(state.keys, logger),
  },
  printQRInTerminal: true,
  logger,
  browser: Browsers.macOS('Desktop'),
  downloadHistory: false,
  syncFullHistory: false,
  markOnlineOnConnect: false,
  emitOwnEvents: true,
  version,
  getMessage: async (key) => (loadMessage(key.id) || {}).message || { conversation: null },
 });

 conn.ev.on('connection.update', handleConnectionUpdate(conn));
 conn.ev.on('creds.update', saveCreds);
 const greetingsHandler = new Greetings(conn);
 conn.ev.on('group-participants.update', (data) => greetingsHandler.handleGroupEvent(data));
 conn.ev.on('chats.update', async (chats) => chats.forEach(async (chat) => await saveChat(chat)));
 conn.ev.on('messages.upsert', handleMessages(conn));
 process.on('unhandledRejection', (err) => handleErrors(err, conn));
 process.on('uncaughtException', (err) => handleErrors(err, conn));
 return conn;
};

const handleConnectionUpdate = (conn) => async (s) => {
 const { connection, lastDisconnect } = s;
 if (connection === 'connecting') console.log('Connecting to WhatsApp... Please Wait.');
 else if (connection === 'open') {
  console.log('Login Successful!');
  const packageVersion = require('../package.json').version;
  const totalPlugins = plugins.commands.length;
  const workType = config.WORK_TYPE;
  const str = `\`\`\`X-asena connected\nVersion: ${packageVersion}\nTotal Plugins: ${totalPlugins}\nWorktype: ${workType}\`\`\``;
  conn.sendMessage(conn.user.id, { text: str });
 } else if (connection === 'close') {
  if (lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut) {
   connect();
   console.log('Reconnecting...');
  } else {
   console.log('Connection closed. Device logged out.');
   await delay(3000);
   process.exit(0);
  }
 }
};

const handleMessages = (conn) => async (m) => {
 if (m.type !== 'notify') return;
 const msg = await serialize(JSON.parse(JSON.stringify(m.messages[0])), conn);
 await saveMessage(m.messages[0], msg.sender);

 if (config.AUTO_READ) await conn.readMessages([msg.key]);
 if (config.AUTO_STATUS_READ && msg.from === 'status@broadcast') await conn.readMessages([msg.key]);
 const isResume = new RegExp(`${config.PREFIX}( ?resume)`, 'i').test(msg.body);
 const pausedChats = await getPausedChats();
 if (pausedChats.some((chat) => chat.chatId === msg.from && !isResume)) return;
 if (config.LOGS) {
  const name = await getName(msg.sender);
  const groupName = msg.from.endsWith('@g.us') ? (await conn.groupMetadata(msg.from)).subject : msg.from;
  console.log(`At : ${groupName}\nFrom : ${name}\nMessage:${msg.type}`);
 }

 for (const command of commands) {
  const privilege = msg.isOwner || msg.sudo;
  const canExecute = config.WORK_TYPE === 'private' ? privilege : config.WORK_TYPE === 'public' ? !command.fromMe || privilege : false;
  const execute = (Instance, arguments) => command.function(new Instance(conn, msg), ...arguments, msg, conn, msg[0]);

  if (command.on) {
   const handlers = {
    text: () => msg.body && execute(MessageHandler, [msg.body]),
    delete: () => {
     if (msg.type === 'protocolMessage' && msg.message.protocolMessage.type === 'MESSAGE_DELETE') {
      const whatsappMsg = new MessageHandler(conn, msg);
      whatsappMsg.message = msg.message.protocolMessage.key?.id;
      command.function(whatsappMsg, msg, conn, msg[0]);
     }
    },
   };
   handlers[command.on]?.();
  }

  if (canExecute && msg.body && command.pattern) {
   const matched = msg.body.match(command.pattern);
   if (matched) {
    msg.prefix = matched[1];
    msg.command = matched[1] + matched[2];
    execute(MessageHandler, [matched[3] || false]);
    break;
   }
  }
 }
};

const handleErrors = async (err, conn, msg = {}) => {
 const { message, stack } = err;
 const fileName = stack?.split('\n')[1]?.trim();
 const errorText = `─━❲ ERROR REPORT ❳━─\nMessage: ${message}\nFrom: ${fileName}`;
 console.error('Error:', err);
 await conn.sendMessage(conn.user.id, {
  text: '```' + errorText + '```',
 });
};

module.exports = connect;
