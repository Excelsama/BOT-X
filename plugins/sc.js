const axios = require("axios");
const { cmd } = require("../lib/plugins");
const { smd } = require("../lib");

smd({
  pattern: "sc",
  react: "📁",
  alias: ["repo", "sc", "botx"],
  desc: "Sends info about the WhatsApp bot repository",
  category: "bot",
  filename: __filename
}, async (message) => {
  try {
    const response = await axios.get("https://api.github.com/repos/Excelsama/BOT-X");
    const repoData = response.data;

    let replyMessage = `WhatsApp Bot Repository Info\n\n`;
    replyMessage += `📁Repository Name:${repoData.name}\n`;
    replyMessage += `📖Description:${repoData.description || 'No description available'}\n`;
    replyMessage += `💫Stars:${repoData.stargazers_count}\n`;
    replyMessage += `🍽Forks:${repoData.forks_count}\n`;
    replyMessage += `👀Watchers:${repoData.watchers_count}\n`;
    replyMessage += `🧬Open Issues:${repoData.open_issues_count}\n`;
    replyMessage += `📋License:Proprietary License`;
    replyMessage += `🔗Repository URL:(https://github.com/Excelsama/BOT-X)\n`;

    await message.send(replyMessage);
  } catch (error) {
    await message.error("Error fetching repository info. Please try again later.", error);
  }
});