const { command, parsedJid } = require('../lib');
const { PausedChats, savePausedChat, saveWarn, resetWarn, getFilter, setFilter, deleteFilter } = require('../db');
const { WARN_COUNT } = require('../config');

command(
 {
  pattern: 'pause',
  fromMe: true,
  desc: 'Pause the chat',
  type: 'user',
 },
 async (message) => {
  const chatId = message.key.remoteJid;
  await savePausedChat(chatId);
  message.reply('_Bot paused for this Chat_');
 }
);

command(
 {
  pattern: 'resume',
  fromMe: true,
  desc: 'Resume the paused chat',
  dontAddCommandList: true,
 },
 async (message) => {
  const chatId = message.key.remoteJid;
  const pausedChat = await PausedChats.findOne({ where: { chatId } });
  if (pausedChat) {
   await pausedChat.destroy();
   message.reply('_Bot Unpaused for this chat_');
  } else {
   message.reply('_Bot Was not Paused for this Chat_');
  }
 }
);

command(
 {
  pattern: 'warn',
  fromMe: true,
  desc: 'Warn a user',
  type: 'user',
 },
 async (message, match) => {
  const userId = message.mention[0] || message.reply_message.jid;
  if (!userId) return message.reply('_Mention or reply to someone_');
  let reason = message?.reply_message.text || match;
  reason = reason.replace(/@(\d+)/, '');
  reason = reason.length > 1 ? reason : 'Reason not Provided';
  const warnInfo = await saveWarn(userId, reason);
  let userWarnCount = warnInfo ? warnInfo.warnCount : 0;
  userWarnCount++;
  await message.reply(`_User @${userId.split('@')[0]} warned._ \n_Warn Count: ${userWarnCount}._ \n_Reason: ${reason}_`, { mentions: [userId] });
  if (userWarnCount > WARN_COUNT) {
   const jid = parsedJid(userId);
   await message.sendMessage(message.jid, 'Warn limit exceeded, kicking user');
   await message.client.groupParticipantsUpdate(message.jid, jid, 'remove');
  }
 }
);

command(
 {
  pattern: 'rwarn',
  fromMe: true,
  desc: 'Reset warnings for a user',
  type: 'user',
 },
 async (message) => {
  const userId = message.mention[0] || message.reply_message.jid;
  if (!userId) return message.reply('_Mention or reply to someone_');
  await resetWarn(userId);
  message.reply(`_@${userId.split('@')[0]} is free as a cow_`, { mentions: [userId] });
 }
);

command(
 {
  pattern: 'filter',
  fromMe: true,
  desc: 'Adds a filter.',
  type: 'user',
 },
 async (message, match) => {
  let text, msg;

  if (!match) {
   const filters = await getFilter(message.jid);
   if (!filters) return await message.reply('_No filters Set_');
   let filterMessage = 'Your active filters for this chat:\n\n';
   filters.forEach((filter) => {
    filterMessage += `✒ ${filter.dataValues.pattern}\n`;
   });
   filterMessage += 'Use: .filter keyword:message to set a filter';
   return await message.reply(filterMessage);
  }
  [text, msg] = match.split(':');
  if (!text || !msg) return await message.reply('```Use: .filter keyword:message to set a filter```');
  await setFilter(message.jid, text, msg, true);
  return await message.reply(`_Successfully set filter for ${text}_`);
 }
);

command(
 {
  pattern: 'stop',
  fromMe: true,
  desc: 'Stops a previously added filter.',
  type: 'user',
 },
 async (message, match) => {
  if (!match) return await message.reply('\n*Example:* ```.stop hello```');
  const deleted = await deleteFilter(message.jid, match);
  if (deleted) {
   return await message.reply(`_Filter ${match} deleted_`);
  } else {
   return await message.reply('No existing filter matches the provided input.');
  }
 }
);

command(
 {
  on: 'text',
  fromMe: false,
  dontAddCommandList: true,
 },
 async (message, match) => {
  const filters = await getFilter(message.jid);
  if (!filters) return;
  filters.forEach(async (filter) => {
   const pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : `\\b(${filter.dataValues.pattern})\\b`, 'gm');
   if (pattern.test(match)) await message.reply(filter.dataValues.text, { quoted: message });
  });
 }
);
