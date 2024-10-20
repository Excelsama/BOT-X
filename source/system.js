const { tiny } = require('xstro');
const { command, commands, runtime } = require('../lib');

command(
 {
  pattern: 'ping',
  desc: 'To check ping',
  type: 'system',
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
  description: 'Show All Commands',
  dontAddCommandList: true,
 },
 async (message) => {
  const { prefix, sender } = message;
  const currentTime = new Date().toLocaleTimeString('en-IN', {
   timeZone: process.env.TZ,
  });
  const currentDay = new Date().toLocaleDateString('en-US', {
   weekday: 'long',
  });
  const currentDate = new Date().toLocaleDateString('en-IN', {
   timeZone: process.env.TZ,
  });
  let menuText = `\`\`\`╭─ xstro-md ───
│ Prefix: ${prefix}
│ User: ${sender}
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

  Object.keys(categorized).forEach((category) => {
   menuText += `\n╭── *${category}* ────\n│ ${categorized[category].join('\n│ ')}\n╰──────────────\n`;
  });
  return await message.send('https://img.freepik.com/free-photo/astronaut-diving-ocean_23-2151549771.jpg', { caption: tiny(menuText) });
 }
);

command(
 {
  pattern: 'list',
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
  return await message.send(tiny(commandListText));
 }
);
