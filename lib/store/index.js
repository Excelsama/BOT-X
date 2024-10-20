const { getAntiLink, setAntiLink, deleteAntiLink } = require('./antilink');
const { AntiWord, UserWarning, addAntiWord, removeAntiWord, getAntiWords, checkAntiwordEnabled, addUserWarning, resetUserWarnings, getUserWarningCount } = require('./antiword');
const { getAutoReactSettings, setAutoReactSettings } = require('./autoreact');
const { getFilter, setFilter, deleteFilter } = require('./filters');
const { getPausedChats, savePausedChat, deleteAllPausedChats, PausedChats } = require('./chats');
const { saveMessage, loadMessage, saveChat, getName } = require('./store');
const { getWarns, saveWarn, resetWarn } = require('./warn');
const { setMessage, getMessage, delMessage, toggleStatus, getStatus } = require('./greetings');
const { AntiSpam, SpamCheck, getAntiSpam, setAntiSpam, deleteAntiSpam, addMessage, checkSpam, cleanupOldMessages, addWarning, resetWarnings } = require('./antispam');
module.exports = {
 getAntiLink,
 setAntiLink,
 deleteAntiLink,
 AntiWord,
 UserWarning,
 addAntiWord,
 removeAntiWord,
 getAntiWords,
 checkAntiwordEnabled,
 addUserWarning,
 resetUserWarnings,
 getUserWarningCount,
 getAutoReactSettings,
 setAutoReactSettings,
 getFilter,
 setFilter,
 deleteFilter,
 getPausedChats,
 savePausedChat,
 PausedChats,
 deleteAllPausedChats,
 saveMessage,
 loadMessage,
 saveChat,
 getName,
 getWarns,
 saveWarn,
 resetWarn,
 setMessage,
 getMessage,
 delMessage,
 toggleStatus,
 getStatus,
 AntiSpam,
 SpamCheck,
 getAntiSpam,
 setAntiSpam,
 deleteAntiSpam,
 addMessage,
 checkSpam,
 cleanupOldMessages,
 addWarning,
 resetWarnings,
}