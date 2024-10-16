const { command, serialize } = require('../lib');
const { loadMessage } = require('../db');

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
 async (message, match, m, client) => {
  if (!match) return message.reply('_Provide Name!_');
  const newName = match;
  await client.updateProfileName(newName);
  return await message.reply(`_Name Set to ${newName}_`);
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
  let jid;
  if (message.isGroup) {
   jid = message.mention && message.mention.length > 0 ? message.mention[0] : message.reply_message ? message.reply_message.participant : null;
   if (!jid) return await message.reply('_Please mention or reply to the person you want to block._');
   await client.updateBlockStatus(jid, 'block');
   return await message.reply(`_@${jid.split('@')[0]} Blocked_`, { mentions: [jid] });
  } else {
   jid = message.jid;
   await message.reply('_Blocked_');
   return await client.updateBlockStatus(jid, 'block');
  }
 }
);

command(
 {
  pattern: 'unblock',
  fromMe: true,
  desc: 'Unblocks a person',
  type: 'whatsapp',
 },
 async (message, match, m, client) => {
  let jid;
  if (message.isGroup) {
   jid = message.mention && message.mention.length > 0 ? message.mention[0] : message.reply_message ? message.reply_message.participant : null;
   if (!jid) return await message.reply('_Please mention or reply to the person you want to Unblock._');
   await client.updateBlockStatus(jid, 'unblock');
   return await message.reply(`_@${jid.split('@')[0]} UnBlocked_`, { mentions: [jid] });
  } else {
   jid = message.jid;
   await client.updateBlockStatus(jid, 'unblock');
   return await message.reply('_Unblocked_');
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
  const targetJid = message.reply_message?.sender || message.jid;
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
