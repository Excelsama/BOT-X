/**
 * @fileoverview Handles message processing and operations for a WhatsApp bot.
 * @module MessageHandler
 */

const { getBuffer, isUrl,writeExifWebp } = require('../utils');
const config = require('../config');
const fileType = require('file-type');
const { generateWAMessageFromContent, generateForwardMessageContent, getContentType, proto, downloadContentFromMessage, jidDecode, getDevice } = require('baileys');
const { tmpdir } = require('os');
const fs = require('fs').promises;

/**
 * @class MessageHandler
 * @description Handles message processing and operations
 */
class MessageHandler {
 /**
  * @constructor
  * @param {Object} client - The WhatsApp client instance
  * @param {Object} data - The message data
  */
 constructor(client, data) {
  this.client = client;
  this._patch(data);
 }

 /**
  * @method _patch
  * @description Processes and assigns message data
  * @param {Object} data - The message data to process
  * @private
  */
 _patch(data) {
  this.data = data; // Message Data
  this.user = this.decodeJid(this.client.user.id); // Number the bot runs on
  this.key = data.key; // Key of the message
  this.isGroup = data.isGroup; // Is Group chat?
  this.id = data.key.id; // ID of the message sent
  this.messageId = data.key.id; // Keyword for ID
  this.jid = data.key.remoteJid; // Jid of the remote chat or Group
  this.pushName = data.pushName; // Username of the current jid sending a message
  this.sender = data.pushName; // Keyword for pushName
  this.prefix = config.PREFIX; // Current prefix set in 'config.js'
  this.isPublic = config.WORK_TYPE === 'public'; // Current Bot Mode
  this.deviceType = getDevice(this.messageId); // Device Used to send a Message

  const parsed = this.parsedJid(data.sender); // convert the object to text and set the number to @ wa net to send 
  this.participant = parsed[0] || data.sender || this.jid; // get particpant jid
  this.participantNumber = this.participant?.split('@')[0]; // get participant number
  this.sudo = this._isSudo(this.participantNumber); // is Sudo number?

  this.fromMe = data.key.fromMe; // is the message from me?
  this.timestamp = typeof data.messageTimestamp === 'object' ? data.messageTimestamp.low : data.messageTimestamp; // timestamp of the message check out 'Date.now()'
  this.isBaileys = this.id.startsWith('BAE5') || this.id.length === 16; // Not sure if this shit works
  this.text = data.body || ''; // text in a message
  this.isOwner = this.fromMe || this.sudo; // is owner frome or a sudo?
  this.reply_message = null; // initalize as deafult null

  if (this.isGroup) {
   this._processGroupData(data);
  }

  if (data.message) {
   this._processMessageContent(data);
  }
 }

 /**
  * @method _isSudo
  * @description Checks if a participant number is in the sudo list
  * @param {string} participantNumber - The participant number to check
  * @returns {boolean} True if the participant is in the sudo list, false otherwise
  * @private
  */
 _isSudo(participantNumber) {
  if (Array.isArray(config.SUDO)) {
   return config.SUDO.includes(participantNumber);
  }
  return (config.SUDO || '').split(',').includes(participantNumber);
 }

 /**
  * @method _processGroupData
  * @description Processes group-specific data
  * @param {Object} data - The message data
  * @private
  */
 _processGroupData(data) {
  this.groupId = this.jid;
  this.groupName = data.groupName || null;
  this.groupMetadata = data.groupMetadata || null;
  this.groupParticipants = this.groupMetadata?.participants || [];
  this.groupAdmins = this.groupParticipants.filter((p) => p.admin).map((p) => p.id);
  this.isGroupAdmin = this.groupAdmins.includes(this.participant);
 }

