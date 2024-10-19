const getDeletedMsg = require('./delete');
const { createSession } = require('./session');

module.exports = {
 Handler: require('./message'),
 Greetings: require('./group'),
 getDeletedMsg,
 createSession,
};
