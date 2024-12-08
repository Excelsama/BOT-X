const moment = require("moment-timezone");
const Config = require("../config");
let { smd, prefix, updateProfilePicture, parsedJid } = require("../lib");
const { cmd } = require("../lib/plugins");

const mtypes = ["imageMessage"];


// Update bio
smd(
  {
    pattern: "bio",
    desc: "update profile status of whatsapp",
    category: "bot-x",
    use: "<text>",
    fromMe: true,
    filename: __filename,
  },
  async (cld, text) => {
    try {
      if (!text) {
        return await cld.send(
          "*_provide text to update profile status!_*\n*_Example: " +
            prefix +
            "bio BOT-X_*"
        );
      }
      await cld.bot.updateProfileStatus(text);
      cld.send("*Profile status updated successfully!*");
    } catch (err) {
      await cld.error(err + "\n\ncommand : bio", err);
    }
  }
);

// Send Picture-in-Picture (PiP) video
cmd(
  {
    pattern: "ptv",
    desc: "send ptv Message of video",
    category: "bot-x",
    filename: __filename,
  },
  async (cld, _, { cmdName }) => {
    try {
      if (!cld.quoted) {
        return await cld.send("*Uhh Please, reply to video*");
      }
      let mtype = cld.quoted.mtype;
      if (mtype !== "videoMessage") {
        return await cld.send("*Uhh Dear, reply to a video message*");
      }
      return await cld.bot.forwardOrBroadCast(cld.chat, cld.quoted, {}, "ptv");
    } catch (err) {
      await cld.error(err + "\n\ncommand : ptv", err);
    }
  }
);

// Save message to log number
cmd(
  {
    pattern: "save",
    desc: "Save Message to log number",
    category: "tools",
    filename: __filename,
  },
  async (cld, _, { cmdName }) => {
    try {
      let reply = cld.reply_message;
      if (!reply) {
        return await cld.send("*Uhh Please, reply to to a Message*");
      }
      let sent = await cld.bot.forwardOrBroadCast(cld.user, reply);
    } catch (err) {
      await cld.error(err + "\n\ncommand : save", err);
    }
  }
);

// Get blocklist
cmd(
  {
    pattern: "blocklist",
    desc: "get list of all Blocked Numbers",
    category: "info",
    fromMe: true,
    filename: __filename,
    use: "<text>",
  },
  async (cld) => {
    try {
      const blockedUsers = await cld.bot.fetchBlocklist();
      if (blockedUsers.length === 0) {
        return await cld.reply("Uhh Dear, You don't have any Blocked Numbers.");
      }
      let text =
        "\n*≡ List*\n\n*_Total Users:* " +
        blockedUsers.length +
        "_\n\n┌─⊷ \t*BLOCKED USERS*\n";
      for (let i = 0; i < blockedUsers.length; i++) {
        text +=
          "▢ " + (i + 1) + ":- wa.me/" + blockedUsers[i].split("@")[0] + "\n";
      }
      text += "└───────────";
      return await cld.bot.sendMessage(cld.chat, { text });
    } catch (err) {
      await cld.error(err + "\n\ncommand : blocklist", err);
    }
  }
);

// Send location
// Location Command
cmd(
  {
    pattern: "location",
    desc: "Adds *readmore* in given text.",
    category: "tools",
    filename: __filename,
  },
  async (message, args) => {
    try {
      if (!args) {
        return await message.reply(
          "*Give Coordinates To Send Location!*\n *Ex: " +
            prefix +
            "location 24.121231,55.1121221*"
        );
      }

      const latitude = parseFloat(args.split(",")[0]) || "";
      const longitude = parseFloat(args.split(",")[1]) || "";

      if (!latitude || isNaN(latitude) || !longitude || isNaN(longitude)) {
        return await message.reply("*_Coordinates Not In Format, Try Again_*");
      }

      await message.reply(
        "*----------LOCATION------------*\n```Sending Location Of Given Data:\n Latitude: " +
          latitude +
          "\n Longitude: " +
          longitude +
          "```\n\n" +
          Config.caption
      );

      return await message.sendMessage(
        message.jid,
        {
          location: {
            degreesLatitude: latitude,
            degreesLongitude: longitude,
          },
        },
        {
          quoted: message,
        }
      );
    } catch (error) {
      await message.error(error + "\n\ncommand : location", error);
    }
  }
);

