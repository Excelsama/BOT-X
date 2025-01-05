const moment = require("moment-timezone");
const {
  fetchJson,
  smd,
  tlang,
  send,
  prefix,
  Config,
  groupdb,
} = require("../lib");
let gis = require("async-g-i-s");
const axios = require("axios");
const fetch = require("node-fetch");
const { shazam } = require("../lib");

smd(
  {
    pattern: "xeather",
    category: "search",
    desc: "Sends weather info about asked place.",
    use: "<location>",
    filename: __filename,
  },
  async (message, text) => {
    try {
      if (!text) {
        return message.reply(
          `*_Give me city name, ${message.isCreator ? "Buddy" : "Idiot"}!!_*`
        );
      }

      const apiUrl = `https://api.nexoracle.com/search/weather?apikey=free_key@maher_apis&city=${encodeURIComponent(text)}`;
      const { data } = await axios.get(apiUrl);

      if (!data || data.cod === "404") {
        return await message.reply(`*_Please provide valid city name!_*`);
      }

      // Convert Unix timestamp to a readable date and time for sunrise and sunset
      const sunrise = new Date(data.result.sys.sunrise * 1000).toLocaleTimeString();
      const sunset = new Date(data.result.sys.sunset * 1000).toLocaleTimeString();
      const timezoneOffset = data.result.timezone / 3600;

      let textw = `*💫Weather of ${text}*\n\n`;
      textw += `*🌥Weather:* ${data.result.weather[0].main}\n`;
      textw += `*🌨Description:* ${data.result.weather[0].description}\n`;
      textw += `*🌩Avg Temp:* ${data.result.main.temp}°C\n`;
      textw += `*🌪Feels Like:* ${data.result.main.feels_like}°C\n`;
      textw += `*⛅️Pressure:* ${data.result.main.pressure} hPa\n`;
      textw += `*🌨Humidity:* ${data.result.main.humidity}%\n`;
      textw += `*🌪Wind Speed:* ${data.result.wind.speed} m/s\n`;
      textw += `*☂️Latitude:* ${data.result.coord.lat}\n`;
      textw += `*☔️Longitude:* ${data.result.coord.lon}\n`;
      
      textw += `*🧷City ID:* ${data.result.id}\n`;
      textw += `*🌗Sunrise:* ${sunrise}\n`;
      textw += `*🌘Sunset:* ${sunset}\n`;
      textw += `*🌌Timezone Offset:* UTC${timezoneOffset >= 0 ? `+${timezoneOffset}` : timezoneOffset}\n`;
      textw += `*🚢Sea Level Pressure:* ${data.result.main.sea_level} hPa\n`;
      textw += `*⛱️Ground Level Pressure:* ${data.result.main.grnd_level} hPa\n\n`;
textw += `*🌍Country:* ${data.result.sys.country}\n`;
      textw += Config.caption;

      message.bot.sendUi(
        message.jid,
        { caption: textw },
        { quoted: message },
        "text",
        "true"
      );
    } catch (e) {
      return await message.error(
        `${e}\n\n command: weather`,
        e,
        `*_Please provide valid city name!_*`
      );
    }
  }
);