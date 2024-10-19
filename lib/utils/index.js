const fs = require('fs');
const { tmpdir } = require('os');
const Crypto = require('crypto');
const axios = require('axios');
const webp = require('node-webpmux');
const path = require('path');
const { fromBuffer } = require('file-type');
const { Buffer } = require('buffer');
const { Readable } = require('stream');
const ffmpeg = require('fluent-ffmpeg');
const { spawn } = require('child_process');
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

function VideoCon(buffer, args = [], ext = '', ext2 = '') {
 return new Promise(async (resolve, reject) => {
  try {
   let tmp = path.join(tmpdir() + '/' + new Date() + '.' + ext);
   let out = tmp + '.' + ext2;
   await fs.promises.writeFile(tmp, buffer);
   const ffmpegProcess = spawn('ffmpeg', ['-y', '-i', tmp, ...args, out])
    .on('error', reject)
    .on('close', async (code) => {
     try {
      await fs.promises.unlink(tmp);
      if (code !== 0) {
       reject(new Error(`FFmpeg process exited with code ${code}`));
       return;
      }
      const processedData = await fs.promises.readFile(out);
      await fs.promises.unlink(out);
      resolve(processedData);
     } catch (e) {
      reject(e);
     }
    });
  } catch (e) {
   reject(e);
  }
 });
}

/**
 * Convert Audio to Playable WhatsApp Video
 * @param {Buffer} buffer Video Buffer
 * @param {String} ext File Extension
 */
function toVideo(buffer, ext) {
 return VideoCon(buffer, ['-vn', '-ac', '2', '-b:a', '128k', '-ar', '44100', '-f', 'mp3'], ext, 'mp3');
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
async function imageToWebp(media) {
 const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
 const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.jpg`);

 fs.writeFileSync(tmpFileIn, media);

 await new Promise((resolve, reject) => {
  ffmpeg(tmpFileIn)
   .on('error', reject)
   .on('end', () => resolve(true))
   .addOutputOptions(['-vcodec', 'libwebp', '-vf', "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
   .toFormat('webp')
   .save(tmpFileOut);
 });

 const buff = fs.readFileSync(tmpFileOut);
 fs.unlinkSync(tmpFileOut);
 fs.unlinkSync(tmpFileIn);
 return buff;
}

async function videoToWebp(media) {
 const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
 const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`);

 fs.writeFileSync(tmpFileIn, media);

 await new Promise((resolve, reject) => {
  ffmpeg(tmpFileIn)
   .on('error', reject)
   .on('end', () => resolve(true))
   .addOutputOptions(['-vcodec', 'libwebp', '-vf', "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse", '-loop', '0', '-ss', '00:00:00', '-t', '00:00:05', '-preset', 'default', '-an', '-vsync', '0'])
   .toFormat('webp')
   .save(tmpFileOut);
 });

 const buff = fs.readFileSync(tmpFileOut);
 fs.unlinkSync(tmpFileOut);
 fs.unlinkSync(tmpFileIn);
 return buff;
}

async function writeExifImg(media, metadata) {
 let wMedia = await imageToWebp(media);
 const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
 const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
 fs.writeFileSync(tmpFileIn, wMedia);

 if (metadata.packname || metadata.author) {
  const img = new webp.Image();
  const json = {
   'sticker-pack-id': `https://github.com/AstroX10/xstro-bot`,
   'sticker-pack-name': metadata.packname,
   'sticker-pack-publisher': metadata.author,
   emojis: metadata.categories ? metadata.categories : [''],
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
}

async function writeExifVid(media, metadata) {
 let wMedia = await videoToWebp(media);
 const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
 const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
 fs.writeFileSync(tmpFileIn, wMedia);

 if (metadata.packname || metadata.author) {
  const img = new webp.Image();
  const json = {
   'sticker-pack-id': `https://github.com/AstroX10/xstro-bot`,
   'sticker-pack-name': metadata.packname,
   'sticker-pack-publisher': metadata.author,
   emojis: metadata.categories ? metadata.categories : [''],
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
}

async function writeExifWebp(media, metadata) {
 const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
 const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
 fs.writeFileSync(tmpFileIn, media);

 if (metadata.packname || metadata.author) {
  const img = new webp.Image();
  const json = {
   'sticker-pack-id': `https://github.com/AstroX10/xstro-bot`,
   'sticker-pack-name': metadata.packname,
   'sticker-pack-publisher': metadata.author,
   emojis: metadata.categories ? metadata.categories : [''],
  };
  const exifAttr = await Buffer.from([0x49, 0x49, 0x2a, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
  const jsonBuff = await Buffer.from(JSON.stringify(json), 'utf-8');
  const exif = await Buffer.concat([exifAttr, jsonBuff]);
  await exif.writeUIntLE(jsonBuff.length, 14, 4);
  await img.load(tmpFileIn);
  fs.unlinkSync(tmpFileIn);
  img.exif = exif;
  await img.save(tmpFileOut);
  return tmpFileOut;
 }
}
const runtime = function (seconds) {
 seconds = Number(seconds);
 var d = Math.floor(seconds / (3600 * 24));
 var h = Math.floor((seconds % (3600 * 24)) / 3600);
 var m = Math.floor((seconds % 3600) / 60);
 var s = Math.floor(seconds % 60);
 var dDisplay = d > 0 ? d + (d == 1 ? ' d ' : ' d ') : '';
 var hDisplay = h > 0 ? h + (h == 1 ? ' h ' : ' h ') : '';
 var mDisplay = m > 0 ? m + (m == 1 ? ' m ' : ' m ') : '';
 var sDisplay = s > 0 ? s + (s == 1 ? ' s' : ' s') : '';
 return dDisplay + hDisplay + mDisplay + sDisplay;
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
 imageToWebp,
 videoToWebp,
 writeExifImg,
 writeExifVid,
 writeExifWebp,
 runtime,
};
