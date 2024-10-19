const config = require('../config');
var commands = [];

function command(cmdInfo, func) {
 cmdInfo.function = func;
 cmdInfo.pattern = new RegExp(`^(${config.PREFIX})\\s*(${cmdInfo.pattern})(?:\\s+(.*))?$`, 'i');
 cmdInfo.dontAddCommandList = cmdInfo.dontAddCommandList || false;
 cmdInfo.type = cmdInfo.type || 'misc';
 commands.push(cmdInfo);
 return cmdInfo;
}

module.exports = {
 command,
 commands,
};
