
const axios = require("axios");
const { cmd } = require("../lib/plugins");
const { smd } = require("../lib");

smd(
  {
    pattern: "apk",
    react: "😊",
    alias: ["botx", "apk"],
    fromMe: true,
    desc: "Download APK based on the user's query.",
    filename: __filename,
    type: "downloader",
  },
  async (message, query) => {
    try {
      if (!query) {
        return await message.reply(
          `*APK Downloader*\n\n` +
          `❗ Please provide an APK query.\n` +
          `Example: ${prefix}apk WhatsApp`
        );
      }

      await message.reply("Fetching APK, please wait...");

      const apiUrl = `https://api.nexoracle.com/downloader/apk?apikey=free_key@maher_apis&q=${encodeURIComponent(query)}`;

      const response = await axios.get(apiUrl);
      const result = response.data;
      console.log(result);

      if (!result.result) {
        return await message.reply("No valid response received. Please try again later.");
      }

      const responseMessage = result.result;
      await message.send(responseMessage);
    } catch (error) {
      console.error("APK Downloader Error:", error);
      await message.error("An error occurred while processing your request:", error.message);
    }
  }
);