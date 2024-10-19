const fs = require('fs');
const axios = require('axios');
const path = require('path');
const unzipper = require('unzipper');
const { delay } = require('baileys');

const BASE_URL = 'https://session-manager-x9wf.onrender.com';

/**
 * Downloads Session from the server using an access key and extracts specific files.
 * @param {string} accessKey - The access key for downloading the file.
 * @returns {Promise<void>} - No return value. Logs success or failure to the console.
 */
const createSession = async (accessKey) => {
 const response = await axios.get(`${BASE_URL}/download/${accessKey}`, {
  responseType: 'arraybuffer', // To handle binary data
 });
 const fileName = `downloaded_${accessKey}.zip`;
 const filePath = path.join(__dirname, fileName);
 fs.writeFileSync(filePath, response.data);
 console.log('Extracting files...');
 delay(3000);
 const extractPath = path.join(__dirname, '..', 'session');
 fs.mkdirSync(extractPath, { recursive: true });

 fs
  .createReadStream(filePath)
  .pipe(unzipper.Parse())
  .on('entry', (entry) => {
   const entryPath = entry.path;
   if (entryPath.endsWith('.json') || entryPath === 'creds.json' || entryPath.startsWith('app-state')) {
    entry.pipe(fs.createWriteStream(path.join(extractPath, path.basename(entryPath))));
   } else {
    entry.autodrain();
   }
  })
  .promise()
  .then(() => {
   console.log(`Session Created`);
   delay(3000);
   fs.unlinkSync(filePath);
  })
  .catch((err) => {
   console.error('Error during extraction:', err);
  });
};

module.exports = { createSession };
