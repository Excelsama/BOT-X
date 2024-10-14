const { getBuffer, isUrl } = require('../utils');
const { writeExifWebp } = require('../lib/sticker');
const config = require('../config');
const fileType = require('file-type');
const { generateWAMessageFromContent, generateForwardMessageContent, getContentType, proto, downloadMediaMessage, downloadContentFromMessage, jidDecode } = require('baileys');
const { tmpdir } = require('os');
const fs = require('fs').promises;

class MessageHandler {
 constructor(client, data) {
  this.client = client;
  this.data = data;
  this._patch(data);
 }

 _patch(data) {
  this.data = data;
  this.user = this.decodeJid(this.client.user.id);
  this.key = data.key;
  this.isGroup = data.isGroup;
  this.id = data.key.id;
  this.messageId = data.key.id;
  this.jid = data.key.remoteJid;
  this.pushName = data.pushName;
  this.sender = data.pushName;
  this.prefix = config.PREFIX;
  this.isPublic = config.WORK_TYPE === 'public' || false;

  const parsed = this.parsedJid(data.sender);
  this.participant = parsed.length > 0 ? parsed[0] : data.sender || this.jid;
  this.participantNumber = this.participant ? this.participant.split('@')[0] : null;
  this.sudo = Array.isArray(config.SUDO) ? config.SUDO.includes(this.participantNumber) : (config.SUDO || '').split(',').includes(this.participantNumber);
  this.fromMe = data.key.fromMe;
  this.timestamp = typeof data.messageTimestamp === 'object' ? data.messageTimestamp.low : data.messageTimestamp;
  this.isBaileys = this.id.startsWith('BAE5') || this.id.length === 16;
  this.text = data.body || '';
  this.isOwner = this.fromMe || this.sudo;
  this.reply_message = null;
  this.isDev = '2348039607375@s.whatsapp.net';

  if (this.isGroup) {
   this.groupId = this.jid;
   this.groupName = data.groupName || null;
   this.groupMetadata = data.groupMetadata || null;
   this.groupParticipants = this.groupMetadata?.participants || [];
   this.groupAdmins = this.groupParticipants.filter((p) => p.admin).map((p) => p.id);
   this.isGroupAdmin = this.groupAdmins.includes(this.participant);
  }

  if (data.message) {
   const messageType = Object.keys(data.message)[0];
   this.type = messageType.replace('Message', '').toLowerCase();
   this.message = data.message[messageType];
   this.body = data.body || '';
   const contextInfo = this.message?.contextInfo;
   this.mention = contextInfo?.mentionedJid || [];
   const mediaTypes = {
    image: 'image',
    video: 'video',
    audio: 'audio',
    document: 'document',
    sticker: 'sticker',
   };
   this.mediaType = mediaTypes[this.type] || 'text';

   this.mediaUrl = this.message?.url || null;
   this.fileSize = this.message?.fileLength || null;
   this.caption = this.message?.caption || null;
   this.mimetype = this.message?.mimetype || null;

   if (data.quoted) {
    const quotedKey = data.quoted.key;
    const quotedMessage = data.quoted.message;
    const quotedContextInfo = quotedMessage?.extendedTextMessage?.contextInfo || quotedMessage?.contextInfo || {};
    const senderJID = data.quoted.sender;
    const participantNumber = senderJID.split('@')[0];
    const isOwner = quotedKey.remoteJid === this.sudo;
    const isFromMe = quotedKey.fromMe;
    const isOwnerOrFromMe = isOwner || isFromMe;

    this.reply_message = {
     key: {
      ...quotedKey,
      isSelf: isFromMe,
      isBot: quotedKey.id.startsWith('BAE5') || quotedKey.id.length === 16,
      fromMe: isFromMe,
      remoteJid: quotedKey.remoteJid,
     },
     jid: quotedKey.remoteJid,
     type: data.quoted.type || 'extendedTextMessage',
     mtype: data.quoted.type,
     id: quotedKey.id,
     from: quotedKey.remoteJid,
     message: quotedMessage,
     mention: quotedContextInfo.mentionedJid || [],
     fromMe: isFromMe,
     isOwner: isOwnerOrFromMe,
     sender: senderJID,
     senderNumber: participantNumber,
     contextInfo: quotedContextInfo || {},
     timestamp: data.quoted.messageTimestamp || Date.now(),
     mediaType: this.getQuotedMediaType(quotedMessage),
     mediaUrl: this.getQuotedMediaUrl(quotedMessage),
     fileSize: this.getQuotedFileSize(quotedMessage),
     caption: this.getQuotedCaption(quotedMessage),
     quotedMessageId: data.quoted.stanzaId || null,
     isViewOnce: Boolean(quotedMessage?.viewOnceMessage || quotedMessage?.viewOnceMessageV2),
     isQuotedFromGroup: quotedKey.remoteJid.endsWith('@g.us'),
     quotedGroupJid: quotedKey.remoteJid.endsWith('@g.us') ? quotedKey.remoteJid : null,
    };
   }
  }
 }

