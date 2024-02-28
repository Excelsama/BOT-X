const { cmd } = require('../lib');
 let recordedMessage = '';
let todoList = [];

function addTask(description, priority) {
  todoList.push({ description, priority });
  return `Task added: ${description} (Priority: ${priority})`;
}

function viewList() {
  if (todoList.length === 0) {
    return "Your to-do list is empty.";
  }

  let message = "Your to-do list:\n";
  todoList.forEach((task, index) => {
    message += `${index + 1}. ${task.description} (Priority: ${task.priority})\n`;
  });
  return message;
}

function removeTask(index) {
  if (isNaN(index) || index < 1 || index > todoList.length) {
    return "Invalid task index. Please provide a valid index.";
  }

  const removedTask = todoList.splice(index - 1, 1)[0];
  return `Task removed: ${removedTask.description}`;
}

cmd({
  pattern: "addtask",
  desc: "Add a task to your to-do list",
  category: "utility",
  fromMe: true,
}, async (Void, citel, text) => {
  const [description, priority] = text.trim().split("|").map(item => item.trim());
  
  if (!description || !priority) {
    await citel.reply("Invalid format. Please provide description and priority separated by '|'.");
    return;
  }

  const response = addTask(description, priority);
  await citel.reply(response);
});

cmd({
  pattern: "viewlist",
  desc: "View your to-do list",
  category: "utility",
  fromMe: true,
}, async (Void, citel) => {
  const response = viewList();
  await citel.reply(response);
});

cmd({
  pattern: "removetask",
  desc: "Remove a task from your to-do list",
  category: "utility",
  fromMe: true,
}, async (Void, citel, text) => {
  const index = parseInt(text.trim());
  const response = removeTask(index);
  await citel.reply(response);
});
```

