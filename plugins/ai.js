const util = require('util');
const fs = require("fs-extra");
const {
  cmd
} = require("../lib/plugins");
const {
  formatp,
  formatDate,
  TelegraPh,
  aitts,
  tlang,
  botpic,
  smd,
  prefix,
  fetchJson,
  runtime,
  Config,
  parsedJid,
  sleep,
  createUrl
} = require("../lib");
const axios = require("axios");
const fetch = require('node-fetch');
const os = require('os');
const speed = require("performance-now");
async function aiResponce(_0x109acf, _0xf00650, _0x2728a0 = '') {
  let _0x2d78d9 = '';
  try {
    if (_0xf00650 === "chat") {
      _0x2d78d9 = await (await axios.get("http://api.brainshop.ai/get?bid=175685&key=Pg8Wu8mrDQjfr0uv&uid=[" + _0x109acf.sender.split('@')[0x0] + "]&msg=[" + _0x2728a0 + ']')).data.cnt;
    } else {
      if (_0xf00650 === "gpt") {
        const _0x3e1043 = await fetch('https://api.openai.com/v1/chat/completions', {
          'method': "POST",
          'headers': {
            'Content-Type': "application/json",
            'Authorization': "Bearer " + Config.OPENAI_API_KEY
          },
          'body': JSON.stringify({
            'model': 'gpt-3.5-turbo',
            'messages': [{
              'role': "system",
              'content': "You"
            }, {
              'role': "user",
              'content': _0x2728a0
            }]
          })
        });
        const _0x26c61c = await _0x3e1043.json();
        if (!_0x26c61c.choices || _0x26c61c.choices.length === 0x0) {
          _0x2d78d9 = "*Invalid ChatGPT API Key, Please Put New Key*";
        } else {
          _0x2d78d9 = _0x26c61c.choices[0x0].message.content;
        }
      } else {
        if (_0xf00650 === "dalle") {
          const _0x1a4db1 = await fetch("https://api.openai.com/v1/images/generations", {
            'method': "POST",
            'headers': {
              'Content-Type': "application/json",
              'Authorization': "Bearer " + Config.OPENAI_API_KEY
            },
            'body': JSON.stringify({
              'model': "image-alpha-001",
              'prompt': _0x2728a0,
              'size': "512x512",
              'response_format': "url"
            })
          });
          const _0x2cdadf = await _0x1a4db1.json();
          _0x2d78d9 = _0x2cdadf.data[0x0].url;
        }
      }
    }
    if (_0xf00650 === "rmbg") {
      const _0x142226 = {
        'image_url': _0x2728a0,
        'size': "auto"
      };
      axios.post("https://api.remove.bg/v1.0/removebg", _0x142226, {
        'headers': {
          'X-Api-Key': Config.REMOVE_BG_KEY
        },
        'responseType': "arraybuffer"
      }).then(_0x18f9bd => {
        _0x2d78d9 = Buffer.from(_0x18f9bd.data, "binary");
      })["catch"](_0x25d8c1 => {
        _0x2d78d9 = false;
      });
    }
    return _0x2d78d9;
  } catch (_0x4eee67) {
    console.log("error in aiResponce : ", _0x4eee67);
    return "Error While getting Ai responce ";
  }
}
;
smd({
  'pattern': "chat",
  'desc': "chat with an AI",
  'category': 'ai',
  'use': "<Hii, Suhail Tech Info>",
  'filename': __filename
}, async (_0x1c0160, _0x482db1) => {
  try {
    return _0x1c0160.reply(await aiResponce(_0x1c0160, "chat", _0x482db1));
  } catch (_0x4adf95) {
    await _0x1c0160.error(_0x4adf95 + "\n\ncommand: chat", _0x4adf95, "*_no responce from chatbot, sorry!!_*");
  }
});