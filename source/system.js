const { PluginDB, installPlugin } = require('../db');
const { command, commands } = require('../lib');
const { runtime } = require('../utils');
const axios = require('axios');
const fs = require('fs');

command(
 {
  pattern: 'ping',
  fromMe: false,
  desc: 'To check ping',
  type: 'user',
 },
 async (message, match) => {
  const start = new Date().getTime();
  const init = await message.reply('```Ping!```');
  const end = new Date().getTime();
  return await init.edit('*Pong!*\n ```' + (end - start) + '``` *ms*');
 }
);

command(
 {
  pattern: 'menu',
  fromMe: false,
  description: 'Show All Commands',
  dontAddCommandList: true,
 },
 async (message, match, m, client) => {
  const { prefix, pushName } = message;
  const currentTime = new Date().toLocaleTimeString('en-IN', {
   timeZone: process.env.TZ,
  });
  const currentDay = new Date().toLocaleDateString('en-US', {
   weekday: 'long',
  });
  const currentDate = new Date().toLocaleDateString('en-IN', {
   timeZone: process.env.TZ,
  });
  let menuText = `\`\`\`╭─ wa ───
│ Prefix: ${prefix}
│ User: ${pushName}
│ Plugins: ${commands.length}
│ Runtime: ${runtime(process.uptime())}
│ Time: ${currentTime}
│ Day: ${currentDay}
│ Date: ${currentDate}
│ Version: ${require('../package.json').version}
╰────────────────\`\`\`\n`;

  const categorized = commands
   .filter((cmd) => cmd.pattern && !cmd.dontAddCommandList)
   .map((cmd) => ({
    name: cmd.pattern.toString().split(/\W+/)[2],
    category: cmd.type?.toLowerCase() || 'misc',
   }))
   .reduce((acc, { name, category }) => {
    acc[category] = (acc[category] || []).concat(name);
    return acc;
   }, {});

  Object.keys(categorized)
   .sort()
   .forEach((category) => {
    menuText += `\n╭── *${category}* ────\n│ ${categorized[category].sort().join('\n│ ')}\n╰──────────────\n`;
   });
  return message.send(menuText);
 }
);

command(
 {
  pattern: 'list',
  fromMe: false,
  description: 'Show All Commands',
  dontAddCommandList: true,
 },
 async (message) => {
  let commandListText = '*about commands*\n';
  const commandList = [];
  commands.forEach((command) => {
   if (command.pattern && !command.dontAddCommandList) {
    const commandName = command.pattern.toString().split(/\W+/)[2];
    const description = command.desc || command.info || 'No description available';
    commandList.push({
     name: commandName,
     description,
    });
   }
  });
  commandList.sort((a, b) => a.name.localeCompare(b.name));
  commandList.forEach(({ name, description }, index) => {
   commandListText += `\`\`\`${index + 1} ${name.trim()}\`\`\`\n`;
   commandListText += `Use: \`\`\`${description}\`\`\`\n\n`;
  });
  return await message.reply(commandListText);
 }
);

command(
 {
  pattern: 'install',
  fromMe: true,
  desc: 'Installs external plugins',
  type: 'system',
 },
 async (message, match) => {
  if (!match) return message.reply('_Send a plugin URL_');

  try {
   let url = new URL(match);
   if (url.host === 'gist.github.com') url = url.toString().replace('gist.github.com', 'gist.githubusercontent.com') + '/raw';

   const { data } = await axios.get(url.toString());
   const plugin_name = data.match(/pattern: ['"](.*?)['"]/)?.[1]?.split(' ')[0] || '__' + Math.random().toString(36).slice(2);

   const path = `${__dirname}/${plugin_name}.js`;
   fs.writeFileSync(path, data);

   try {
    require(path);
    await installPlugin(url, plugin_name);
    message.sendMessage(message.jid, `_Plugin installed: ${plugin_name}_`);
   } catch (e) {
    fs.unlinkSync(path);
    message.sendMessage(message.jid, `Invalid plugin\n\`\`\`${e}\`\`\``);
   }
  } catch (e) {
   message.sendMessage(message.jid, '_Failed to fetch plugin_');
  }
 }
);

command(
 {
  pattern: 'plugins',
  fromMe: true,
  desc: 'Plugin list',
  type: 'system',
 },
 async (message) => {
  const plugins = await PluginDB.findAll();
  const list = plugins.length ? plugins.map((p) => `\`\`\`${p.name}\`\`\`: ${p.url}`).join('\n') : '_No plugins installed_';
  message.sendMessage(message.jid, list);
 }
);

command(
 {
  pattern: 'remove',
  fromMe: true,
  desc: 'Remove external plugins',
  type: 'system',
 },
 async (message, match) => {
  if (!match) return message.sendMessage(message.jid, '_Provide plugin name_');

  const plugin = await PluginDB.findOne({ where: { name: match } });
  if (!plugin) return message.sendMessage(message.jid, '_Plugin not found_');

  const path = `${__dirname}/${match}.js`;
  plugin.destroy();
  delete require.cache[require.resolve(path)];
  fs.unlinkSync(path);
  message.sendMessage(message.jid, `Plugin ${match} deleted`);
 }
);
