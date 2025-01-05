const axios = require("axios");
const { cmd } = require("../lib/plugins");
const { smd } = require("../lib");

smd(
  {
    pattern: "gpt3",
    react: "😊",
    alias: ["botx", "gpt3"],
    fromMe: true,
    desc: "Blackbox AI chat",
    filename: __filename,
    type: "ai",
  },
  async (message, query) => {
    try {
      if (!query) {
        return await message.reply(
          `*GPT-3 Chatbot*\n\n` +
          `❗ Please provide a search query.\n` +
          `Example: ${prefix}gpt3 What is the capital of France?`
        );
      }

      await message.reply("Fetching response, please wait...");

      const apiUrl = `https://nikka-api.us.kg/ai/moshai?q=${query}&apiKey=nikka`;

      const response = await axios.get(apiUrl);
      const result = response.data;
      console.log(result);

      if (!result.result) {
        return await message.reply("No valid response received. Please try again later.");
      }

      const responseMessage = result.result;
      await message.send(responseMessage);
    } catch (error) {
      console.error("GPT-3 Chat Error:", error);
      await message.error("An error occurred while processing your request:", error.message);
    }
  }
);