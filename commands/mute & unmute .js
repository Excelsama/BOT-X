const baileys = require('@adiwajshing/baileys');

// Function to mute a group
const muteGroup = async (client, groupId) => {
    await client.groupSettingChange(groupId, baileys.GroupSettingChange.messageSend, baileys.GroupSettingChangeSetting.onlyAdmins);
}

// Function to unmute a group
const unmuteGroup = async (client, groupId) => {
    await client.groupSettingChange(groupId, baileys.GroupSettingChange.messageSend, baileys.GroupSettingChangeSetting.allParticipants);
}

// Check if the user is an admin in the group
const isAdmin = async (client, groupId, userId) => {
    const groupData = await client.groupMetadata(groupId);
    return groupData.participants.find(participant => participant.jid === userId && participant.isAdmin);
}

// Command to mute a group if the user is an admin
client.on('message', async (message) => {
    if (message.body.startsWith('!mute') && (await isAdmin(client, message.chatId, message.sender))) {
        const groupId = message.chatId;
        await muteGroup(client, groupId);
        await client.reply(message.chatId, 'Group muted successfully!', message.id);
    }
});

// Command to unmute a group if the user is an admin
client.on('message', async (message) => {
    if (message.body.startsWith('!unmute') && (await isAdmin(client, message.chatId, message.sender))) {
        const groupId = message.chatId;
        await unmuteGroup(client, groupId);
        await client.reply(message.chatId, 'Group unmuted successfully!', message.id);
    }
});
