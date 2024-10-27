const {
  tlang,
  ringtone,
  cmd,
  fetchJson,
  sleep,
  botpic,
  ffmpeg,
  getBuffer,
  pinterest,
  prefix,
  Config
} = require('../lib');
const {
  mediafire
} = require("../lib/mediafire.js");
const googleTTS = require("google-tts-api");
const ytdl = require('ytdl-secktor');
const axios = require('axios');
const fs = require('fs-extra');
// 1000 min

// 1000mb


cmd({
  pattern: "tts",
  desc: "text to speech.",
  category: "tools",
  filename: __filename,
  use: '<Hii,this is BOT-X>'
}, async (Void, citel, text) => {
  if (!text) {
    return citel.reply('Please give me a text  to change into audio,mp3.');
  }
  const ttsurl = googleTTS.getAudioUrl(text, {
    lang: "en",
    slow: false,
    host: "https://translate.google.com"
  });
  return Void.sendMessage(citel.chat, {
    audio: {
      url: ttsurl
    },
    mimetype: "audio/mpeg",
    fileName: `ttsCitelVoid.m4a`
  }, {
    quoted: citel
  });
});
//---------------------------------------------------------------------------
cmd({
  pattern: "findvideo",
  desc: "Gives descriptive info of query from youtube..",
  category: "internet",
  filename: __filename,
  use: '<yt search text>'
}, async (Void, citel, text) => {
  let yts = require("secktor-pack");
  if (!text) {
    return citel.reply(`Example : ${prefix}findvideo ${tlang().title} Batman Dancing`);
  }
  let search = await yts(text);
  let textt = "*Result*\n\n From " + text + "\n\n───────────────────\n";
  let no = 1;
  for (let i of search.all) {
    textt += `📂Title:${i.title}\n Type : ${i.type}\n⌛Duration : ${i.timestamp}\nUrl : ${i.url}\n\n──────────────\n\n`;
  }
  return Void.sendMessage(citel.chat, {
    image: {
      url: search.all[0].thumbnail
    },
    caption: textt
  }, {
    quoted: citel
  });
});
//---------------------------------------------------------------------------
cmd({
  pattern: "video",
  desc: "Downloads video ",
  category: "internet",
  filename: __filename,
  use: '<808-juice wrld >'
}, async (Void, citel, text) => {
  let yts = require("secktor-pack");
  let search = await yts(text);
  let anu = search.videos[0];
  let urlYt = anu.url;
  let infoYt = await ytdl.getInfo(urlYt);
  if (infoYt.videoDetails.lengthSeconds >= 60000) {
    return citel.reply(`😔 Video file too big!`);
  }
  let titleYt = infoYt.videoDetails.title;
  citel.reply('*Downloading:* ' + titleYt);
  const stream = ytdl(urlYt, {
    filter: info => info.itag == 22 || info.itag == 18
  }).pipe(fs.createWriteStream(`./${`${Math.floor(Math.random() * 10000)}${".mp4"}`}`));
  await new Promise((resolve, reject) => {
    stream.on("error", reject);
    stream.on("finish", resolve);
  });
  let stats = fs.statSync(`./${`${Math.floor(Math.random() * 10000)}${".mp4"}`}`);
  let fileSizeInBytes = stats.size;
  let fileSizeInMegabytes = fileSizeInBytes / 1048576;
  if (fileSizeInMegabytes <= 1000) {
    let buttonMessage = {
      video: fs.readFileSync(`./${`${Math.floor(Math.random() * 10000)}${".mp4"}`}`),
      jpegThumbnail: log0,
      mimetype: 'video/mp4',
      fileName: `${titleYt}.mp4`,
      caption: ` ⿻ Title : ${titleYt}\n ⿻ File Size : ${fileSizeInMegabytes} MB`,
      headerType: 4,
      contextInfo: {
        externalAdReply: {
          title: titleYt,
          body: citel.pushName,
          thumbnail: await getBuffer(search.all[0].thumbnail),
          renderLargerThumbnail: true,
          mediaType: 2,
          mediaUrl: search.all[0].thumbnail,
          sourceUrl: search.all[0].thumbnail
        }
      }
    };
    Void.sendMessage(citel.chat, buttonMessage, {
      quoted: citel
    });
    return fs.unlinkSync(`./${`${Math.floor(Math.random() * 10000)}${".mp4"}`}`);
  } else {
    citel.reply(`😔 File size bigger than 100mb.`);
  }
  return fs.unlinkSync(`./${`${Math.floor(Math.random() * 10000)}${".mp4"}`}`);
});
//---------------------------------------------------------------------------
cmd({
  pattern: "apk",
  desc: "Downloads apks",
  category: "Tools",
  filename: __filename,
  use: '<add sticker url.>'
}, async (Void, citel, text) => {
  if (!text) {
    return citel.reply("*Give me App Name*");
  }
  // fs.createWriteStream(`./${randomName}`)
  const {
    search,
    download
  } = require('aptoide-scraper');
  let searc = await search(text); //console.log(searc);
  let data = {};
  if (searc.length) {
    data = await download(searc[0].id);
  } else {
    return citel.send("*APP not Found, Try Other Name*");
  }
  const apkSize = parseInt(data.size);
  if (apkSize > 150) {
    return citel.send(`❌ File size bigger than 200mb.`);
  }
  const url = data.dllink;
  let inf = "*App Name :* " + data.name;
  inf += "\n*App id        :* " + data.package;
  inf += "\n*Last Up       :* " + data.lastup;
  inf += "\n*App Size     :* " + data.size;
  // inf +="\n*App Link     :* " +data.dllink;
  inf += "\n\n ";
  axios.get(url, {
    responseType: 'stream'
  }).then(response => {
    const writer = fs.createWriteStream(`./${`${Math.floor(Math.random() * 10000)}${".apk"}`}`);
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  }).then(() => {
    let buttonMessage = {
      document: fs.readFileSync(`./${`${Math.floor(Math.random() * 10000)}${".apk"}`}`),
      mimetype: 'application/vnd.android.package-archive',
      fileName: data.name + `.apk`,
      caption: inf
    };
    Void.sendMessage(citel.chat, buttonMessage, {
      quoted: citel
    });
    console.log('File downloaded successfully');
    fs.unlink(`./${`${Math.floor(Math.random() * 10000)}${".apk"}`}`, err => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully');
      }
    });
  }).catch(error => {
    fs.unlink(`./${`${Math.floor(Math.random() * 10000)}${".apk"}`}`);
    return citel.reply('*Apk not Found, Sorry*'); //:', error.message);
  });
});
//-------------------------------------------------------------------------------
cmd({
  pattern: "songinfo",
  desc: "Sends info about the query(of youtube video/audio).",
  category: "internet",
  filename: __filename,
  use: '<faded-Alan walker.>'
}, async (Void, citel, text) => {
  if (!text) {
    return citel.reply(`Use ${command} Back in Black`);
  }
  let yts = require("secktor-pack");
  let search = await yts(text);
  let anu = search.videos[0];
  let buttonMessage = {
    image: {
      url: anu.thumbnail
    },
    caption: `
╔═════════•∞•═╗
│⿻ ${tlang().title} 
│  *Youtube Player* ✨
│⿻ *Title:* ${anu.title}
│⿻ *Duration:* ${anu.timestamp}
│⿻ *Viewers:* ${anu.views}
│⿻ *Uploaded:* ${anu.ago}
│⿻ *Author:* ${anu.author.name}
╚═•∞•═════════╝
⦿ *Url* : ${anu.url}
`,
    footer: tlang().footer,
    headerType: 4
  };
  return Void.sendMessage(citel.chat, buttonMessage, {
    quoted: citel
  });
});
//---------------------------------------------------------------------------
cmd({
  pattern: "ringtone",
  desc: "Downloads ringtone.",
  category: "internet",
  filename: __filename,
  use: '<ringtone name>'
}, async (Void, citel, text) => {
  if (!text) {
    return citel.reply(`Example: ${prefix}ringtone back in black`);
  }
  let anu = await ringtone(text);
  let result = anu[Math.floor(Math.random() * anu.length)];
  return Void.sendMessage(citel.chat, {
    audio: {
      url: result.audio
    },
    fileName: result.title + '.mp3',
    mimetype: 'audio/mpeg'
  }, {
    quoted: citel
  });
});
//---------------------------------------------------------------------------
cmd({
  pattern: "pinterest",
  desc: "Downloads image from pinterest.",
  category: "internet",
  filename: __filename,
  use: '<text|image name>'
}, async (Void, citel, text) => {
  if (!text) {
    return reply("What picture are you looking for?") && Void.sendMessage(citel.chat, {
      react: {
        text: '❌',
        key: citel.key
      }
    });
  }
  try {
    anu = await pinterest(text);
    result = anu[Math.floor(Math.random() * anu.length)];
    let buttonMessage = {
      image: {
        url: result
      },
      caption: ` `,
      footer: tlang().footer,
      headerType: 4,
      contextInfo: {
        externalAdReply: {
          title: `Here you go✨`,
          body: `${Config.ownername}`,
          thumbnail: log0,
          mediaType: 2,
          mediaUrl: ``,
          sourceUrl: ``
        }
      }
    };
    return Void.sendMessage(citel.chat, buttonMessage, {
      quoted: citel
    });
  } catch (e) {
    console.log(e);
  }
});
//---------------------------------------------------------------------------
cmd({
  pattern: "mediafire",
  desc: "Downloads zip from Mediafire.",
  category: "tools",
  filename: __filename,
  use: '<url of mediafire>'
}, async (Void, citel, text) => {
  if (!text) {
    return citel.reply(`Give link ${tlang().greet}`);
  }
  if (!isUrl(text.split(" ")[0]) && !text.split(" ")[0].includes("mediafire.com")) {
    return reply(`The link you provided is invalid`);
  }
  const baby1 = await mediafire(text);
  if (baby1[0].size.split("MB")[0] >= 999) {
    return reply("*File Over Limit* " + util.format(baby1));
  }
  reply(`${`*ᴵᶻᵁᴷᵁ Mᴇᴅɪᴀғɪʀᴇ Dᴏᴡɴʟᴏᴀᴅᴇʀ*
*Nᴀᴍᴇ* : ${baby1[0].nama}
*Sɪᴢᴇ* : ${baby1[0].size}
*Mɪᴍᴇ* : ${baby1[0].mime}
*Lɪɴᴋ* : ${baby1[0].link}`}`);
  return Void.sendMessage(citel.chat, {
    document: {
      url: baby1[0].link
    },
    fileName: baby1[0].nama,
    mimetype: baby1[0].mime
  }, {
    quoted: citel
  }).catch(err => reply("could not find anything"));
});
//---------------------------------------------------------------------------
cmd({
  pattern: "play",
  alias: ['song'],
  desc: "Downloads audio from youtube.",
  category: "internet",
  filename: __filename,
  use: '<text>'
}, async (Void, citel, text) => {
  let yts = require("secktor-pack");
  let search = await yts(text);
  let anu = search.videos[0];
  let infoYt = await ytdl.getInfo(anu.url);
  if (infoYt.videoDetails.lengthSeconds >= 60000) {
    return citel.reply(`😔 Video file too big!`);
  }
  let titleYt = infoYt.videoDetails.title;
  citel.reply('*Downloadig:* ' + titleYt);
  const stream = ytdl(anu.url, {
    filter: info => info.audioBitrate == 160 || info.audioBitrate == 128
  }).pipe(fs.createWriteStream(`./${`${Math.floor(Math.random() * 10000)}${".mp3"}`}`));
  await new Promise((resolve, reject) => {
    stream.on("error", reject);
    stream.on("finish", resolve);
  });
  let stats = fs.statSync(`./${`${Math.floor(Math.random() * 10000)}${".mp3"}`}`);
  let fileSizeInBytes = stats.size;
  let fileSizeInMegabytes = fileSizeInBytes / 1048576;
  if (fileSizeInMegabytes <= 1000) {
    let buttonMessage = {
      audio: fs.readFileSync(`./${`${Math.floor(Math.random() * 10000)}${".mp3"}`}`),
      mimetype: 'audio/mpeg',
      fileName: titleYt + ".mp3",
      headerType: 4,
      contextInfo: {
        externalAdReply: {
          title: titleYt,
          body: citel.pushName,
          renderLargerThumbnail: true,
          thumbnailUrl: search.all[0].thumbnail,
          mediaUrl: text,
          mediaType: 1,
          thumbnail: await getBuffer(search.all[0].thumbnail),
          sourceUrl: text
        }
      }
    };
    await Void.sendMessage(citel.chat, buttonMessage, {
      quoted: citel
    });
    return fs.unlinkSync(`./${`${Math.floor(Math.random() * 10000)}${".mp3"}`}`);
  } else {
    citel.reply(`❌ File size bigger than 100mb.`);
  }
  fs.unlinkSync(`./${`${Math.floor(Math.random() * 10000)}${".mp3"}`}`);
});
//---------------------------------------------------------------------------

