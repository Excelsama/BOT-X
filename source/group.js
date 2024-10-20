const { command, parsedJid, isAdmin } = require('../lib');

command(
 {
  pattern: 'add',
  desc: 'Add a person to group',
  type: 'group',
 },
 async (message, match, m, client) => {
  if (!message.isGroup) return await message.reply('_This command is for groups_');
  match = match || message.reply_message.sender;
  if (!match) return await message.reply('_Mention a user to add_');
  const isadmin = await isAdmin(message.jid, message.user, client);
  if (!isadmin) return await message.reply("_I'm not admin_");
  const jid = parsedJid(match);
  await client.groupParticipantsUpdate(message.jid, jid, 'add');
  return await message.reply(`_@${jid[0].split('@')[0]} added_`, { mentions: [jid] });
 }
);

command(
 {
  pattern: 'kick',
  desc: 'Kick a person from group',
  type: 'group',
 },
 async (message, match, m, client) => {
  if (!message.isGroup) return await message.reply('_This command is for groups_');
  match = match || message.reply_message.sender;
  if (!match) return await message.reply('_Mention a user to kick_');
  const isadmin = await isAdmin(message.jid, message.user, client);
  if (!isadmin) return await message.reply("_I'm not admin_");
  const jid = parsedJid(match);
  await client.groupParticipantsUpdate(message.jid, jid, 'remove');
  return await message.reply(`_@${jid[0].split('@')[0]} kicked_`, { mentions: [jid] });
 }
);

command(
 {
  pattern: 'promote',
  desc: 'Promote to admin',
  type: 'group',
 },
 async (message, match, m, client) => {
  if (!message.isGroup) return await message.reply('_This command is for groups_');
  match = match || message.reply_message.sender;
  if (!match) return await message.reply('_Mention a user to promote_');
  const isadmin = await isAdmin(message.jid, message.user, client);
  if (!isadmin) return await message.reply("_I'm not admin_");
  const jid = parsedJid(match);
  await client.groupParticipantsUpdate(message.jid, jid, 'promote');
  return await message.reply(`_@${jid[0].split('@')[0]} promoted to admin_`, { mentions: [jid] });
 }
);

command(
 {
  pattern: 'demote',
  desc: 'Demote from admin',
  type: 'group',
 },
 async (message, match, m, client) => {
  if (!message.isGroup) return await message.reply('_This command is for groups_');
  match = match || message.reply_message.sender;
  if (!match) return await message.reply('_Mention a user to demote_');
  const isadmin = await isAdmin(message.jid, message.user, client);
  if (!isadmin) return await message.reply("_I'm not admin_");
  const jid = parsedJid(match);
  await client.groupParticipantsUpdate(message.jid, jid, 'demote');
  return await message.reply(`_@${jid[0].split('@')[0]} demoted from admin_`, { mentions: [jid] });
 }
);

command(
 {
  pattern: 'mute',
  desc: 'Mute group',
  type: 'group',
 },
 async (message, match, m, client) => {
  if (!message.isGroup) return await message.reply('_This command is for groups_');
  const isadmin = await isAdmin(message.jid, message.user, client);
  if (!isadmin) return await message.reply("_I'm not admin_");
  await message.reply('_Muting the group_');
  return await client.groupSettingUpdate(message.jid, 'announcement');
 }
);

command(
 {
  pattern: 'unmute',
  desc: 'Unmute group',
  type: 'group',
 },
 async (message, match, m, client) => {
  if (!message.isGroup) return await message.reply('_This command is for groups_');
  const isadmin = await isAdmin(message.jid, message.user, client);
  if (!isadmin) return await message.reply("_I'm not admin_");
  await message.reply('_Unmuting the group_');
  return await client.groupSettingUpdate(message.jid, 'not_announcement');
 }
);

command(
 {
  pattern: 'gjid',
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

command(
 {
  pattern: 'tagall',
  desc: 'Mention all users in group',
  type: 'group',
 },
 async (message, match) => {
  if (!message.isGroup) return await message.reply('_This command is for groups_');
  const { participants } = await message.client.groupMetadata(message.jid);
  let mentionsText = '';
  participants.forEach((mem) => {
   mentionsText += ` @${mem.id.split('@')[0]}\n`;
  });
  return await message.reply(mentionsText.trim(), { mentions: participants.map((p) => p.id) });
 }
);

command(
 {
  pattern: 'tag',
  desc: 'Tag users with custom message',
  type: 'group',
 },
 async (message, match, m, client) => {
  if (!message.isGroup) return await message.reply('_This command is for groups_');
  let taggedMsg = match || message.reply_message?.text || '';
  if (!taggedMsg) return await message.reply('_Reply A Message Or Give Me Text_');
  const { participants } = await client.groupMetadata(message.jid);
  return await message.reply(taggedMsg, { mentions: participants.map((p) => p.id) });
 }
);

command(
 {
  pattern: 'requests',
  desc: 'Get Join Requests',
  type: 'group',
 },
 async (message, match, m, client) => {
  if (!message.isGroup) return message.reply('_This command is for groups_');
  if (!(await isAdmin(message.jid, message.user, client))) return message.reply("_I'm not admin_");
  const { pendingParticipants } = await client.groupMetadata(message.jid);
  if (pendingParticipants.length === 0) return message.reply('_No join requests currently_');
  const response = '_Join Requests:_\n' + pendingParticipants.map((p) => `- ${p.id}`).join('\n');
  return await message.reply(response);
 }
);

command(
 {
  pattern: 'accept ?(.*)',
  desc: 'Accept Join Request',
  type: 'group',
 },
 async (message, match, m, client) => {
  if (!message.isGroup) return message.reply('_This command is for groups_');
  if (!(await isAdmin(message.jid, message.user, client))) return message.reply("_I'm not admin_");
  const userId = match[1] + '@s.whatsapp.net';
  await client.groupParticipantsUpdate(message.jid, [userId], 'add');
  return await message.reply(`_${userId} has been accepted._`);
 }
);

command(
 {
  pattern: 'reject ?(.*)',
  desc: 'Reject Join Request',
  type: 'group',
 },
 async (message, match, m, client) => {
  if (!message.isGroup) return message.reply('_This command is for groups_');
  if (!(await isAdmin(message.jid, message.user, client))) return message.reply("_I'm not admin_");

  const userId = match[1] + '@s.whatsapp.net';
  await client.groupParticipantsUpdate(message.jid, [userId], 'remove');
  return await message.reply(`_${userId} has been rejected._`);
 }
);
