const { smd } = require("../lib");

smd(
    {
        pattern: "ss",
        fromMe: true,
        desc: "Take a mobile screenshot of a website",
        type: "search",
    },
    async (message, match, client) => {
        if (!match) {
            return await message.reply("Please provide a website URL to screenshot.");
        }

        const url = match.trim();

        try {
            const screenshotUrl = `https://api.giftedtech.my.id/api/tools/ssphone?apikey=king_haki-k7gjd8@gifted_api&url=${encodeURIComponent(url)}`;
            await message.sendFromUrl(screenshotUrl, "> Powered by nikka botz");
        } catch (error) {
            await message.reply("Failed to generate screenshot. Please ensure the URL is correct or try again later.");
            console.error(error);
        }
    }
);

smd(
    {
        pattern: "webss",
        fromMe: true,
        desc: "Take a pc screenshot of a website",
        type: "search",
    },
    async (message, match, client) => {
        if (!match) {
            return await message.reply("Please provide a website URL to screenshot.");
        }

        const url = match.trim();

        try {
            const screenshotUrl = `https://api.giftedtech.my.id/api/tools/sspc?apikey=king_haki-k7gjd8@gifted_api&url=${encodeURIComponent(url)}`;
            await message.sendFromUrl(screenshotUrl, "> Powered by nikka botz");
        } catch (error) {
            await message.reply("Failed to generate screenshot. Please ensure the URL is correct or try again later.");
            console.error(error);
        }
    }
);


smd(
    {
        pattern: "tabss",
        fromMe: true,
        desc: "Take a tablet screenshot of a website",
        type: "search",
    },
    async (message, match, client) => {
        if (!match) {
            return await message.reply("Please provide a website URL to screenshot.");
        }

        const url = match.trim();

        try {
            const screenshotUrl = `https://api.giftedtech.my.id/api/tools/sstab?apikey=king_haki-k7gjd8@gifted_api&url=${encodeURIComponent(url)}`;
            await message.sendFromUrl(screenshotUrl, "> Powered by nikka botz");
        } catch (error) {
            await message.reply("Failed to generate screenshot. Please ensure the URL is correct or try again later.");
            console.error(error);
        }
    }
);
smd(
  {
    pattern: "wiki",
    fromMe: true,
    desc: "Search Wikipedia and fetch article details",
    type: "search",
  },
  async (message, match) => {
    try {
      if (!match) {
        await message.react("❌️");
        return await message.reply("Please provide a search term.");
      }

      await message.react("⏳️");

      // Parse query and optional limit
      const [query, limit] = match.split(",").map((item) => item.trim());
      const maxResults = limit && !isNaN(limit) ? parseInt(limit) : null;

      // Fetch data from the Wikipedia API
      const response = await getJson(`https://api.giftedtech.my.id/api/search/wikimedia?apikey=gifted&title=${encodeURIComponent(query)}`);

      if (!response || !response.results || response.results.length === 0) {
        await message.react("❌️");
        return await message.reply("No results found for your query.");
      }

      // Limit results if a valid limit is provided
      const results = response.results
        .slice(0, maxResults || response.results.length)
        .map(
          (res, index) => `
📌 **Result ${index + 1}:**
> **Title:** ${res.title || "N/A"}
> **Source:** ${res.source || "N/A"}
        `
        )
        .join("\n\n");

      await message.client.sendMessage(
        message.jid,
        {
          text: `📚 **Wikipedia Search Results:**\n\n${results}`,
        }
      );

      await message.react("✅️");
    } catch (error) {
      console.error("Error in wiki command:", error);
      await message.react("❌️");
      await message.reply("An error occurred while fetching Wikipedia search results.");
    }
  }
);
smd(
  {
    pattern: "google",
    fromMe: true,
    desc: "Search Google and fetch results",
    type: "search",
  },
  async (message, match) => {
    try {
      if (!match) {
        await message.react("❌️");
        return await message.reply("Please provide a search term.");
      }

      await message.react("⏳️");

      // Parse query and optional limit
      const [query, limit] = match.split(",").map((item) => item.trim());
      const maxResults = limit && !isNaN(limit) ? parseInt(limit) : null;

      // Fetch data from the Google Search API
      const response = await getJson(`https://api.giftedtech.my.id/api/search/google?apikey=king_haki-k7gjd8@gifted_api&query=${encodeURIComponent(query)}`);

      if (!response || !response.results || response.results.length === 0) {
        await message.react("❌️");
        return await message.reply("No results found for your query.");
      }

      // Limit results if a valid limit is provided
      const results = response.results
        .slice(0, maxResults || response.results.length)
        .map(
          (res, index) => `
📌 **Result ${index + 1}:**
> **Title:** ${res.title || "N/A"}
> **Link:** ${res.url || "N/A"}
        `
        )
        .join("\n\n");

      await message.client.sendMessage(
        message.jid,
        {
          text: `🌐 **Google Search Results:**\n\n${results}`,
        }
      );

      await message.react("✅️");
    } catch (error) {
      console.error("Error in google command:", error);
      await message.react("❌️");
      await message.reply("An error occurred while fetching Google search results.");
    }
  }
);
smd(
  {
    pattern: "chord",
    fromMe: true,
    desc: "Fetch song lyrics and chords",
    type: "search",
  },
  async (message, match) => {
    try {
      if (!match) {
        await message.react("❌️");
        return await message.reply("Please provide a song name or query.");
      }

      await message.react("⏳️");

      // Fetch data from the Chord API
      const response = await getJson(`https://api.giftedtech.my.id/api/search/chord?apikey=gifted&query=${encodeURIComponent(match)}`);

      if (!response || !response.results) {
        await message.react("❌️");
        return await message.reply("No results found for your query.");
      }

      // Extract required details
      const { title, artist, lyrics } = response.results;

      // Clean up the lyrics
      const cleanedLyrics = lyrics
        .replace(/:\s*/g, "") // Remove colons
        .replace(/\s+/g, " ") // Remove excessive spaces
        .trim();

      // Prepare the response text
      const resultText = `
🎵 **Title:** ${title || "N/A"}
🎤 **Artist:** ${artist || "N/A"}
📜 **Lyrics:**
${cleanedLyrics || "No lyrics available."}
      `;

      await message.client.sendMessage(
        message.jid,
        {
          text: resultText,
        }
      );

      await message.react("✅️");
    } catch (error) {
      console.error("Error in chord command:", error);
      await message.react("❌️");
      await message.reply("An error occurred while fetching the song details.");
    }
  }
);