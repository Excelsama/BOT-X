const { command, serialize, loadMessage } = require('../lib');

command(
 {
  pattern: 'vv ?(.*)',
  desc: 'Downloads ViewOnce Messages',
  type: 'whatsapp',
 },
 async (message) => {
  if (!message.reply_message.isViewOnce) return message.reply('_Reply A ViewOnce Message!_');
  const content = await message.download(message.reply_message.messageInfo.viewOnceMessage.message);
  await message.send(content.buffer, { jid: message.user });
  return message.reply('_Saved, Check your Dm Sir_');
 }
);

command(
 {
  pattern: 'setpp ?(.*)',
  desc: 'change WhatsApp profile Picture',
  type: 'whatsapp',
 },
 async (message, match, m, client) => {
  if (!message.reply_message.mediaType === 'imageMessage') return message.reply('_Reply An Image_');
  let imgpath = await message.download(message.reply_message.messageInfo);
  return await client.updateProfilePicture(message.user, { url: imgpath.filePath });
 }
);

command(
 {
  pattern: 'setname',
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
  desc: 'Block a person',
  type: 'whatsapp',
 },
 async (message, match, m, client) => {
  let jid;
  if (message.isGroup) {
   jid = message.mention && message.mention.length > 0 ? message.mention[0] : message.reply_message ? message.reply_message.jid : null;
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
  desc: 'Unblocks a person',
  type: 'whatsapp',
 },
 async (message, match, m, client) => {
  let jid;
  if (message.isGroup) {
   jid = message.mention && message.mention.length > 0 ? message.mention[0] : message.reply_message ? message.reply_message.jid : null;
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
  desc: 'Give jid of chat/user',
  type: 'whatsapp',
 },
 async (message, match, m, client) => {
  const targetJid = message.reply_message?.jid || message.jid || message.mention[0];
  return await message.send(targetJid);
 }
);

command(
 {
  pattern: 'dlt',
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
  desc: 'Edit message sent by the command',
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
  desc: 'quoted message',
  type: 'whatsapp',
 },
 async (message, match, m, client) => {
  if (!message.reply_message) return await message.reply('*Reply to a message*');
  let key = message.reply_message.key;
  let msg = await loadMessage(key.id);
  if (!msg) return await message.reply('_Message not found maybe command might not be running at that time_');
  msg = await serialize(JSON.parse(JSON.stringify(msg.message)), message.client);
  if (!msg.quoted) return await message.reply('No quoted message found');
  await message.copyNForward(message.jid, msg.quoted.message);
 }
);

command(
 {
  pattern: 'clear ?(.*)',
  desc: 'delete whatsapp chat',
  type: 'whatsapp',
 },
 async (message, match, m, client) => {
  await client.chatModify(
   {
    delete: true,
    lastMessages: [
     {
      key: message.data.key,
      messageTimestamp: message.timestamp,
     },
    ],
   },
   message.jid
  );
  await message.reply('_Cleared.._');
 }
);

command(
 {
  pattern: 'archive ?(.*)',
  desc: 'archive whatsapp chat',
  type: 'whatsapp',
 },
 async (message, match, m, client) => {
  const lstMsg = {
   message: message.message,
   key: message.key,
   messageTimestamp: message.timestamp,
  };
  await client.chatModify(
   {
    archive: true,
    lastMessages: [lstMsg],
   },
   message.jid
  );
  await message.reply('_Archived.._');
 }
);

command(
 {
  pattern: 'unarchive ?(.*)',
  desc: 'unarchive whatsapp chat',
  type: 'whatsapp',
 },
 async (message, match, m, client) => {
  const lstMsg = {
   message: message.message,
   key: message.key,
   messageTimestamp: message.timestamp,
  };
  await client.chatModify(
   {
    archive: false,
    lastMessages: [lstMsg],
   },
   message.jid
  );
  await message.reply('_Unarchived.._');
 }
);

command(
 {
  pattern: 'pin',
  desc: 'pin a chat',
  type: 'whatsapp',
 },
 async (message, match, m, client) => {
  await client.chatModify(
   {
    pin: true,
   },
   message.jid
  );
  await message.reply('_Pined.._');
 }
);

command(
 {
  pattern: 'unpin ?(.*)',
  desc: 'unpin a msg',
  type: 'whatsapp',
 },
 async (message, match, m, client) => {
  await client.chatModify(
   {
    pin: false,
   },
   message.jid
  );
  await message.reply('_Unpined.._');
 }
);

command(
 {
  pattern: 'forward ?(.*)',
  desc: 'Forwards the replied message (any type) with quote',
  type: 'whatsapp',
 },
 async (message, match, m, client) => {
  if (!m.quoted) return await message.reply('Reply to a message to forward');
  const jids = parsedJid(match);
  for (const jid of jids) {
   await client.relayMessage(jid, m.quoted.message, {
    messageId: m.quoted.key.id,
    quoted:
     {
      key: m.quoted.key,
      message: m.quoted.message,
      participant: m.quoted.participant,
     } || message.data,
   });
  }
  return message.reply('*_Message Forwarded_*');
 }
);

command(
 {
  pattern: 'save ?(.*)',
  desc: 'Saves WhatsApp Status',
  type: 'whatsapp',
 },
 async (message, match, m, client) => {
  if (!message.reply_message?.image && !message.reply_message.video && !message.reply_message.audio) return await message.reply('_Reply to a status message with media_');
  const relayOptions = {
   messageId: m.quoted.key.id,
   quoted: {
    key: m.quoted.key,
    message: m.quoted.message,
    participant: m.quoted.participant,
   },
  };
  return await client.relayMessage(message.user, m.quoted.message, relayOptions);
 }
);
