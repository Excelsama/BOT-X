const { command } = require('../lib');

command(
 {
  pattern: 'button',
  
  desc: 'Send a button message',
  usage: '#button <text>',
  type: 'message',
 },
 async (message, match, m) => {
  // Define the button options
  const buttons = [
   {
    type: 'reply',
    params: {
     display_text: '.ping', // Button display text
     id: 'option1', // Button ID
    },
   },
   {
    type: 'reply',
    params: {
     display_text: '.list', // Button display text
     id: 'option2', // Button ID
    },
   },
  ];
  const content = {
   header: {
    title: 'Welcome to Our Service',
    subtitle: 'Please choose an option below:', 
    hasMediaAttachment: false,
   },
   footer: {
    text: 'Footer Text Here',
   },
   body: {
    text: match[1] || 'What would you like to do?', 
   },
   button: buttons,
  };

  // Send the interactive button message
  try {
   await message.sendInteractive(content);
   console.log('Button message sent successfully');
  } catch (error) {
   console.error('Error sending button message:', error);
  }
 }
);
