const { command } = require('../lib');
const { isAdmin } = require('./group');
const { getAntiLink, setAntiLink, deleteAntiLink, AntiWord, addAntiWord, getAntiWords } = require('../db');

// AntiLink Command
command(
 {
  pattern: 'antilink ?(.*)',
  fromMe: true,
  desc: 'Set AntiLink on | off | delete | kick',
  type: 'group',
 },
 async (message, match, m, client) => {
  if (!message.isGroup) return message.reply('_For groups only!_');

  const isUserAdmin = await isAdmin(message.jid, message.user, client);
  if (!isUserAdmin) return message.reply("I'm not an admin.");

  const cmd = match.trim().toLowerCase();
  if (!cmd) {
   const settings = await getAntiLink(message.jid);
   return message.reply(settings ? `AntiLink: ${settings.mode}` : 'AntiLink is off.');
  }

  if (cmd === 'off') {
   await deleteAntiLink(message.jid);
   return message.reply('AntiLink turned off.');
  }

  const mode = cmd === 'on' ? 'delete' : cmd === 'kick' ? 'kick' : null;
  if (!mode) return message.reply('Use: antilink on/off/delete/kick');

  await setAntiLink(message.jid, mode);
  return message.reply(`AntiLink set to ${mode}.`);
 }
);

command(
 {
  on: 'text',
  fromMe: false,
  dontAddCommandList: true,
 },
 async (message, match, m, client) => {
  if (!message.isGroup) return;

  const settings = await getAntiLink(message.jid);
  if (!settings) return;

  const isUserAdmin = await isAdmin(message.jid, message.participant, client);
  if (isUserAdmin) return;

  const hasLink = /(?:(?:https?|ftp):\/\/)?[\w/\-?=%.]+\.[\w/\-&?=%.]+/gi.test(message.text);
  if (hasLink) {
   await client.sendMessage(message.jid, { delete: message.key });
   if (settings.mode === 'kick') {
    await client.groupParticipantsUpdate(message.jid, [message.participant], 'remove');
    message.reply(`@${message.participant.split('@')[0]} removed for sending a link.`, { mentions: [message.participant] });
   } else {
    message.reply(`@${message.participant.split('@')[0]}, links are not allowed.`, { mentions: [message.participant] });
   }
  }
 }
);

command(
 {
  pattern: 'antiword ?(.*)',
  fromMe: true,
  desc: 'Add or remove forbidden words',
  type: 'group',
 },
 async (message, match, m, client) => {
  if (!message.isGroup) return message.reply('_For groups only!_');

  const isUserAdmin = await isAdmin(message.jid, message.user, client);
  if (!isUserAdmin) return message.reply("I'm not an admin.");

  const args = match
   .trim()
   .toLowerCase()
   .split(/[,\s]+/)
   .filter(Boolean);
  if (args.length === 0) {
   const words = await getAntiWords(message.jid);
   return message.reply(words.length > 0 ? `Forbidden words: ${words.join(', ')}` : 'No forbidden words set.');
  }

  if (args[0] === 'off') {
   await AntiWord.destroy({ where: { groupJid: message.jid } });
   return message.reply('*AntiWord feature turned off.*\n_All forbidden words removed._');
  }

  let added = [],
   existing = [],
   failed = [];
  for (const word of args) {
   const result = await addAntiWord(message.jid, word);
   if (result === true) added.push(word);
   else if (result === 'exists') existing.push(word);
   else failed.push(word);
  }

  let response = '';
  if (added.length) response += `*Added: ${added.join(', ')}*\n`;
  if (existing.length) response += `*Already exists: ${existing.join(', ')}*\n`;
  if (failed.length) response += `Failed to add: ${failed.join(', ')}`;

  return message.reply(response.trim() || '*No changes made to the forbidden words list.*');
 }
);

// AntiWord Deletion Behavior
command(
 {
  on: 'text',
  fromMe: false,
  dontAddCommandList: true,
 },
 async (message, match, m, client) => {
  if (!message.isGroup) return;

  const isUserAdmin = await isAdmin(message.jid, message.participant, client);
  if (isUserAdmin) return;

  const antiWords = await getAntiWords(message.jid);
  const messageText = message.text.toLowerCase();

  for (const word of antiWords) {
   if (messageText.includes(word)) {
    await client.sendMessage(message.jid, { delete: message.key });
    return message.reply(`_@${message.participant.split('@')[0]}, your message was deleted for using a forbidden word._`, {
     mentions: [message.participant],
    });
   }
  }
 }
);
