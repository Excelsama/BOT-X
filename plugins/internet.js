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
           category: "internet",
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
   category: "internet",
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
    

smd({
            pattern: "image",
            alias: ["img" , "pic","i"],
            category: "internet",
            desc: "Searches Image on Google",
            use: '<text>',
            filename: __filename,
        },
        async(message, match) => {
try{
  let text = match ? match : message.reply_text;
   if (!text) return message.reply(`Provide me a query!\n*Ex : .image Xcelsama |9*
Limit is 9 imgs`)

   let name1 = text.split("|")[0] || text
   let name2 = text.split("|")[1] || `5`


    let nn = parseInt(name2) || 5
    let Group = await groupdb.findOne({ id: message.chat })
    let safe = Group.nsfw == "true" ? "off" : "on"
try{
    let n = await gis(name1, { query: { safe: safe },
        userAgent:  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
      },)
console.log("images results : " , n)

    if(n && n[0]){
    nn = n && n.length > nn ? nn : n.length 
   message.reply(`*_Sending images of '${name1}' in chat!_*`)
    for (let i = 0; i < nn; i++) {
        try{
        let random = Math.floor(Math.random() * n.length)
        message.bot.sendFromUrl(message.jid ,n[random].url,"",message,{},"image" )   
        n.splice(random, 1);
    }catch {}
    }
    return ;
}


}catch(e){console.log("ERROR IN SYNC G>I>S IMAGE PACKAGE\n\t", e)}























   let buttonMessage = {}


    let urlsArray = [];
    const params = {
        q: name1, 
        tbm: "isch",
        hl: "en",
        gl: "in",
        ijn: "0", 
    };
    const headers = {
      "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36",
      "Accept-Encoding": "application/json",
  };

    const res = await axios.get("https://www.google.com/search", { headers: headers, params: params });
    let body = res.data;
    body = body.slice(body.lastIndexOf("AF_initDataCallback"));
    body = body.slice(body.indexOf("["));
    body = body.slice(0, body.indexOf("</script>")-1);
    body = body.slice(0, body.lastIndexOf(","));

    const img = JSON.parse(body);

    const imgObjects = img[56][1][0][0][1][0];

    for (let i = 0; i < name2; i++) {
        if (imgObjects[i] && imgObjects[i][0][0]["444383007"][1]) {
            let url = imgObjects[i][0][0]["444383007"][1][3][0]; // the url
            urlsArray.push(url);
        }
    }

for (let url of urlsArray) { try{ message.bot.sendFromUrl(message.chat ,url,"",message,{},"image" )  }catch {} }



}catch(e){return await message.error(`${e}\n\n command: image`,e,`*_Uhh dear, Didn't get any results!_*`) }
 })
//---------------------------------------------------------------------------
smd({
            pattern: "couplepp",
            category: "internet",
            desc: "Sends two couples pics.",
            filename: __filename,
        },
        async(message) => {
          try{
            let anu = await fetchJson('https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json')
            let random = anu[Math.floor(Math.random() * anu.length)]
            message.reply(random.male, {caption: `*✦Couple Male profile✦*`}, "image")
            message.reply(random.female, {caption: `*✦Couple Female profile✦*`}, "image")
          }catch(e){return await message.error(`${e}\n\n command: couplepp`,e,`*_Uhh dear, Didn't get any results!_*`) }
        }

    ) 