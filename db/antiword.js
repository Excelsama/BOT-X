const { DataTypes } = require('sequelize');
const { DATABASE } = require('../config');

const AntiWord = DATABASE.define(
 'AntiWord',
 {
  groupJid: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  word: {
   type: DataTypes.STRING,
   allowNull: false,
  },
 },
 {
  indexes: [
   {
    unique: true,
    fields: ['groupJid', 'word'],
   },
  ],
 }
);

const addAntiWord = async (groupJid, word) => {
 try {
  await AntiWord.create({
   groupJid,
   word: word.toLowerCase(),
  });
  return true;
 } catch (error) {
  if (error.name === 'SequelizeUniqueConstraintError') {
   return 'exists';
  }
  return false;
 }
};

const removeAntiWord = async (groupJid, word) => {
 const result = await AntiWord.destroy({
  where: {
   groupJid,
   word: word.toLowerCase(),
  },
 });
 return result > 0;
};

const getAntiWords = async (groupJid) => {
 const words = await AntiWord.findAll({
  where: {
   groupJid,
  },
  attributes: ['word'],
 });
 return words.map((w) => w.word);
};

module.exports = {
 AntiWord,
 addAntiWord,
 removeAntiWord,
 getAntiWords,
};
