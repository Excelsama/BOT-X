const { fetchJson, smd, send } = require("../lib");

smd(
  {
    pattern: "apk",
    desc: "Search and download APK files based on the user's query.",
    category: "internet",
    filename: __filename,
  },
  async (m) => {
    try {
      const query = m.text.split(" ").slice(1).join(" ");
      if (!query) {
        return await m.send("Please provide an APK name, e.g., `.apk WhatsApp`.");
      }

      await m.send("Fetching APK, please wait... 📦");

      const apiUrl = `https://api.nexoracle.com/downloader/apk?apikey=free_key@maher_apis&q=${encodeURIComponent(query)}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return await m.send(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.success || !data.result || !data.result.link) {
        return await m.send(`No APK found for "${query}".`);
      }

      const { title, description, link } = data.result;
      const message = `*APK Details for "${title}":*\n\n📄 *Description:* ${description}\n\n📥 *Download Link:* ${link}`;

      await m.send(message);
    } catch (e) {
      await m.error(`An error occurred: ${e.message}`);
    }
  }
);