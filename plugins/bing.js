const {
  smd,
  Config,
} = require("../lib");
const axios = require("axios");

smd(
  {
    pattern: "bing",
    category: "ai",
    desc: "Fetches information using Bing AI.",
    use: "<query>",
    filename: __filename,
  },
  async (message, text) => {
    try {
      if (!text) {
        return message.reply(
          `*_Please provide a query, ${message.isCreator ? "Buddy" : "Idiot"}!!_*`
        );
      }

      const apiUrl = `https://nikka-api.us.kg/ai/bing?apiKey=nikka&q=${encodeURIComponent(text)}`;
      const { data } = await axios.get(apiUrl);

      if (!data) {
        return await message.reply(`*_Something went wrong. Please try again later._*`);
      }

      let responseText = `*🧠 Bing AI Response for "${text}":*\n\n`;
      responseText += data.result; // Adjust based on actual API response structure
      responseText += `\n\n${Config.caption}`;

      message.bot.sendUi(
        message.jid,
        { caption: responseText },
        { quoted: message },
        "text",
        "true"
      );
    } catch (e) {
      return await message.error(
        `${e}\n\n command: bingai`,
        e,
        `*_An error occurred while processing your request._*`
      );
    }
  }
);