const { fetchJson, smd, send } = require("../lib");

smd(
  {
    pattern: "lyrics",
    desc: "Get song lyrics based on the user's query.",
    category: "internet",
    filename: __filename,
  },
  async (m) => {
    try {
      const query = m.text.split(" ").slice(1).join(" ");
      if (!query) {
        return await m.send("Please provide a song title, e.g., `.lyrics Spectre Alan Walker`.");
      }

      await m.send("Fetching Lyrics, please wait... 🎵");

      const apiUrl = `https://api.giftedtech.my.id/api/search/lyrics?apikey=gifted&query=${encodeURIComponent(query)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.success || !data.result || !data.result.Lyrics) {
        return await m.send(`No lyrics found for "${query}".`);
      }

      const { Artist, Title, Lyrics } = data.result;
      const message = `*Lyrics for "${Title}" by ${Artist}:*\n\n${Lyrics}`;

      await m.send(message);
    } catch (e) {
      await m.error(`An error occurred: ${e.message}`);
    }
  }
);