const { Sequelize } = require('sequelize');
require('dotenv').config();
const env = (key, def) => process.env[key] || def;
const DB_URL = env('DATABASE_URL', './database.db');

let sequelize;
if (DB_URL === './database.db' || !DB_URL.startsWith('postgres://')) {
 sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.db',
  logging: false,
 });
} else {
 sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  ssl: true,
  dialectOptions: {
   ssl: { require: true, rejectUnauthorized: false },
  },
  logging: false,
 });
}

module.exports = {
 LOGS: process.env.LOGS || true,
 SESSION_ID: process.env.SESSION_ID || '',
 PREFIX: process.env.HANDLER || '.',
 ANTI_CALL: process.env.ANTI_CALL || 'false', // 'true' | 'false' | 'block'
 WARN_COUNT: 3,
 SUDO: process.env.SUDO || '',
 AUTO_READ_MESSAGE: process.env.AUTO_READ || false,
 AUTO_STATUS_READ: process.env.AUTO_STATUS_READ || true,
 PRESENCE_UPDATE: process.env.PRESENCE_UPDATE || 'recording', // 'available' | 'unavailable' | 'composing'  |'recording' | 'paused'
 WORK_TYPE: process.env.WORK_TYPE || 'private',
 DATABASE_URL: DB_URL,
 DATABASE: sequelize,
};
