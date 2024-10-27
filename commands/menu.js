const os = require('os');
const moment = require("moment-timezone");
const Config = require("../config");
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
const Secktor = require("../lib/commands");
Secktor.cmd({
  'pattern': "help",
  'alias': ["menu"],
  'desc': "Help list",
  'category': "general",
  'react': '⭐',
  'filename': __filename
}, async (_0x41fa70, _0x22e548, _0x44e062) => {
  const {
    commands: _0x547bb5
  } = require('../lib');
  if (_0x44e062.split(" ")[0x0]) {
    let _0x29797f = [];
    const _0x1297b6 = _0x547bb5.find(_0x4f444d => _0x4f444d.pattern === _0x44e062.split(" ")[0x0].toLowerCase());
    if (!_0x1297b6) {
      return await _0x22e548.reply("*❌No Such commands.*");
    } else {
      _0x29797f.push("*🍁Command:* " + _0x1297b6.pattern);
    }
    if (_0x1297b6.category) {
      _0x29797f.push("*🧩Category:* " + _0x1297b6.category);
    }
    if (_0x1297b6.alias) {
      _0x29797f.push("*🧩Alias:* " + _0x1297b6.alias);
    }
    if (_0x1297b6.desc) {
      _0x29797f.push("*🧩Description:* " + _0x1297b6.desc);
    }
    if (_0x1297b6.use) {
      _0x29797f.push("*〽️Usage:*\n ```" + prefix + _0x1297b6.pattern + " " + _0x1297b6.use + "```");
    }
    return await _0x22e548.reply(_0x29797f.join("\n"));
  } else {
    const _0x185d93 = {};
    _0x547bb5.map(async (_0x1563c7, _0x1cde65) => {
      if (_0x1563c7.dontAddCommandList === false && _0x1563c7.pattern !== undefined) {
        if (!_0x185d93[_0x1563c7.category]) {
          _0x185d93[_0x1563c7.category] = [];
        }
        _0x185d93[_0x1563c7.category].push(_0x1563c7.pattern);
      }
    });
    moment.tz.setDefault("Asia/KOLKATA").locale('id');
    let _0x2ce686 = "╭────《 " + fancytext(Config.ownername.split(" ")[0x0], 0x3a) + " 》─────⊷\n";
    _0x2ce686 += '```' + ("│ ╭──────────────◆\n│ │  👤 𝐔𝐬𝐞𝐫:- " + _0x22e548.pushName + "\n│ │  𝐂𝐫𝐞𝐚𝐭𝐨𝐫:- 𝐄𝐗𝐂𝐄𝐋\n│ │  𝐌𝐲  𝐏𝐫𝐞𝐟𝐢𝐱:- [ " + prefix + " ]\n│ │  𝐎𝐰𝐧𝐞𝐫:- " + Config.ownername + "\n│ │  ⏰𝐔𝐩𝐭𝐢𝐦𝐞:- " + runtime(process.uptime()) + "\n│ │ , 📡𝐌𝐞𝐦𝐨𝐫𝐲:- " + formatp(os.totalmem() - os.freemem()) + '/' + formatp(os.totalmem()) + "\n│ ╰──────────────◆\n╰───────────────⊷\n\n") + "```";
    for (const _0x32ef0c in _0x185d93) {
      _0x2ce686 += "╭────⭐ *" + tiny(_0x32ef0c) + "* ⭐\n";
      if (_0x44e062.toLowerCase() == _0x32ef0c.toLowerCase()) {
        _0x2ce686 = "╭─────⭐ *" + tiny(_0x32ef0c) + "* ⭐\n";
        for (const _0x3ce7be of _0x185d93[_0x32ef0c]) {
          _0x2ce686 += "│ " + fancytext(_0x3ce7be, 0x1) + "\n";
        }
        _0x2ce686 += "╰━━━━━━━━━━━━━──⊷\n";
        break;
      } else {
        for (const _0x14efca of _0x185d93[_0x32ef0c]) {
          _0x2ce686 += "│ " + fancytext(_0x14efca, 0x1) + "\n";
        }
        _0x2ce686 += "╰━━━━━━━━━━━━━━──⊷\n";
      }
    }
    _0x2ce686 += "⭐┃sᴛᴀʀ 🌟 ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ\n\n🌟𝙲𝚛𝚎𝚊𝚝𝚎𝚍 𝙱𝚢 𝙴𝚡𝚌𝚎𝚕 ⭐ ";
    let _0x41763e = {
      'image': {
        'url': await botpic()
      },
      'caption': _0x2ce686
    };
    return await _0x41fa70.sendMessage(_0x22e548.chat, _0x41763e);
  }
});
Secktor.cmd({
  'pattern': "list",
  'desc': "list menu",
  'category': 'general'
}, async (_0x17db5e, _0x2cb42d) => {
  const {
    commands: _0xb570e
  } = require("../lib");
  let _0x51fde2 = "\n╭━━〘 " + fancytext(Config.ownername.split(" ")[0x0], 0x3a) + " 〙━━──⊷";
  _0x51fde2 += "\n┃ ⛥╭──────────────      \n┃ ⛥│ User: " + _0x2cb42d.pushName + "\n┃ ⛥│ Theme: " + tlang().title + "\n┃ ⛥│ Prefix: " + prefix + "\n┃ ⛥│ Owner: " + Config.ownername + "\n┃ ⛥│ Commands: " + _0xb570e.length + "\n┃ ⛥│ ⏰𝐔𝐩𝐭𝐢𝐦𝐞: " + runtime(process.uptime()) + "\n┃ ⛥│ Mem: " + formatp(os.totalmem() - os.freemem()) + '/' + formatp(os.totalmem()) + "\n┃ ⛥│  \n┃ ⛥╰───────────\n╰━━━━━━━━━━━──⊷\n";
  for (let _0x32fc98 = 0x0; _0x32fc98 < _0xb570e.length; _0x32fc98++) {
    if (_0xb570e[_0x32fc98].pattern == undefined) {
      continue;
    }
    _0x51fde2 += "╭ " + (_0x32fc98 + 0x1) + " *" + fancytext(_0xb570e[_0x32fc98].pattern, 0x1) + "*\n";
    if (_0xb570e[_0x32fc98].desc = undefined) {
      _0xb570e[_0x32fc98].desc = '';
    }
    _0x51fde2 += "╰➛ " + fancytext(_0xb570e[_0x32fc98].desc, 0x1) + "\n";
  }
  return await _0x17db5e.sendMessage(_0x2cb42d.chat, {
    'image': {
      'url': THUMB_IMAGE
    },
    'caption': _0x51fde2
  });
});
Secktor.cmd({
  'pattern': "owner",
  'desc': "To find 👨‍💻owner number",
  'category': "general",
  'react': '⚔️',
  'filename': __filename
}, async (_0x2d6a3a, _0x5ad307) => {
  const _0x5dd43a = require("../config");
  const _0x42bbad = "BEGIN:VCARD\n🔰VERSION:3.0\nFN:" + _0x5dd43a.ownername + "\n" + "ORG:;\n" + 'TEL;type=CELL;type=VOICE;waid=' + owner[0x0] + ':+' + owner[0x0] + "\n" + "END:VCARD";
  let _0x51aa36 = {
    'contacts': {
      'displayName': _0x5dd43a.ownername,
      'contacts': [{
        'vcard': _0x42bbad
      }]
    },
    'contextInfo': {
      'externalAdReply': {
        'title': _0x5dd43a.ownername,
        'body': "Touch here.",
        'renderLargerThumbnail': true,
        'thumbnailUrl': '',
        'thumbnail': log0,
        'mediaType': 0x2,
        'mediaUrl': '',
        'sourceUrl': 'https://wa.me/+' + owner[0x0] + "?text=Hii bro,I am " + _0x5ad307.pushName
      }
    }
  };
  return await _0x2d6a3a.sendMessage(_0x5ad307.chat, _0x51aa36, {
    'quoted': _0x5ad307
  });
});
Secktor.cmd({
  'pattern': "file",
  'desc': "to get extact name where that command is in repo.\nSo user can edit that.",
  'category': "general",
  'react': '✅',
  'filename': __filename
}, async (_0x20f3fd, _0x4d0179, _0x332fad) => {
  const {
    commands: _0x1fd1a0
  } = require("../lib");
  let _0x5f3515 = [];
  const _0x57258d = _0x1fd1a0.find(_0x446063 => _0x446063.pattern === _0x332fad.split(" ")[0x0].toLowerCase());
  if (!_0x57258d) {
    return await _0x4d0179.reply("*❌No Such commands.*");
  } else {
    _0x5f3515.push("*🍁Command:* " + _0x57258d.pattern);
  }
  if (_0x57258d.category) {
    _0x5f3515.push("*🧩Type:* " + _0x57258d.category);
  }
  if (_0x57258d.filename) {
    _0x5f3515.push("✨FileName: " + _0x57258d.filename);
  }
  return _0x4d0179.reply(_0x5f3515.join("\n"));
});