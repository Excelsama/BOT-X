const { cmd } = require('../lib');
 let recordedMessage = '';

 cmd({
  pattern: "addtask",
  desc: "Add a task to your to-do list",
  category: "utility",
  fromMe: true,
}, async (Void, citel, text) => {
  const taskDescription = text.trim();
  
  if (!taskDescription) {
    await citel.reply("Invalid format. Please provide a task description.");
    return;
  }

  todoList.push(taskDescription);
  await citel.reply(`Task added: ${taskDescription}`);
});

cmd({
  pattern: "viewlist",
  desc: "View your to-do list",
  category: "utility",
  fromMe: true,
}, async (Void, citel) => {
  if (todoList.length === 0) {
    await citel.reply("Your to-do list is empty.");
    return;
  }

  let message = "Your to-do list:\n";
  todoList.forEach((task, index) => {
    message += `${index + 1}. ${task}\n`;
  });
  await citel.reply(message);
});

cmd({
  pattern: "removetask",
  desc: "Remove a task from your to-do list",
  category: "utility",
  fromMe: true,
}, async (Void, citel, text) => {
  const index = parseInt(text.trim());
  if (isNaN(index) || index < 1 || index > todoList.length) {
    await citel.reply("Invalid task index. Please provide a valid index.");
    return;
  }

  const removedTask = todoList.splice(index - 1, 1)[0];
  await citel.reply(`Task removed: ${removedTask}`);
});

