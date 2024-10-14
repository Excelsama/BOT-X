const { command, serialize } = require('../lib');
const { loadMessage, getName } = require('../db');
const { isAdmin } = require('./group');
const { ANTI_DELETE } = require('../config');

command(
 {
  pattern: 'setpp',
  fromMe: true,
  desc: 'Set profile picture',
  type: 'whatsapp',
 },
 async (message, match, m, client) => {
  if (!message.reply_message.image) return await message.reply('_Reply to a photo_');
  let buff = await m.quoted.download();
  await message.setPP(message.user, buff);
  return await message.reply('_Profile Picture Updated_');
 }
);

command(
 {
  pattern: 'setname',
  fromMe: true,
  desc: 'Set User name',
  type: 'whatsapp',
 },
 async (message, match) => {
  if (!match) return await message.reply('_Enter name_');
  await message.updateName(match);
  return await message.reply(`_Username Updated : ${match}_`);
 }
);

command(
 {
  pattern: 'block',
  fromMe: true,
  desc: 'Block a person',
  type: 'whatsapp',
 },
 async (message, match, m, client) => {
  if (message.isGroup) {
   let jid = message.mention[0] || message.reply_message.jid;
   if (!jid) return await message.reply('_Reply to a person or mention_');
   await message.block(jid);
   return await message.sendMessage(`_@${jid.split('@')[0]} Blocked_`, { mentions: [jid] });
  } else {
   await message.block(message.jid);
   return await message.reply('_User blocked_');
  }
 }
);

command(
 {
  pattern: 'unblock',
  fromMe: true,
  desc: 'Unblock a person',
  type: 'whatsapp',
 },
 async (message, match, m, client) => {
  if (message.isGroup) {
   let jid = message.mention[0] || message.reply_message.jid;
   if (!jid) return await message.reply('_Reply to a person or mention_');
   await message.block(jid);
   return await message.sendMessage(message.jid, `_@${jid.split('@')[0]} unblocked_`, { mentions: [jid] });
  } else {
   await message.unblock(message.jid);
   return await message.reply('_User unblocked_');
  }
 }
);

command(
 {
  pattern: 'jid',
  fromMe: true,
  desc: 'Give jid of chat/user',
  type: 'whatsapp',
 },
 async (message, match, m, client) => {
  const targetJid = message.reply_message?.jid || message.jid;
  if (!targetJid) return await message.reply(message.jid, 'Unable to retrieve the JID.');
  return await message.send(targetJid);
 }
);

command(
 {
  pattern: 'dlt',
  fromMe: true,
  desc: 'Deletes your message or a replied message',
  type: 'whatsapp',
 },
 async (message, match, m, client) => {
  if (!message.reply_message) return message.reply('_Reply Msg_');
  await client.sendMessage(message.jid, { delete: message.reply_message.key || m.quoted.key });
 }
);

command(
 {
  pattern: 'edit ?(.*)',
  fromMe: true,
  desc: 'Edit message sent by the bot',
  type: 'whatsapp',
 },
 async (message, match, m, client) => {
  if (!message.reply_message) return await message.reply('_Please reply to a message._');
  const newText = match;
  return await client.sendMessage(message.jid, { text: newText, edit: m.quoted.key });
 }
);

command(
 {
  pattern: 'quoted',
  fromMe: false,
  desc: 'quoted message',
  type: 'whatsapp',
 },
 async (message, match, m, client) => {
  if (!message.reply_message) return await message.reply('*Reply to a message*');
  let key = message.reply_message.key;
  let msg = await loadMessage(key.id);
  if (!msg) return await message.reply('_Message not found maybe bot might not be running at that time_');
  msg = await serialize(JSON.parse(JSON.stringify(msg.message)), message.client);
  if (!msg.quoted) return await message.reply('No quoted message found');
  await message.copyNForward(message.jid, msg.quoted.message);
 }
);

command(
 {
  on: 'delete',
  fromMe: false,
  desc: 'Logs the recent deleted message',
  dontAddCommandList: true,
 },
 async (message, match, m, client) => {
  if (!ANTI_DELETE) return await message.sendMessage(message.user, '_Anti Delete Not Set in Config_');
  let msg = await loadMessage(message.messageId);
  if (!msg) return;
  msg = await serialize(JSON.parse(JSON.stringify(msg.message)), client);
  if (!msg) return await message.reply('No deleted message found');
  let deleted = await message.copyNForward(ANTI_DELETE, msg.message);
  let name = msg.from.endsWith('@g.us') ? `_Group: ${(await client.groupMetadata(msg.from)).subject}_\n_Name: ${await getName(msg.sender)}_` : `_Name: ${await getName(msg.from)}_`;
  return await message.reply(`_Message Deleted_\n_From: ${msg.from}_\n${name}\n_SenderJid: ${msg.sender}_`, { quoted: deleted });
 }
);
