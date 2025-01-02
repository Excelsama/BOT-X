const {
   smd
} = require('../lib')
smd({
   cmdname: "messi",
   desc: "Send img of messi",
   type: "misc",
   filename: __filename,
},
   async (m) => {
      try {
         const fetch = require("node-fetch");
         let res = await fetch('https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/Messi.json')
         let json = await res.json()
         if (json.status) return await m.reply("*Request Denied!*")
         m.bot.sendFileUrl(m.jid, json.url, "", m, { author: "BOT-X" }, "Image");

      } catch (e) { m.error(`${e}\n\nCommand: messi`, e, false) }
   })