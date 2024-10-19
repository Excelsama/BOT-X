const { generateWAMessageFromContent } = require('baileys');
const config = require('../../config');
const { loadMessage } = require('../store');

async function getDeletedMsg(client, msg) {
 if (msg.type === 'protocolMessage') {
  if (msg.message.protocolMessage.type === 'REVOKE') {
   await client.sendMessage(msg.key.remoteJid, { text: 'Message Deleted' });
   let jid = config.ANTI_DELETE;
   let message = await loadMessage(msg.message.protocolMessage.key.id);
   const m = generateWAMessageFromContent(jid, message.message, {
    userJid: client.user.id,
   });
   await client.relayMessage(jid, m.message, {
    messageId: m.key.id,
   });
   return m;
  }
 }
}
module.exports = getDeletedMsg;
