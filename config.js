const { Sequelize } = require('sequelize');
require('dotenv').config();

const toBool = (x) => x === 'true';
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
 LOGS: toBool(process.env.LOGS || 'true'),
 SESSION_ID: process.env.SESSION_ID || '',
 PREFIX: process.env.HANDLER || '*',
 WARN_COUNT: 3,
 SUDO: process.env.SUDO || '2347045035241',
 AUTO_READ: toBool(process.env.AUTO_READ || 'false'),
 AUTO_STATUS_READ: toBool(process.env.AUTO_STATUS_READ || 'false'),
 WORK_TYPE: process.env.WORK_TYPE || 'private',
 ANTI_DELETE: process.env.ANTI_DELETE || true,
 DATABASE_URL: DB_URL,
 DATABASE: sequelize,
};