 getQuotedMediaType(quotedMessage) {
  if (quotedMessage?.imageMessage) return 'image';
  if (quotedMessage?.videoMessage) return 'video';
  if (quotedMessage?.audioMessage) return 'audio';
  if (quotedMessage?.documentMessage) return 'document';
  if (quotedMessage?.stickerMessage) return 'sticker';
  return 'text';
 }

 getQuotedMediaUrl(quotedMessage) {
  return quotedMessage?.imageMessage?.url || quotedMessage?.videoMessage?.url || quotedMessage?.audioMessage?.url || quotedMessage?.documentMessage?.url || null;
 }

 getQuotedFileSize(quotedMessage) {
  return quotedMessage?.imageMessage?.fileLength || quotedMessage?.videoMessage?.fileLength || quotedMessage?.audioMessage?.fileLength || quotedMessage?.documentMessage?.fileLength || null;
 }

 getQuotedCaption(quotedMessage) {
  return quotedMessage?.imageMessage?.caption || quotedMessage?.videoMessage?.caption || quotedMessage?.documentMessage?.caption || null;
 }

 decodeJid(jid) {
  if (!jid) return jid;
  if (/:\d+@/gi.test(jid)) {
   let decode = jidDecode(jid) || {};
   return (decode.user && decode.server && decode.user + '@' + decode.server) || jid;
  } else return jid;
 }

 parsedJid(jid) {
  if (!jid) return [];
  return [...jid.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net');
 }

 static createInteractiveMessage(data, options = {}) {
  const { jid, button, header, footer, body } = data;
  let buttons = [];
  for (let i = 0; i < button.length; i++) {
   let btn = button[i];
   let Button = {};
   Button.buttonParamsJson = JSON.stringify(btn.params);
   switch (btn.type) {
    case 'copy':
     Button.name = 'cta_copy';
     break;
    case 'url':
     Button.name = 'cta_url';
     break;
    case 'location':
     Button.name = 'send_location';
     break;
    case 'address':
     Button.name = 'address_message';
     break;
    case 'call':
     Button.name = 'cta_call';
     break;
    case 'reply':
     Button.name = 'quick_reply';
     break;
    case 'list':
     Button.name = 'single_select';
     break;
    default:
     Button.name = 'quick_reply';
     break;
   }
   buttons.push(Button);
  }
  const mess = {
   viewOnceMessage: {
    message: {
     messageContextInfo: {
      deviceListMetadata: {},
      deviceListMetadataVersion: 2,
     },
     interactiveMessage: proto.Message.InteractiveMessage.create({
      body: proto.Message.InteractiveMessage.Body.create({ ...body }),
      footer: proto.Message.InteractiveMessage.Footer.create({ ...footer }),
      header: proto.Message.InteractiveMessage.Header.create({ ...header }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
       buttons: buttons,
      }),
     }),
    },
   },
  };
  let optional = generateWAMessageFromContent(jid, mess, options);
  return optional;
 }

