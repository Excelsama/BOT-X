const { DataTypes } = require('sequelize');
const config = require('../../config');

const AntiSpam = config.DATABASE.define('AntiSpam', {
 groupJid: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true,
 },
 enabled: {
  type: DataTypes.BOOLEAN,
  allowNull: false,
  defaultValue: false,
 },
 kickEnabled: {
  type: DataTypes.BOOLEAN,
  allowNull: false,
  defaultValue: false,
 },
 warnEnabled: {
  type: DataTypes.BOOLEAN,
  allowNull: false,
  defaultValue: false,
 },
});

const SpamCheck = config.DATABASE.define('SpamCheck', {
 groupJid: {
  type: DataTypes.STRING,
  allowNull: false,
 },
 sender: {
  type: DataTypes.STRING,
  allowNull: false,
 },
 message: {
  type: DataTypes.STRING,
  allowNull: false,
 },
 timestamp: {
  type: DataTypes.DATE,
  allowNull: false,
 },
});

const SpamWarning = config.DATABASE.define('SpamWarning', {
 groupJid: {
  type: DataTypes.STRING,
  allowNull: false,
 },
 sender: {
  type: DataTypes.STRING,
  allowNull: false,
 },
 warningCount: {
  type: DataTypes.INTEGER,
  allowNull: false,
  defaultValue: 0,
 },
});

module.exports = {
 AntiSpam,
 SpamCheck,
 SpamWarning,
 async getAntiSpam(groupJid) {
  return await AntiSpam.findOne({
   where: { groupJid },
  });
 },
 async setAntiSpam(groupJid, enabled, kickEnabled, warnEnabled) {
  return await AntiSpam.upsert({
   groupJid,
   enabled,
   kickEnabled,
   warnEnabled,
  });
 },
 async deleteAntiSpam(groupJid) {
  return await AntiSpam.destroy({
   where: { groupJid },
  });
 },
 async addMessage(groupJid, sender, message) {
  return await SpamCheck.create({
   groupJid,
   sender,
   message,
   timestamp: new Date(),
  });
 },
 async checkSpam(groupJid, sender, message) {
  const fiveSecondsAgo = new Date(new Date() - 5000);
  const count = await SpamCheck.count({
   where: {
    groupJid,
    sender,
    message,
    timestamp: {
     [config.DATABASE.Sequelize.Op.gte]: fiveSecondsAgo,
    },
   },
  });
  return count > 0;
 },
 async addWarning(groupJid, sender) {
  const [warning, created] = await SpamWarning.findOrCreate({
   where: { groupJid, sender },
   defaults: { warningCount: 1 },
  });
  if (!created) {
   warning.warningCount += 1;
   await warning.save();
  }
  return warning.warningCount;
 },
 async resetWarnings(groupJid, sender) {
  return await SpamWarning.destroy({
   where: { groupJid, sender },
  });
 },
 async cleanupOldMessages() {
  const fiveMinutesAgo = new Date(new Date() - 5 * 60 * 1000);
  await SpamCheck.destroy({
   where: {
    timestamp: {
     [config.DATABASE.Sequelize.Op.lt]: fiveMinutesAgo,
    },
   },
  });
 },
};
