const fs = require('fs/promises');
const config = require('../../config');
const crypto = require('crypto');
const path = require('path');
const FileType = require('file-type');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const { getBuffer, imageToWebp, writeExifVid, videoToWebp, writeExifImg, toAudio } = require('../utils');
const { getDevice, downloadContentFromMessage, jidDecode } = require('baileys');
ffmpeg.setFfmpegPath(ffmpegPath);

class Handler {
 constructor(client, data) {
  this.client = client;
  this._patch(data);
  this.outputDir = path.join(__dirname, '..', 'temp');
 }

 _patch(data) {
  this.data = data;
  this.user = this.decodeJid(this.client.user.id);
  this.key = data.key;
  this.isGroup = data.isGroup;
  this.id = data.key.id;
  this.jid = data.key.remoteJid;
  this.senderName = data.pushName;
  this.participant = this.decodeJid(data.sender);
  this.participantNumber = this.participant?.split('@')[0];
  this.sudo = this._isSudo(this.participantNumber);
  this.fromMe = data.key.fromMe;
  this.timestamp = data.messageTimestamp?.low || data.messageTimestamp;
  this.isBaileys = this.id.startsWith('BAE5') || this.id.length === 16;
  this.text = data.body || '';
  this.isOwner = this.fromMe || this.sudo;
  this.device = getDevice(this.id);
  this.prefix = config.PREFIX;

  if (this.isGroup) this._processGroupData(data);
  if (data.message) this._processMessageContent(data);
 }

 _isSudo(participantNumber) {
  return Array.isArray(config.SUDO) ? config.SUDO.includes(participantNumber) : (config.SUDO || '').split(',').includes(participantNumber);
 }

 _processGroupData(data) {
  this.groupId = this.jid;
  this.groupName = data.groupName || null;
  this.groupMetadata = data.groupMetadata || null;
  this.groupParticipants = this.groupMetadata?.participants || [];
  this.groupAdmins = this.groupParticipants.filter((p) => p.admin).map((p) => p.id);
  this.isGroupAdmin = this.groupAdmins.includes(this.participant);
 }

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
  this.image = this.mediaType === mediaTypes.image ? this.message : false;
  this.video = this.mediaType === mediaTypes.video ? this.message : false;
  this.audio = this.mediaType === mediaTypes.audio ? this.message : false;
  this.document = this.mediaType === mediaTypes.document ? this.message : false;
  this.sticker = this.mediaType === mediaTypes.sticker ? this.message : false;

  this.mediaUrl = this.message?.url || null;
  this.fileSize = this.message?.fileLength || null;
  this.caption = this.message?.caption || null;
  this.mimetype = this.message?.mimetype || null;

