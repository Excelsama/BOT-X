const axios = require("axios");
const { cmd } = require("../lib/plugins");
const { smd } = require("../lib");

smd(
  {
    pattern: "glossy",
    react : "😊",
    alias: ["botx","glossy"],
    fromMe: true,
    desc: "Generate an image from text",
    type: "logo",
  },
  async (message, query) => {
    try {
      if (!query) {
        return await message.reply(
          `*Nikka Logo Maker*\n\n` +
          `❗ Please provide text for the image.\n` +
          `Example: ${prefix}glossy HAKI XER`
        );
      }

      const apiUrl = `https://api.giftedtech.my.id/api/ephoto360/glossysilver?apikey=gifted&text=${encodeURIComponent(query)}`;

      const response = await axios.get(apiUrl);
      const result = response.data;
       console.log(result);

      if (!result.success || !result.result || !result.result.image_url) {
        return await message.reply("Failed to generate the image. Please try again later.");
      }
      const imageUrl = result.result.image_url;
      await message.send({
        image: { url: imageUrl },
        caption: `\n> Logo generated successfully.`,
      });
    } catch (error) {
      console.error("Image Generator Error:", error);
      await message.error("An error occurred while generating the image:" ,error);
    }
  }
);