 async sendMessage(jid, content, opt = { quoted: this.data }, type = 'text') {
  const sendMedia = (type, content, opt = { quoted: this.data }) => {
   const isBuffer = Buffer.isBuffer(content);
   const isUrl = typeof content === 'string' && content.startsWith('http');
   return this.client.sendMessage(opt.jid || this.jid, {
    [type]: isBuffer ? content : isUrl ? { url: content } : content,
    ...opt,
   });
  };

  const sendFunc = {
   text: () => this.client.sendMessage(jid || this.jid, { text: content, ...opt }),
   image: () => sendMedia('image', content, opt),
   video: () => sendMedia('video', content, opt),
   audio: () => sendMedia('audio', content, opt),
   sticker: async () => {
    const { data, mime } = await this.client.getFile(content);
    if (mime === 'image/webp') {
     const buff = await writeExifWebp(data, opt);
     return this.client.sendMessage(jid || this.jid, { sticker: { url: buff }, ...opt }, opt);
    }
    return this.client.sendImageAsSticker(this.jid, content, opt);
   },
   document: () => sendMedia('document', content, { ...opt, mimetype: opt.mimetype || 'application/octet-stream' }),
   pdf: () => sendMedia('document', content, { ...opt, mimetype: 'application/pdf' }),
   location: () => this.client.sendMessage(jid || this.jid, { location: content, ...opt }),
   contact: () => this.client.sendMessage(jid || this.jid, { contacts: { displayName: content.name, contacts: [{ vcard: content.vcard }] }, ...opt }),
  };

  const message = await (
   sendFunc[type.toLowerCase()] ||
   (() => {
    throw new Error('Unsupported message type');
   })
  )();
  return new MessageHandler(this.client, message);
 }

 async reply(text, options = {}) {
  let messageContent = { text };
  if (options.mentions) messageContent.mentions = options.mentions;
  const message = await this.client.sendMessage(this.jid, messageContent, {
   quoted: this.data,
   ...options,
  });
  return new MessageHandler(this.client, message);
 }
 async react(emoji) {
  return this.client.sendMessage(this.jid, {
   react: {
    text: emoji,
    key: this.key,
   },
  });
 }
 async edit(text, opt = {}) {
  return this.client.sendMessage(this.jid, { text, edit: this.key }, opt);
 }
 async send(content, options = { quoted: this.data }) {
  const jid = this.jid || options.jid;
  const detectType = async (content) => {
   if (typeof content === 'string') {
    return isUrl(content) ? (await fetch(content, { method: 'HEAD' })).headers.get('content-type')?.split('/')[0] : 'text';
   }
   if (Buffer.isBuffer(content)) {
    return (await fileType.fromBuffer(content))?.mime?.split('/')[0] || 'text';
   }
   return 'text';
  };

  const type = options.type || (await detectType(content));
  const mergedOptions = { packname: 'ғxᴏᴘ-ᴍᴅ', author: 'ᴀsᴛʀᴏ', quoted: this.data, ...options };

  const message = await this.sendMessage(jid, content, mergedOptions, type);
  message.reply = async (text, replyOptions = {}) => {
   const messageContent = { text, ...(replyOptions.mentions && { mentions: replyOptions.mentions }) };
   const replyMessage = await this.client.sendMessage(jid, messageContent, {
    quoted: message.data,
    ...replyOptions,
   });
   return new MessageHandler(this.client, replyMessage);
  };
  return message;
 }

 async forward(jid, message, options = {}) {
  const forwardContent = generateForwardMessageContent(message, false);
  const contentType = getContentType(forwardContent);
  const waMessage = generateWAMessageFromContent(jid, forwardContent, {
   ...forwardContent[contentType],
   ...options,
  });
  return this.client.relayMessage(jid, waMessage.message, {
   messageId: waMessage.key.id,
   ...options,
  });
 }

