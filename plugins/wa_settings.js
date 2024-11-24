let {smd} = require("../lib")
smd({
        pattern: 'getprivacy',
        fromMe: true,
        desc: 'get your privacy settings',
        type: 'wa settings'
}, async (message, match) => {
        const {
                readreceipts,
                profile,
                status,
                online,
                last,
                groupadd,
                calladd
        } = await message.bot.fetchPrivacySettings(true);
        const msg = `*♺ whatsapp privacy settings*

*ᝄ name :* ${(message.fromMe &&  message.pushName ? message.pushName :  message.bot.user.name).split("\n").join("  ") }
*ᝄ number :* ${message.user.split("@")[0]}

*ᝄ online :* ${online}
*ᝄ profile :* ${profile}
*ᝄ last seen :* ${last}
*ᝄ whts status :* ${status}
*ᝄ read receipt :* ${readreceipts}

*ᝄ who can add in group :* ${groupadd}
*ᝄ who can call :* ${calladd}`;
        let img = await message.getpp(message.user)
        await message.send(img, {
                caption: msg
        }, 'img');
})





smd({
        pattern: 'lastseen',
        fromMe: true,
        desc: 'to change lastseen privacy',
        type: 'wa settings'
}, async (message, match, {smd }) => {
    try{
        if (!match) return await message.send(`_*Example:-* .lastseen all_\n_to change last seen privacy settings_`);
        const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
        if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join(' / ')}* values_`);
        await message.bot.updateLastSeenPrivacy(match)
        await message.send(`_Privacy settings *last seen* Updated to *${match}*_`);
}catch(e){ message.error(`${e}\n\nCommand : lastseen` , e, false) }
})


smd({
        pattern: 'online',
        fromMe: true,
        desc: 'to change online privacy',
        type: 'wa settings'
}, async (message, match,) => {
    try{
        if (!match) return await message.send(`_*Example:-* .online all_\n_to change *online*  privacy settings_`);
        const available_privacy = ['all', 'match_last_seen'];
        if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
        await message.bot.updateOnlinePrivacy(match)
        await message.send(`_Privacy Updated to *${match}*_`);
}catch(e){ message.error(`${e}\n\nCommand : online` , e, false) }
})


smd({
        pattern: 'mypp',
        fromMe: true,
        desc: 'privacy setting profile picture',
        type: 'wa settings'
}, async (message, match) => {
    try{
        if (!match) return await message.send(`_*Example:-* .mypp all_\n_to change *profile picture*  privacy settings_`);
        const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
        if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
        await message.bot.updateProfilePicturePrivacy(match)
        await message.send(`_Privacy Updated to *${match}*_`);
}catch(e){ message.error(`${e}\n\nCommand : mypp` , e, false) }
})

smd({
        pattern: 'mystatus',
        fromMe: true,
        desc: 'privacy for my status',
        type: 'wa settings'
}, async (message, match,) => {
    try{
        if (!match) return await message.send(`_*Example:-* .mystatus all_\n_to change *status*  privacy settings_`);
        const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
        if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
        await message.bot.updateStatusPrivacy(match)
        await message.send(`_Privacy Updated to *${match}*_`);
}catch(e){ message.error(`${e}\n\nCommand : mystatus` , e, false) }
})

smd({
        pattern: 'read',
        fromMe: true,
        desc: 'privacy for read message',
        type: 'wa settings'
}, async (message, match, cmd) => {
    try{
        if (!match) return await message.send(`_*Example:-* .read all_\n_to change *read and receipts message*  privacy settings_`);
        const available_privacy = ['all', 'none'];
        if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
        await message.bot.updateReadReceiptsPrivacy(match)
        await message.send(`_Privacy Updated to *${match}*_`);
}catch(e){ message.error(`${e}\n\nCommand : read` , e, false) }
})

smd({
        pattern: 'groupadd',
        fromMe: true,
        desc: 'privacy for group add',
        type: 'wa settings'
}, async (message, match, cmd) => {
    try{
        if (!match) return await message.send(`_*Example:-* .groupadd all_\n_to change *group add*  privacy settings_`);
        const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
        if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
        await message.bot.updateGroupsAddPrivacy(match)
        await message.send(`_Privacy Updated to *${match}*_`);
}catch(e){ message.error(`${e}\n\nCommand : groupadd` , e, false) }
})

