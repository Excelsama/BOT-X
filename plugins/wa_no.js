const moment = require('moment-timezone')
const {fetchJson,smd, tlang,send, shazam, getBuffer, prefix, Config ,groupdb } = require("../lib")
let gis = require("async-g-i-s");
const axios = require('axios')
const fetch = require('node-fetch')
smd({
        pattern: "wano",
        alias: ["oldwa","wano","onwa"],
        category: "tools",
        desc: "Searches in given rage about given number.",
        use: '23470450352xx',
        filename: __filename,
    },
    async(message, text) => {
 if(!text) return await message.reply('Give Me Number without + sign. Example: .iswa 23470450352xx')
        var inputnumber = text.split(" ")[0]
        if (!inputnumber.includes('x')) return message.reply(`*You did not add x*\nExample: iswa 23470450352xx  \n ${Config.caption}`)
        message.reply(`*Searching for WhatsApp account in given range...* \n ${Config.caption}`)

        function countInstances(string, word) {  return string.split(word).length - 1; }
        var number0 = inputnumber.split('x')[0]
        var number1 = inputnumber.split('x')[countInstances(inputnumber, 'x')] ? inputnumber.split('x')[countInstances(inputnumber, 'x')] : ''
        var random_length = countInstances(inputnumber, 'x')
        var randomxx;
        if (random_length == 1) { randomxx = 10 } 
        else if (random_length == 2) { randomxx = 100 } 
        else if (random_length == 3) { randomxx = 1000 }

        text = `*--『 List of Whatsapp Numbers 』--*\n\n`
        var nobio = `\n*Bio:* || \nHey there! I am using WhatsApp.\n`
        var nowhatsapp = `\n*Numbers with no WhatsApp account within provided range.*\n`
        for (let i = 0; i < randomxx; i++) {
            var nu = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
            var status1 = nu[Math.floor(Math.random() * nu.length)]
            var status2 = nu[Math.floor(Math.random() * nu.length)]
            var status3 = nu[Math.floor(Math.random() * nu.length)]
            var dom4 = nu[Math.floor(Math.random() * nu.length)]
            var random;
            if (random_length == 1) { random = `${status1}` } 
            else if (random_length == 2) {random = `${status1}${status2}` } 
            else if (random_length == 3) {random = `${status1}${status2}${status3}` } 
            else if (random_length == 4) {random = `${status1}${status2}${status3}${dom4}` }

            var anu = await message.bot.onWhatsApp(`${number0}${i}${number1}@s.whatsapp.net`);
            var anuu = anu.length !== 0 ? anu : false
            try 
            {
                  try { var anu1 = await message.bot.fetchStatus(anu[0].jid); } 
                  catch { var anu1 = '401' ; }
                  if (anu1 == '401' || anu1.status.length == 0) { nobio += `wa.me/${anu[0].jid.split("@")[0]}\n` ; } 
                  else {  text += `📡 *Number:* wa.me/${anu[0].jid.split("@")[0]}\n *🎈Bio*: ${anu1.status}\nℹ️ *Last update*: ${moment(anu1.setAt).tz(timezone).format('HH:mm:ss DD/MM/YYYY')}\n\n` ;   }
            } catch { nowhatsapp += ` ≛ ${number0}${i}${number1}\n`; }
        }
        return await message.reply(`${text}${nobio}${nowhatsapp}`)

    }
)

