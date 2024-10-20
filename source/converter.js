const { command } = require('../lib');
const { STICKER_PACK } = require('../config');

command(
 {
  pattern: 'sticker ?(.*)',
  desc: 'Converts Image/Video to Sticker',
  type: 'converter',
 },
 async (message, match) => {
  const hasMedia = message.reply_message?.image || message.reply_message?.video;
  if (!hasMedia) return message.reply('_Reply an Image/Video_');
  const content = await message.download(message.reply_message.data);
  return message.send(content.buffer, {
   type: 'sticker',
   author: STICKER_PACK.split(';')[0],
   packname: STICKER_PACK.split(';')[1],
  });
 }
);

command(
 {
  pattern: 'take ?(.*)',
  desc: 'Saves Stickers to be Yours',
  type: 'converter',
 },
 async (message, match) => {
  const isStickerMedia = message.reply_message?.sticker;
  if (!isStickerMedia) return message.reply('_Reply A Sticker!_');
  const newSticker = await message.download(message.reply_message.data);
  return message.send(newSticker.buffer, {
   type: 'sticker',
   author: STICKER_PACK.split(';')[0],
   packname: STICKER_PACK.split(';')[1],
  });
 }
);

command(
 {
  pattern: 'image',
  desc: 'Converts Sticker/Video to Images',
  type: 'converter',
 },
 async (message) => {
  const res = message.reply_message?.video;
  if (!res) return message.reply('_Reply to a Sticker_');
  const contentBuffer = await message.download(message.reply_message.data);
  return await message.send(contentBuffer.buffer, { type: 'image' });
 }
);

command(
 {
  pattern: 'tomp3',
  desc: 'Converts Video to Mp3 Audio',
  type: 'converter',
 },
 async (message) => {
  if (!message.reply_message?.video) return message.reply('_Reply Video Only!_');
  const res = await message.download(message.reply_message.data);
  return message.send(res.buffer, { type: 'audio' });
 }
);

command(
 {
  pattern: 'tovideo',
  desc: 'Converts Sticker to Video',
  type: 'converter',
 },
 async (message) => {
  if (!message.reply_message?.sticker) return await message.reply('_Reply A Sticker_');
  const mp4 = await message.download(message.reply_message.data);
  return await message.send(mp4.buffer, { type: 'video' });
 }
);
