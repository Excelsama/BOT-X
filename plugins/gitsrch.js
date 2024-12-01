const moment = require('moment-timezone')
const {fetchJson,smd, tlang,send, shazam, getBuffer, prefix, Config ,groupdb } = require("../lib")
let gis = require("async-g-i-s");
const axios = require('axios')
const fetch = require('node-fetch')
smd({
   pattern: "gitsrch",
   category: "search",
   desc: "Finds info about github users",
   filename: __filename,
},
async(message, match) => {
 try{

   message.react("🔍")
         if (!match) return message.reply(`Give me a user name like ${prefix}github Astropeda`)

         const { data } = await axios(`https://api.github.com/users/${match}`)
   if(!data) return await message.send(`*_Didn't get any results, Provide valid user name!_*`)
   let gitdata =  data
         message.sendMessage(message.jid, {
           image: { url: gitdata.avatar_url }, caption:`ㅤㅤㅤ[ GITHUB USER INFO ]

🚩 Id : ${gitdata.id}
🔖 Nickname : ${gitdata.name}
🔖 Username : ${gitdata.login}
✨ Bio : ${gitdata.bio}
🏢 Company : ${gitdata.company}
📍 Location : ${gitdata.location}
📧 Email : ${gitdata.email}
📰 Blog : ${gitdata.blog}
🔓 Public Repo : ${gitdata.repos_url}
🔐 Public Gists : ${gitdata.gists_url}
💕 Followers : ${gitdata.followers}
👉 Following : ${gitdata.following}
🔄 Updated At : ${gitdata.updated_at}
🧩 Created At : ${gitdata.created_at}`
         }, { quoted: message })

          }catch(e){return await message.error(`${e}\n\n command: github`,e,`*_Didn't get any results, Sorry!_*`) }
   })

//------------------------------------------------------------------------------------k