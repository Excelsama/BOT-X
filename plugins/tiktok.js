const {
  smd,
  Config,
} = require("../lib");
const axios = require("axios");

smd(
  {
    pattern: "t",
    category: "media",
    desc: "Downloads and sends requested TikTok video.",
    use: "<link>",
    filename: __filename,
  },
  async (message, text) => {
    try {
      if (!text) {
        return message.reply(
          `*_Please provide a TikTok video link, ${message.isCreator ? "Buddy" : "Idiot"}!!_*`
        );
      }

      const apiUrl = `https://nikka-api.us.kg/dl/tiktok?url=${encodeURIComponent(text)}&apiKey=nikka`;
      const result = await axios.get(apiUrl);

      if (!result.data || !result.data.videoUrl) {
        return await message.reply(`*_Something went wrong. Please try again later._*`);
      }

      const videoUrl = result.data.videoUrl;

      await message.bot.sendMessage(
        message.jid,
        { 
          video: { url: videoUrl },
          caption: `*🎬 TikTok Video:*\n\nRequested by: ${message.pushName || 'User'}\n\n${Config.caption}`
        },
        { quoted: message }
      );
    } catch (e) {
      return await message.error(
        `${e}\n\n command: tiktok`,
        e,
        `*_An error occurred while processing your request._*`
      );
    }
  }
);