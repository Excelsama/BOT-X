const fs = require('fs-extra');
if (fs.existsSync('config.env')) require('dotenv').config({ path: __dirname + '/config.env' });

//═══════[Required Variables]════════\\
global.owner = process.env.OWNER_NUMBER || '2347045035241';  
global.mongodb = process.env.MONGODB_URI || "mongodb+srv://Xcelsama:Xcel@xcelsama.qpklf.mongodb.net/?retryWrites=true&w=majority&appName=Xcelsama";
global.port = process.env.PORT || 5000;
global.email = 'ms.excel.amadi@gmail.com';
global.github = 'https://github.com/Excelsama/BOT-X';
global.location = 'Rivers Nigeria';
global.gurl = 'https://instagram.com/xcel_sama/'; 
global.sudo = process.env.SUDO || "2347045035241";
global.devs = '2347045035241';
global.website = 'https://github.com/Excelsama/BOT-X';
global.THUMB_IMAGE = process.env.THUMB_IMAGE || 'https://telegra.ph/file/3f3ae4aace2d012c11509.jpg';

module.exports = {
  sessionName: process.env.SESSION_ID || "",  // Put Your Session ID Here
  author: process.env.PACK_AUTHER || 'xcelsama',
  packname: process.env.PACK_NAME || 'BOT-X',

  botname: process.env.BOT_NAME || "BOT-X",
  ownername: process.env.OWNER_NAME || 'Excel',

  auto_read_status: process.env.AUTO_READ_STATUS || true,
  autoreaction: process.env.AUTO_REACTION || false,
  antibadword: process.env.ANTI_BAD_WORD || 'nbwoed',
  alwaysonline: process.env.ALWAYS_ONLINE || false,
  antifake: process.env.FAKE_COUNTRY_CODE || '234',
  readmessage: process.env.READ_MESSAGE || false,
  auto_status_saver: process.env.AUTO_STATUS_SAVER || false,
  HANDLERS: process.env.PREFIX || '*',
  warncount: process.env.WARN_COUNT || 3,
  disablepm: process.env.DISABLE_PM || false,
  levelupmessage: process.env.LEVEL_UP_MESSAGE || false,
  antilink: process.env.ANTILINK_VALUES || 'chat.whatsapp.com',
  antilinkaction: process.env.ANTILINK_ACTION || 'remove',

  BRANCH: 'main',
  ALIVE_MESSAGE: process.env.ALIVE_MESSAGE || '',
 autobio: process.env.AUTO_BIO || false,
 caption: process.env.CAPTION || "",
 OPENAI_API_KEY: process.env.OPENAI_API_KEY || false,
 heroku: process.env.heroku || false,
 HEROKU: {
 HEROKU: process.env.HEROKU || false,
 API_KEY: process.env.HEROKU_API_KEY || '',
 APP_NAME: process.env.HEROKU_APP_NAME || ''
  },

  VERSION: process.env.VERSION || 'v2.0',
  LANG: process.env.configmenu|| 'BOT-X,
  WORKTYPE: process.env.WORKTYPE || 'public'
};

// Watch for file changes and reload
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(`Updated '${__filename}'`);
  delete require.cache[file];
  require(file);
});
