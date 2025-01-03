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

      await m.send("Fetching Chords, please wait... 🎵");

      const apiUrl = `https://api.giftedtech.my.id/api/search/chord?apikey=gifted&query=${encodeURIComponent(query)}`;
      const response = await fetchJson(apiUrl);

      if (!response.ok) {
        return await m.send(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.success || !data.result || !data.result.Chords) {
        return await m.send(`No chords found for "${query}".`);
      }

      const { Artist, Title, Chords } = data.result;
      const message = `*Chords for "${Title}" by ${Artist}:*\n\n${Chords}`;

      await m.send(message);
    } catch (e) {
      await m.error(`An error occurred: ${e.message}`);
    }
  }
);