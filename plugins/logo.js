const {
  xcel,
  isPrivate,
  getBuffer
} = require("../lib/plugins");
const axios = require('axios');
const FormData = require("form-data");
xcel.smd(
  {
    pattern: "glossy",
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

      const apiUrl = `https://api.giftedtech.my.id/api/ephoto360/glossysilver?apikey=gifted&text=${encodeURIComponent(
        query
      )}`;

      const response = await fetch(apiUrl);
      const result = await response.json();
      if (!result.success || !result.result || !result.result.image_url) {
        return await message.reply("Failed to generate the image. Please try again later.");
      }
      const imageUrl = result.result.image_url;
      await context.send(message.jid, {
        image: { url: imageUrl },
        caption: `\n> Logo generated successfully.`,
        contextInfo: {
          externalAdReply: {
            title: "Hi Pookie",
            body: "Powered EXCEL",
            sourceUrl: "https://whatsapp.com/channel/0029VaoLotu42DchJmXKBN3L",
            mediaUrl: "",
            mediaType: 1,
            showAdAttribution: true,
            renderLargerThumbnail: false,
            thumbnailUrl: "https://files.catbox.moe/mnp025.jpg", // Replace with a relevant thumbnail
          },
        },
      });
    } catch (error) {
      console.error("Image Generator Error:", error);
      await message.reply(`An error occurred while generating the image: ${error.message}`);
    }
  }
);


