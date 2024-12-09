const moment = require('moment-timezone')
const {fetchJson,smd, tlang,send, getBuffer, prefix, Config ,groupdb } = require('../lib')
let gis = require("async-g-i-s");
const axios = require('axios')
const fetch = require('node-fetch')

  
    
smd({
         pattern: "npm",
         desc: "download mp4 from url.",
         category: "dev",
         use: '<package name>',
         filename: __filename
     },
     async( message, match) => { 
       try{
         if (!match) return message.reply('Please give me package name.📦')
         const {data} = await axios.get(`https://api.npms.io/v2/search?q=${match}`)
        let txt = data.results.map(({ package: pkg }) => `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`).join('\n\n')?.trim()
          data && txt ? await message.reply(txt) : await message.reply('*No Result Found. Sorry!!*')
          }catch(e){await message.error(`${e}\n\ncommand : npm`, e  )}
     }
 )