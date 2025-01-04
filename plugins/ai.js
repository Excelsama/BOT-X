const { fetchJson, smd, send } = require("../lib");

smd(
  {
    pattern: "gpt3",
    desc: "blackbox AI chat",
    category: "internet",
    filename: __filename,
  },
  async (m) => {
    try {
      const query = m.text.split(" ").slice(1).join(" ");
      if (!query) {
        return await m.send("I need a search query.");
      }

      await m.send("Fetching response, please wait...");

      const apiUrl = `https://api.nexoracle.com/ai/chatgpt-v4?apikey=elDrYH7GsuIeBkyw1&prompt=${encodeURIComponent(query)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.result) {
        return await m.send("No valid response received. Please try again later.");
      }

      const message = data.result;

      await m.send(message);
    } catch (e) {
      await m.error(`An error occurred: ${e.message}`);
    }
  }
);