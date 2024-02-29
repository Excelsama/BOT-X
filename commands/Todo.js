const { cmd } = require('../lib');
 let recordedMessage = '';

 cmd({
   pattern: "addtask",
   desc: "Add task to to-do list",
  fromMe:true,
   category: "𝐒𝐓𝐀𝐑",
 }, async (Void, citel, text) => {
   // Check if a message is already recorded
   if (recordedMessage === '') {
     const message = text.trim();
     recordedMessage = message;
     await citel.reply(`Task recorded: "${message}"`);
   } else {
     await citel.reply("A task is already recorded.");
   }
 });
 //-------------------------------------------------------------
 cmd({
   pattern: "deltask",
   desc: "Delete the recorded task",
   category: "𝐒𝐓𝐀𝐑",
  fromme:true
 }, async (Void, citel) => {
   recordedMessage = '';
   await citel.reply("Task expected to be completed and deleted.");
 });

 cmd({
   on: "text",
  fromMe:false,
 }, async (Void, citel, text) => {
   if (/(\baza\b|\bsend task\b|\brecordedtask\b)/i.test(text) && recordedMessage) {
     await citel.reply(recordedMessage);
   }
 });
//-------------------------------------------_______________________----------