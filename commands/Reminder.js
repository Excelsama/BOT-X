const { cmd } = require('../lib');
let reminders = [];

cmd({
  pattern: "setreminder",
  desc: "Set a reminder for yourself",
  category: "utility",
  fromMe: true,
}, async (Void, citel, text) => {
  const [timeString, ...messageParts] = text.trim().split(" ");
  const timeInMinutes = parseInt(timeString);
  const message = messageParts.join(" ");

  if (isNaN(timeInMinutes)) {
    await citel.reply("Invalid time format. Please use a number followed by 'm' for minutes.");
    return;
  }

  const currentTime = new Date();
  const triggerTime = new Date(currentTime.getTime() + timeInMinutes * 60000); // Convert minutes to milliseconds

  reminders.push({ message, triggerTime });

  await citel.reply(`Reminder set: "${message}" in ${timeInMinutes} minutes.`);
});
//-------------------------------------------------------------
cmd({
  pattern: "delreminder",
  desc: "Delete all your reminders",
  category: "utility",
  fromMe: true,
}, async (Void, citel) => {
  reminders = [];
  await citel.reply("All reminders deleted.");
});

setInterval(() => {
  const currentTime = new Date();
  const triggeredReminders = reminders.filter(reminder => reminder.triggerTime <= currentTime);
  
  for (const reminder of triggeredReminders) {
    // Send reminder message to user
    // Here you would implement the functionality to send the reminder message to the user
    // For simplicity, I'll just log it for demonstration
    console.log("Reminder:", reminder.message);

    // Remove triggered reminder from the list
    reminders = reminders.filter(r => r !== reminder);
  }
}, 60000); // Check every minute for triggered reminders