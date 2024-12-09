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
smd({
            pattern: "infmov",
            category: "internet",
            desc: "sends info of asked movie/series.",
            use: '<text>',
            filename: __filename,
        },
        async(message, match) => {
          try{
            if (!match) return message.reply(`_Name a Series or movie ${tlang().greet}._`);
            let {data} = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${match}&plot=full`);
            if(!data || data.cod == '404') return await message.reply(`*_Please provide valid country name!_*`)

            let imdbt = "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n" + " ``` 𝕀𝕄𝔻𝔹 𝕊𝔼𝔸ℝℂℍ```\n" + "⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n";
            imdbt += "🎬Title      : " + data.Title + "\n";
            imdbt += "📅Year       : " + data.Year + "\n";
            imdbt += "⭐Rated      : " + data.Rated + "\n";
            imdbt += "📆Released   : " + data.Released + "\n";
            imdbt += "⏳Runtime    : " + data.Runtime + "\n";
            imdbt += "🌀Genre      : " + data.Genre + "\n";
            imdbt += "👨🏻‍💻Director   : " + data.Director + "\n";
            imdbt += "✍Writer     : " + data.Writer + "\n";
            imdbt += "👨Actors     : " + data.Actors + "\n";
            imdbt += "📃Plot       : " + data.Plot + "\n";
            imdbt += "🌐Language   : " + data.Language + "\n";
            imdbt += "🌍Country    : " + data.Country + "\n";
            imdbt += "🎖️Awards     : " + data.Awards + "\n";
            imdbt += "📦BoxOffice  : " + data.BoxOffice + "\n";
            imdbt += "🏙️Production : " + data.Production + "\n";
            imdbt += "🌟imdbRating : " + data.imdbRating + "\n";
            imdbt += "❎imdbVotes  : " + data.imdbVotes + "\n\n";
            imdbt += Config.caption ;
            await message.bot.sendUi(message.jid, { caption: imdbt,  },{quoted : message} , "image",data.Poster );
        }catch(e){return await message.error(`${e}\n\n command: ${cmdName}`,e,`*_Uhh dear, Didn't get any results!_*`) }
        }
    )
    //---------------------------------------------------------------------------
smd({
            pattern: "weather",
            category: "info",
            desc: "Sends weather info about asked place.",
            use: '<location>',
            filename: __filename,
        },
        async(message, text) => {
          try{
            if (!text) return message.reply(`*_Give me city name, ${message.isCreator ? "Buddy" : "Idiot"}!!_*`);
            let {data} = await axios.get( `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en`);
            if(!data || data.cod === '404') return await message.reply(`*_Please provide valid city name!_*`)
            let textw = `*🌟Weather of  ${text}*\n\n`;
            textw += `*💐Weather:-* ${data.weather[0].main}\n`;
            textw += `*🌚Description:-* ${data.weather[0].description}\n`;
            textw += `*☁Avg Temp:-* ${data.main.temp}\n`;
            textw += `*💨Feels Like:-* ${data.main.feels_like}\n`;
            textw += `🌪*Pressure:-* ${data.main.pressure}\n`;
            textw += `*🌧Humidity:-* ${data.main.humidity}\n`;
            textw += `*❄Latitude:-* ${data.coord.lat}\n`;
            textw += `*☔Longitude:-* ${data.coord.lon}\n`;
            textw += `*🌍Country:-* ${data.sys.country}\n\n`;
            textw +=Config.caption ;
            message.bot.sendUi(message.jid, { caption: textw, },{quoted : message} ,"text",'true' );

        }catch(e){return await message.error(`${e}\n\n command: weather`,e,`*_Please provide valid city name!_*`) }
        }
    )