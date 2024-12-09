const moment = require('moment-timezone')
const {fetchJson,smd, tlang,send, getBuffer, prefix, Config ,groupdb } = require('../lib')
let gis = require("async-g-i-s");
const axios = require('axios')
const fetch = require('node-fetch')

   //---------------------------------------------------------------------------
   const { shazam } = require('../lib')
   let yts = require("secktor-pack");
   smd({
           pattern: "shazam",
           alias :["shazam"],
           category: "Internet",
           react:"🎶", 
           desc: "Finds info about song",
           filename: __filename,
       },
       async(message) => {
         try{
            let mime = message.reply_message ? message.reply_message.mtype : ''
            if (!/audio/.test(mime)) return message.reply(`Reply audio ${prefix}find`);
            let buff = await message.reply_message.download();
            let data = await shazam(buff);
            if (!data || !data.status) return message.send(data);
            let h =`*TITLE: _${data.title}_* \n*ARTIST: _${data.artists}_*\n *ALBUM:* _${data.album}_ `
//   *𝚁𝚎𝚕𝚎𝚊𝚜𝚎:* _${data.release_date}
           await message.bot.sendUi(message.jid, { caption: h,  },{quoted : message} , "text",'true' );
       }catch(e){return await message.error(`${e}\n\n command: find`,e,`*_Didn't get any results, Sorry!_*`) }
})
    //------------------------------------------------------------------------------------
smd({
   pattern: "coffee",
   alias:["tea","tired"],
   category: "Internet",
  react : "☕",
   desc: "send randome coffe img",
   filename: __filename,
},
async(m) => {
 try{
  // m.react("🫡")
   return await m.bot.sendMessage(m.chat, {image: { url: 'https://coffee.alexflipnote.dev/random' },caption: `Here is your Coffee...`, }, { quoted: m })

          }catch(e){return await m.error(`${e}\n\n command: coffe`,e,`*_Didn't get any results, Sorry!_*`) }


   })
//------------------------------------------------------------------------------------
