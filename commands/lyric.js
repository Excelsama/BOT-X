const baileys = require('@adiwajshing/baileys');
const fetch = require('node-fetch');

const getLyrics = async (query) => {
    const response = await fetch(`https://api.lyrics.ovh/v1/${query}`);
    const data = await response.json();
    return data.lyrics;
};

const client = new baileys.WAConnection();
client.connect();

client.on('chat-update', async (chat) => {
    if (chat.messages && chat.messages.length) {
        const message = chat.messages.all()[0];
        if (message.message.conversation) {
            const receivedMessage = message.message.conversation.toLowerCase();
            if (receivedMessage.startsWith('!lyrics')) {
                const query = receivedMessage.replace('!lyrics', '').trim();
                const lyrics = await getLyrics(query);
                client.sendMessage(message.key.remoteJid, lyrics, baileys.MessageType.text);
            }
        }
    }
});
