const { command } = require('../lib');
const { parsedJid } = require('../lib');

// isAdmin function to check if the user or bot is an admin in the group
async function isAdmin(groupJid, userJid, client) {
 const metadata = await client.groupMetadata(groupJid);
 const participant = metadata.participants.find((p) => p.id === userJid);
 return participant?.admin === 'admin' || participant?.admin === 'superadmin';
}

// Command to add a person to the group
command(
 {
  pattern: 'add',
  fromMe: true,
  desc: 'Add a person to group',
  type: 'group',
 },
 async (message, match) => {
  if (!message.isGroup) return await message.reply('_This command is for groups_');

  match = match || message.reply_message.jid;
  if (!match) return await message.reply('_Mention a user to add_');

  const isadmin = await isAdmin(message.jid, message.user, message.client);
  if (!isadmin) return await message.reply("_I'm not admin_");

  const jid = parsedJid(match);
  await message.client.groupParticipantsUpdate(message.jid, jid, 'add');

  return await message.reply(`_@${jid[0].split('@')[0]} added_`, {
   mentions: [jid],
  });
 }
);

// Command to kick a person from the group
command(
 {
  pattern: 'kick',
  fromMe: true,
  desc: 'Kick a person from group',
  type: 'group',
 },
 async (message, match) => {
  if (!message.isGroup) return await message.reply('_This command is for groups_');

  match = match || message.reply_message.jid;
  if (!match) return await message.reply('_Mention a user to kick_');

  const isadmin = await isAdmin(message.jid, message.user, message.client);
  if (!isadmin) return await message.reply("_I'm not admin_");

  const jid = parsedJid(match);
  await message.client.groupParticipantsUpdate(message.jid, jid, 'remove');

  return await message.reply(`_@${jid[0].split('@')[0]} kicked_`, {
   mentions: [jid],
  });
 }
);

// Command to promote a user to admin
command(
 {
  pattern: 'promote',
  fromMe: true,
  desc: 'Promote to admin',
  type: 'group',
 },
 async (message, match) => {
  if (!message.isGroup) return await message.reply('_This command is for groups_');

  match = match || message.reply_message.jid;
  if (!match) return await message.reply('_Mention a user to promote_');

  const isadmin = await isAdmin(message.jid, message.user, message.client);
  if (!isadmin) return await message.reply("_I'm not admin_");

  const jid = parsedJid(match);
  await message.client.groupParticipantsUpdate(message.jid, jid, 'promote');

  return await message.reply(`_@${jid[0].split('@')[0]} promoted to admin_`, {
   mentions: [jid],
  });
 }
);

// Command to demote an admin
command(
 {
  pattern: 'demote',
  fromMe: true,
  desc: 'Demote from admin',
  type: 'group',
 },
 async (message, match) => {
  if (!message.isGroup) return await message.reply('_This command is for groups_');

  match = match || message.reply_message.jid;
  if (!match) return await message.reply('_Mention a user to demote_');

  const isadmin = await isAdmin(message.jid, message.user, message.client);
  if (!isadmin) return await message.reply("_I'm not admin_");

  const jid = parsedJid(match);
  await message.client.groupParticipantsUpdate(message.jid, jid, 'demote');

  return await message.reply(`_@${jid[0].split('@')[0]} demoted from admin_`, {
   mentions: [jid],
  });
 }
);

// Command to mute the group
command(
 {
  pattern: 'mute',
  fromMe: true,
  desc: 'Mute group',
  type: 'group',
 },
 async (message, match) => {
  if (!message.isGroup) return await message.reply('_This command is for groups_');

  const isadmin = await isAdmin(message.jid, message.user, message.client);
  if (!isadmin) return await message.reply("_I'm not admin_");

  await message.reply('_Muting the group_');
  return await message.client.groupSettingUpdate(message.jid, 'announcement');
 }
);

// Command to unmute the group
command(
 {
  pattern: 'unmute',
  fromMe: true,
  desc: 'Unmute group',
  type: 'group',
 },
 async (message, match) => {
  if (!message.isGroup) return await message.reply('_This command is for groups_');

  const isadmin = await isAdmin(message.jid, message.user, message.client);
  if (!isadmin) return await message.reply("_I'm not admin_");

  await message.reply('_Unmuting the group_');
  return await message.client.groupSettingUpdate(message.jid, 'not_announcement');
 }
);

// Command to get the JID of all group members
command(
 {
  pattern: 'gjid',
  fromMe: true,
  desc: 'Get JIDs of all group members',
  type: 'group',
 },
 async (message, match) => {
  if (!message.isGroup) return await message.reply('_This command is for groups_');

  const { participants } = await message.client.groupMetadata(message.jid);
  const participantJids = participants.map((u) => u.id);

  let result = '╭──〔 *Group JIDs* 〕\n';
  participantJids.forEach((jid) => {
   result += `├ *${jid}*\n`;
  });
  result += `╰──────────────`;

  return await message.reply(result);
 }
);

// Command to mention all users in the group
command(
 {
  pattern: 'tagall',
  fromMe: true,
  desc: 'Mention all users in group',
  type: 'group',
 },
 async (message, match) => {
  if (!message.isGroup) return;

  const { participants } = await message.client.groupMetadata(message.jid);
  let mentionsText = '';

  participants.forEach((mem) => {
   mentionsText += ` @${mem.id.split('@')[0]}\n`;
  });

  return await message.sendMessage(message.jid, mentionsText.trim(), {
   mentions: participants.map((p) => p.id),
  });
 }
);

// Command to tag specific users with a custom message
command(
 {
  pattern: 'tag',
  fromMe: true,
  desc: 'Tag users with custom message',
  type: 'group',
 },
 async (message, match) => {
  match = match || message.reply_message.text;
  if (!match) return await message.reply('_Enter or reply to a text to tag_');
  if (!message.isGroup) return;

  const { participants } = await message.client.groupMetadata(message.jid);
  return await message.sendMessage(message.jid, match, {
   mentions: participants.map((p) => p.id),
  });
 }
);
module.exports = { isAdmin };
