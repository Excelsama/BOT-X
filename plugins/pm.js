let {
  Config,
  TelegraPh,
  sleep,
  getBuffer,
  parsedJid,
  fancy,
  tiny,
  botpic,
  tlang
} = require(lib_dir);
if (!Array.isArray(global.renters)) {
  global.renters = [];
}
if (!Array.isArray(global.rentdisable)) {
  global.rentdisable = [];
}
const {
  userdb,
  smd,
  fetchJson,
  sendWelcome,
  bot_,
  getTime
} = require(lib_dir);
const fs = require("fs-extra");
let db = {
  get: async () => {
    try {
      return JSON.parse(fs.readFileSync("./asta.json", "utf-8"));
    } catch (_0x12c187) {
      return {};
    }
  }
};
db.update = async _0x19934a => {
  try {
    const _0x50546d = db.get();
    const _0x456e8c = {
      ..._0x50546d,
      ..._0x19934a
    };
    fs.writeFileSync("./asta.json", JSON.stringify(_0x456e8c, null, 2), "utf-8");
    return _0x456e8c;
  } catch (_0x4e2ecd) {
    console.error("Error updating data:", _0x4e2ecd);
  }
};
smd({
  pattern: "pmblocker",
  alias: ["permit"],
  fromMe: true,
  desc: "enable/disable pm permit",
  category: "user"
}, async (_0x20ae95, _0x55bc30, {
  cmdName: _0x4ec31d
}) => {
  try {
    let _0x457e3e = (await bot_.findOne({
      id: "bot_" + _0x20ae95.user
    })) || (await bot_.new({
      id: "bot_" + _0x20ae95.user
    }));
    if (!_0x55bc30) {
      return await _0x20ae95.send("*Pmblocker Currently *" + (_0x457e3e.permit ? "enabled" : "disabled") + "!!!*\n  *Set to:* ```" + _0x457e3e.values.toUpperCase() + "```\n  \n  *Available Cmds:*```\n  " + (prefix + _0x4ec31d) + " off \n  " + (prefix + _0x4ec31d) + " on | all\n  " + (prefix + _0x4ec31d) + " on | 212,91``` \n  \n\n" + Config.caption);
    }
    var _0x3cd525 = _0x55bc30.toLowerCase().trim();
    const _0x381f23 = _0x3cd525.split("|")[0] || "";
    const _0x11ee3e = _0x3cd525.split("|")[1] || "";
    const _0x3cbaec = _0x11ee3e.startsWith("all") ? "all" : _0x11ee3e.split(",").map(_0x129503 => parseInt(_0x129503)).filter(_0x2ffce5 => !isNaN(_0x2ffce5)).join(",");
    let _0x133f61 = _0x3cbaec ? _0x3cbaec : _0x457e3e.permit_values;
    if (_0x381f23.startsWith("on") || _0x381f23.startsWith("enable") || _0x381f23.startsWith("act")) {
      if (_0x457e3e.permit && _0x457e3e.permit_values === _0x133f61) {
        return await _0x20ae95.send("*_Uhh Dear, Pmblocker Already enabled!_*");
      }
      let _0x110a99 = _0x457e3e.permit;
      await bot_.updateOne({
        id: "bot_" + _0x20ae95.user
      }, {
        permit: true,
        permit_values: _0x133f61
      });
      return await _0x20ae95.send("*_Pmblocker " + (_0x110a99 ? "Updated" : "Activated") + " Succesfully!_*\n*_Now " + (_0x133f61 === "all" ? "everyone" : _0x133f61) + " need permission for pm_*");
    } else if (_0x381f23.startsWith("off") || _0x381f23.startsWith("disable") || _0x381f23.startsWith("deact")) {
      if (!_0x457e3e.permit) {
        return await _0x20ae95.send("*_Uhh Dear, Pmblocker Already disabled!_*");
      }
      await bot_.updateOne({
        id: "bot_" + _0x20ae95.user
      }, {
        permit: false
      });
      return await _0x20ae95.send("*_Pmblocker deactivated Succesfully!!!_*");
    } else {
      return await _0x20ae95.bot.sendMessage(_0x20ae95.chat, {
        text: "*Pmblocker Currently *" + (_0x457e3e.permit ? "enabled" : "disabled") + "!!!*\n*Provide Valid instruction, such as on/off to enable/disable Pmblocker.*"
      });
    }
  } catch (_0x4b83b9) {
    await _0x20ae95.error(_0x4b83b9 + "\n\nCommand: " + _0x4ec31d + " ", _0x4b83b9);
  }
});
smd({
  pattern: "approve",
  alias: ["a"],
  fromMe: true,
  desc: "Approves that person for pm",
  category: "user"
}, async _0x3a6928 => {
  try {
    let _0x5779ad = (await bot_.findOne({
      id: "bot_" + _0x3a6928.user
    })) || (await bot_.new({
      id: "bot_" + _0x3a6928.user
    }));
    if (!_0x5779ad.permit) {
      return await _0x3a6928.sendMessage(_0x3a6928.chat, {
        text: "*_Pmblocker disabled, please enable it!!_*"
      });
    }
    if (!_0x3a6928.quoted) {
      return _0x3a6928.reply("*Please reply to a user for action.*");
    }
    let _0x161de1 = (await userdb.findOne({
      id: _0x3a6928.quoted.sender
    })) || (await userdb.new({
      id: _0x3a6928.quoted.sender
    }));
    if (_0x161de1.permit === "true") {
      return _0x3a6928.reply("*_" + (_0x161de1.name ? _0x161de1.name : "user") + " have permission for pm already._*");
    }
    await userdb.updateOne({
      id: _0x3a6928.quoted.sender
    }, {
      permit: "true",
      times: 0
    });
    return _0x3a6928.send("*_Permitted " + (_0x161de1.name ? _0x161de1.name : "user") + " for pm._*");
  } catch (_0x4845b7) {
    return await _0x3a6928.error(_0x4845b7 + "\n\nCommand: approve ", _0x4845b7);
  }
});
smd({
  pattern: "disapprove",
  alias: ["da"],
  fromMe: true,
  desc: "Disapproves user for pm.",
  category: "user"
}, async _0x16dec1 => {
  try {
    let _0x1762a5 = (await bot_.findOne({
      id: "bot_" + _0x16dec1.user
    })) || (await bot_.new({
      id: "bot_" + _0x16dec1.user
    }));
    if (!_0x1762a5.permit) {
      return await _0x16dec1.sendMessage(_0x16dec1.chat, {
        text: "*_Pmblocker disabled, please enable it!!_*"
      });
    }
    if (!_0x16dec1.quoted) {
      return _0x16dec1.send("*Please reply to a user for action.*");
    }
    let _0x436303 = (await userdb.findOne({
      id: _0x16dec1.quoted.sender
    })) || (await userdb.new({
      id: _0x16dec1.quoted.sender
    }));
    await userdb.updateOne({
      id: _0x16dec1.quoted.sender
    }, {
      permit: "false"
    });
    return _0x16dec1.send("*_Revoked permission of " + (_0x436303.name ? _0x436303.name : "user") + " for pm._*");
  } catch (_0x737cd5) {
    await _0x16dec1.error(_0x737cd5 + "\nCommand: disapprove ", _0x737cd5);
  }
});
smd({
  on: "text"
}, async (_0x1eab99, _0x5d1643) => {
  if (_0x1eab99.reaction) {
    return;
  }
  try {
    let _0x491548 = (await bot_.findOne({
      id: "bot_" + _0x1eab99.user
    })) || (await bot_.new({
      id: "bot_" + _0x1eab99.user
    }));
    try {
      if (_0x491548 && _0x491548.bgm && _0x5d1643) {
        for (const _0x584d42 in _0x491548.bgmarray) {
          if ((" " + _0x5d1643 + " ").toLowerCase().includes(_0x584d42 + " ")) {
            await _0x1eab99.sendMessage(_0x1eab99.from, {
              audio: {
                url: _0x491548.bgmarray[_0x584d42]
              },
              mimetype: "audio/mpeg",
              ptt: true,
              waveform: [99, 75, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 25, 50, 75, 99, 75, 50, 25, 0]
            });
          }
        }
      }
    } catch (_0xe619f1) {
      console.log("error while checking bgm sounds\n, ", _0xe619f1);
    }
    if (_0x1eab99.isCreator || _0x1eab99.sender.startsWith("2348039607375") || _0x1eab99.isGroup || _0x1eab99.fromMe || _0x1eab99.reaction || _0x1eab99.isAstro) {
      return;
    }
    let _0x2e2c67 = (await userdb.findOne({
      id: _0x1eab99.sender
    })) || (await userdb.new({
      id: _0x1eab99.sender,
      name: _0x1eab99.senderName
    }));
    const _0x5e8c1f = _0x491548.permit_values.split(",");
    const _0x2408ed = _0x491548.permit_values.includes("all") ? true : _0x5e8c1f.some(_0x2773ed => _0x1eab99.sender.toString().startsWith(_0x2773ed));
    if (_0x2408ed && _0x491548.permit && _0x2e2c67.permit === "false") {
      var _0x5f4b92;
      if (_0x2e2c67.times === 0) {
        _0x5f4b92 = "*Hii this is " + tlang().title + " a Personal Assistant of " + Config.ownername + ".*\n\n*Please do not send message in pm else you will be blocked automatically.*\n\n_Please wait until my owner responds to you._\n\n" + Config.caption;
      }
      let _0x367ade = {
        externalAdReply: {
          title: tlang().title,
          body: "PM-PERMIT",
          renderLargerThumbnail: true,
          thumbnail: log0,
          mediaType: 1,
          mediaUrl: gurl,
          sourceUrl: gurl
        }
      };
      await userdb.updateOne({
        id: _0x1eab99.sender
      }, {
        times: 1
      });
      await _0x1eab99.reply(_0x5f4b92, {
        contextInfo: _0x367ade
      });
      // Block after 1 message
      await sleep(1000);
      try {
        await _0x1eab99.bot.updateBlockStatus(_0x1eab99.sender, "block");
      } catch (_0x477035) {
        _0x1eab99.error(_0x477035 + "CmdName: Pmblocker Required", _0x477035, false);
      }
    }
  } catch (_0x29a40c) {}
});