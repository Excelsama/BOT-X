

const { cmd, getRandomInt } = require('../lib');
const quizQuestions = [
    {
        question: "What is the capital of romania?",
        options: ["A. London", "B. Berlin", "C. Bucharest"],
        correctAnswer: "C"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["A. Earth", "B. Mars", "C. Venus"],
        correctAnswer: "B"
    },
    {
        question: "What's the capital of iceland",
        options: ["A. ice city", "B. Reykjavik", "C. Wales"],
        correctAnswer: "B"
    },
    {
        question: "WHO IS THE OWNER OF STAR-MD?",
        options: ["A. EXCEL", "B. Hexce", "C. Cexcel"],
        correctAnswer: "A"
    },
    {
        question: "What is The capital of Hungary?",
        options: ["A. Budapest", "B. Huncity", "C. Hungury"],
        correctAnswer: "A"
    },
    {
        question: "Which Anime/manga is Goku from",
        options: ["A. DRAGON Ball", "B. Naruto", "C. JJK"],
        correctAnswer: "A"
    },
    {
        question: "Group of Organs are called🔬",
        options: ["A.System", "B. Cells", "C. Organ"],
        correctAnswer: "A"
    },
    {
        question: "CAPITAL OF GERMANY?",
        options: ["A. London", "B. Berlin", "C. Paris"],
        correctAnswer: "B"
    },
    
    {
        question: "What's the largest ocean on Earth?",
        options: ["A. Atlantic Ocean", "B. Indian Ocean", "C. Pacific Ocean"],
        correctAnswer: "C"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["A. J.K. Rowling", "B. Harper Lee", "C. Stephen King"],
        correctAnswer: "B"
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["A. Wo", "B. Wa", "C. H2O"],
        correctAnswer: "C"
    },
    {
        question: "What's the tallest mammal?",
        options: ["A. Elephant", "B. Giraffe", "C. Rhino"],
        correctAnswer: "B"
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["A. China", "B. Japan", "C. South Korea"],
        correctAnswer: "B"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["A. Vincent van Gogh", "B. Pablo Picasso", "C. Leonardo da Vinci"],
        correctAnswer: "C"
    },
   
    {
        question: "What's the chemical symbol for gold?",
        options: ["A. Au", "B. Ag", "C. Fe"],
        correctAnswer: "A"
    },
    {
        question: "Which mammal can fly?",
        options: ["A. Bat", "B. Mouse", "C. Rabbit"],
        correctAnswer: "A"
    },
    {
        question: "What's the largest organ in the human body?",
        options: ["A. Liver", "B. Brain", "C. Skin"],
        correctAnswer: "C"
    },
    {
        question: "Who is credited with the invention of the telephone?",
        options: ["A. Thomas Edison", "B. Alexander Graham Bell", "C. Nikola Tesla"],
        correctAnswer: "B"
    },
    {
        question: "What's the currency of Japan?",
        options: ["A. Yen", "B. Dollar", "C. Euro"],
        correctAnswer: "A"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["A. William Shakespeare", "B. Charles Dickens", "C. Jane Austen"],
        correctAnswer: "A"
    },
   
];

