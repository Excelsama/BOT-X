const {
  smd,
  fetchJson,
  prefix,
  Config,
} = require("../lib");
const axios = require('axios');
const fs = require('fs');
const path = require('path');

smd({
  pattern: "tt",
  alias: ["tiktokdl"],
  react: "🎥",
  desc: "Downloads video from a TikTok link.",
  category: "downloader",
  filename: __filename,
  use: "<TikTok video URL>"
}, async (_0x2c2023, _0x4ec99f) => {
  try {
    if (!_0x4ec99f) {
      return await _0x2c2023.reply("*_Provide a TikTok video URL_*");
    }

    const videoUrl = _0x4ec99f;

    const apiUrl = `https://nikka-api.us.kg/dl/tiktok?url=${encodeURIComponent(videoUrl)}&apiKey=nikka`;

    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.success && data.url) {
      const videoDownloadUrl = data.url;

      const videoResponse = await axios({
        url: videoDownloadUrl,
        method: 'GET',
        responseType: 'stream'
      });

      const tempFilePath = path.join(__dirname, `${Date.now()}.mp4`);
      const writer = fs.createWriteStream(tempFilePath);

      videoResponse.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      await _0x2c2023.bot.sendMessage(_0x2c2023.jid, {
        video: { url: tempFilePath },
        caption: 'Here is your downloaded TikTok video',
        fileName: `${Date.now()}.mp4`,
        mimetype: "video/mp4"
      }, { quoted: _0x2c2023 });

      fs.unlinkSync(tempFilePath);

    } else {
      await _0x2c2023.reply("*_Error: Could not retrieve the video download URL. Please try again later!_*");
    }
  } catch (_0x86b411) {
    return _0x2c2023.error(_0x86b411 + "\n\ncommand: tt", _0x86b411, "*_Error occurred while processing the command!!_*");
  }
});