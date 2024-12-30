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
const xcel = require('../lib/plugins');
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

xcel.smd({
  'cmdname': "rmenu",
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
    let menuThemeHeader = "╭────《*" + Config.botname + "*》────⪩";
    let menuThemeCommandPrefix = "𖣎│▸";
    let menuThemeFooter = "╰──────────⪩";
    let menuThemeCategoryHeader = "┌〈";
    let menuThemeCategoryFooter = "》──────⪩";
    let menuThemeCommandPrefix = "𖣎│▸ ";
    let menuThemeCommandFooter = "╰───────────⪩";
    
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
    let _0x192602 = menuThemeHeader + "\n" + menuThemeCommandPrefix + " Theme:- " + tlang().title + "\n" + menuThemeCommandPrefix + " Owner:- " + Config.ownername + "\n" + menuThemeCommandPrefix + " Plugins:- " + _0x4f1da9.length + "\n" + menuThemeCommandPrefix + " Uptime:- " + runtime(process.uptime()) + "\n" + menuThemeCommandPrefix + " Mem:- " + formatp(os.totalmem() - os.freemem()) + '/' + formatp(os.totalmem()) + "\n" + menuThemeCommandPrefix + " Time:- " + _0x1b2e30 + "\n" + menuThemeCommandPrefix + " Date:- " + _0x35bd69 + "\n" + menuThemeFooter + "\n\n";
    for (const _0x2745af in _0x376e27) {
      _0x192602 += menuThemeCategoryHeader + " *" + tiny(_0x2745af) + "* " + menuThemeCategoryFooter + "\n";
      if (_0x54954a.toLowerCase() == _0x2745af.toLowerCase()) {
        _0x192602 = menuThemeCategoryHeader + " *" + tiny(_0x2745af) + "* " + menuThemeCategoryFooter + "\n";
        for (const _0x375619 of _0x376e27[_0x2745af]) {
          _0x192602 += menuThemeCommandPrefix + " " + fancytext(_0x375619, 0x1) + "\n";
        }
        _0x192602 += menuThemeCommandFooter + "\n";
        break;
      } else {
        for (const _0x3d11d4 of _0x376e27[_0x2745af]) {
          _0x192602 += menuThemeCommandPrefix + " " + fancytext(_0x3d11d4, 0x1) + "\n";
        }
        _0x192602 += menuThemeCommandFooter + "\n";
      }
    }
    _0x192602 += Config.caption;
    let _0x2ca50e = {
      'caption': _0x192602
    };
    return await _0xd2266a.sendUi(_0xd2266a.chat, _0x2ca50e, _0xd2266a);
  } catch (_0x323e96) {
    await _0xd2266a.error(_0x323e96 + "\nCommand:rmenu", _0x323e96);
  }
});