const fs = require('fs').promises;
const path = require('path');
const config = require('./config');
const connect = require('./lib/connection');
const { getandRequirePlugins } = require('./db');

global.__basedir = __dirname; // Set the base directory for the project

const readAndRequireFiles = async (directory) => {
 try {
  const files = await fs.readdir(directory);
  return Promise.all(files.filter((file) => path.extname(file).toLowerCase() === '.js').map((file) => require(path.join(directory, file))));
 } catch (error) {
  console.error('Error reading and requiring files:', error);
  throw error;
 }
};

async function initialize() {
 console.log('X-Asena');
 try {
  await readAndRequireFiles(path.join(__dirname, '/db/'));
  console.log('Syncing Database');

  await config.DATABASE.sync();

  console.log('⬇  Installing Plugins...');
  await readAndRequireFiles(path.join(__dirname, '/source/'));
  await getandRequirePlugins();
  console.log('✅ Plugins Sucessfully Installed! In BOT-X');
  return await connect();
 } catch (error) {
  console.error('Initialization error:', error);
  return process.exit(1); // Exit with error status
 }
}

initialize();