 /**
  * @method _processMessageContent
  * @description Processes the content of the message
  * @param {Object} data - The message data
  * @private
  */
 _processMessageContent(data) {
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
   this._processQuotedMessage(data.quoted);
  }
 }

 /**
  * @method _processQuotedMessage
  * @description Processes quoted message data
  * @param {Object} quoted - The quoted message data
  * @private
  */
 _processQuotedMessage(quoted) {
  const quotedKey = quoted.key;
  const quotedMessage = quoted.message;
  const quotedContextInfo = quotedMessage?.extendedTextMessage?.contextInfo || quotedMessage?.contextInfo || {};
  const senderJID = quoted.sender;
  const participantNumber = senderJID.split('@')[0];
  const isOwner = quotedKey.remoteJid === this.sudo;
  const isFromMe = quotedKey.fromMe;
  const isOwnerOrFromMe = isOwner || isFromMe;

  this.reply_message = {
   key: quoted.key,
   jid: quotedKey.remoteJid,
   type: quoted.type || 'extendedTextMessage',
   mtype: quoted.type,
   id: quotedKey.id,
   from: quotedKey.remoteJid,
   message: quotedMessage,
   mention: quotedContextInfo.mentionedJid || [],
   fromMe: isFromMe,
   isOwner: isOwnerOrFromMe,
   participant: senderJID,
   sender: senderJID,
   deviceType: this._getUserDevice(this.quotedMessageId),
   senderNumber: participantNumber,
   contextInfo: quotedContextInfo || {},
   timestamp: quoted.messageTimestamp || Date.now(),
   mediaType: this._getQuotedMediaType(quotedMessage),
   mediaUrl: this._getQuotedMediaUrl(quotedMessage),
   fileSize: this._getQuotedFileSize(quotedMessage),
   caption: this._getQuotedCaption(quotedMessage),
   quotedMessageId: quoted.stanzaId || null,
   isViewOnce: Boolean(quotedMessage?.viewOnceMessage || quotedMessage?.viewOnceMessageV2),
   isQuotedFromGroup: quotedKey.remoteJid.endsWith('@g.us'),
   quotedGroupJid: quotedKey.remoteJid.endsWith('@g.us') ? quotedKey.remoteJid : null,
  };
 }
 /**
  *
  * @param {string} id
  */
 _getUserDevice(id) {
  return getDevice(id);
 }
 /**
  * @method _getQuotedMediaType
  * @description Gets the media type of a quoted message
  * @param {Object} quotedMessage - The quoted message object
  * @returns {string} The media type
  * @private
  */
 _getQuotedMediaType(quotedMessage) {
  if (quotedMessage?.imageMessage) return 'image';
  if (quotedMessage?.videoMessage) return 'video';
  if (quotedMessage?.audioMessage) return 'audio';
  if (quotedMessage?.documentMessage) return 'document';
  if (quotedMessage?.stickerMessage) return 'sticker';
  return 'text';
 }

 /**
  * @method _getQuotedMediaUrl
  * @description Gets the media URL of a quoted message
  * @param {Object} quotedMessage - The quoted message object
  * @returns {string|null} The media URL or null
  * @private
  */
 _getQuotedMediaUrl(quotedMessage) {
  return quotedMessage?.imageMessage?.url || quotedMessage?.videoMessage?.url || quotedMessage?.audioMessage?.url || quotedMessage?.documentMessage?.url || null;
 }

 /**
  * @method _getQuotedFileSize
  * @description Gets the file size of a quoted message
  * @param {Object} quotedMessage - The quoted message object
  * @returns {number|null} The file size or null
  * @private
  */
 _getQuotedFileSize(quotedMessage) {
  return quotedMessage?.imageMessage?.fileLength || quotedMessage?.videoMessage?.fileLength || quotedMessage?.audioMessage?.fileLength || quotedMessage?.documentMessage?.fileLength || null;
 }

 /**
  * @method _getQuotedCaption
  * @description Gets the caption of a quoted message
  * @param {Object} quotedMessage - The quoted message object
  * @returns {string|null} The caption or null
  * @private
  */
 _getQuotedCaption(quotedMessage) {
  return quotedMessage?.imageMessage?.caption || quotedMessage?.videoMessage?.caption || quotedMessage?.documentMessage?.caption || null;
 }

 /**
  * @method decodeJid
  * @description Decodes a JID (Jabber ID)
  * @param {string} jid - The JID to decode
  * @returns {string} The decoded JID
  */
 decodeJid(jid) {
  if (!jid) return jid;
  if (/:\d+@/gi.test(jid)) {
   const decode = jidDecode(jid) || {};
   return (decode.user && decode.server && decode.user + '@' + decode.server) || jid;
  } else return jid;
 }

 /**
  * @method parsedJid
  * @description Parses a JID string and returns an array of parsed JIDs
  * @param {string} jid - The JID string to parse
  * @returns {Array} An array of parsed JIDs
  */
 parsedJid(jid) {
  if (!jid) return [];
  return [...jid.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net');
 }

 /**
  * @method sendMessage
  * @description Sends a message
  * @param {string} jid - The JID to send the message to
  * @param {*} content - The content of the message
  * @param {Object} opt - Additional options for sending the message
  * @param {string} type - The type of message to send
  * @returns {Promise<MessageHandler>} A promise that resolves to a new MessageHandler instance
  */
 async sendMessage(jid, content, opt = { quoted: this.data }, type = 'text') {
  const sendMedia = async (mediaType, mediaContent, mediaOpt = { quoted: this.data }) => {
   const isBuffer = Buffer.isBuffer(mediaContent);
   const isUrl = typeof mediaContent === 'string' && mediaContent.startsWith('http');
   return this.client.sendMessage(mediaOpt.jid || this.jid, {
    [mediaType]: isBuffer ? mediaContent : isUrl ? { url: mediaContent } : mediaContent,
    ...mediaOpt,
   });
  };

  const sendFunctions = {
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
   contact: () =>
    this.client.sendMessage(jid || this.jid, {
     contacts: {
      displayName: content.name,
      contacts: [{ vcard: content.vcard }],
     },
     ...opt,
    }),
  };

  const message = await (
   sendFunctions[type.toLowerCase()] ||
   (() => {
    throw new Error('Unsupported message type');
   })
  )();

  return new MessageHandler(this.client, message);
 }

 /**
  * @method reply
  * @description Replies to the current message
  * @param {string} text - The text to reply with
  * @param {Object} options - Additional options for the reply
  * @returns {Promise<MessageHandler>} A promise that resolves to a new MessageHandler instance
  */
 async reply(text, options = {}) {
  let messageContent = { text };
  if (options.mentions) messageContent.mentions = options.mentions;
  const message = await this.client.sendMessage(this.jid, messageContent, {
   quoted: this.data,
   ...options,
  });
  return new MessageHandler(this.client, message);
 }

 /**
  * @method react
  * @description Reacts to the current message with an emoji
  * @param {string} emoji - The emoji to react with
  * @returns {Promise<Object>} A promise that resolves to the reaction response
  */
 async react(emoji) {
  return this.client.sendMessage(this.jid, {
   react: {
    text: emoji,
    key: this.key,
   },
  });
 }

 /**
  * @method edit
  * @description Edits the current message
  * @param {string} text - The new text for the message
  * @param {Object} opt - Additional options for editing the message
  * @returns {Promise<Object>} A promise that resolves to the edit response
  */
 async edit(text, opt = {}) {
  return this.client.sendMessage(this.jid, { text, edit: this.key }, opt);
 }

 /**
  * @method send
  * @description Sends a message with auto-detected content type
  * @param {*} content - The content to send
  * @param {Object} options - Additional options for sending the message
  * @returns {Promise<MessageHandler>} A promise that resolves to a new MessageHandler instance
  */
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

 /**
  * @method forward
  * @description Forwards a message to another chat
  * @param {string} jid - The JID to forward the message to
  * @param {Object} message - The message to forward
  * @param {Object} options - Additional options for forwarding the message
  * @returns {Promise<Object>} A promise that resolves to the forwarded message
  */
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

 /**
  * @method downloadMedia
  * @description Downloads media from the current message
  * @returns {Promise<string>} A promise that resolves to the file path of the downloaded media
  */
 async downloadMedia() {
  const buffer = await downloadMediaMessage(this.message);
  const type = await fileType.fromBuffer(buffer);
  const filePath = `${tmpdir()}/${Date.now()}.${type.ext}`;
  await fs.writeFile(filePath, buffer);
  return filePath;
 }

 /**
  * @method download
  * @description Downloads content from the message
  * @param {Object} [message] - The message to download content from (defaults to current message)
  * @returns {Promise<Buffer>} A promise that resolves to the downloaded content as a Buffer
  */
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

 /**
  * @method upload
  * @description Uploads a buffer as media
  * @param {Buffer} buffer - The buffer to upload
  * @returns {Promise<Object>} A promise that resolves to the uploaded media object
  */
 async upload(buffer) {
  const { mime } = await fileType.fromBuffer(buffer);
  const filename = `upload_${Date.now()}.${mime.split('/')[1]}`;
  await fs.writeFile(filename, buffer);
  const media = await this.client.sendMedia(this.jid, { url: filename }, { filename });
  await fs.unlink(filename);
  return media;
 }

 /**
  * @method sendFromUrl
  * @description Sends media from a URL
  * @param {string} url - The URL of the media to send
  * @param {Object} options - Additional options for sending the media
  * @returns {Promise<Object>} A promise that resolves to the sent message
  */
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

 /**
  * @method sendFile
  * @description Sends a file
  * @param {string|Buffer} content - The file content or path
  * @param {Object} options - Additional options for sending the file
  * @returns {Promise<Object>} A promise that resolves to the sent message
  */
 async sendFile(content, options = {}) {
  const { data } = await this.client.getFile(content);
  const type = await fileType.fromBuffer(data);
  return this.sendMessage(this.jid, data, { ...options, type: type.mime.split('/')[0] });
 }

 /**
  * @method sendInteractive
  * @description Sends an interactive message
  * @param {Object} content - The content of the interactive message
  * @returns {Promise<void>}
  */
 async sendInteractive(content) {
  const genMessage = MessageHandler.createInteractiveMessage(content);
  await this.client.relayMessage(this.jid, genMessage.message, {
   messageId: genMessage.key.id,
  });
 }

 /**
  * @method copyNForward
  * @description Copies and forwards a message
  * @param {string} jid - The JID to forward the message to
  * @param {Object} message - The message to forward
  * @param {Object} options - Additional options for forwarding the message
  * @returns {Promise<Object>} A promise that resolves to the forwarded message
  */
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

 /**
  * @method createInteractiveMessage
  * @description Creates an interactive message
  * @param {Object} data - The data for the interactive message
  * @param {Object} options - Additional options for creating the message
  * @returns {Object} The created interactive message
  * @static
  */
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
  return generateWAMessageFromContent(jid, mess, options);
 }
}

module.exports = MessageHandler;
