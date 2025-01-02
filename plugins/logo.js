const {
  smd,
  isPrivate,
  getBuffer
} = require("../lib/");
const axios = require('axios');
const FormData = require("form-data");
smd(
  {
    pattern: "glossy",
    fromMe: true,
    desc: "Generate an image from text",
    type: "logo",
  },
  async (message, query) => {
    try {
      // Ensure the user provides text for the image
      if (!query) {
        return await m.send(
          `*Nikka Logo Maker*\n\n` +
          `❗ Please provide text for the image.\n` +
          `Example: ${prefix}glossy HAKI XER`
        );
      }

      // Build the API URL with the provided text
      const apiUrl = `https://api.giftedtech.my.id/api/ephoto360/glossysilver?apikey=gifted&text=${encodeURIComponent(
        query
      )}`;

      // Call the API and fetch the response
      const response = await fetch(apiUrl);
      const result = await response.json();

      // Check if the API call was successful
      if (!result.success || !result.result || !result.result.image_url) {
        return await m.send("Failed to generate the image. Please try again later.");
      }

      // Extract the image URL
      const imageUrl = result.result.image_url;

      // Send the generated image back to the user
      await context.send(message.jid, {
        image: { url: imageUrl },
        caption: `\n> Logo generated successfully.`,
        contextInfo: {
          externalAdReply: {
            title: "Hi Pookie",
            body: "Powered by Haki",
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
      await m.send(`An error occurred while generating the image: ${error.message}`);
    }
  }
);



smd(
  {
    pattern: "write",
    fromMe: true,
    desc: "Generate an image from text",
    type: "logo",
  },
  async (message, query) => {
    try {
      // Ensure the user provides text for the image
      if (!query) {
        return await m.send(
          `*Nikka Logo Maker*\n\n` +
          `❗ Please provide text for the image.\n` +
          `Example: ${prefix}glossy HAKI XER`
        );
      }
//https://api.giftedtech.my.id/api/ephoto360/writetext?apikey=gifted&text=Gifted%20Tech
      // Build the API URL with the provided text
      const apiUrl = `https://api.giftedtech.my.id/api/ephoto360/writetext?apikey=gifted&text=${encodeURIComponent(
        query
      )}`;

      // Call the API and fetch the response
      const response = await fetch(apiUrl);
      const result = await response.json();

      // Check if the API call was successful
      if (!result.success || !result.result || !result.result.image_url) {
        return await message.reply("Failed to generate the image. Please try again later.");
      }

      // Extract the image URL
      const imageUrl = result.result.image_url;

      // Send the generated image back to the user
      await context.send(message.jid, {
        image: { url: imageUrl },
        caption: `\n> Logo generated successfully.`,
        contextInfo: {
          externalAdReply: {
            title: "Hi Pookie",
            body: "Powered by Haki",
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
      await m.send(`An error occurred while generating the image: ${error.message}`);
    }
  }
);



smd(
  {
    pattern: "glitch",
    fromMe: true,
    desc: "Generate an image from text",
    type: "logo",
  },
  async (message, query) => {
    try {
      // Ensure the user provides text for the image
      if (!query) {
        return await m.send(
          `*Nikka Logo Maker*\n\n` +
          `❗ Please provide text for the image.\n` +
          `Example: ${prefix}glossy HAKI XER`
        );
      }
//https://api.giftedtech.my.id/api/ephoto360/blackpinklogo?apikey=gifted&text=Gifted%20Tech
      // Build the API URL with the provided text
      const apiUrl = `https://api.giftedtech.my.id/api/ephoto360/glitchtext?apikey=gifted&text=${encodeURIComponent(
        query
      )}`;

      // Call the API and fetch the response
      const response = await fetch(apiUrl);
      const result = await response.json();

      // Check if the API call was successful
      if (!result.success || !result.result || !result.result.image_url) {
        return await m.send("Failed to generate the image. Please try again later.");
      }

      // Extract the image URL
      const imageUrl = result.result.image_url;

      // Send the generated image back to the user
      await context.send(message.jid, {
        image: { url: imageUrl },
        caption: `\n> Logo generated successfully.`,
        contextInfo: {
          externalAdReply: {
            title: "Hi Pookie",
            body: "Powered by Haki",
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



//https://api.giftedtech.my.id/api/ephoto360/glitchtext?apikey=gifted&text=Gifted%20Tech
smd(
  {
    pattern: "glow",
    fromMe: true,
    desc: "Generate an image from text",
    type: "logo",
  },
  async (message, query) => {
    try {
      // Ensure the user provides text for the image
      if (!query) {
        return await m.send(
          `*Nikka Logo Maker*\n\n` +
          `❗ Please provide text for the image.\n` +
          `Example: ${prefix}glossy HAKI XER`
        );
      }
//https://api.giftedtech.my.id/api/ephoto360/blackpinklogo?apikey=gifted&text=Gifted%20Tech
      // Build the API URL with the provided text
      const apiUrl = `https://api.giftedtech.my.id/api/ephoto360/advancedglow?apikey=gifted&text=${encodeURIComponent(
        query
      )}`;

      // Call the API and fetch the response
      const response = await fetch(apiUrl);
      const result = await response.json();

      // Check if the API call was successful
      if (!result.success || !result.result || !result.result.image_url) {
        return await m.send("Failed to generate the image. Please try again later.");
      }

      // Extract the image URL
      const imageUrl = result.result.image_url;

      // Send the generated image back to the user
      await context.send(message.jid, {
        image: { url: imageUrl },
        caption: `\n> Logo generated successfully.`,
        contextInfo: {
          externalAdReply: {
            title: "Hi Pookie",
            body: "Powered by Haki",
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
      await m.send(`An error occurred while generating the image: ${error.message}`);
    }
  }
);

smd(
  {
    pattern: "topo",
    fromMe: true,
    desc: "Generate an image from text",
    type: "logo",
  },
  async (message, query) => {
    try {
      // Ensure the user provides text for the image
      if (!query) {
        return await m.send(
          `*Nikka Logo Maker*\n\n` +
          `❗ Please provide text for the image.\n` +
          `Example: ${prefix}glossy HAKI XER`
        );
      }
//https://api.giftedtech.my.id/api/ephoto360/blackpinklogo?apikey=gifted&text=Gifted%20Tech
      // Build the API URL with the provided text
      const apiUrl = `https://api.giftedtech.my.id/api/ephoto360/typographytext?apikey=gifted&text=${encodeURIComponent(
        query
      )}`;

      // Call the API and fetch the response
      const response = await fetch(apiUrl);
      const result = await response.json();

      // Check if the API call was successful
      if (!result.success || !result.result || !result.result.image_url) {
        return await m.send("Failed to generate the image. Please try again later.");
      }

      // Extract the image URL
      const imageUrl = result.result.image_url;

      // Send the generated image back to the user
      await context.send(message.jid, {
        image: { url: imageUrl },
        caption: `\n> Logo generated successfully.`,
        contextInfo: {
          externalAdReply: {
            title: "Hi Pookie",
            body: "Powered by Haki",
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
      await m.send(`An error occurred while generating the image: ${error.message}`);
    }
  }
);




smd(
  {
    pattern: "pixel",
    fromMe: true,
    desc: "Generate an image from text",
    type: "logo",
  },
  async (message, query) => {
    try {
      // Ensure the user provides text for the image
      if (!query) {
        return await m.send(
          `*Nikka Logo Maker*\n\n` +
          `❗ Please provide text for the image.\n` +
          `Example: ${prefix}glossy HAKI XER`
        );
      }
//https://api.giftedtech.my.id/api/ephoto360/blackpinklogo?apikey=gifted&text=Gifted%20Tech
      // Build the API URL with the provided text
      const apiUrl = `https://api.giftedtech.my.id/api/ephoto360/pixelglitch?apikey=gifted&text=${encodeURIComponent(
        query
      )}`;

      // Call the API and fetch the response
      const response = await fetch(apiUrl);
      const result = await response.json();

      // Check if the API call was successful
      if (!result.success || !result.result || !result.result.image_url) {
        return await m.send("Failed to generate the image. Please try again later.");
      }

      // Extract the image URL
      const imageUrl = result.result.image_url;

      // Send the generated image back to the user
      await context.send(message.jid, {
        image: { url: imageUrl },
        caption: `\n> Logo generated successfully.`,
        contextInfo: {
          externalAdReply: {
            title: "Hi Pookie",
            body: "Powered by Haki",
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
      await mm.send(`An error occurred while generating the image: ${error.message}`);
    }
  }
);


smd(
  {
    pattern: "nigger",
    fromMe: true,
    desc: "Generate an image from text",
    type: "logo",
  },
  async (message, query) => {
    try {
      // Ensure the user provides text for the image
      if (!query) {
        return await m.send(
          `*Nikka Logo Maker*\n\n` +
          `❗ Please provide text for the image.\n` +
          `Example: ${prefix}glossy HAKI XER`
        );
      }
//https://api.giftedtech.my.id/api/ephoto360/blackpinklogo?apikey=gifted&text=Gifted%20Tech
      // Build the API URL with the provided text
      const apiUrl = `https://api.giftedtech.my.id/api/ephoto360/nigerianflag?apikey=gifted&text=${encodeURIComponent(
        query
      )}`;

      // Call the API and fetch the response
      const response = await fetch(apiUrl);
      const result = await response.json();

      // Check if the API call was successful
      if (!result.success || !result.result || !result.result.image_url) {
        return await m.send("Failed to generate the image. Please try again later.");
      }

      // Extract the image URL
      const imageUrl = result.result.image_url;

      // Send the generated image back to the user
      await context.send(message.jid, {
        image: { url: imageUrl },
        caption: `\n> Logo generated successfully.`,
        contextInfo: {
          externalAdReply: {
            title: "Hi Pookie",
            body: "Powered by Haki",
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
      await m.send(`An error occurred while generating the image: ${error.message}`);
    }
  }
);


smd(
  {
    pattern: "neon",
    fromMe: true,
    desc: "Generate an image from text",
    type: "logo",
  },
  async (message, query) => {
    try {
      // Ensure the user provides text for the image
      if (!query) {
        return await m.send(
          `*Nikka Logo Maker*\n\n` +
          `❗ Please provide text for the image.\n` +
          `Example: ${prefix}glossy HAKI XER`
        );
      }
//https://api.giftedtech.my.id/api/ephoto360/blackpinklogo?apikey=gifted&text=Gifted%20Tech
      // Build the API URL with the provided text
      const apiUrl = `https://api.giftedtech.my.id/api/ephoto360/makingneon?apikey=gifted&text=${encodeURIComponent(
        query
      )}`;

      // Call the API and fetch the response
      const response = await fetch(apiUrl);
      const result = await response.json();

      // Check if the API call was successful
      if (!result.success || !result.result || !result.result.image_url) {
        return await m.send("Failed to generate the image. Please try again later.");
      }

      // Extract the image URL
      const imageUrl = result.result.image_url;

      // Send the generated image back to the user
      await context.send(message.jid, {
        image: { url: imageUrl },
        caption: `\n> Logo generated successfully.`,
        contextInfo: {
          externalAdReply: {
            title: "Hi Pookie",
            body: "Powered by Haki",
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
      await m.send(`An error occurred while generating the image: ${error.message}`);
    }
  }
);
