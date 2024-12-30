const { fetchJson, smd, send } = require("../lib");

smd(
  {
    pattern: "messi",
    desc: "Get a random Messi image.",
    category: "fun",
    filename: __filename,
  },
  async (m) => {
    try {
      await m.send("Fetching a Messi image, please wait... ⚽");

      const apiUrl = `https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/Messi.json`;
      const data = await fetchJson(apiUrl);

      if (!Array.isArray(data) || data.length === 0) {
        return await m.send("No Messi images found.");
      }

      const randomUrl = data[Math.floor(Math.random() * data.length)];
      await send(m.chat, { url: randomUrl }, { caption: "*Messi*" });
    } catch (e) {
      await send(m.chat, `An error occurred: ${e.message}`);
    }
  }
);