  if (data.quoted) this._processQuotedMessage(data.quoted);
 }

 _processQuotedMessage(quoted) {
  this.reply_message = {
   data: quoted.message,
   key: quoted.key,
   id: quoted.key.id,
   fromMe: quoted.key.fromMe,
   contextInfo: quoted.message?.extendedTextMessage?.contextInfo || quoted.message?.contextInfo || {},
   mediaType: this._getMediaType(quoted.message),
   mediaUrl: this._getMediaUrl(quoted.message),
   filesize: this._getFileSize(quoted.message),
   caption: this._getCaption(quoted.message),
   viewonce: Boolean(quoted.message?.viewOnceMessage || quoted.message?.viewOnceMessageV2),
   image: this._getMediaType(quoted.message) === 'image' || Boolean(quoted.message?.imageMessage),
   video: this._getMediaType(quoted.message) === 'video' || Boolean(quoted.message?.videoMessage),
   audio: this._getMediaType(quoted.message) === 'audio' || Boolean(quoted.message?.audioMessage),
   document: this._getMediaType(quoted.message) === 'document' || Boolean(quoted.message?.documentMessage),
   sticker: this._getMediaType(quoted.message) === 'sticker' || Boolean(quoted.message?.stickerMessage),
  };
 }

 _getMediaType(message) {
  const mediaTypes = {
   imageMessage: 'image',
   videoMessage: 'video',
   audioMessage: 'audio',
   documentMessage: 'document',
   stickerMessage: 'sticker',
  };
  return Object.keys(mediaTypes).find((key) => message[key]) || 'text';
 }

 _getMediaUrl(message) {
  return message?.imageMessage?.url || message?.videoMessage?.url || message?.audioMessage?.url || message?.documentMessage?.url || null;
 }

 _getFileSize(message) {
  return message?.imageMessage?.fileLength || message?.videoMessage?.fileLength || message?.audioMessage?.fileLength || message?.documentMessage?.fileLength || null;
 }

 _getCaption(message) {
  return message?.imageMessage?.caption || message?.videoMessage?.caption || message?.documentMessage?.caption || null;
 }

 decodeJid(jid) {
  if (!jid) return jid;
  if (/:\d+@/gi.test(jid)) {
   const decode = jidDecode(jid) || {};
   return (decode.user && decode.server && decode.user + '@' + decode.server) || jid;
  } else return jid;
 }
 async reply(text, options = {}) {
  let messageContent = { text };
  if (options.mentions) messageContent.mentions = options.mentions;
  const message = await this.client.sendMessage(this.jid, messageContent, { quoted: this.data, ...options });
  return new Handler(this.client, message);
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
 async send(content, options = {}) {
  const jid = options.jid || this.jid;

  const getContentBuffer = async (content) => {
   if (Buffer.isBuffer(content)) return content;
   if (typeof content === 'string' && content.startsWith('http')) {
    return await getBuffer(content);
   }
   return Buffer.from(content);
  };

  const ensureBuffer = async (input) => {
   const buffer = await getContentBuffer(input);
   if (!Buffer.isBuffer(buffer)) {
    throw new Error('Failed to convert content to a valid buffer.');
   }
   return buffer;
  };

  const detectMimeType = async (buffer) => {
   if (typeof buffer === 'string') {
    return 'text/plain';
   }
   try {
    const fileType = await FileType.fromBuffer(buffer);
    return fileType ? fileType.mime : 'application/octet-stream';
   } catch (error) {
    console.error('Error detecting MIME type:', error);
    return 'application/octet-stream';
   }
  };

  const sendText = (text, options) => {
   return this.client.sendMessage(jid, { text, ...options });
  };

  const sendImage = (buffer, options) => {
   return this.client.sendMessage(jid, { image: buffer, ...options });
  };

  const sendVideo = (buffer, options) => {
   return this.client.sendMessage(jid, { video: buffer, ...options });
  };

  const sendAudio = (buffer, options) => {
   return this.client.sendMessage(jid, { audio: buffer, mimetype: 'audio/mp4', ...options });
  };

  const sendDocument = (buffer, options) => {
   return this.client.sendMessage(jid, {
    document: buffer,
    mimetype: options.mimetype || 'application/octet-stream',
    fileName: options.filename || 'file',
    ...options,
   });
  };

  const sendSticker = async (buffer, options) => {
   let stickerBuffer = buffer;
   const fileType = await FileType.fromBuffer(buffer);
   const isWebp = fileType?.mime === 'image/webp';

   if (isWebp) {
    stickerBuffer = await writeExifImg(buffer, options);
   } else {
    stickerBuffer = await imageToWebp(buffer);
    stickerBuffer = await writeExifImg(stickerBuffer, options);
   }
   if (typeof stickerBuffer === 'string') stickerBuffer = await fs.readFile(stickerBuffer);
   return this.client.sendMessage(jid, { sticker: stickerBuffer, ...options });
  };

  const sendVideoAsAudio = async (buffer, options) => {
   const audioBuffer = await toAudio(buffer);
   return sendAudio(audioBuffer, options);
  };

  const sendVideoAsSticker = async (buffer, options = {}) => {
   let stickerBuffer;
   const fileType = await FileType.fromBuffer(buffer);
   const isWebp = fileType?.mime === 'image/webp';

   if (isWebp) {
    stickerBuffer = await writeExifImg(buffer, options);
   } else {
    stickerBuffer = await videoToWebp(buffer);
    stickerBuffer = await writeExifVid(stickerBuffer, options);
   }
   if (typeof stickerBuffer === 'string') stickerBuffer = await fs.readFile(stickerBuffer);
   return this.client.sendMessage(jid, { sticker: stickerBuffer, ...options });
  };

  try {
   let buffer;
   let mimeType;

   if (typeof content === 'string' && !content.startsWith('http')) {
    buffer = content;
    mimeType = 'text/plain';
   } else {
    buffer = await ensureBuffer(content);
    mimeType = await detectMimeType(buffer);
   }

   const contentType = options.type || mimeType.split('/')[0];

   const sendOptions = {
    quoted: this.data,
    caption: options.caption,
    contextInfo: options.contextInfo,
    ...options,
   };

   switch (contentType) {
    case 'text':
     return sendText(typeof buffer === 'string' ? buffer : buffer.toString(), sendOptions);
    case 'image':
     return options.asSticker ? sendSticker(buffer, sendOptions) : sendImage(buffer, sendOptions);
    case 'video':
     if (options.asSticker || contentType === 'sticker') {
      return sendVideoAsSticker(buffer, sendOptions);
     }
     if (options.asAudio) {
      return sendVideoAsAudio(buffer, sendOptions);
     }
     return sendVideo(buffer, sendOptions);
    case 'audio':
     return sendAudio(buffer, sendOptions);
    case 'document':
     return sendDocument(buffer, sendOptions);
    case 'sticker':
     return sendSticker(buffer, sendOptions);
    default:
     return sendDocument(buffer, { ...sendOptions, mimetype: mimeType });
   }
  } catch (error) {
   console.error('Error sending message:', error);
   throw new Error('Invalid Media: ' + error.message);
  }
 }

 async download(message) {
  const msg = message || this.reply_message.data;
  const mimeMap = {
   imageMessage: 'image',
   videoMessage: 'video',
   stickerMessage: 'sticker',
   documentMessage: 'document',
   audioMessage: 'audio',
  };
  const type = Object.keys(msg).find((key) => mimeMap[key]);
  const mediaType = mimeMap[type];
  const stream = await downloadContentFromMessage(msg[type], mediaType);

  let buffer = Buffer.from([]);
  for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

  const fileExtension = this.getFileExtension(msg[type]);
  const fileName = this.generateFileName(mediaType, fileExtension);
  const filePath = path.join(this.outputDir, fileName);

  await fs.mkdir(this.outputDir, { recursive: true });
  if (fileExtension === 'webp') {
   await fs.writeFile(filePath, buffer);
  } else {
   await fs.writeFile(filePath, buffer);
  }

  return {
   buffer,
   filePath,
   mediaType,
   fileSize: buffer.length,
  };
 }

 getFileExtension(messageType) {
  const mimeType = messageType.mimetype;
  const extensions = {
   'image/jpeg': 'jpg',
   'image/png': 'png',
   'video/mp4': 'mp4',
   'audio/ogg; codecs=opus': 'ogg',
   'application/pdf': 'pdf',
   'image/webp': 'webp',
  };
  return extensions[mimeType] || 'bin';
 }

 generateFileName(mediaType, fileExtension) {
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(4).toString('hex');
  return `${mediaType}_${timestamp}_${randomString}.${fileExtension}`;
 }
}

module.exports = Handler;
