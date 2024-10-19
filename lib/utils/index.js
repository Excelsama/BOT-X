const fs = require('fs');
const axios = require('axios');
const webp = require('node-webpmux');
const path = require('path');
const crypto = require('crypto');
const { fromBuffer } = require('file-type');
const { tmpdir } = require('os');
const { Buffer } = require('buffer');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);

/**
 * Convert Audio to Playable WhatsApp Audio
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension
 */
const toAudio = (inputBuffer) => {
 return new Promise((resolve, reject) => {
  const stream = new Readable();
  stream.push(inputBuffer);
  stream.push(null);
  const chunks = [];
  ffmpeg(stream)
   .toFormat('mp3')
   .on('error', (err) => reject(err))
   .on('end', () => {
    resolve(Buffer.concat(chunks));
   })
   .pipe()
   .on('data', (chunk) => chunks.push(chunk));
 });
};

/**
 * Convert audio buffer to WhatsApp PTT format (opus).
 * @param {Buffer} inputBuffer - Buffer containing the input file.
 * @returns {Promise<Buffer>} - Promise resolving to the converted Opus buffer.
 */
const toPTT = (inputBuffer) => {
 return new Promise((resolve, reject) => {
  const stream = new Readable();
  stream.push(inputBuffer);
  stream.push(null);
  const chunks = [];

  ffmpeg(stream)
   .audioCodec('libopus')
   .audioBitrate(128)
   .audioQuality(10)
   .toFormat('opus')
   .on('error', (err) => reject(err))
   .on('end', () => {
    resolve(Buffer.concat(chunks));
   })
   .pipe()
   .on('data', (chunk) => chunks.push(chunk));
 });
};

/**
 * Convert Audio to Playable WhatsApp Video
 * @param {Buffer} buffer Video Buffer
 * @param {String} ext File Extension
 */
function toVideo(buffer, ext) {
 return ffmpeg(buffer, ['-c:v', 'libx264', '-c:a', 'aac', '-ab', '128k', '-ar', '44100', '-crf', '32', '-preset', 'slow'], ext, 'mp4');
}

async function getBuffer(url, options = {}) {
 try {
  const res = await axios({
   method: 'get',
   url,
   headers: {
    DNT: 1,
    'Upgrade-Insecure-Request': 1,
   },
   ...options,
   responseType: 'arraybuffer',
  });
  return res.data;
 } catch (error) {
  throw new Error(`Error: ${error.message}`);
 }
}

async function FiletypeFromUrl(url) {
 const buffer = await getBuffer(url);
 const out = await fromBuffer(buffer);
 let type;
 if (out) {
  type = out.mime.split('/')[0];
 }
 return { type, buffer };
}
function UrlFromMsg(message) {
 const urlRegex = /(https?:\/\/[^\s]+)/gi;
 const match = urlRegex.exec(message);
 return match ? match[0] : null;
}

async function getJson(url, options) {
 try {
  options ? options : {};
  const res = await axios({
   method: 'GET',
   url: url,
   headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
   },
   ...options,
  });
  return res.data;
 } catch (err) {
  return err;
 }
}
const getTempPath = () => path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}`);

const convertToWebp = async (media, isVideo = false) => {
 const tmpFileIn = getTempPath() + (isVideo ? '.mp4' : '.jpg');
 const tmpFileOut = getTempPath() + '.webp';
 fs.writeFileSync(tmpFileIn, media);

 await new Promise((resolve, reject) => {
  ffmpeg(tmpFileIn)
   .outputOptions(['-vcodec', 'libwebp', '-vf', "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse", ...(isVideo ? ['-loop', '0', '-ss', '00:00:00', '-t', '00:00:05', '-preset', 'default', '-an', '-vsync', '0'] : [])])
   .toFormat('webp')
   .on('error', reject)
   .on('end', () => resolve(true))
   .save(tmpFileOut);
 });

 const buff = fs.readFileSync(tmpFileOut);
 fs.unlinkSync(tmpFileOut);
 fs.unlinkSync(tmpFileIn);
 return buff;
};

const writeExif = async (media, metadata, isWebp = false) => {
 const tmpFileIn = getTempPath() + '.webp';
 const tmpFileOut = getTempPath() + '.webp';
 fs.writeFileSync(tmpFileIn, isWebp ? media : await convertToWebp(media, !isWebp && media.length > 200000));

 if (metadata.packname || metadata.author) {
  const img = new webp.Image();
  const json = {
   'sticker-pack-id': 'https://github.com/AstroX10/xstro-bot',
   'sticker-pack-name': metadata.packname,
   'sticker-pack-publisher': metadata.author,
   emojis: metadata.categories || [''],
  };
  const exifAttr = Buffer.from([0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
  const jsonBuff = Buffer.from(JSON.stringify(json), 'utf-8');
  const exif = Buffer.concat([exifAttr, jsonBuff]);
  exif.writeUIntLE(jsonBuff.length, 14, 4);
  await img.load(tmpFileIn);
  fs.unlinkSync(tmpFileIn);
  img.exif = exif;
  await img.save(tmpFileOut);
  return tmpFileOut;
 }
};

module.exports = {
 toAudio,
 toPTT,
 toVideo,
 FiletypeFromUrl,
 getBuffer,
 UrlFromMsg,
 parseJid(text = '') {
  return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net');
 },
 parsedJid(text = '') {
  return [...text.matchAll(/([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net');
 },
 getJson,
 isUrl: (isUrl = (url) => {
  return new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi').test(url);
 }),
 getUrl: (getUrl = (url) => {
  return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'));
 }),
 imageToWebp: (media) => convertToWebp(media),
 videoToWebp: (media) => convertToWebp(media, true),
 writeExifImg: (media, metadata) => writeExif(media, metadata),
 writeExifVid: (media, metadata) => writeExif(media, metadata),
 writeExifWebp: (media, metadata) => writeExif(media, metadata, true),
};
