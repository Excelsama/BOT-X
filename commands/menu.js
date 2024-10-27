
const os = require('os');
const moment = require("moment-timezone");
const Config = require('../config');
let {
  fancytext,
  tlang,
  tiny,
  runtime,
  formatp,
  botpic,
  prefix,
  sck1
} = require("../lib");
const Secktor = require('../lib/commands');

//---------------------------------------------------------------------------
Secktor.cmd({
  'pattern': "help",
  'alias': ["menu"],
  'desc': "Help list",
  'category': "general",
  'react': '⏳',
  'filename': __filename
}, async (_0x37ca48, _0x2395f3, _0x29f0d7) => {
  const {
    commands: _0x4e5075
  } = require('../lib');
  if (_0x29f0d7.split(" ")[0x0]) {
    let _0x223765 = [];
    const _0x187d60 = _0x4e5075.find(_0x643273 => _0x643273.pattern === _0x29f0d7.split(" ")[0x0].toLowerCase());
    if (!_0x187d60) {
      return await _0x2395f3.reply("*😔No Such commands.*");
    } else {
      _0x223765.push("*🍁Command:* " + _0x187d60.pattern);
    }
    if (_0x187d60.category) {
      _0x223765.push("*✨Category:* " + _0x187d60.category);
    }
    if (_0x187d60.alias) {
      _0x223765.push("*⚡️Alias:* " + _0x187d60.alias);
    }
    if (_0x187d60.desc) {
      _0x223765.push("*🗂Description:* " + _0x187d60.desc);
    }
    if (_0x187d60.use) {
      _0x223765.push("*📡Usage:*\n ```" + prefix + _0x187d60.pattern + " " + _0x187d60.use + '```');
    }
    return await _0x2395f3.reply(_0x223765.join("\n"));
  } else {
    const _0x3d2691 = {};
    _0x4e5075.map(async (_0x22b7ed, _0x460315) => {
      if (_0x22b7ed.dontAddCommandList === false && _0x22b7ed.pattern !== undefined) {
        if (!_0x3d2691[_0x22b7ed.category]) {
          _0x3d2691[_0x22b7ed.category] = [];
        }
        _0x3d2691[_0x22b7ed.category].push(_0x22b7ed.pattern);
      }
    });
    const _0x410639 = moment(moment()).format("HH:mm:ss");
    moment.tz.setDefault('Africa/LAGOS').locale('id');
    const _0x41ac33 = moment.tz("Africa/Lagos").format("DD/MM/YYYY");
    let _0x1c1341 = await sck1.countDocuments();
    let _0x2b4ec2 = "┏━━⟪ʙᴏᴛ-x⟫━━⦿\n";
    _0x2b4ec2 += "╭─────────────╮\n│ User: " + _0x2395f3.pushName + "\n│ ᴜɪ: " + tlang().title + "\n│ ᴘʀᴇғɪx: [ " + prefix + " ]\n│ ᴏᴡɴᴇʀ: " + Config.ownername + "\n│ ᴘʟᴜɢɪɴs: " + _0x4e5075.length + "\n│ ᴜsᴇʀs: " + _0x1c1341 + "\n│ Uptime: " + runtime(process.uptime()) + "\n│ ᴍᴇᴍ: " + formatp(os.totalmem() - os.freemem()) + '/' + formatp(os.totalmem()) + "\n│ ᴛɪᴍᴇ: " + _0x410639 + "\n│ ᴅᴀᴛᴇ: " + _0x41ac33 + "\n╰─────────────╯\n\n";
    for (const _0x239ca1 in _0x3d2691) {
      _0x2b4ec2 += "┌── *" + tiny(_0x239ca1) + "* ──┐\n";
      for (const _0x37ca4d of _0x3d2691[_0x239ca1]) {
        _0x2b4ec2 += "│ " + fancytext(_0x37ca4d, 0x1) + "\n";
      }
      _0x2b4ec2 += "└─────────────┘\n\n";
    }
    _0x2b4ec2 += "";
    let _0x386289 = {
      'image': {
        'url': await botpic()
      },
      'caption': _0x2b4ec2
    };
    return await _0x37ca48.sendMessage(_0x2395f3.chat, _0x386289);
  }
});
//---------------------------------------------------------------------------
Secktor.cmd({
  pattern: "list",
  desc: "list menu",
  category: "general"
}, async (Void, citel) => {
  const {
    commands
  } = require('../lib');
  let str = `
┏━━━━━•❃〘 ` + fancytext(Config.ownername.split(' ')[0], 58) + ` 〙❃•━━━━━┓`;
  str += `
┃ ⛥┏━━━━━•❃°•°•━━━━━•❃°•°•      
•͙͙✧⃝•͙ User: ${citel.pushName}
•͙͙✧⃝•͙ Theme: ${tlang().title}
•͙͙✧⃝•͙│ Prefix: ${prefix}
•͙͙✧⃝•͙ Owner: ${Config.ownername}
•͙͙✧⃝•͙ Commands: ${commands.length}
•͙͙✧⃝•͙ Uptime: ${runtime(process.uptime())}
•͙͙✧⃝•͙ Mem: ${formatp(os.totalmem() - os.freemem())}/${formatp(os.totalmem())}
•͙͙✧⃝•͙  
•͙͙✧⃝┗━━━━━•❃°•°•━━━━━•❃°•°•
┗━━━━━•❃°•°•━━━━━•❃°•°•\n`;
  for (let i = 0; i < commands.length; i++) {
    if (commands[i].pattern == undefined) {
      continue;
    }
    str += `✰ ${i + 1} *${fancytext(commands[i].pattern, 1)}*\n`;
    if (commands[i].desc === undefined) {
      commands[i].desc = "";
    }
    str += `✰ ${fancytext(commands[i].desc, 1)}\n`;
  }
  return await Void.sendMessage(citel.chat, {
    image: {
      url: THUMB_IMAGE
    },
    caption: str
  });
});
//---------------------------------------------------------------------------
Secktor.cmd({
  pattern: "owner",
  desc: "To find owner number",
  category: "general",
  react: "👾",
  filename: __filename
}, async (Void, citel) => {
  const Config = require('../config');
  const vcard = "BEGIN:VCARD\nVERSION:3.0\nFN:" + Config.ownername + "\n" + "ORG:;\n" + 'TEL;type=CELL;type=VOICE;waid=' + owner[0] + ':+' + owner[0] + "\n" + 'END:VCARD';
  let buttonMessaged = {
    contacts: {
      displayName: Config.ownername,
      contacts: [{
        vcard
      }]
    },
    contextInfo: {
      externalAdReply: {
        title: Config.ownername,
        body: 'Touch here.',
        renderLargerThumbnail: true,
        thumbnailUrl: ``,
        thumbnail: log0,
        mediaType: 2,
        mediaUrl: '',
        sourceUrl: `https://wa.me/+` + owner[0] + '?text=Hii bro,I am ' + citel.pushName
      }
    }
  };
  return await Void.sendMessage(citel.chat, buttonMessaged, {
    quoted: citel
  });
});
Secktor.cmd({
  pattern: "file",
  desc: "to get extact name where that command is in repo.\nSo user can edit that.",
  category: "general",
  react: "🥷",
  filename: __filename
}, async (Void, citel, text) => {
  const {
    commands
  } = require('../lib');
  let arr = [];
  const cmd = commands.find(cmd => cmd.pattern === text.split(" ")[0].toLowerCase());
  if (!cmd) {
    return await citel.reply("*😔No Such commands.*");
  } else {
    arr.push(`*📡Command:* ${cmd.pattern}`);
  }
  if (cmd.category) {
    arr.push(`*🧩Type:* ${cmd.category}`);
  }
  if (cmd.filename) {
    arr.push(`✨FileName: ${cmd.filename}`);
  }
  return citel.reply(arr.join("\n"));
});
Secktor.cmd({
  pattern: "time",
  desc: "Get the current time in a specified location.",
  react: "⏱",
  catergory: "info"
}, async (Void, citel, text) => {
  try {
    let location = text.slice(5).trim();
    if (!location) {
      throw new Error("Please specify a location after the command.");
    }
    moment.tz.setDefault("Africa/Lagos");
    let formattedTime = moment().format('MMMM Do YYYY, h:mm:ss a z');
    let targetTime;
    try {
      targetTime = moment.tz(location).format('MMMM Do YYYY, h:mm:ss a z');
    } catch (timezoneError) {
      throw new Error(`Invalid timezone: ${location}`);
    }
    await citel.reply(`
╭─────── Time Check! ⏱️ ───────╮
│                               
│ ⏱️ Your Local Time: ${formattedTime} 
│ ${location} Time: ${targetTime} 
│                               
│ *Stay in sync with the world's clocks! With BOT-X*
╰─────── BOT-X ───────╯
    `);
  } catch (error) {
    console.error(error);
    await citel.reply(`
⚠️ **Oops! Time travel error!** ⏳
│                                       │
│ ${error.message}                       │
│ Please check your input and try again. │
╰───────────────────────────────────────╯
    `);
  }
});