const os = require('os');
const astro_patch = require("../lib/plugins");

astro_patch.smd({
  'cmdname': "clock",
  'desc': "Clock Details",
  'react': '⏰', 
  'type': 'tools',
  'filename': __filename
}, async (context, message) => {
  try {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    let greeting = "";
    const currentDate = currentTime.toLocaleDateString();

    if (hours >= 5 && hours < 12) {
      greeting = "Good Morning!";
    } else if (hours >= 12 && hours < 18) {
      greeting = "Good Afternoon!";
    } else if (hours >= 18 && hours < 22) {
      greeting = "Good Evening!";
    } else {
      greeting = "Good Night!";
    }

    let timeContent = `👋 😄 ${greeting}\n\n`;
    timeContent += `${currentTime}\n\n`;
    timeContent += `📅 *Date:* ${currentDate}`;

    await context.send(
      "https://i.ibb.co/xCx1fFP/236-alarm-clock.gif", // Replace with your image URL
      { caption: timeContent },
      "img",
      message
    );

  } catch (error) {
    await context.error(error + "\nCommand: clock", error);
  }
});