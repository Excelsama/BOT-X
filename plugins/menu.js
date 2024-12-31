
 

const os = require('os');
const fs = require("fs");
const Config = require('../config');
let {
  fancytext,
  tlang,
  tiny,
  bot_,
  alive,
  runtime,
  formatp,
  smsg,
  getAdmin,
  send,
  react,
  botpic,
  sleep,
  getBuffer,
  prefix,
  sck1,
  smd,
  sck,
  getTime,
  formatDate,
  groupdb,
  smdJson,
  smdBuffer,
  isAdmin
} = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const sᴜʜᴀɪʟ_ᴍᴅ = require('../lib/plugins');
const {
  Sticker,
  createSticker,
  StickerTypes
} = require("wa-sticker-formatter");
const util = require("util");
const {
  commands
} = require('../lib');
const {
  exec
} = require("child_process");
const translatte = require("translatte");
const cron = require('node-cron');
var cronStart = false;

/*
let "USER_IMAGES" = {
      "description": "Put IMAGES/VIDEOS URL, Make Sure Url have extention like .mp4,.jpg,.png etc",
      "value": "https://telegra.ph/file/d90855d13352c8aae3981.mp4",
      "required" :false
    },
*/
smd({
  'cmdname': "help",
  'alias': ['categories', "ctgry", "category"],
  'desc': "category list",
  'category': "general"
}, async (_0x1cd669, _0x57de2c) => {
  try {
    if (_0x57de2c.split(" ")[0x0]) {
      let _0x230969 = [];
      const _0x442b40 = commands.find(_0x3aa129 => _0x3aa129.pattern === _0x57de2c.split(" ")[0x0].toLowerCase());
      if (_0x442b40) {
        _0x230969.push("*🍁Command:* " + _0x442b40.pattern);
        if (_0x442b40.category) {
          _0x230969.push("*🧩Category:* " + _0x442b40.category);
        }
        if (_0x442b40.alias && _0x442b40.alias[0x0]) {
          _0x230969.push("*🧩Alias:* " + _0x442b40.alias.join(", "));
        }
        if (_0x442b40.desc) {
          _0x230969.push("*🧩Description:* " + _0x442b40.desc);
        }
        if (_0x442b40.use) {
          _0x230969.push("*〽️Usage:*\n ```" + prefix + _0x442b40.pattern + " " + _0x442b40.use + "```");
        }
        await _0x1cd669.reply(_0x230969.join("\n"));
      }
    }
    const _0x28c18d = {};
    commands.map(async (_0x464ff0, _0x5d772f) => {
      if (_0x464ff0.dontAddCommandList === false && _0x464ff0.pattern !== undefined) {
        if (!_0x28c18d[_0x464ff0.category]) {
          _0x28c18d[_0x464ff0.category] = [];
        }
        _0x28c18d[_0x464ff0.category].push(_0x464ff0.pattern);
      }
    });
    let _0x215db1 = Math.round(Math.random());
    let _0x20a361 = _0x215db1 === 0x0 ? "MENU" : "COMMANDS";
    let _0x243b31 = "┏━━━━━━━━━━━━━━━━━━━━━━━━\n┃\t *SUHAIL-MD_" + _0x20a361 + "_LIST* \n┗━━━━━━━━━━━━━━━━━━━━━━━━\n\n\t```Reply the number you wants to select```\n\n";
    let _0x3fc923 = 0x1;
    let _0x552046 = 0x0;
    for (const _0x1fe062 in _0x28c18d) {
      _0x552046 += 0x1;
      if (_0x57de2c.toLowerCase() == _0x1fe062.toLowerCase()) {
        _0x243b31 = "┏━━⟪ *" + _0x1fe062.toUpperCase() + "* ⟫━━⦿\n\n";
        for (const _0x1235bb of _0x28c18d[_0x1fe062]) {
          _0x243b31 += "┃ ✗ " + fancytext(_0x1235bb, 0x1) + "\n";
        }
        _0x243b31 += "\n┗━━━━━━━━━━━━━━⦿";
        break;
      }
      if (_0x552046 >= 0xa) {
        _0x3fc923 += 0x1;
        _0x552046 = 0x0;
      }
      _0x243b31 += "\n*" + _0x3fc923 + '.' + _0x552046 + " |" + _0x1fe062.toUpperCase() + " " + _0x20a361 + "*\n";
    }
    ;
    _0x243b31 += "\n\n" + Config.caption;
    return await _0x1cd669.sendUi(_0x1cd669.jid, {
      'caption': _0x243b31
    });
  } catch (_0x21597) {
    await _0x1cd669.error(_0x21597 + "\nCommand:help", _0x21597);
  }
});
smd({
  'pattern': "menus",
  'type': "MENU list",
  'info': "general",
  'dontAddCommandList': true
}, async _0x22514a => {
  try {
    let _0x20ed34 = ("\n*🦄 ᴜᴘ ᴛɪᴍᴇ :* " + runtime(process.uptime()) + "\n*🍁 ᴛᴏᴅᴀʏ ɪs :* " + _0x22514a.date + "\n*🎗 ɴᴏᴡ ᴛɪᴍᴇ :* " + _0x22514a.time + "\n\n➮Fᴏᴜɴᴅᴇʀ- SuhailTechInfo𝛁\n➮Oᴡɴᴇʀ - " + Config.ownername + "\n➮Nᴜᴍ - " + owner.split(',')[0x0] + "\n➮Mᴇᴍᴏ - " + formatp(os.totalmem() - os.freemem()) + '/' + formatp(os.totalmem()) + "\n\n *🧑‍💻 :*  Sᴜʜᴀɪʟ-Mᴜʟᴛɪᴅᴇᴠɪᴄᴇ ɪꜱ ɴᴏᴡ Aᴠᴀɪʟᴀʙʟᴇ\n\n" + readmore + "\n╭──❰ *ALL MENU* ❱\n│🏮 Lɪꜱᴛ\n│🏮 Cᴀᴛᴇɢᴏʀʏ\n│🏮 Hᴇʟᴘ\n│🏮 Aʟɪᴠᴇ\n│🏮 Uᴘᴛɪᴍᴇ\n│🏮 Wᴇᴀᴛʜᴇʀ\n│🏮 Lɪɴᴋ\n│🏮 Cᴘᴜ\n│🏮 Rᴇᴘᴏꜱɪᴛᴏʀʏ\n╰─────────────⦁").trim();
    return await _0x22514a.bot.sendUi(_0x22514a.from, {
      'caption': _0x20ed34
    });
  } catch (_0x450fce) {
    await _0x22514a.error(_0x450fce + "\nCommand:menus", _0x450fce);
  }
});
sᴜʜᴀɪʟ_ᴍᴅ.cmd({
  'pattern': "setcmd",
  'desc': "To check ping",
  'category': "general",
  'fromMe': true,
  'filename': __filename
}, async (_0x5d887, _0x291296, {
  Void: _0x43ee74
}) => {
  try {
    if (!_0x291296) {
      return await _0x5d887.send("*_Please provide cmd name by replying a Sticker_*");
    }
    let _0x584a9e = _0x291296.split(',');
    var _0x5b0dfd;
    var _0x3be11d;
    let _0x17bd8a = false;
    if (_0x5d887.quoted) {
      let _0x1f29ea = _0x5d887.quoted.mtype;
      if (_0x1f29ea == "stickerMessage" && _0x291296) {
        _0x17bd8a = true;
        _0x5b0dfd = _0x291296.split(" ")[0x0];
        _0x3be11d = 'sticker-' + _0x5d887.quoted.msg.fileSha256;
      }
    }
    if (!_0x17bd8a && _0x584a9e.length > 0x1) {
      _0x3be11d = _0x584a9e[0x0].trim().toLowerCase();
      _0x5b0dfd = _0x584a9e[0x1].trim().toLowerCase();
    } else {
      if (!_0x17bd8a) {
        return await _0x5d887.send("*_Uhh Dear, Give Cmd With New Name_*\n*Eg: _.setcmd New_Name, Cmd_Name_*");
      }
    }
    if (_0x3be11d.length < 0x1) {
      return await _0x5d887.reply("*_Uhh Please, Provide New_Cmd Name First_*");
    }
    if (global.setCmdAlias[_0x3be11d]) {
      return await _0x5d887.send("*_\"" + (_0x17bd8a ? "Given Sticker" : _0x3be11d) + "\" Already set for \"" + global.setCmdAlias[_0x3be11d] + "\" Cmd, Please try another " + (_0x17bd8a ? 'Sticker' : "Name") + '_*');
    }
    const _0x8e739e = sᴜʜᴀɪʟ_ᴍᴅ.commands.find(_0xd9686c => _0xd9686c.pattern === _0x5b0dfd) || sᴜʜᴀɪʟ_ᴍᴅ.commands.find(_0x31fef3 => _0x31fef3.alias && _0x31fef3.alias.includes(_0x5b0dfd));
    if (_0x8e739e) {
      global.setCmdAlias[_0x3be11d] = _0x8e739e.pattern;
      return await _0x5d887.send("*_Cmd \"" + global.setCmdAlias[_0x3be11d] + "\" Succesfully set to \"" + (_0x17bd8a ? "Sticker" : _0x3be11d) + "\"._*\n*_These all names are reset, If bot restart_*");
    } else {
      return await _0x5d887.send("*_Provided Cmd( " + _0x5b0dfd + ") not found in bot cmds. Please Provide Valid cmd Name_*");
    }
  } catch (_0x13e052) {
    await _0x5d887.error(_0x13e052 + "\nCommand:setcmd", _0x13e052);
  }
});
sᴜʜᴀɪʟ_ᴍᴅ.cmd({
  'pattern': "delcmd",
  'desc': "To check ping",
  'category': 'general',
  'fromMe': true,
  'filename': __filename
}, async (_0xcfb3ed, _0x5c72db, {
  Void: _0x5c00fc
}) => {
  try {
    let _0xf7499f = _0x5c72db ? _0x5c72db.split(" ")[0x0].trim().toLowerCase() : '';
    let _0x5dd184 = false;
    if (_0xcfb3ed.quoted) {
      if (_0xcfb3ed.quoted.mtype == "stickerMessage") {
        _0x5dd184 = true;
        _0xf7499f = "sticker-" + _0xcfb3ed.quoted.msg.fileSha256;
      } else {
        if (!_0x5c72db) {
          return await _0xcfb3ed.send("*_Please reply to a Sticker that set for a Cmd_*");
        }
      }
    } else {
      if (!_0x5c72db) {
        return await _0xcfb3ed.send("*_Uhh Dear, provide Name that set to a cmd_*\n*Eg: _.delcmd Cmd_Name_*");
      }
    }
    if (global.setCmdAlias[_0xf7499f]) {
      await _0xcfb3ed.send("*_\"" + (_0x5dd184 ? "Given Sticker" : _0xf7499f) + "\" deleted Succesfully at \"" + global.setCmdAlias[_0xf7499f] + "\" cmd_*");
      delete global.setCmdAlias[_0xf7499f];
      return;
    } else {
      return await _0xcfb3ed.send("*_\"" + (_0x5dd184 ? "Given Sticker" : _0xf7499f) + "\" not Set for any cmd._*\n *_Please Provide Valid " + (_0x5dd184 ? "Sticker" : "cmd Name") + " to delete_*");
    }
  } catch (_0x2252fb) {
    await _0xcfb3ed.error(_0x2252fb + "\nCommand:delcmd", _0x2252fb);
  }
});
sᴜʜᴀɪʟ_ᴍᴅ.smd({
  'pattern': "ping",
  'desc': "To check ping",
  'category': "general",
  'filename': __filename
}, async _0x2c4176 => {
  var _0x2d08de = new Date().getTime();
  const {
    key: _0x598979
  } = await _0x2c4176.reply("*Testing Ping!!!*");
  var _0x41515f = new Date().getTime();
  return await _0x2c4176.send("*Pong*\n *" + (_0x41515f - _0x2d08de) + " ms* ", {
    'edit': _0x598979
  }, '', _0x2c4176);
});
sᴜʜᴀɪʟ_ᴍᴅ.cmd({
  'pattern': "uptime",
  'alias': ["runtime"],
  'desc': "Tells runtime/uptime of bot.",
  'category': "misc",
  'filename': __filename
}, async _0x50127f => {
  try {
    _0x50127f.reply("*_Uptime of " + tlang().title + ": " + runtime(process.uptime()) + '_*');
  } catch (_0x5ed240) {
    await _0x50127f.error(_0x5ed240 + "\n\ncommand : uptime", _0x5ed240, false);
  }
});
sᴜʜᴀɪʟ_ᴍᴅ.cmd({
  'cmdname': "menu",
  'desc': "Help list",
  'type': "general",
  'filename': __filename
}, async (_0xd2266a, _0x54954a) => {
  try {
    const {
      commands: _0x4f1da9
    } = require("../lib");
    if (_0x54954a.split(" ")[0x0]) {
      let _0x35206d = [];
      const _0xd17d83 = _0x4f1da9.find(_0x3cf852 => _0x3cf852.pattern === _0x54954a.split(" ")[0x0].toLowerCase());
      if (_0xd17d83) {
        _0x35206d.push("*🍁Command:* " + _0xd17d83.pattern);
        if (_0xd17d83.category) {
          _0x35206d.push("*🧩Category:* " + _0xd17d83.category);
        }
        if (_0xd17d83.alias && _0xd17d83.alias[0x0]) {
          _0x35206d.push("*🧩Alias:* " + _0xd17d83.alias.join(", "));
        }
        if (_0xd17d83.desc) {
          _0x35206d.push("*🧩Description:* " + _0xd17d83.desc);
        }
        if (_0xd17d83.use) {
          _0x35206d.push("*〽️Usa:*\n ```" + prefix + _0xd17d83.pattern + " " + _0xd17d83.use + "```");
        }
        if (_0xd17d83.usage) {
          _0x35206d.push("*〽️Usage:*\n ```" + _0xd17d83.usage + "```");
        }
        await _0xd2266a.reply(_0x35206d.join("\n"));
      }
    }
    var _0x2a8461;
    var _0x2c3e5e;
    var _0x44b88b;
    var _0x10e1a7;
    var _0x8fdfd;
    var _0x1a5728;
    var _0x50e224;
    let _0x43d142 = 0x0;
    if (Config.menu === '') {
      _0x43d142 = Math.floor(Math.random() * 0x4) + 0x1;
    }
    if (_0x43d142 == 0x1 || Config.menu.trim().startsWith('1') || Config.menu.toLowerCase().includes('aztec')) {
      _0x2a8461 = "┏━━⟪ *" + Config.botname + "* ⟫━━⦿";
      _0x2c3e5e = "┃ ✗";
      _0x44b88b = "┗━━━━━━━━━━━━━━━⦿";
      _0x10e1a7 = '┌──『';
      _0x8fdfd = "』──❖\n";
      _0x1a5728 = " | ";
      _0x50e224 = "\n└──────────────◉";
    } else if (_0x43d142 == 0x2 || Config.menu.trim().startsWith('2') || Config.menu.toLowerCase().includes("a17")) {
      _0x2a8461 = "┌───═[ *" + Config.botname + "* ]═──▸\n│╭────────────···▸\n┴│▸";
      _0x2c3e5e = "⬡│▸";
      _0x44b88b = "┬│▸\n│╰─────────────···▸\n└───────────────···▸";
      _0x10e1a7 = '┌───〈';
      _0x8fdfd = "〉───◆\n│╭─────────────···▸\n┴│▸";
      _0x1a5728 = "⬡│▸ ";
      _0x50e224 = "┬│▸\n│╰────────────···▸▸\n└───────────────···▸";
    } else {
      _0x2a8461 = "╭────《  " + Config.botname + "  》────⊷\n│ ╭──────✧❁✧──────◆";
      _0x2c3e5e = "│ │";
      _0x44b88b = "│ ╰──────✧❁✧──────◆\n╰══════════════════⊷";
      _0x10e1a7 = '╭────❏';
      _0x8fdfd = '❏';
      _0x1a5728 = '│';
      _0x50e224 = "╰━━━━━━━━━━━━━━──⊷";
    }
    const _0x376e27 = {};
    _0x4f1da9.map(async (_0x3b0442, _0x3e603e) => {
      if (_0x3b0442.dontAddCommandList === false && _0x3b0442.pattern !== undefined) {
        if (!_0x376e27[_0x3b0442.category]) {
          _0x376e27[_0x3b0442.category] = [];
        }
        _0x376e27[_0x3b0442.category].push(_0x3b0442.pattern);
      }
    });
    const _0x1b2e30 = _0xd2266a.time;
    const _0x35bd69 = _0xd2266a.date;
    let _0x192602 = _0x2a8461 + "\n" + _0x2c3e5e + " Theme:- " + tlang().title + "\n" + _0x2c3e5e + " Owner:- " + Config.ownername + "\n" + _0x2c3e5e + " Plugins:- " + _0x4f1da9.length + "\n" + _0x2c3e5e + " Uptime:- " + runtime(process.uptime()) + "\n" + _0x2c3e5e + " Mem:- " + formatp(os.totalmem() - os.freemem()) + '/' + formatp(os.totalmem()) + "\n" + _0x2c3e5e + " Time:- " + _0x1b2e30 + "\n" + _0x2c3e5e + " Date:- " + _0x35bd69 + "\n" + _0x44b88b + "\n\n";
    for (const _0x2745af in _0x376e27) {
      _0x192602 += _0x10e1a7 + " *" + tiny(_0x2745af) + "* " + _0x8fdfd + "\n";
      if (_0x54954a.toLowerCase() == _0x2745af.toLowerCase()) {
        _0x192602 = _0x10e1a7 + " *" + tiny(_0x2745af) + "* " + _0x8fdfd + "\n";
        for (const _0x375619 of _0x376e27[_0x2745af]) {
          _0x192602 += _0x1a5728 + " " + fancytext(_0x375619, 0x1) + "\n";
        }
        _0x192602 += _0x50e224 + "\n";
        break;
      } else {
        for (const _0x3d11d4 of _0x376e27[_0x2745af]) {
          _0x192602 += _0x1a5728 + " " + fancytext(_0x3d11d4, 0x1) + "\n";
        }
        _0x192602 += _0x50e224 + "\n";
      }
    }
    _0x192602 += Config.caption;
    let _0x2ca50e = {
      'caption': _0x192602
    };
    return await _0xd2266a.sendUi(_0xd2266a.chat, _0x2ca50e, _0xd2266a);
  } catch (_0x323e96) {
    await _0xd2266a.error(_0x323e96 + "\nCommand:menu", _0x323e96);
  }
});
sᴜʜᴀɪʟ_ᴍᴅ.cmd({
  'pattern': "list",
  'desc': "list menu",
  'category': "general",
  'react': '🥀'
}, async _0x1d5ddc => {
  try {
    const {
      commands: _0x7cfe13
    } = require("../lib");
    let _0x95885d = "\n  ╭━━〘 *" + Config.botname + "* 〙────⊷     \n  ┃ ✭ Theme: " + tlang().title + "\n  ┃ ✭ Prefix: " + prefix + "\n  ┃ ✭ Owner: " + Config.ownername + "\n  ┃ ✭ Commands: " + _0x7cfe13.length + "\n  ┃ ✭ Uptime: " + runtime(process.uptime()) + "\n  ┃ ✭ Mem: " + formatp(os.totalmem() - os.freemem()) + '/' + formatp(os.totalmem()) + "\n  ╰━━━━━━━━━━━━━━⊷\n";
    for (let _0x2bd72c = 0x0; _0x2bd72c < _0x7cfe13.length; _0x2bd72c++) {
      if (_0x7cfe13[_0x2bd72c].pattern == undefined) {
        continue;
      }
      _0x95885d += '*' + (_0x2bd72c + 0x1) + " " + fancytext(_0x7cfe13[_0x2bd72c].pattern, 0x1) + "*\n";
      _0x95885d += "  " + fancytext(_0x7cfe13[_0x2bd72c].desc, 0x1) + "\n";
    }
    return await _0x1d5ddc.sendUi(_0x1d5ddc.chat, {
      'caption': _0x95885d + Config.caption
    });
  } catch (_0x3e730d) {
    await _0x1d5ddc.error(_0x3e730d + "\nCommand:list", _0x3e730d);
  }
});
sᴜʜᴀɪʟ_ᴍᴅ.smd({
  'pattern': "owner",
  'desc': "To check ping",
  'category': 'general',
  'filename': __filename
}, async _0x563719 => {
  try {
    const _0x389599 = "BEGIN:VCARD\nVERSION:3.0\nFN:" + Config.ownername + "\n" + "ORG:;\n" + 'TEL;type=CELL;type=VOICE;waid=' + global.owner?.["split"](',')[0x0] + ':+' + global.owner?.["split"](',')[0x0] + "\n" + "END:VCARD";
    let _0x140248 = {
      'contacts': {
        'displayName': Config.ownername,
        'contacts': [{
          'vcard': _0x389599
        }]
      },
      'contextInfo': {
        'externalAdReply': {
          'title': Config.ownername,
          'body': "Touch here.",
          'renderLargerThumbnail': true,
          'thumbnailUrl': '',
          'thumbnail': log0,
          'mediaType': 0x1,
          'mediaUrl': '',
          'sourceUrl': 'https://wa.me/+' + global.owner?.['split'](',')[0x0] + '?text=Hii+' + Config.ownername
        }
      }
    };
    return await _0x563719.sendMessage(_0x563719.jid, _0x140248, {
      'quoted': _0x563719
    });
  } catch (_0x26ce8b) {
    await _0x563719.error(_0x26ce8b + "\nCommand:owner", _0x26ce8b);
  }
});
sᴜʜᴀɪʟ_ᴍᴅ.cmd({
  'pattern': "trt",
  'alias': ["translate"],
  'category': "general",
  'filename': __filename,
  'use': "< text >",
  'desc': "Translate's given text in desird language."
}, async (_0x15cc76, _0xa38a39) => {
  try {
    let _0x4b3f03 = _0xa38a39 ? _0xa38a39.split(" ")[0x0].toLowerCase() : 'en';
    if (!_0x15cc76.reply_text) {
      var _0x5eb566 = _0xa38a39.replace(_0x4b3f03, '')?.["trim"]() || false;
    } else {
      var _0x5eb566 = _0x15cc76.reply_text;
    }
    if (!_0x5eb566) {
      return await _0x15cc76.reply("*Please Give Me Text. Example: _" + prefix + "trt en Who are you_*");
    }
    var _0x443df8 = await translatte(_0x5eb566, {
      'from': "auto",
      'to': _0x4b3f03
    });
    if ("text" in _0x443df8) {
      return await _0x15cc76.reply(_0x443df8.text);
    }
  } catch (_0xfe5ca7) {
    await _0x15cc76.error(_0xfe5ca7 + "\n\ncommand trt", _0xfe5ca7);
  }
});
const readDirectory = _0x2ccc1f => {
  return new Promise((_0x23d4da, _0x41ae43) => {
    fs.readdir(_0x2ccc1f, (_0x4adeb4, _0x1ec69) => {
      if (_0x4adeb4) {
        _0x41ae43("Error reading directory");
      } else {
        _0x23d4da(_0x1ec69);
      }
    });
  });
};
sᴜʜᴀɪʟ_ᴍᴅ.cmd({
  'pattern': 'file',
  'desc': "to get extact name where that command is in repo.\nSo user can edit that.",
  'category': "general",
  'fromMe': true,
  'filename': __filename
}, async (_0x1ec907, _0x3f7dbe) => {
  try {
    if (!_0x3f7dbe) {
      return _0x1ec907.reply("*Uhh PLease, Provide A Command/Directory*");
    }
    if (_0x3f7dbe.startsWith('.')) {
      let _0x4680aa = "*------------- FILE MANAGER -------------*\n";
      try {
        const _0x297689 = await readDirectory(_0x3f7dbe);
        _0x297689.forEach(_0x1709d6 => {
          _0x4680aa += _0x1709d6 + "\n";
        });
        await _0x1ec907.reply(_0x4680aa.toString());
      } catch (_0x311055) {
        _0x1ec907.reply(_0x311055);
      }
      return;
    }
    let _0x2c8ec8 = [];
    let _0x4984d5 = _0x3f7dbe.split(" ")[0x0].toLowerCase().trim();
    let _0x1df566 = sᴜʜᴀɪʟ_ᴍᴅ.commands.find(_0x3d28be => _0x3d28be.pattern === _0x4984d5) || sᴜʜᴀɪʟ_ᴍᴅ.commands.find(_0x14526a => _0x14526a.alias && _0x14526a.alias.includes(_0x4984d5));
    if (!_0x1df566) {
      return await _0x1ec907.reply("*❌No Such commands.*");
    }
    _0x2c8ec8.push("*🍁Command:* " + _0x1df566.pattern);
    if (_0x1df566.category) {
      _0x2c8ec8.push("*🧩Type:* " + _0x1df566.category);
    }
    if (_0x1df566.alias && _0x1df566.alias[0x0]) {
      _0x2c8ec8.push("*🧩Alias:* " + _0x1df566.alias.join(", "));
    }
    if (_0x1df566.desc) {
      _0x2c8ec8.push("*✨Description:* " + _0x1df566.desc);
    }
    if (_0x1df566.use) {
      _0x2c8ec8.push("*〽️Usa:*\n ```" + prefix + _0x1df566.pattern + " " + _0x1df566.use + "```");
    }
    if (_0x1df566.usage) {
      _0x2c8ec8.push("*〽️Usage:*\n ```" + _0x1df566.usage + "```");
    }
    if (_0x1df566.filename) {
      _0x2c8ec8.push("*✨FileName:* " + _0x1df566.filename);
    }
    try {
      if (_0x3f7dbe.includes("function") && _0x1df566["function"] && _0x1ec907.isSuhail && _0x1df566.pattern !== 'file') {
        _0x2c8ec8.push("*🧩Function:* " + _0x1df566["function"].toString());
      }
    } catch {}
    await _0x1ec907.reply(_0x2c8ec8.join("\n"));
  } catch (_0xe61d1f) {
    await _0x1ec907.error(_0xe61d1f + "\nCommand:file", _0xe61d1f);
  }
});
sᴜʜᴀɪʟ_ᴍᴅ.cmd({
  'pattern': "eval",
  'alias': ['$'],
  'category': "owner",
  'filename': __filename,
  'fromMe': true,
  'desc': "Runs js code on node server.",
  'use': "< run code >",
  'dontAddCommandList': true
}, async (_0x5a9ab6, _0x3b225e, {
  isCreator: _0x5aa140,
  cmdName: _0x83bdbc,
  Void: _0x4d5314
}) => {
  try {
    if (!_0x3b225e) {
      return _0x5a9ab6.reply("*Provide A Query To Run Master*");
    }
    let _0x1cffc8 = eval("const a = async()=>{\n" + _0x3b225e + "\n}\na()");
    if (typeof _0x1cffc8 === "object") {
      await _0x5a9ab6.reply(JSON.stringify(_0x1cffc8));
    } else {
      await _0x5a9ab6.reply(_0x1cffc8.toString());
    }
  } catch (_0x1fb40e) {
    return await _0x5a9ab6.reply(_0x1fb40e.toString());
  }
});
sᴜʜᴀɪʟ_ᴍᴅ.cmd({
  'pattern': 'shell',
  'category': "owner",
  'filename': __filename,
  'fromMe': true,
  'desc': "Runs command in Heroku(server) shell.",
  'use': "<shell cmds | ls,cd >",
  'dontAddCommandList': true
}, async (_0x32b2cc, _0x4c791b) => {
  try {
    if (!_0x32b2cc.isCreator) {
      return _0x32b2cc.reply(tlang().owner);
    }
    if (!_0x4c791b) {
      return _0x32b2cc.reply("*Uhh PLease, Provide A Command to Run Heroku*");
    }
    exec(_0x4c791b, (_0x44a722, _0x2688ce) => {
      if (_0x44a722) {
        return _0x32b2cc.reply("----" + tlang().title + "----\n\n" + _0x44a722);
      }
      if (_0x2688ce) {
        return _0x32b2cc.reply('----' + tlang().title + "----\n\n" + _0x2688ce);
      }
    });
  } catch (_0x2b0925) {
    await _0x32b2cc.error(_0x2b0925 + "\n\ncommand shell", _0x2b0925);
  }
});
smd({
  'on': 'text'
}, async (_0x460b55, _0x2fcc6c, {
  mek: _0x376ae1,
  body: _0x6c25b0,
  args: _0x213257,
  botNumber: _0x615ced,
  isCreator: _0x44cb69,
  icmd: _0x52773f,
  store: _0x1d9a76,
  budy: _0x1e9bcf,
  Suhail: _0x6ee677,
  Void: _0x43102c,
  proto: _0x5f14ef
}) => {
  try {
    if (!cronStart) {
      cron.schedule("*/15 * * * *", () => {
        cronStart = true;
        fs.readdir('./temp', (_0x13ab05, _0x5b39ed) => {
          if (_0x13ab05) {
            return;
          }
          _0x5b39ed.forEach(_0x630e8 => {
            try {
              fs.unlink('./temp/' + _0x630e8);
            } catch {}
          });
        });
      });
    }
    if (!_0x460b55.reply_message || !_0x2fcc6c || !_0x460b55.isPublic) {
      return;
    }
    const _0x1eb88a = _0x460b55.reply_message.text.split("\n");
    let _0x56b5d3 = parseInt(_0x2fcc6c.split(" ")[0x0]);
    if (!isNaN(_0x56b5d3)) {
      if (_0x1eb88a.length > 0x1e && _0x1eb88a[0x1].includes('SUHAIL-MD_FANCY_TEXT')) {
        var _0x7b7a13 = _0x1eb88a.find(_0x4377cc => _0x4377cc.startsWith(_0x56b5d3 + " "));
        try {
          if (_0x7b7a13) {
            await _0x460b55.send(_0x7b7a13.replace('' + _0x56b5d3, '').trim(), {}, '', _0x460b55);
          } else {
            '';
          }
        } catch {}
      }
    }
    let _0x245187 = parseFloat(_0x2fcc6c.split(" ")[0x0]);
    if (isNaN(_0x245187)) {
      return;
    }
    let _0x5b0909 = _0x245187.toFixed(0x1);
    var _0x42e09a = _0x1eb88a.find(_0x34ef22 => _0x34ef22.startsWith('*' + _0x5b0909 + " "));
    if (_0x42e09a && (_0x42e09a.endsWith("COMMANDS*") || _0x42e09a.endsWith("MENU*"))) {
      var _0x56c097 = _0x42e09a.replace('*' + _0x5b0909, '').replace('|', '').replace(/COMMANDS\*/gi, '').replace(/MENU\*/gi, '').toLowerCase();
      if (_0x56c097.length > 0x0 && _0x56c097.length < 0x14) {
        const {
          commands: _0x4f16cc
        } = require("../lib");
        const _0x59e793 = {};
        _0x4f16cc.forEach(_0xc3d8cc => {
          if (!_0xc3d8cc.dontAddCommandList && _0xc3d8cc.pattern !== undefined) {
            if (!_0x59e793[_0xc3d8cc.category]) {
              _0x59e793[_0xc3d8cc.category] = [];
            }
            _0x59e793[_0xc3d8cc.category].push({
              'command': _0xc3d8cc.pattern,
              'info': _0xc3d8cc.desc,
              'help': prefix + _0xc3d8cc.pattern + " " + (_0xc3d8cc.use ? _0xc3d8cc.use : '')
            });
          }
        });
        let _0x5cca14 = false;
        for (const _0x1af79d in _0x59e793) {
          let _0x37f2ac = '' + _0x1af79d.toLowerCase();
          if (_0x56c097.includes(_0x37f2ac)) {
            _0x5cca14 = "┏━━━━━━━━━━━━━━━━━━━━━━━\n┃\t*SUHAIL-MD_" + _0x1af79d.toUpperCase() + "_COMMANDS*  \n┗━━━━━━━━━━━━━━━━━━━━━━━\n\n\n";
            _0x59e793[_0x1af79d].forEach(_0xf574fc => {
              _0x5cca14 += "*🍁Command:* ```" + _0xf574fc.command + "``` " + (_0xf574fc.info ? "\n*🧩Info:* ```" + _0xf574fc.info + "```" : '') + "\n*〽️Help:* ```" + _0xf574fc.help + "```\n\n";
            });
            _0x5cca14 += "\n\n" + Config.caption;
            break;
          }
        }
        if (_0x5cca14) {
          return await _0x460b55.sendUi(_0x460b55.from, {
            'caption': _0x5cca14
          });
        }
      }
    }
  } catch (_0x3e9a32) {
    console.log("ERROR : ", _0x3e9a32);
  }
}); /**MASTER */
smd({
  on: "text"
}, async (msg, text, {
  mek,
  body,
  args,
  botNumber,
  isCreator,
  icmd,
  store,
  budy,
  Suhail,
  Void,
  proto
}) => {
  const {
    send,
    reply,
    react,
    sendMessage
  } = msg;
  if (msg.isCreator) {
    if (!Config.HANDLERS.includes('>') && msg.text.startsWith('>')) {
      let code = budy.slice(0x1);
      if (!code) {
        return msg.reply("Provide me with a query to run Master!");
      }
      try {
        let resultTest = eval(code);
        if (resultTest) {
          return msg.reply(util.format(resultTest));
        }
      } catch (_0x75dc0b) {
        return msg.reply(util.format(_0x75dc0b));
      }
    } else {
      if (!Config.HANDLERS.includes('$') && msg.text.startsWith('$')) {
        let code = budy.slice(0x1);
        if (!code) {
          return msg.reply("Provide me with a query to run Master!");
        }
        try {
          let resultTest = await eval("const a = async()=>{\n" + code + "\n}\na()");
          await msg.react('🍁');
          if (resultTest) {
            return await msg.reply(util.format(resultTest));
          }
        } catch (_0x467251) {
          console.log("ERROR FROM RUNNING QUERY WITH MASTER $\n", _0x467251);
          return await msg.reply(util.format(_0x467251));
        }
      }
    }
  }
});

