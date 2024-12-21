const os = require("os");
const Config = require("../config");
let { fancytext, tiny, runtime, formatp, prefix } = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const astro_patch = require("../lib/plugins");
const trend_usage = (() => {
    const trendNumber = ((min, max) => {
        const random = () => Math.random();
        const floor = (x) => Math.floor(x);
        const multiply = (a, b) => a * b;
        const add = (a, b) => a + b;
        const subtract = (a, b) => a - b;
        const randomValue = multiply(random(), subtract(max, min + 1));
        const result = add(floor(randomValue), min);
        return result;
    })(1, 99);
    return trendNumber;
})();

const database_info = (() => {
    const dbNumber = ((min, max) => {
        const random = () => Math.random();
        const floor = (x) => Math.floor(x);
        const multiply = (a, b) => a * b;
        const add = (a, b) => a + b;
        const subtract = (a, b) => a - b;
        const randomValue = multiply(random(), subtract(max, min + 1));
        const result = add(floor(randomValue), min);
        return result;
    })(1, 499);
    return dbNumber;
})();

astro_patch.smd({
    cmdname: "detailstime",
    react: '🍁',
    desc: "To show all available commands.",
    type: 'user',
    filename: __filename
}, async (context, message) => {
    try {
        const { commands } = require("../lib");
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
        const currentDate = currentTime.toLocaleDateString();
        let greeting = "";

        if (hours >= 5 && hours < 12) {
            greeting = "Good day!";
        } else if (hours >= 12 && hours < 18) {
            greeting = "Good day!";
        } else if (hours >= 18 && hours < 22) {
            greeting = "Good Evening!";
        } else {
            greeting = "Good evening!";
        }