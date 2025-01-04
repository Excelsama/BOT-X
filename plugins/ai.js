const util = require('util');
const fs = require("fs-extra");
const {
  cmd
} = require("../lib/plugins");
const {
  formatp,
  formatDate,
  TelegraPh,
  aitts,
  tlang,
  botpic,
  smd,
  prefix,
  fetchJson,
  runtime,
  Config,
  parsedJid,
  sleep,
  createUrl
} = require("../lib");
const axios = require("axios");
const fetch = require('node-fetch');
const os = require('os');
const speed = require("performance-now");
smd(
    {
        pattern: "gpt3",
        desc: "blackbox AI chat",
        fromMe: isPrivate,
        type: "ai",
    },
    async (message, match) => {
        if (!match) {
            return await message.reply("I need a search query.");
        }

        try {
            // Replace the API endpoint here
            const response = await getJson(`https://api.nexoracle.com/ai/chatgpt-v4?apikey=elDrYH7GsuIeBkyw1&prompt=${encodeURIComponent(match)}`);
            if (response && response.result) {
                // Send only the "result" field
                await message.reply(response.result);
            } else {
                await message.reply("No valid response received. Please try again later.");
            }
        } catch (error) {
            console.error(error);
            await message.reply("An error occurred while processing your request. Please try again.");
        }
    }
);