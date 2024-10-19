const { DataTypes } = require('sequelize');
const config = require('../../config');

const AntiLink = config.DATABASE.define('AntiLink', {
 groupJid: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true,
 },
 mode: {
  type: DataTypes.ENUM('delete', 'kick'),
  allowNull: false,
 },
});

module.exports = {
 AntiLink,
 async getAntiLink(groupJid) {
  return await AntiLink.findOne({
   where: {
    groupJid,
   },
  });
 },
 async setAntiLink(groupJid, mode) {
  return await AntiLink.upsert({
   groupJid,
   mode,
  });
 },
 async deleteAntiLink(groupJid) {
  return await AntiLink.destroy({
   where: {
    groupJid,
   },
  });
 },
};