cmd({
  pattern: "dlvid",
  desc: "Downloads video from youtube.",
  category: "internet",
  filename: __filename,
  use: '<dlvid url>'
}, async (Void, citel, text) => {
  if (!text) {
    citel.reply(`❌Please provide me a url`);
    return;
  }
  try {
    if (!text.startsWith("http")) {
      return citel.reply(`❌ Give youtube link!`);
    }
    let infoYt = await ytdl.getInfo(text);
    if (infoYt.videoDetails.lengthSeconds >= 60000) {
      return citel.reply(`❌ Video file too big!`);
    }
    let titleYt = infoYt.videoDetails.title;
    const stream = ytdl(text, {
      filter: info => info.itag == 22 || info.itag == 18
    }).pipe(fs.createWriteStream(`./${`${Math.floor(Math.random() * 10000)}${".mp4"}`}`));
    await new Promise((resolve, reject) => {
      stream.on("error", reject);
      stream.on("finish", resolve);
    });
    let stats = fs.statSync(`./${`${Math.floor(Math.random() * 10000)}${".mp4"}`}`);
    let fileSizeInBytes = stats.size;
    let fileSizeInMegabytes = fileSizeInBytes / 1048576;
    if (fileSizeInMegabytes <= 1000) {
      let yts = require("secktor-pack");
      let search = await yts(text);
      let buttonMessage = {
        video: fs.readFileSync(`./${`${Math.floor(Math.random() * 10000)}${".mp4"}`}`),
        jpegThumbnail: log0,
        mimetype: 'video/mp4',
        fileName: `${titleYt}.mp4`,
        caption: ` ⿻ Title : ${titleYt}\n ⿻ File Size : ${fileSizeInMegabytes} MB`,
        headerType: 4,
        contextInfo: {
          externalAdReply: {
            title: titleYt,
            body: citel.pushName,
            thumbnail: await getBuffer(search.all[0].thumbnail),
            renderLargerThumbnail: true,
            mediaType: 2,
            mediaUrl: search.all[0].thumbnail,
            sourceUrl: search.all[0].thumbnail
          }
        }
      };
      Void.sendMessage(citel.chat, buttonMessage, {
        quoted: citel
      });
      return fs.unlinkSync(`./${`${Math.floor(Math.random() * 10000)}${".mp4"}`}`);
    } else {
      citel.reply(`❌ File size bigger than 100mb.`);
    }
    return fs.unlinkSync(`./${`${Math.floor(Math.random() * 10000)}${".mp4"}`}`);
  } catch (e) {
    console.log(e);
  }
});
//---------------------------------------------------------------------------
cmd({
  pattern: "dlaudio",
  desc: "Downloads audio by yt link.",
  category: "downloader",
  use: '<dlaudio url>'
}, async (Void, citel, text) => {
  if (text.length === 0) {
    reply(`❌ URL is empty! \nSend ${prefix}ytmp3 url`);
    return;
  }
  try {
    if (!text.startsWith("http")) {
      citel.reply(`❌ Give youtube link!`);
      return;
    }
    let infoYt = await ytdl.getInfo(text);
    //30 MIN
    if (infoYt.videoDetails.lengthSeconds >= 60000) {
      reply(`❌ I can't download that long video!`);
      return;
    }
    let titleYt = infoYt.videoDetails.title;
    const stream = ytdl(text, {
      filter: info => info.audioBitrate == 160 || info.audioBitrate == 128
    }).pipe(fs.createWriteStream(`./${`${Math.floor(Math.random() * 10000)}${".mp3"}`}`));
    await new Promise((resolve, reject) => {
      stream.on("error", reject);
      stream.on("finish", resolve);
    });
    let stats = fs.statSync(`./${`${Math.floor(Math.random() * 10000)}${".mp3"}`}`);
    let fileSizeInBytes = stats.size;
    let fileSizeInMegabytes = fileSizeInBytes / 1048576;
    if (fileSizeInMegabytes <= 1000) {
      let yts = require("secktor-pack");
      let search = await yts(text);
      let buttonMessage = {
        audio: fs.readFileSync(`./${`${Math.floor(Math.random() * 10000)}${".mp3"}`}`),
        mimetype: 'audio/mpeg',
        fileName: titleYt + ".mp3",
        headerType: 4,
        contextInfo: {
          externalAdReply: {
            title: titleYt,
            body: citel.pushName,
            renderLargerThumbnail: true,
            thumbnailUrl: search.all[0].thumbnail,
            mediaUrl: text,
            mediaType: 1,
            thumbnail: await getBuffer(search.all[0].thumbnail),
            sourceUrl: text
          }
        }
      };
      await Void.sendMessage(citel.chat, buttonMessage, {
        quoted: citel
      });
      return fs.unlinkSync(`./${`${Math.floor(Math.random() * 10000)}${".mp3"}`}`);
    } else {
      citel.reply(`❌ File size bigger than 100mb.`);
    }
    fs.unlinkSync(`./${`${Math.floor(Math.random() * 10000)}${".mp3"}`}`);
  } catch (e) {
    console.log(e);
  }
});
//---------------------------------------------------------------------------
cmd({
  pattern: "tiktok",
  desc: "Download TikTok video",
  category: "internet",
  filename: __filename
}, async (Void, citel, match) => {
  try {
    let tikTokUrl = match.trim();
    if (!tikTokUrl) {
      return citel.reply('Please provide a TikTok video URL to download.');
    }
    let response = await axios.get(`https://api.maher-zubair.tech/download/tiktok2?url=${encodeURIComponent(tikTokUrl)}`);
    let data = response.data;
    if (data && data.result) {
      let {
        title,
        thumbnail,
        video
      } = data.result;
      let videoUrl = video[0];
      await Void.sendMessage(citel.chat, {
        video: {
          url: videoUrl
        },
        caption: `*Title:* ${title}`,
        contextInfo: {
          externalAdReply: {
            title: title,
            body: 'Touch here.',
            renderLargerThumbnail: true,
            thumbnailUrl: thumbnail,
            mediaType: 2,
            mediaUrl: videoUrl,
            sourceUrl: videoUrl
          }
        }
      });
    } else {
      await Void.sendMessage(citel.chat, {
        text: '*No result found.*',
        options: {
          isBold: true
        }
      });
    }
  } catch (error) {
    await Void.sendMessage(citel.chat, {
      text: `*An error occurred:* ${error.message || error}`,
      options: {
        isBold: true
      }
    });
  }
});