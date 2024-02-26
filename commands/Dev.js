cmd({
    pattern: "developer",
    desc: "Get developer information",
    handler: async (Void, citel, text) => {
        const devInfo = `
*Developer Info:*

*Name:* Excel
*Project:* STAR-MD
*Github:* [xcelsama](https://github.com/xcelsama)
*WhatsApp:* [Chat with Excel](https://wa.me/2347045035241)
*TikTok:* [xcelsama](https://tiktok.com/@xcelsama/)
*Facebook:* [Excel's Facebook](https://www.facebook.com/itz.hepzibah.5)
*WhatsApp Channel:* [Join Excel's Channel](https://whatsapp.com/channel/0029Va9wmuz8F2pGIURwmo0m)
`;

        const imageUrl =https://telegra.ph/file/85ba57286c4b3af4b533f.jpg "URL_TO_YOUR_IMAGE"; 

        await Void.sendMessage(citel.jid, { text: devInfo, quoted: citel, image: { url: imageUrl } });
    }
});