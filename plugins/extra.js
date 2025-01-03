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
smd({
  'pattern': 'readmore',
  'alias': ["rmore", 'readmor'],
  'desc': "Adds *readmore* in given text.",
  'category': "tools",
  'filename': __filename
}, async (_0x5db0de, _0x38fb87) => {
  try {
    let _0x5ea4b8 = _0x38fb87 ? _0x38fb87 : _0x5db0de.reply_text;
    if (!_0x5ea4b8) {
      _0x5ea4b8 = "*Uhh Dear,Please provide text*\n*Eg:- *readmore text1 readmore text2_*";
    } else {
      _0x5ea4b8 += " ";
    }
    if (_0x5ea4b8.includes('readmore')) {
      await _0x5db0de.reply(_0x5ea4b8.replace(/readmore/, String.fromCharCode(0x200e).repeat(0xfa1)));
    } else {
      await _0x5db0de.reply(_0x5ea4b8.replace(" ", String.fromCharCode(0x200e).repeat(0xfa1)));
    }
  } catch (_0x36cb2c) {
    await _0x5db0de.error(_0x36cb2c + "\n\ncommand : readmore", _0x36cb2c, false);
  }
});
let pmtypes = ["videoMessage", "imageMessage"];
cmd({
  'pattern': "url",
  'alias': ['createurl'],
  'category': "tools",
  'filename': __filename,
  'desc': "image to url.",
  'use': "<video | image>"
}, async _0x4e4351 => {
  try {
    let _0x680da4 = pmtypes.includes(_0x4e4351.mtype) ? _0x4e4351 : _0x4e4351.reply_message;
    if (!_0x680da4 || !pmtypes.includes(_0x680da4?.["mtype"])) {
      return _0x4e4351.reply("*_Uhh Dear, Reply To An Image/Video!_*");
    }
    let _0x349452 = await _0x4e4351.bot.downloadAndSaveMediaMessage(_0x680da4);
    let _0x536aa6 = await createUrl(_0x349452);
    if (!_0x536aa6) {
      return _0x4e4351.reply("*_Failed To Create Url!_*");
    }
    try {
      fs.unlink(_0x349452);
    } catch {}
    await _0x4e4351.send(util.format(_0x536aa6), {}, "suhail", _0x680da4);
  } catch (_0x2ee8cc) {
    await _0x4e4351.error(_0x2ee8cc + "\n\ncommand url", _0x2ee8cc);
  }
});
cmd({
  'pattern': "upload",
  'alias': ['url2'],
  'category': "tools",
  'filename': __filename,
  'desc': "image to url.",
  'use': "<video | image>"
}, async _0xbda24 => {
  try {
    let _0x7d6de1 = pmtypes.includes(_0xbda24.mtype) ? _0xbda24 : _0xbda24.reply_message;
    if (!_0x7d6de1 || !pmtypes.includes(_0x7d6de1?.["mtype"])) {
      return _0xbda24.reply("*_Uhh Dear, Reply To An Image/Video!_*");
    }
    let _0xeb95de = await _0xbda24.bot.downloadAndSaveMediaMessage(_0x7d6de1);
    let _0x3e1ea8 = await createUrl(_0xeb95de, "uguMashi");
    try {
      fs.unlink(_0xeb95de);
    } catch {}
    if (!_0x3e1ea8 || !_0x3e1ea8.url) {
      return _0xbda24.reply("*_Failed To Create Url!_*");
    }
    await _0xbda24.send(util.format(_0x3e1ea8.url), {}, 'suhail', _0x7d6de1);
  } catch (_0x1a2f02) {
    await _0xbda24.error(_0x1a2f02 + "\n\ncommand upload", _0x1a2f02);
  }
});
smd({
  'pattern': 'calc',
  'desc': "calculate an equation.",
  'category': "tools",
  'use': "<equation>",
  'filename': __filename
}, async (_0x5d95a7, _0x28af98) => {
  try {
    if (!_0x28af98) {
      return await _0x5d95a7.reply("*Please enter a math operation*\n*Example: .calc 22+12*");
    }
    let _0xcebecd = _0x28af98.replace(/\s+/g, '');
    if (!/^(\d+([-+%*/]\d+)+)$/.test(_0xcebecd)) {
      return await _0x5d95a7.reply("Please enter a valid mathematical operation.");
    }
    const _0x5e0640 = new Function("return " + _0xcebecd)();
    if (_0xcebecd.includes('/') && _0xcebecd.split('/').some(_0x413293 => _0x413293 === '0')) {
      return _0x5d95a7.reply("Cannot divide by zero.");
    }
    if (_0xcebecd.split(/[-+%*/]/).length <= 0x2) {
      const [_0x120f57, _0x1de7dc, _0x112a0e] = _0xcebecd.match(/\d+|[-+%*/]/g);
      return await _0x5d95a7.reply(_0x120f57 + " " + _0x1de7dc + " " + _0x112a0e + " = " + _0x5e0640);
    } else {
      return await _0x5d95a7.reply("Result: " + _0x5e0640);
    }
  } catch (_0x120f52) {
    return await _0x5d95a7.error(_0x120f52 + "\n\ncommand: calc", _0x120f52);
  }
});
async function getDateTime() {
  const _0x2e0403 = new Date();
  const _0x142ad5 = _0x2e0403.toISOString().slice(0x0, 0xa);
  const _0x144a84 = _0x2e0403.toLocaleTimeString();
  return {
    'date': _0x142ad5,
    'time': _0x144a84
  };
}
smd({
  'pattern': "anonymsg",
  'alias': ["recognition", 'anonychat'],
  'desc': "Send message Annonymously",
  'category': 'user',
  'use': "<Hi>",
  'filename': __filename
}, async (_0x358984, _0x20693a, {
  smd: _0x12d243
}) => {
  try {
    let _0x32512b = _0x20693a ? _0x20693a : _0x358984.reply_text;
    if (!_0x32512b) {
      return await _0x358984.send("*provide number with msg to send Anonymously.* \n*Example " + (prefix + _0x12d243) + " 923184474176,your_Message*", {}, '', _0x358984);
    }
    if (_0x358984.isCreator && _0x32512b === "info") {
      return await _0x358984.reply(isAnnonyMsgAlive == '' ? "*Theres no Anonymous Chat created yet*" : "*Anonymous Chat Recivers*\n_" + isAnnonyMsgAlive + '_');
    }
    const _0x201d91 = _0x32512b.indexOf(',');
    if (_0x201d91 === -0x1) {
      return await _0x358984.reply("*Invalid format. Please provide both number and Message separated by a comma.*");
    }
    let _0x12e2ef = _0x32512b.slice(0x0, _0x201d91).trim() + "@s.whatsapp.net";
    let _0x5f656f = _0x32512b.slice(_0x201d91 + 0x1).trim();
    let _0x48975a = (await parsedJid(_0x12e2ef)) || [];
    if (_0x48975a[0x0]) {
      const {
        date: _0xbcd286,
        time: _0x47ad13
      } = await getDateTime();
      const _0x3e1b1c = "anony-msg-" + Math.floor(0x186a0 + Math.random() * 0xdbba0);
      sᴜʜᴀɪʟ_ᴍᴅ_AnonyMsg[_0x3e1b1c] = new AnonymousMsg();
      let _0x3079e2 = sᴜʜᴀɪʟ_ᴍᴅ_AnonyMsg[_0x3e1b1c];
      _0x3079e2.id = _0x3e1b1c;
      _0x3079e2.sender = _0x358984.sender;
      _0x3079e2.reciever = _0x48975a[0x0];
      _0x3079e2.msgStatus = true;
      _0x3079e2.senderMsg = _0x358984;
      _0x5f656f = "*sᴜʜᴀɪʟ-ᴍᴅ • ᴀɴɴᴏɴʏᴍᴏᴜs ᴍsɢ*\n\n*Msg_Id:* " + _0x3079e2.id + "\n*Date:* _" + _0xbcd286 + "_\n*Time:* _" + _0x47ad13 + "_\n\n*Message:* " + _0x5f656f + "\n\n\n" + Config.caption;
      isAnnonyMsgAlive = isAnnonyMsgAlive + ',' + _0x3079e2.reciever;
      await _0x358984.bot.sendMessage(_0x3079e2.reciever, {
        'text': _0x5f656f
      });
      return await _0x358984.reply("*_Anonymous message sent succesfully_*");
    } else {
      return await _0x358984.reply("*_Provided number is not valid!!!_*");
    }
  } catch (_0x51ed58) {
    await _0x358984.error(_0x51ed58 + "\n\ncommand: " + _0x12d243, _0x51ed58, "*_Can't send annonymously message yet, Sorry!!_*");
  }
});
smd({
  'on': "text"
}, async _0x2acf30 => {
  try {
    if (_0x2acf30.quoted && isAnnonyMsgAlive.includes(_0x2acf30.sender) && _0x2acf30.text.length > 0x2) {
      const _0x2dfb59 = _0x2acf30.reply_text.split("\n");
      if (_0x2dfb59.length < 0x3) {
        return;
      }
      if (_0x2acf30.reply_text.includes("ʙᴏᴛ-x• ᴀɴɴᴏɴʏᴍᴏᴜs ᴍsɢ") && _0x2dfb59[0x0].includes("ʙᴏᴛ-x • ᴀɴɴᴏɴʏᴍᴏᴜs ᴍsɢ") && _0x2dfb59[0x2].includes('Msg_Id')) {
        let _0x1b0d01 = '' + _0x2dfb59[0x2].replace("*Msg_Id:* ", '').trim();
        let _0x2ecd2a = sᴜʜᴀɪʟ_ᴍᴅ_AnonyMsg[_0x1b0d01];
        if (!_0x2ecd2a) {
          return;
        }
        try {
          if (_0x2ecd2a) {
            let _0x13a11c = _0x2acf30.text.split(',')[0x0].trim();
            if (_0x13a11c.toLowerCase().startsWith("reply")) {
              _0x2ecd2a.howmanyreply += 0x1;
              const _0x5a2204 = _0x2acf30.text.indexOf(',');
              let _0x3f6b59 = "*ʙᴏᴛ-x• ʏᴏᴜʀ ᴀɴᴏɴʏ-ᴍsɢ ʀᴇᴘʟʏ*\n\n*_From @" + _0x2ecd2a.reciever.split('@')[0x0] + "_*\n*_Msg_Id: " + _0x2ecd2a.id + "_*\n\n*Message:* " + _0x2acf30.text.slice(_0x5a2204 + 0x1).trim() + "\n\n\n\n" + Config.caption;
              if (_0x2ecd2a.howmanyreply >= 0x2) {
                isAnnonyMsgAlive = isAnnonyMsgAlive.replace(',' + _0x2acf30.sender, '');
              }
              await _0x2acf30.bot.sendMessage(_0x2ecd2a.sender, {
                'text': _0x3f6b59,
                'mentions': [_0x2ecd2a.reciever]
              }, {
                'quoted': _0x2ecd2a.senderMsg
              });
              if (_0x2ecd2a.howmanyreply >= 0x2) {
                isAnnonyMsgAlive = isAnnonyMsgAlive.replace(',' + _0x2acf30.sender, '');
                delete sᴜʜᴀɪʟ_ᴍᴅ_AnonyMsg[_0x1b0d01];
              }
              return await _0x2acf30.reply("*_Your Message succesfully deliver to User_* " + (_0x2ecd2a.howmanyreply == 0x1 ? "\n*you can reply 1 more time*" : '') + " ");
            } else {
              if (_0x2ecd2a.tellinfo === 0x0) {
                _0x2ecd2a.tellinfo = 0x1;
                let _0x362db6 = "*Basically, Its an Annonymous Message*\n\n_Msg_Id: " + _0x2ecd2a.id + "_\n_this message sended by a chatbot_\n_User not wants to expose itself to send that msg_\n\n\n*if you wanna reply to that user,*\n*Send msg by replying to above message*\n*Type like:* reply, Type_your_Message_Here\n*Example:* reply, Can you text me from your number\n\n\n" + Config.caption;
                _0x2acf30.bot.sendMessage(_0x2ecd2a.reciever, {
                  'text': _0x362db6
                }, {
                  'quoted': _0x2acf30
                });
              } else if (_0x2ecd2a.tellinfo === 0x1) {
                _0x2ecd2a.tellinfo = 0x2;
                _0x2acf30.reply("*Please follow the format if reply to msg*\n*Type like: _reply, Type_your_Message_Here_*");
              }
            }
          }
        } catch (_0x58832f) {
          console.log("error : ", _0x58832f);
        }
      }
    }
  } catch {}
});