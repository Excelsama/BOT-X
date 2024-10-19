const { DataTypes } = require('sequelize');
const { DATABASE } = require('../../config');

const AutoReact = DATABASE.define('AutoReact', {
 chatJid: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true,
 },
 emojis: {
  type: DataTypes.TEXT,
  allowNull: false,
  defaultValue: '👍,😊,❤️,🎉,👌',
  get() {
   const rawValue = this.getDataValue('emojis');
   return rawValue ? rawValue.split(',') : [];
  },
  set(val) {
   this.setDataValue('emojis', Array.isArray(val) ? val.join(',') : val);
  },
 },
 isEnabled: {
  type: DataTypes.BOOLEAN,
  allowNull: false,
  defaultValue: false,
 },
});

const getAutoReactSettings = async (chatJid) => {
 const [settings] = await AutoReact.findOrCreate({
  where: {
   chatJid,
  },
  defaults: {
   chatJid,
   isEnabled: false,
  },
 });
 return settings;
};

const setAutoReactSettings = async (chatJid, isEnabled, emojis = null) => {
 const [settings] = await AutoReact.findOrCreate({
  where: {
   chatJid,
  },
  defaults: {
   chatJid,
   isEnabled,
   emojis: emojis || '👍,😊,❤️,🎉,👌',
  },
 });
 settings.isEnabled = isEnabled;
 if (emojis) settings.emojis = emojis;
 await settings.save();
 return settings;
};

module.exports = {
 AutoReact,
 getAutoReactSettings,
 setAutoReactSettings,
};