// List Personal Chats Command
smd(
  {
    pattern: "listpc",
    category: "bot-x",
    desc: "Finds info about personal chats",
    filename: __filename,
  },
  async (message, isPattern, { store }) => {
    try {
      message.react("💻");
      const personalChats = await store.chats
        .all()
        .filter((chat) => chat.id.endsWith(".net"))
        .map((chat) => chat);

      let result =
        " 「  " +
        Config.botname +
        "'s pm user list  」\n\nTotal " +
        personalChats.length +
        " users are text in personal chat.";

      for (const chat of personalChats) {
        result +=
          "\n\nUser: @" +
          chat.id.split("@")[0] +
          "\nMessages : " +
          chat.unreadCount +
          "\nLastchat : " +
          moment(chat.conversationTimestamp * 1000)
            .tz(timezone)
            .format("DD/MM/YYYY HH:mm:ss");
      }

      message.bot.sendTextWithMentions(message.chat, result, message);
    } catch (error) {
      return await message.error(
        error + "\n\n command: listpc",
        error,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);

// List Group Chats Command
smd(
  {
    pattern: "listgc",
    category: "bot-x",
    desc: "Finds info about all active groups",
    filename: __filename,
  },
  async (message, isPattern, { store, Void }) => {
    try {
      message.react("👁‍🗨");
      const groupChats = await store.chats
        .all()
        .filter((chat) => chat.id.endsWith("@g.us"))
        .map((chat) => chat);

      let result =
        " 「  " +
        Config.botname +
        "'s group user list  」\n\nTotal " +
        groupChats.length +
        " active Groups found!";

      for (const chat of groupChats) {
        const metadata = await Void.groupMetadata(chat.id);
        result +=
          "\n\nName : " +
          metadata.subject +
          " " +
          (metadata.owner ? "\nOwner : @" + metadata.owner.split("@")[0] : "") +
          "\nID : " +
          chat.id +
          "\nMade : " +
          (metadata.creation
            ? moment(metadata.creation * 1000)
                .tz("Asia/Kolkata")
                .format("DD/MM/YYYY HH:mm:ss")
            : metadata.creation) +
          "\nMember : " +
          (metadata.participants.length || 0) +
          "\n\nMessages : " +
          chat.unreadCount +
          "\nLastchat : " +
          moment(chat.conversationTimestamp * 1000)
            .tz(timezone)
            .format("DD/MM/YYYY HH:mm:ss");
      }

      message.send(result, {}, "Xcelsama", message);
    } catch (error) {
      return await message.error(
        error + "\n\n command: listpc",
        error,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);

// Create vCard Command
cmd(
  {
    pattern: "vcard",
    desc: "Create Contact by given name.",
    category: "tools",
    filename: __filename,
  },
  async (message, args) => {
    try {
      if (!message.quoted) {
        return message.reply("*Please Reply to User With Name*");
      }

      if (!args) {
        return message.reply(
          "Please Give Me User Name, \n *Example : " +
            prefix +
            "vcard Xcelsama* "
        );
      }

      let nameArray = args.split(" ");
      if (nameArray.length > 3) {
        args = nameArray.slice(0, 3).join(" ");
      }

      const vCard =
        "BEGIN:VCARD\nVERSION:3.0\nFN:" +
        args +
        "\nORG:;\nTEL;type=CELL;type=VOICE;waid=" +
        message.quoted.sender.split("@")[0] +
        ":+" +
        owner[0] +
        "\nEND:VCARD";

      const contactMessage = {
        contacts: {
          displayName: args,
          contacts: [
            {
              vcard: vCard,
            },
          ],
        },
      };

      return await message.bot.sendMessage(message.chat, contactMessage, {
        quoted: message,
      });
    } catch (error) {
      await message.error(error + "\n\ncommand : vcard", error);
    }
  }
);

// Edit Message Command
smd(
  {
    pattern: "edit",
    fromMe: true,
    desc: "edit message that sended by bot",
    type: "bot-x",
  },
  async (message, args) => {
    try {
      const botMessage =
        message.reply_message && message.reply_message.fromMe
          ? message.reply_message
          : false;

      if (!botMessage) {
        return await message.reply("_Reply to a message that sent by you!_");
      }

      if (!args) {
        return await message.reply("_Need text, Example: edit hi_");
      }

      return await message.edit(args, {
        edit: botMessage,
      });
    } catch (error) {
      await message.error(error + "\n\ncommand : edit", error);
    }
  }
);

// Forward Message Command
smd(
  {
    pattern: "forward",
    alias: ["send"],
    desc: "forward your messages in jid",
    type: "bot-x",
  },
  async (message, args) => {
    try {
      if (!message.reply_message) {
        return message.reply("*_Reply to something!_*");
      }

      const jids = await parsedJid(args);
      if (!jids || !jids[0]) {
        return await message.send(
          "*Provide jid to forward message*\n*use _" +
            prefix +
            "jid,_ to get jid of users!*"
        );
      }

      for (let i = 0; i < jids.length; i++) {
        message.bot.forwardOrBroadCast(jids[i], message.reply_message);
      }
    } catch (error) {
      await message.error(error + "\n\ncommand : forward", error);
    }
  }
);

// Block User Command
smd(
  {
    cmdname: "block",
    info: "blocks a person",
    fromMe: true,
    type: "bot-x",
    filename: __filename,
    use: "<quote/reply user.>",
  },
  async (message) => {
    try {
      let user = message.reply_message
        ? message.reply_message.sender
        : !message.isGroup
        ? message.from
        : message.mentionedJid[0]
        ? message.mentionedJid[0]
        : "";

      if (!user && !user.includes("@s.whatsapp.net")) {
        return await message.reply("*Uhh dear, reply/mention an User*");
      }

      if (message.checkBot(user)) {
        return await message.reply("*Huh, I can't block my Creator!!*");
      }

      await message.bot
        .updateBlockStatus(user, "block")
        .then(() => {
          message.react("✨", message);
        })
        .catch(() => message.reply("*_Can't block user, Sorry!!_*"));
    } catch (error) {
      await message.error(error + "\n\ncommand: block", error, false);
    }
  }
);

// Unblock User Command
smd(
  {
    cmdname: "unblock",
    info: "Unblocked user.",
    type: "bot-x",
    fromMe: true,
    filename: __filename,
  },
  async (message) => {
    try {
      let user = message.reply_message
        ? message.reply_message.sender
        : !message.isGroup
        ? message.from
        : message.mentionedJid[0]
        ? message.mentionedJid[0]
        : "";

      if (!user && !user.includes("@s.whatsapp.net")) {
        return await message.reply("*Uhh dear, reply/mention an User*");
      }

      await message.bot
        .updateBlockStatus(user, "unblock")
        .then(() =>
          message.send(
            "*@" + user.split("@")[0] + " Unblocked Successfully..!*",
            {
              mentions: [users],
            }
          )
        )
        .catch(() =>
          message.reply("*_Can't Unblock user, Make sure user blocked!!_*")
        );
    } catch (error) {
      await message.error(error + "\n\ncommand: unblock", error);
    }
  }
);