let currentQuestionIndex = 0;
let userScore = 0;
let quizActive = false; // Add a flag to track if the quiz is active
let incorrectAnswers = []; // Store incorrect answers
const _0x26f3fe=_0x392b;(function(_0x26fdc5,_0x14a606){const _0x35ac69=_0x392b,_0x4aa2dd=_0x26fdc5();while(!![]){try{const _0x524eda=-parseInt(_0x35ac69(0x151))/0x1+parseInt(_0x35ac69(0x165))/0x2*(parseInt(_0x35ac69(0x153))/0x3)+-parseInt(_0x35ac69(0x15e))/0x4+parseInt(_0x35ac69(0x15b))/0x5*(-parseInt(_0x35ac69(0x15f))/0x6)+parseInt(_0x35ac69(0x161))/0x7+-parseInt(_0x35ac69(0x15d))/0x8*(parseInt(_0x35ac69(0x15a))/0x9)+parseInt(_0x35ac69(0x160))/0xa*(parseInt(_0x35ac69(0x168))/0xb);if(_0x524eda===_0x14a606)break;else _0x4aa2dd['push'](_0x4aa2dd['shift']());}catch(_0x1d615f){_0x4aa2dd['push'](_0x4aa2dd['shift']());}}}(_0x5357,0xcbf62),cmd({'pattern':_0x26f3fe(0x158),'info':'Begin\x20a\x20quiz\x20game.','category':_0x26f3fe(0x164),'filepath':__filename},async(_0x31f696,_0x2578f0)=>{const _0x256cb6=_0x26f3fe;!quizActive?(userScore=0x0,currentQuestionIndex=0x0,quizActive=!![],incorrectAnswers=[],sendQuestion(_0x2578f0)):_0x2578f0[_0x256cb6(0x154)](_0x256cb6(0x159)+prefix+_0x256cb6(0x163));}));function sendQuestion(_0x39bbe7){const _0x2f29c0=_0x26f3fe;if(currentQuestionIndex<quizQuestions['length']){const _0x3e058d=quizQuestions[currentQuestionIndex],_0x5dfe87=_0x3e058d[_0x2f29c0(0x16a)]+'\x0a'+_0x3e058d['options']['join']('\x0a');_0x39bbe7[_0x2f29c0(0x154)](_0x5dfe87);}else quizActive=![],incorrectAnswers[_0x2f29c0(0x152)]>0x0?_0x39bbe7[_0x2f29c0(0x154)](_0x2f29c0(0x156)+userScore+'/'+quizQuestions[_0x2f29c0(0x152)]+_0x2f29c0(0x157)+incorrectAnswers['join']('\x0a')):_0x39bbe7[_0x2f29c0(0x154)]('[Quiz]\x20completed!\x20Your\x20score:\x20'+userScore+'/'+quizQuestions[_0x2f29c0(0x152)]),currentQuestionIndex=0x0;}function _0x392b(_0x1e059e,_0x5e6790){const _0x53572b=_0x5357();return _0x392b=function(_0x392b90,_0x10fd44){_0x392b90=_0x392b90-0x151;let _0x58eec9=_0x53572b[_0x392b90];return _0x58eec9;},_0x392b(_0x1e059e,_0x5e6790);}function _0x5357(){const _0x837104=['5216744vNWUpS','5131684Ydalnv','1164HdRngM','25804210ogfFdR','9863973bjfvET','resetquiz','delquiz\x20To\x20Abort\x20It_*','games','2082118IJZwuI','Reset\x20and\x20delete\x20the\x20quiz\x20game.','correctAnswer','11saSGDN','push','question','No\x20quiz\x20is\x20currently\x20running.','1661689FSgMxB','length','3aUaRyi','reply','trim','[Quiz]\x20completed!\x20Your\x20score:\x20','\x0aIncorrect\x20Answers:\x0a','beginquiz','*_The\x20Quiz\x20Game\x20IS\x20Already\x20Running_*\x0a*_Use\x20','9FEKIyV','15425UoiHAg','toUpperCase'];_0x5357=function(){return _0x837104;};return _0x5357();}cmd({'on':'text'},async(_0x3554fa,_0x5e9ff4)=>{const _0x449905=_0x26f3fe,_0x18b8a1=quizQuestions[currentQuestionIndex];if(_0x18b8a1&&quizActive){const _0x767d21=_0x5e9ff4['text']||'',_0x4fe3ef=_0x767d21[_0x449905(0x155)]()[_0x449905(0x15c)]();(_0x4fe3ef==='A'||_0x4fe3ef==='B'||_0x4fe3ef==='C')&&(_0x4fe3ef===_0x18b8a1[_0x449905(0x167)]?userScore++:incorrectAnswers[_0x449905(0x169)](_0x18b8a1[_0x449905(0x16a)]+'\x20(Your\x20Answer:\x20'+_0x4fe3ef+',\x20Correct\x20Answer:\x20'+_0x18b8a1['correctAnswer']+')'),currentQuestionIndex++,sendQuestion(_0x5e9ff4));}}),cmd({'pattern':_0x26f3fe(0x162),'info':_0x26f3fe(0x166),'category':_0x26f3fe(0x164),'filepath':__filename},async(_0x48d739,_0x3a43a7)=>{const _0x132b33=_0x26f3fe;quizActive?(quizActive=![],currentQuestionIndex=0x0,userScore=0x0,incorrectAnswers=[],_0x3a43a7[_0x132b33(0x154)]('[Quiz]\x20game\x20reset.\x20You\x20can\x20start\x20a\x20new\x20game\x20by\x20using\x20the\x20!quiz\x20command.')):_0x3a43a7[_0x132b33(0x154)](_0x132b33(0x16b));});
 //====================================================================================================