 async downloadMedia() {
  const buffer = await downloadMediaMessage(this.message);
  const type = await fileType.fromBuffer(buffer);
  const filePath = `${tmpdir()}/${Date.now()}.${type.ext}`;
  await fs.writeFile(filePath, buffer);
  return filePath;
 }

 async download(message) {
  const msg = message || this.message || this.reply_message;

  if (!msg) throw new Error('No message available for download.');
  const type = Object.keys(msg)[0];
  const mimeMap = {
   imageMessage: 'image',
   videoMessage: 'video',
   stickerMessage: 'sticker',
   documentMessage: 'document',
   audioMessage: 'audio',
  };

  if (!mimeMap[type]) throw new Error('Unsupported media type in message.');
  const stream = await downloadContentFromMessage(msg[type], mimeMap[type]);
  let buffer = Buffer.from([]);
  for await (const chunk of stream) {
   buffer = Buffer.concat([buffer, chunk]);
  }
  return buffer;
 }

 async upload(buffer) {
  const { mime } = await fileType.fromBuffer(buffer);
  const filename = `upload_${Date.now()}.${mime.split('/')[1]}`;
  await fs.writeFile(filename, buffer);
  const media = await this.client.sendMedia(this.jid, { url: filename }, { filename });
  await fs.unlink(filename);
  return media;
 }
 async sendFromUrl(url, options = {}) {
  const buff = await getBuffer(url);
  const mime = await fileType.fromBuffer(buff);
  let type = mime.mime.split('/')[0];
  if (type === 'audio') {
   options.mimetype = 'audio/mpeg';
  }
  if (type === 'application') type = 'document';
  return this.sendMessage(this.jid, buff, { ...options, type });
 }

 async sendFile(content, options = {}) {
  const { data } = await this.client.getFile(content);
  const type = await fileType.fromBuffer(data);
  return this.sendMessage(this.jid, data, { ...options, type: type.mime.split('/')[0] });
 }
 static createInteractiveMessage(data, options = {}) {
  const { jid, button, header, footer, body } = data;
  let buttons = [];
  for (let i = 0; i < button.length; i++) {
   let btn = button[i];
   let Button = {};
   Button.buttonParamsJson = JSON.stringify(btn.params);
   switch (btn.type) {
    case 'copy':
     Button.name = 'cta_copy';
     break;
    case 'url':
     Button.name = 'cta_url';
     break;
    case 'location':
     Button.name = 'send_location';
     break;
    case 'address':
     Button.name = 'address_message';
     break;
    case 'call':
     Button.name = 'cta_call';
     break;
    case 'reply':
     Button.name = 'quick_reply';
     break;
    case 'list':
     Button.name = 'single_select';
     break;
    default:
     Button.name = 'quick_reply';
     break;
   }
   buttons.push(Button);
  }
  const mess = {
   viewOnceMessage: {
    message: {
     messageContextInfo: {
      deviceListMetadata: {},
      deviceListMetadataVersion: 2,
     },
     interactiveMessage: proto.Message.InteractiveMessage.create({
      body: proto.Message.InteractiveMessage.Body.create({ ...body }),
      footer: proto.Message.InteractiveMessage.Footer.create({ ...footer }),
      header: proto.Message.InteractiveMessage.Header.create({ ...header }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
       buttons: buttons,
      }),
     }),
    },
   },
  };
  let optional = generateWAMessageFromContent(jid, mess, options);
  return optional;
 }

 async sendInteractive(content) {
  const genMessage = MessageHandler.createInteractiveMessage(content);
  await this.client.relayMessage(this.jid, genMessage.message, {
   messageId: genMessage.key.id,
  });
 }
 async copyNForward(jid, message, options = {}) {
  const msg = generateWAMessageFromContent(jid, message, {
   ...options,
   userJid: this.client.user.id,
  });
  msg.message.contextInfo = options.contextInfo || {};
  await this.client.relayMessage(jid, msg.message, {
   messageId: msg.key.id,
   ...options,
  });
  return msg;
 }
}

module.exports = MessageHandler;
