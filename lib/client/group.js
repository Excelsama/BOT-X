const { FiletypeFromUrl, parseJid, UrlFromMsg } = require('../utils');
const { getStatus, getMessage, setMessage, toggleStatus, delMessage } = require('../store');

class Greetings {
 constructor(conn) {
  this.conn = conn;
 }

 async handleGroupEvent(data) {
  const metadata = await this.conn.groupMetadata(data.id);
  const participants = data.participants;

  for (const user of participants) {
   const userpp = await this.getUserProfilePicture(user);

   switch (data.action) {
    case 'add':
     await this.handleGroupAction(data.id, metadata, user, userpp, 'welcome');
     break;
    case 'remove':
     await this.handleGroupAction(data.id, metadata, user, userpp, 'goodbye');
     break;
   }
  }
 }

 async getUserProfilePicture(user) {
  try {
   return await this.conn.profilePictureUrl(user, 'image');
  } catch {
   return 'https://getwallpapers.com/wallpaper/full/3/5/b/530467.jpg';
  }
 }

 async handleGroupAction(groupId, metadata, user, userpp, actionType) {
  const status = await getStatus(groupId, actionType);
  if (!status) return;

  const messageData = await getMessage(groupId, actionType);
  if (!messageData) return;

  let msg = this.replaceMessagePlaceholders(messageData.message, user, metadata);

  const url = UrlFromMsg(msg);

  if (url) {
   await this.sendMediaMessage(groupId, url, msg);
  } else {
   await this.sendTextMessage(groupId, msg);
  }
 }

 async sendMediaMessage(groupId, url, msg) {
  try {
   const { type, buffer } = await FiletypeFromUrl(url);
   const caption = msg.replace(url, '').trim();

   if (type === 'image' || type === 'video') {
    await this.conn.sendMessage(groupId, {
     [type]: buffer,
     caption,
     mentions: parseJid(msg),
    });
   } else {
    await this.sendTextMessage(groupId, msg);
   }
  } catch (error) {
   console.error('Error sending media message:', error);
   await this.sendTextMessage(groupId, msg);
  }
 }

 async sendTextMessage(groupId, msg) {
  try {
   await this.conn.sendMessage(groupId, {
    text: msg,
    mentions: parseJid(msg),
   });
  } catch (error) {
   console.error('Error sending text message:', error);
  }
 }

 replaceMessagePlaceholders(message, user, metadata) {
  const username = user.split('@')[0];
  return message
   .replace(/@user/gi, `@${username}`)
   .replace(/@gname/gi, metadata.subject)
   .replace(/@count/gi, metadata.participants.length)
   .replace(/@desc/gi, metadata.desc || 'No description')
   .replace(/@admins/gi, this.getAdminsMention(metadata));
 }

 getAdminsMention(metadata) {
  const admins = metadata.participants.filter((p) => p.admin).map((p) => p.id);
  return admins.map((admin) => `@${admin.split('@')[0]}`).join(', ');
 }

 static async setGreeting(groupId, type, message) {
  return await setMessage(groupId, type, message);
 }

 static async toggleGreetingStatus(groupId, type) {
  return await toggleStatus(groupId, type);
 }

 static async deleteGreeting(groupId, type) {
  return await delMessage(groupId, type);
 }

 static async getGreetingStatus(groupId, type) {
  return await getStatus(groupId, type);
 }

 static async getGreetingMessage(groupId, type) {
  return await getMessage(groupId, type);
 }
}

module.exports = Greetings;
