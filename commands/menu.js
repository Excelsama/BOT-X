const os = require('os');
const moment = require("moment-timezone");
const Config = require("../config");
let { fancytext, tlang, tiny, runtime, formatp, botpic, prefix } = require("../lib");
const Secktor = require("../lib/commands");

Secktor.cmd({
  'pattern': "help",
  'alias': ["menu"],
  'desc': "Help list",
  'category': "general",
  'react': '⏳',
  'filename': __filename
}, async (secktor, msg, args) => {
  const { commands } = require('../lib');
  if (args.split(" ")[0]) {
    let response = [];
    const cmd = commands.find(cmd => cmd.pattern === args.split(" ")[0].toLowerCase());
    if (!cmd) {
      return await msg.reply("*❌ No Such command.*");
    } else {
      response.push(`*Command:* ${cmd.pattern}`);
      if (cmd.category) response.push(`*Category:* ${cmd.category}`);
      if (cmd.alias) response.push(`*Alias:* ${cmd.alias}`);
      if (cmd.desc) response.push(`*Description:* ${cmd.desc}`);
      if (cmd.use) response.push(`*Usage:* \`${prefix}${cmd.pattern} ${cmd.use}\``);
    }
    return await msg.reply(response.join("\n"));
  } else {
    const categories = {};
    commands.forEach(cmd => {
      if (!cmd.dontAddCommandList && cmd.pattern !== undefined) {
        if (!categories[cmd.category]) {
          categories[cmd.category] = [];
        }
        categories[cmd.category].push(cmd.pattern);
      }
    });
    moment.tz.setDefault("Asia/Kolkata").locale('id');
    let menu = `╭────《 ${fancytext(Config.ownername.split(" ")[0], 0x3a)} 》─────⊷\n`;
    menu += '```' + `│ ╭──────────────◆
│ │   :- ${msg.pushName}
│ │  :- 
│ │    :- [ ${prefix} ]
│ │  :- ${Config.ownername}
│ │  ⏰:- ${runtime(process.uptime())}
│ │ , :- ${formatp(os.totalmem() - os.freemem())}/${formatp(os.totalmem())}
│ ╰──────────────◆
╰───────────────⊷\n\n` + "```";
    for (const category in categories) {
      menu += `╭────⭐ *${tiny(category)}* ⭐\n`;
      categories[category].forEach(cmd => {
        menu += `│ ${fancytext(cmd, 1)}\n`;
      });
      menu += "╰━━━━━━━━━━━━━━──⊷\n";
    }
    menu += "⭐┃sᴛᴀʀ  ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ\n\n   ⭐ ";
    const menuMessage = {
      'image': { 'url': await botpic() },
      'caption': menu
    };
    return await secktor.sendMessage(msg.chat, menuMessage);
  }
});

Secktor.cmd({
  'pattern': "owner",
  'desc': "To find owner number",
  'category': "general",
  'react': '',
  'filename': __filename
}, async (secktor, msg) => {
  const config = require("../config");
  const vcard = `BEGIN:VCARD
VERSION:2.0
FN:${config.ownername}
ORG:;
TEL;type=CELL;type=VOICE;waid=${config.owner[0]}:+${config.owner[0]}
END:VCARD`;
  const contactMessage = {
    'contacts': {
      'displayName': config.ownername,
      'contacts': [{ 'vcard': vcard }]
    },
    'contextInfo': {
      'externalAdReply': {
        'title': config.ownername,
        'body': "Touch here.",
        'renderLargerThumbnail': true,
        'thumbnailUrl': '',
        'thumbnail': config.log0,
        'mediaType': 2,
        'mediaUrl': '',
        'sourceUrl': `https://wa.me/${config.owner[0]}?text=Hii bro,I am ${msg.pushName}`
      }
    }
  };
  return await secktor.sendMessage(msg.chat, contactMessage, { 'quoted': msg });
});

Secktor.cmd({
  'pattern': "file",
  'desc': "To get exact name where that command is in repo.\nSo user can edit that.",
  'category': "general",
  'react': '✅',
  'filename': __filename
}, async (secktor, msg, args) => {
  const { commands } = require("../lib");
  let response = [];
  const cmd = commands.find(cmd => cmd.pattern === args.split(" ")[0].toLowerCase());
  if (!cmd) {
    return await msg.reply("*❌ No Such command.*");
  } else {
    response.push(`*Command:* ${cmd.pattern}`);
    if (cmd.category) response.push(`*Type:* ${cmd.category}`);
    if (cmd.filename) response.push(`✨FileName: ${cmd.filename}`);
  }
  return msg.reply(response.join("\n"));
});