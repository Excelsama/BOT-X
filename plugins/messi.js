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
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        return await m.send("No Messi images found.");
      }

      const randomUrl = data[Math.floor(Math.random() * data.length)];
      await m.sendFile(m.chat, randomUrl, "messi.jpg", "*Messi*");
    } catch (e) {
      await m.error(`An error occurred: ${e.message}`);
    }
  }
);