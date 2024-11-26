const fs = require("fs");
const Config = require("../config");
const { smd } = require("../lib");

function runtime(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

smd(
  {
    pattern: "alive",
    react: "👋",
    desc: "Check bot's status, speed, and latency",
    category: "bot",
    filename: __filename,
  },
  async (message, client) => {
    const start = Date.now();
    await new Promise((resolve) => setTimeout(resolve, 100));
    const latency = Date.now() - start;

    const finalMessage = `
 *BOT-X is Alive!*

*Latency:* ${latency}ms
*Speed: 20000 ms

*=== |📡| BOT-X |📡| ===*
    `;

    const imageUrl = "https://i.ibb.co/pzVmSrZ/Leonardo-Phoenix-create-a-sleek-modern-logo-set-against-a-deep-1.jpg";

    await message.send(imageUrl, { caption: finalMessage }, "img", message);
  }
);

smd(
  {
    pattern: "about",
    react: "ℹ️",
    desc: "Displays important bot and owner information",
    category: "bot",
    filename: __filename,
  },
  async (message) => {
    const owner = "Xcelsama";
    const repoLink = "https://github.com/Xcelsama/BOT-X";
    const uptime = runtime(process.uptime());
    const footer = "*BOT-X*";

    const finalMessage = `
*BOT-X*

*Owner:* ${owner}
*Repository:* ${repoLink}
*Bot Uptime:* ${uptime}

*BOT-X*

${footer}
`;

    const imageUrl = "https://i.ibb.co/pzVmSrZ/Leonardo-Phoenix-create-a-sleek-modern-logo-set-against-a-deep-1.jpg";

    await message.send(imageUrl, { caption: finalMessage }, "img", message);
  }
);

smd(
  {
    pattern: "dev",
    alias: ["xcelsama"],
    react: "🧠",
    desc: "Displays information about the developer",
    category: "bot",
    filename: __filename,
  },
  async (message) => {
    const name = "*Xcelsama*";
    const age = "*15*";
    const occupation = "*Front-end Web Developer*";
    const hobby = "*Gaming*";
    const contact = "*https://wa.me/2347045035241*";
    const footer = "*BOT-X*";

    const finalMessage = `
👤 *Developer Info*

*Name:* ${name}
*Age:* ${age}
*Occupation:* ${occupation}
*Hobby:* ${hobby}
*Contact:* ${contact}

${footer}
    `;

    const imageUrl = "https://i.ibb.co/pzVmSrZ/Leonardo-Phoenix-create-a-sleek-modern-logo-set-against-a-deep-1.jpg";

    await message.send(imageUrl, { caption: finalMessage }, "img", message);
  }
);

