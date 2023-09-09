/**

//══════════════════════════════════════════════════════════════════════════════════════════════════════//
//                                                                                                      //
//                                ＷＨＡＴＳＡＰＰ ＢＯＴ－ＭＤ ＢＥＴＡ                                   //
//                                                                                                      // 
//                                         Ｖ：１．０．１                                                // 
//                                                                                                      // 
//            ███████╗██╗   ██╗██╗  ██╗ █████╗ ██╗██╗         ███╗   ███╗██████╗                        //
//            ██╔════╝██║   ██║██║  ██║██╔══██╗██║██║         ████╗ ████║██╔══██╗                       //
//            ███████╗██║   ██║███████║███████║██║██║         ██╔████╔██║██║  ██║                       //
//            ╚════██║██║   ██║██╔══██║██╔══██║██║██║         ██║╚██╔╝██║██║  ██║                       //
//            ███████║╚██████╔╝██║  ██║██║  ██║██║███████╗    ██║ ╚═╝ ██║██████╔╝                       //
//            ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝    ╚═╝     ╚═╝╚═════╝                        //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//══════════════════════════════════════════════════════════════════════════════════════════════════════//

CURRENTLY RUNNING ON BETA VERSION!!
*
   * @project_name : Suhail-Md
   * @author : Suhail Tech Info
   * @youtube : https://www.youtube.com/c/@SuhailTechInfo0
   * @description : Suhail-Md ,A Multi-functional whatsapp user bot.
   * @version 1.0.9
*
   * Licensed under the  GPL-3.0 License;
* 
   * ┌┤Created By Suhail Tech Info.
   * © 2023 Suhail-Md ✭ ⛥.
* 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
**/









const { groupdb , userdb,smd, jsonformat,send, botpic, TelegraPh, RandomXP, Config, tlang, warndb, sleep,getAdmin,getBuffer, prefix } = require('../lib')
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const moment = require("moment-timezone");
const Levels = require("discord-xp");
const fs = require('fs-extra')
const Jimp = require("jimp");
const sᴜʜᴀɪʟ_ᴍᴅ = require('../lib/commands')
const axios = require('axios')
let sck = groupdb || false;

if(sck) { 



    if(Config.WORKTYPE != 'private')
{

cmd({
 pattern: "bot",
 desc: "activates and deactivates bot.\nuse buttons to toggle.",
 category: "misc",
 filename: __filename
},
async(Suhail, msg, text,{isCreator}) => {
 if (!msg.isGroup) return msg.reply(tlang().group);
 if(!isCreator) return msg.reply(tlang().owner)
 switch (text.split(" ")[0]) {
           case 'on':{
                   let checkgroup = await sck.findOne({ id: msg.chat })
                   if (!checkgroup) {
                       await sck.new({ id: msg.chat, botenable: "true" })
                       return msg.reply(`Successfully Enabled *${tlang().title}*`)
                   } else {
                       if (checkgroup.botenable == "true") return msg.reply("*Bot* was already enabled")
                       await sck.updateOne({ id: msg.chat }, { botenable: "true" })
                       return msg.reply(`Successfully Enabled *${tlang().title}*`)
                   }
               }

           break
          case 'off':{
                      {
                       let checkgroup = await sck.findOne({ id: msg.chat })
                       if (!checkgroup) {
                           await sck.new({ id: msg.chat, botenable: "false" })
                           return msg.reply(`Successfully disabled *${tlang().title}*`)
                       } else {
                           if (checkgroup.botenable == "false") return msg.reply("*Bot* was already disabled")
                           await sck.updateOne({ id: msg.chat }, { botenable: "false" })
                           return msg.reply(`Successfully disabled *${tlang().title}*`)
                       }
                   }
          }
          break
          default:
          {
                  let checkgroup = await sck.findOne({ id: msg.chat });
            await send(msg,"*_Toggle on/off to Enable/Disable  bot in Chat_*",{},"",msg)
          }
      }
})   
} // if Statements
    //---------------------------------------------------------------------------
/*
cmd({
            pattern: "antispam",
            desc: "Kick Spamers From Group.\nuse buttons to toggle.",
            category: "group",
            filename: __filename
        },
        async(Suhail.bot, msg, text , {isCreator}) => {
            if (!msg.isGroup) return msg.reply(tlang().group);
          let check = text ? text : '';
            let checkgroup = await sck.findOne({ id: msg.chat }) || await sck.new({id : msg.chat , antispam : 'true'  });
            const groupAdmins = await getAdmin(Suhail.bot, msg)
            const isAdmins = msg.isGroup ? groupAdmins.includes(msg.sender) : false;
            if (!isAdmins && !isCreator) return msg.reply(tlang().admin)     
            if (check.startsWith("on") || check.startsWith("enable") || check.startsWith("act"))
            { 
                try 
                {
                 await sck.updateOne({ id: msg.chat }, { antispam: "true" })
                  return await msg.reply("*_Antispam Enabled Successfuly in Group_*")
                } catch (error) {   return await msg.reply("*_There's an Error, Antispam Not Enable in Group_*")    }
            }
            else if (check.startsWith("off") || check.startsWith("disable") || check.startsWith("deact") ) 
            {
                try 
                {
                   await sck.updateOne({ id: msg.chat }, { antispam: "false" })
                   return await msg.reply("*_Antispam Disabled Successfuly in Group_*")
                } catch (error) {   return await msg.reply("*_There's an Error, Antispam Not Disable in Group_*")    }
            }      
if (checkgroup.antispam == "true") return msg.reply(`Antispam : kick Users Who Spamming in Group\n\nAntispam is enabled in this Group \n *_For Disabling : ${prefix}antispam off_*`);
else return msg.reply(`Antispam : kick Users Who Spamming in Groupn\n\nAntispam is Disabled in this Group \n *_For Enablling Antispam : ${prefix}antispam on_*`);
        
})
*/
    //---------------------------------------------------------------------------
    cmd({
       pattern: "antilink",
       desc: "activates and deactivates antilink.\nuse buttons to toggle.",
       category: "group",
       filename: __filename
   },
   async(Suhail, msg, text , {isCreator}) => {
      function _0x1dd1(_0x190e77,_0x3842b6){const _0x3a2918=_0x3a29();return _0x1dd1=function(_0x1dd110,_0xc0890d){_0x1dd110=_0x1dd110-0x12f;let _0x2f3ec3=_0x3a2918[_0x1dd110];return _0x2f3ec3;},_0x1dd1(_0x190e77,_0x3842b6);}const _0x537363=_0x1dd1;(function(_0x2a498c,_0xe9d7f2){const _0x20fff1=_0x1dd1,_0x275af4=_0x2a498c();while(!![]){try{const _0x1bf60a=-parseInt(_0x20fff1(0x135))/0x1+-parseInt(_0x20fff1(0x14a))/0x2*(-parseInt(_0x20fff1(0x14b))/0x3)+parseInt(_0x20fff1(0x12f))/0x4*(parseInt(_0x20fff1(0x14e))/0x5)+-parseInt(_0x20fff1(0x139))/0x6+parseInt(_0x20fff1(0x13b))/0x7+-parseInt(_0x20fff1(0x136))/0x8+-parseInt(_0x20fff1(0x13c))/0x9*(parseInt(_0x20fff1(0x148))/0xa);if(_0x1bf60a===_0xe9d7f2)break;else _0x275af4['push'](_0x275af4['shift']());}catch(_0x96c32a){_0x275af4['push'](_0x275af4['shift']());}}}(_0x3a29,0xebdc8));if(!msg['isGroup'])return msg['reply'](tlang()[_0x537363(0x141)]);const groupAdmins=await getAdmin(Suhail.bot,msg),isAdmins=msg[_0x537363(0x130)]?groupAdmins[_0x537363(0x143)](msg[_0x537363(0x131)]):![];if(!isAdmins&&!isCreator)return msg[_0x537363(0x149)](tlang()[_0x537363(0x137)]);let checkinfo=await sck['findOne']({'id':msg[_0x537363(0x142)]})||await sck.new({'id':msg[_0x537363(0x142)]}),textt=text?text[_0x537363(0x151)]()['trim']():![],action=textt?textt[_0x537363(0x13e)]('\x20')[0x0]:![];function _0x3a29(){const _0x5d7267=['3041848KwfWrd','admin','delete','3314166wTfUba','antilink\x20kick/delete/off_*','3559514diYetN','9CvvJaC','*_Antilink\x20','split','save','updateOne','group','chat','includes','send','deact','off','*_Uhh\x20Dear,\x20Please\x20Provide\x20Valid\x20Instruction_*\x0a*Eg:\x20_','1361390agAqTj','reply','26518zyirsz','237MuHrUF','\x0a\x0a*Antilink\x20Modes:*\x0a\x20\x20.antilink\x20kick\x20(Delete\x20Links\x20&\x20Kick\x20Senders)\x0a\x20\x20.antilink\x20delete\x20(Delete\x20Links\x20Only)\x0a\x20\x20.antilink\x20off\x20(Disable\x20Antilink\x20in\x20chat)\x0a\x0a\x0a','disable','126675qiyDRV','*_Anti_Link\x20Succesfully\x20set\x20to\x20kick\x20link\x20senders!_*','kick','toLowerCase','caption','Disabled','startsWith','antilink','196ZzhnRb','isGroup','sender','false','*_Anti_Link\x20Disabled\x20Succesfully!_*','*Current\x20Mode:*\x20_','762559wgiCsM'];_0x3a29=function(){return _0x5d7267;};return _0x3a29();}if(!action)return await msg[_0x537363(0x144)](_0x537363(0x13d)+(checkinfo[_0x537363(0x155)]===_0x537363(0x132)?_0x537363(0x153):'Enabled')+'\x20in\x20this\x20Group!_*\x20\x0a\x20'+(checkinfo[_0x537363(0x155)]==='false'?'':_0x537363(0x134)+checkinfo[_0x537363(0x155)]+'_')+_0x537363(0x14c)+Config[_0x537363(0x152)]);else{if(action[_0x537363(0x154)](_0x537363(0x146))||action[_0x537363(0x154)](_0x537363(0x145))||action['startsWith'](_0x537363(0x14d)))return await sck[_0x537363(0x140)]({'id':msg['chat']},{'antilink':_0x537363(0x132)}),await msg['send'](_0x537363(0x133));else{if(action[_0x537363(0x154)]('kick'))return await sck[_0x537363(0x140)]({'id':msg[_0x537363(0x142)]},{'antilink':_0x537363(0x150)}),await msg[_0x537363(0x144)](_0x537363(0x14f));else{if(action['startsWith']('delete'))return await sck['updateOne']({'id':msg['chat']},{'antilink':_0x537363(0x138)}),await msg[_0x537363(0x144)]('*_Anti_Link\x20Succesfully\x20set\x20to\x20delete\x20links\x20from\x20chat!_*');else return await msg[_0x537363(0x144)](_0x537363(0x147)+prefix+_0x537363(0x13a));}}}
})



cmd({
    pattern: "welcome",
    alias:["setwelcome"],
    desc: "sets welcome message in specific group.",
    category: "misc",
 filename: __filename
 },
 async(Suhail, msg, text,{ isCreator }) => {
 
        let grp =msg.chat;
        if (!msg.isGroup) return msg.reply(tlang().group);
        const groupAdmins = await getAdmin(Suhail.bot, msg)	
        const isAdmins = groupAdmins.includes(msg.sender) 
        if (!isAdmins && !isCreator) return msg.reply(tlang().admin);
 
      let Group = await sck.findOne({ id: msg.chat }) || await sck.new({ id: msg.chat});
      if (!text)  {  return await msg.reply ("*Wellcome Message :* "+Group.welcome)  }
      await await sck.updateOne({ id: msg.chat }, { welcome:text ,events:'true'})
      let metadata = await Suhail.bot.groupMetadata(msg.chat);
      var ppuser;
      let num = msg.sender;
  
      var welcome_messages = text.replace(/@pp/g, '').replace(/@user/gi, `@${num.split("@")[0]}`).replace(/@gname/gi, metadata.subject).replace(/@desc/gi, metadata.desc).replace(/@count/gi, metadata.participants.length);
      try {  ppuser = await Suhail.bot.profilePictureUrl(num, 'image') }catch { ppuser = 'https://telegra.ph/file/93f1e7e8a1d7c4486df9e.jpg' ; }
      return await Suhail.bot.sendMessage(msg.chat, { image: { url: ppuser }, caption: welcome_messages,mentions: [num] } )
 
  
 }
 )
 //---------------------------------------------------------------------------
 cmd({
    pattern: "goodbye",
    alias: ["setgoodbye","setbye"],
    desc: "sets goodbye message in specific group.",
    category: "misc",
 filename: __filename
 },
 async(Suhail, msg, text,{ isCreator }) => {
 
    if (!msg.isGroup) return msg.reply(tlang().group);
    const groupAdmins = await getAdmin(Suhail.bot, msg)	
    const isAdmins = groupAdmins.includes(msg.sender) 
    if (!isAdmins && !isCreator) return msg.reply(tlang().admin);
 
    let Group = await sck.findOne({ id: msg.chat }) || await sck.new({ id: msg.chat});
    if (!text)  {  return await msg.reply ("*_Goodbye Message Is:_* "+Group.goodbye)  }
    await sck.updateOne({ id: msg.chat }, { goodbye:text,events:'true' }) 
 
    let metadata = await Suhail.bot.groupMetadata(msg.chat);
    var ppuser;
    let num = msg.sender;
    var goodbye_messages = text.replace(/@pp/g, '').replace(/@user/gi, `@${num.split("@")[0]}`).replace(/@gname/gi, metadata.subject).replace(/@desc/gi, metadata.desc).replace(/@count/gi, metadata.participants.length);
    try {  ppuser = await Suhail.bot.profilePictureUrl(num, 'image') }catch { ppuser = 'https://telegra.ph/file/93f1e7e8a1d7c4486df9e.jpg' ; }
 
        return await Suhail.bot.sendMessage(msg.chat, { image: { url: ppuser }, caption: goodbye_messages, mentions: [num] })
 
 })
 
 //---------------------------------------------------------------------------
 
     //---------------------------------------------------------------------------
     cmd({
        pattern: "onlyadmin",
        alias:["antimessge"],
        desc: "Only Admins Allow to Send Message, Others kick.",
        category: "group",
        filename: __filename
    },
    async(Suhail, msg, text , { cmdName ,isCreator}) => {
      const _0x4b01ef=_0x5a6c;(function(_0x42afd8,_0x18cab2){const _0x4e6b35=_0x5a6c,_0x2aa161=_0x42afd8();while(!![]){try{const _0x19acf1=parseInt(_0x4e6b35(0xd6))/0x1*(-parseInt(_0x4e6b35(0xd4))/0x2)+parseInt(_0x4e6b35(0xf6))/0x3*(-parseInt(_0x4e6b35(0xf7))/0x4)+parseInt(_0x4e6b35(0xdb))/0x5+-parseInt(_0x4e6b35(0xe4))/0x6*(parseInt(_0x4e6b35(0xd7))/0x7)+parseInt(_0x4e6b35(0xf2))/0x8*(-parseInt(_0x4e6b35(0xe2))/0x9)+parseInt(_0x4e6b35(0xec))/0xa+parseInt(_0x4e6b35(0xe7))/0xb;if(_0x19acf1===_0x18cab2)break;else _0x2aa161['push'](_0x2aa161['shift']());}catch(_0x44723d){_0x2aa161['push'](_0x2aa161['shift']());}}}(_0x4da6,0xd9095));if(!msg[_0x4b01ef(0xdd)])return msg[_0x4b01ef(0xd2)](tlang()[_0x4b01ef(0xd0)]);const groupAdmins=await getAdmin(Suhail.bot,msg),botNumber=await Suhail.bot[_0x4b01ef(0xf5)](Suhail.bot['user']['id']),isAdmins=msg['isGroup']?groupAdmins[_0x4b01ef(0xe3)](msg['sender']):![],isBotAdmins=msg[_0x4b01ef(0xdd)]?groupAdmins[_0x4b01ef(0xe3)](botNumber):![];function _0x5a6c(_0x3f3e7c,_0x356792){const _0x4da637=_0x4da6();return _0x5a6c=function(_0x5a6c42,_0xf5f5e0){_0x5a6c42=_0x5a6c42-0xcf;let _0x21b611=_0x4da637[_0x5a6c42];return _0x21b611;},_0x5a6c(_0x3f3e7c,_0x356792);}if(!isAdmins&&!isCreator)return msg['reply'](tlang()[_0x4b01ef(0xf3)]);function _0x4da6(){const _0x9c8c1f=['enable','*_UHH\x20Please,\x20Provide\x20Admin\x20Role\x20First_*','3469104gRwIaq','admin','\x20Succesfully\x20set\x20to\x20kick\x20message\x20senders!_*\x0a*_Now\x20Only\x20Admins\x20Allow\x20to\x20Send\x20Message\x20in\x20Group_*','decodeJid','3LabDje','3529436fszUMZ','Disabled','act','group','deact','reply','*_Onlyadmin\x20Already\x20Disabled\x20in\x20Current\x20Chat_*','206cFcBdy','onlyadmin','13014HUmNeg','425446MzPaLC','send','toLowerCase','off','6182310CJrGPU','\x20in\x20this\x20Group!_*\x0a\x20*_Toggle:\x20','isGroup','announcement','\x20Succesfully\x20Disable\x20in\x20group!_*\x0a*_Now\x20everyone\x20Send\x20Message\x20in\x20Group_*','findOne','split','27jvVnaa','includes','54OSXEKx','false','updateOne','31428661iArpHf','startsWith','\x20on/off_*','groupSettingUpdate','true','8660850UseQjN','save','chat','*_Onlyadmin\x20Already\x20Enabled\x20in\x20Current\x20Chat_*'];_0x4da6=function(){return _0x9c8c1f;};return _0x4da6();}let checkinfo=await sck[_0x4b01ef(0xe0)]({'id':msg[_0x4b01ef(0xee)]})||await sck.new({'id':msg[_0x4b01ef(0xee)]}),textt=text?text[_0x4b01ef(0xd9)]()['trim']():![],action=textt?textt[_0x4b01ef(0xe1)]('\x20')[0x0]:![];if(!action)return await msg[_0x4b01ef(0xd8)]('*_'+cmdName+'\x20'+(checkinfo[_0x4b01ef(0xd5)]==='false'?_0x4b01ef(0xf8):'Enabled')+_0x4b01ef(0xdc)+(prefix+cmdName)+_0x4b01ef(0xe9));else{if(action[_0x4b01ef(0xe8)](_0x4b01ef(0xda))||action[_0x4b01ef(0xe8)](_0x4b01ef(0xd1))||action[_0x4b01ef(0xe8)]('disable')){if(checkinfo['onlyadmin']===_0x4b01ef(0xe5))return await msg[_0x4b01ef(0xd2)](_0x4b01ef(0xd3));return await sck['updateOne']({'id':msg[_0x4b01ef(0xee)]},{'onlyadmin':_0x4b01ef(0xe5)}),await msg[_0x4b01ef(0xd8)]('*'+cmdName+_0x4b01ef(0xdf));}else{if(action[_0x4b01ef(0xe8)]('on')||action[_0x4b01ef(0xe8)](_0x4b01ef(0xcf))||action[_0x4b01ef(0xe8)](_0x4b01ef(0xf0))){if(checkinfo[_0x4b01ef(0xd5)]===_0x4b01ef(0xeb))return await msg[_0x4b01ef(0xd2)](_0x4b01ef(0xef));if(isBotAdmins)return await sck[_0x4b01ef(0xe6)]({'id':msg[_0x4b01ef(0xee)]},{'onlyadmin':_0x4b01ef(0xeb)}),await Suhail.bot[_0x4b01ef(0xea)](msg['chat'],_0x4b01ef(0xde)),await msg[_0x4b01ef(0xd8)]('*'+cmdName+_0x4b01ef(0xf4));else return await msg[_0x4b01ef(0xd2)](_0x4b01ef(0xf1));}else return await msg[_0x4b01ef(0xd2)]('*_Uhh\x20Dear,\x20Please\x20Provide\x20Valid\x20Instruction_*\x0a*Eg:\x20_'+(prefix+cmdName)+'\x20on/off_*');}}
})


//---------------------------------------------------------------------------
cmd({
    pattern: "antibot",
    desc: "kick Bot Users from Group!",
    category: "group",
    filename: __filename
},
async(Suhail, msg, text , { cmdName ,isCreator}) => {
  function _0x2d85(_0xaa10,_0x1528ed){const _0x376bc6=_0x376b();return _0x2d85=function(_0x2d8530,_0x1aafaf){_0x2d8530=_0x2d8530-0x88;let _0x6283a1=_0x376bc6[_0x2d8530];return _0x6283a1;},_0x2d85(_0xaa10,_0x1528ed);}const _0x2c4fcf=_0x2d85;(function(_0x847c4d,_0x58ffb9){const _0xa39a68=_0x2d85,_0x181098=_0x847c4d();while(!![]){try{const _0x4acbad=parseInt(_0xa39a68(0xaf))/0x1*(-parseInt(_0xa39a68(0xa4))/0x2)+-parseInt(_0xa39a68(0x96))/0x3+-parseInt(_0xa39a68(0x9e))/0x4*(-parseInt(_0xa39a68(0x95))/0x5)+parseInt(_0xa39a68(0x97))/0x6+-parseInt(_0xa39a68(0x9d))/0x7+-parseInt(_0xa39a68(0xa0))/0x8+parseInt(_0xa39a68(0x9c))/0x9;if(_0x4acbad===_0x58ffb9)break;else _0x181098['push'](_0x181098['shift']());}catch(_0x3ca238){_0x181098['push'](_0x181098['shift']());}}}(_0x376b,0x18e6c));if(!msg[_0x2c4fcf(0xa6)])return msg[_0x2c4fcf(0xac)](tlang()[_0x2c4fcf(0x8d)]);const groupAdmins=await getAdmin(Suhail.bot,msg),botNumber=await Suhail.bot[_0x2c4fcf(0x8f)](Suhail.bot[_0x2c4fcf(0xa5)]['id']),isAdmins=msg[_0x2c4fcf(0xa6)]?groupAdmins['includes'](msg[_0x2c4fcf(0xad)]):![],isBotAdmins=msg[_0x2c4fcf(0xa6)]?groupAdmins[_0x2c4fcf(0x9a)](botNumber):![];if(!isAdmins&&!isCreator)return msg[_0x2c4fcf(0xac)](tlang()[_0x2c4fcf(0x92)]);let checkinfo=await sck[_0x2c4fcf(0xa2)]({'id':msg[_0x2c4fcf(0x9b)]})||await sck.new({'id':msg[_0x2c4fcf(0x9b)]}),textt=text?text['toLowerCase']()[_0x2c4fcf(0x88)]():![],action=textt?textt[_0x2c4fcf(0xa7)]('\x20')[0x0]:![];function _0x376b(){const _0x26ca64=['act','updateOne','deact','reply','sender','\x20in\x20this\x20Group!_*\x0a\x20*Toggle:\x20_','31743uMncUs','disable','save','trim','*_Antibot\x20Succesfully\x20Disable\x20in\x20group!_*','*_UHH\x20Please,\x20Provide\x20Admin\x20Role\x20First_*','false','Enabled','group','*_Antibot\x20Succesfully\x20set\x20to\x20kick\x20Bot\x20Users!_*','decodeJid','send','*_Antibot\x20Already\x20Enabled\x20in\x20Current\x20Chat_*','admin','*_Antibot\x20Already\x20Disabled\x20in\x20Current\x20Chat_*','startsWith','267310Oakvjx','610857GRgPyR','649932PmmMyY','Disabled','off','includes','chat','5877639YkNrHt','1231230pAMugo','4OsaJqn','antibot','1143136tzUKkL','*_Antibot\x20Currently\x20','findOne','enable','12iaZUIV','user','isGroup','split','\x20on/off_*'];_0x376b=function(){return _0x26ca64;};return _0x376b();}if(!action)return await msg['send'](_0x2c4fcf(0xa1)+(checkinfo[_0x2c4fcf(0x9f)]===_0x2c4fcf(0x8b)?_0x2c4fcf(0x98):_0x2c4fcf(0x8c))+_0x2c4fcf(0xae)+(prefix+cmdName)+_0x2c4fcf(0xa8));else{if(action[_0x2c4fcf(0x94)](_0x2c4fcf(0x99))||action[_0x2c4fcf(0x94)](_0x2c4fcf(0xab))||action[_0x2c4fcf(0x94)](_0x2c4fcf(0xb0))){if(checkinfo['antibot']===_0x2c4fcf(0x8b))return await msg[_0x2c4fcf(0xac)](_0x2c4fcf(0x93));return await sck[_0x2c4fcf(0xaa)]({'id':msg[_0x2c4fcf(0x9b)]},{'antibot':_0x2c4fcf(0x8b)}),await msg[_0x2c4fcf(0x90)](_0x2c4fcf(0x89));}else{if(action[_0x2c4fcf(0x94)]('on')||action[_0x2c4fcf(0x94)](_0x2c4fcf(0xa9))||action[_0x2c4fcf(0x94)](_0x2c4fcf(0xa3))){if(checkinfo[_0x2c4fcf(0x9f)]==='true')return await msg[_0x2c4fcf(0xac)](_0x2c4fcf(0x91));if(isBotAdmins)return await sck['updateOne']({'id':msg['chat']},{'antibot':'true'}),await msg[_0x2c4fcf(0x90)](_0x2c4fcf(0x8e));else return await msg[_0x2c4fcf(0xac)](_0x2c4fcf(0x8a));}else return await msg[_0x2c4fcf(0xac)]('*_Uhh\x20Dear,\x20Please\x20Provide\x20Valid\x20Instruction_*\x0a*Eg:\x20_'+(prefix+cmdName)+_0x2c4fcf(0xa8));}}
})
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
cmd({
    pattern: "disable",
    desc: "disable cmds in Group.!",
    category: "group",
    filename: __filename
},
async(Suhail, msg, text , {isCreator}) => {
  const _0x1d9361=_0x127b;(function(_0x123c59,_0x38488e){const _0x4f5927=_0x127b,_0x2dc94b=_0x123c59();while(!![]){try{const _0x1b484b=-parseInt(_0x4f5927(0x1db))/0x1*(-parseInt(_0x4f5927(0x1c0))/0x2)+-parseInt(_0x4f5927(0x1c3))/0x3+parseInt(_0x4f5927(0x1bc))/0x4*(parseInt(_0x4f5927(0x1c5))/0x5)+parseInt(_0x4f5927(0x1ca))/0x6+parseInt(_0x4f5927(0x1e1))/0x7+-parseInt(_0x4f5927(0x1d6))/0x8*(parseInt(_0x4f5927(0x1d4))/0x9)+-parseInt(_0x4f5927(0x1e7))/0xa*(parseInt(_0x4f5927(0x1e0))/0xb);if(_0x1b484b===_0x38488e)break;else _0x2dc94b['push'](_0x2dc94b['shift']());}catch(_0x255304){_0x2dc94b['push'](_0x2dc94b['shift']());}}}(_0xc473,0x3308a));if(!msg[_0x1d9361(0x1bb)])return msg[_0x1d9361(0x1ce)](tlang()[_0x1d9361(0x1d5)]);const groupAdmins=await getAdmin(Suhail.bot,msg),botNumber=await Suhail.bot[_0x1d9361(0x1dd)](Suhail.bot[_0x1d9361(0x1cb)]['id']),isAdmins=msg[_0x1d9361(0x1bb)]?groupAdmins['includes'](msg['sender']):![],isBotAdmins=msg[_0x1d9361(0x1bb)]?groupAdmins[_0x1d9361(0x1cf)](botNumber):![];function _0xc473(){const _0x5035f2=['cmds','2484216cqyAHk','user','\x27\x20is\x20not\x20a\x20bot\x20cmd,\x20Provide\x20valid\x20cmd_*','*_Uhh\x20Dear,\x20I\x20can\x27t\x20disable\x20that\x20cmd_*','send','includes','split','*_Uhh\x20Dear,\x20Theres\x20no\x20cmd\x20disabled\x20in\x20current\x20group_*','disablecmds','test','9jTOFxv','group','1000024agaHtD','find','pattern','false,','\x0a*_Disable\x20cmds\x20:_*\x20```','1IvBDbJ','enable','decodeJid','false','toLowerCase','11418UpETmg','1264900QSGmLC','commands','updateOne','list','```','findOne','6860EBnErX','*_Disable\x20cmds\x20:_*\x20```','alias','*Provide\x20cmd\x20name\x20to\x20disable\x20in\x20group*\x0a*Ex\x20','replace','isGroup','92rfIqmr','chat','*Uhh\x20Dear,\x20Provided\x20cmd\x20already\x20in\x20disable\x20cmds*','info','227118msrhpy','startsWith','trim','77598ksrfVq','\x22\x20Succesfully\x20added\x20in\x20disable\x20cmds_*','79060BsAVtu','reply','disable','admin'];_0xc473=function(){return _0x5035f2;};return _0xc473();}if(!isAdmins&&!isCreator)return msg[_0x1d9361(0x1c6)](tlang()[_0x1d9361(0x1c8)]);function _0x127b(_0x124a51,_0x480f65){const _0xc47391=_0xc473();return _0x127b=function(_0x127b61,_0x4f91c7){_0x127b61=_0x127b61-0x1b8;let _0x3e747f=_0xc47391[_0x127b61];return _0x3e747f;},_0x127b(_0x124a51,_0x480f65);}let checkinfo=await sck[_0x1d9361(0x1e6)]({'id':msg[_0x1d9361(0x1bd)]})||await sck.new({'id':msg[_0x1d9361(0x1bd)]}),textt=text?text[_0x1d9361(0x1df)]()[_0x1d9361(0x1c2)]():![],cmdName=textt?textt[_0x1d9361(0x1d0)]('\x20')[0x0]:'';if(!cmdName)return await msg[_0x1d9361(0x1ce)](_0x1d9361(0x1b9)+prefix+'disable\x20tag(to\x20disabled\x20\x27tag\x27\x20cmd)/info*');else{if(cmdName[_0x1d9361(0x1c1)](_0x1d9361(0x1bf))||cmdName['startsWith'](_0x1d9361(0x1e4))||cmdName[_0x1d9361(0x1c1)](_0x1d9361(0x1c9)))return await msg['send'](checkinfo[_0x1d9361(0x1d2)]===_0x1d9361(0x1de)?_0x1d9361(0x1d1):_0x1d9361(0x1e8)+checkinfo[_0x1d9361(0x1d2)][_0x1d9361(0x1ba)]('false,','')+'```');else{if(cmdName[_0x1d9361(0x1c1)](_0x1d9361(0x1dc))||cmdName[_0x1d9361(0x1c1)](_0x1d9361(0x1c7)))return await msg[_0x1d9361(0x1c6)](_0x1d9361(0x1cd));else{if(cmdName){const cmds=sᴜʜᴀɪʟ_ᴍᴅ['commands'][_0x1d9361(0x1d7)](_0x3d1011=>_0x3d1011[_0x1d9361(0x1d8)]===cmdName)||sᴜʜᴀɪʟ_ᴍᴅ[_0x1d9361(0x1e2)][_0x1d9361(0x1d7)](_0x2cf945=>_0x2cf945[_0x1d9361(0x1b8)]&&_0x2cf945['alias'][_0x1d9361(0x1cf)](cmdName));if(cmds){let newCmd=cmds[_0x1d9361(0x1d8)][_0x1d9361(0x1ba)](/[.*+?^${}()|[\]\\]/g,'\x5c$&'),regex=new RegExp('\x5cb'+newCmd+'\x5cb');if(regex[_0x1d9361(0x1d3)](checkinfo[_0x1d9361(0x1d2)]))return await msg[_0x1d9361(0x1ce)](_0x1d9361(0x1be));var newDisable_Cmd=checkinfo[_0x1d9361(0x1d2)]+','+cmds[_0x1d9361(0x1d8)];await sck[_0x1d9361(0x1e3)]({'id':msg[_0x1d9361(0x1bd)]},{'disablecmds':newDisable_Cmd});let lists=newDisable_Cmd['replace'](_0x1d9361(0x1d9),'');return await msg[_0x1d9361(0x1ce)]('*_\x22'+cmdName+_0x1d9361(0x1c4)+(lists===''?'':_0x1d9361(0x1da)+lists+_0x1d9361(0x1e5)));}else return await msg['reply']('*_\x27'+cmdName+_0x1d9361(0x1cc));}}}}

})
//---------------------------------------------------------------------------
cmd({
    pattern: "enable",
    desc: "enable a cmd in Group.!",
    category: "group",
    filename: __filename
},
async(Suhail, msg, text , {isCreator}) => {
  
  const _0x19acb0=_0x2b87;(function(_0x1e83d3,_0x35eaa4){const _0x18315e=_0x2b87,_0x2f59dd=_0x1e83d3();while(!![]){try{const _0x16b8b5=-parseInt(_0x18315e(0xfc))/0x1+parseInt(_0x18315e(0x101))/0x2*(parseInt(_0x18315e(0x103))/0x3)+-parseInt(_0x18315e(0x105))/0x4*(-parseInt(_0x18315e(0x102))/0x5)+parseInt(_0x18315e(0xf8))/0x6+-parseInt(_0x18315e(0x108))/0x7*(parseInt(_0x18315e(0x10a))/0x8)+parseInt(_0x18315e(0x100))/0x9*(-parseInt(_0x18315e(0x115))/0xa)+parseInt(_0x18315e(0x10d))/0xb;if(_0x16b8b5===_0x35eaa4)break;else _0x2f59dd['push'](_0x2f59dd['shift']());}catch(_0x2a57d0){_0x2f59dd['push'](_0x2f59dd['shift']());}}}(_0x59df,0xc228d));if(!msg['isGroup'])return msg[_0x19acb0(0x104)](tlang()[_0x19acb0(0xff)]);const groupAdmins=await getAdmin(Suhail.bot,msg),botNumber=await Suhail.bot[_0x19acb0(0xf6)](Suhail.bot[_0x19acb0(0x10e)]['id']),isAdmins=msg[_0x19acb0(0xfe)]?groupAdmins['includes'](msg[_0x19acb0(0x110)]):![],isBotAdmins=msg[_0x19acb0(0xfe)]?groupAdmins[_0x19acb0(0xf5)](botNumber):![];function _0x59df(){const _0x2fc64a=['165YTTviz','1506531DdbIjN','send','137844wiflDz','startsWith','test','14TQRbZa','updateOne','5147512SXhXBs','false',',all','19530247uQLOXJ','user','admin','sender','save','replace','chat','_There\x27s\x20no\x20cmd\x20disabled\x20with\x20*','710Zslghn','toLowerCase','includes','decodeJid','trim','7264044TkjRho','reply','findOne','*_All\x20disable\x20cmds\x20succesfully\x20enabled_*','1360455GGWakc','\x22\x20Succesfully\x20removed\x20from\x20disable\x20cmds_*','isGroup','group','149949qpNFMz','2emBDDA'];_0x59df=function(){return _0x2fc64a;};return _0x59df();}if(!isAdmins&&!isCreator)return msg[_0x19acb0(0xf9)](tlang()[_0x19acb0(0x10f)]);function _0x2b87(_0x559939,_0x1e01c1){const _0x59dff7=_0x59df();return _0x2b87=function(_0x2b8751,_0x158178){_0x2b8751=_0x2b8751-0xf5;let _0x8a8f58=_0x59dff7[_0x2b8751];return _0x8a8f58;},_0x2b87(_0x559939,_0x1e01c1);}let checkinfo=await sck[_0x19acb0(0xfa)]({'id':msg[_0x19acb0(0x113)]})||await sck.new({'id':msg['chat']}),textt=text?text[_0x19acb0(0x116)]()[_0x19acb0(0xf7)]():![],cmdName=textt?','+textt['split']('\x20')[0x0]:'',ReplaceCmd=cmdName['replace'](/[.*+?^${}()|[\]\\]/g,'\x5c$&'),regex=new RegExp('\x5cb'+ReplaceCmd+'\x5cb');if(!cmdName||cmdName==='')return await msg[_0x19acb0(0x104)]('*Please\x20provide\x20disabled\x20cmd\x20name\x20to\x20enable\x20it*\x0a*Ex\x20'+prefix+'enable\x20tag(if\x20\x27tag\x27\x20cmd\x20disabled)/all(reset\x20disables)*');else{if(cmdName[_0x19acb0(0x106)](_0x19acb0(0x10c)))return await sck[_0x19acb0(0x109)]({'id':msg['chat']},{'disablecmds':_0x19acb0(0x10b)}),await msg[_0x19acb0(0x104)](_0x19acb0(0xfb));else{if(regex[_0x19acb0(0x107)](checkinfo['disablecmds'])&&checkinfo['disablecmds'][_0x19acb0(0xf5)](cmdName)){let newCmds=checkinfo['disablecmds'][_0x19acb0(0x112)](regex,'');return await sck[_0x19acb0(0x109)]({'id':msg[_0x19acb0(0x113)]},{'disablecmds':newCmds}),await msg[_0x19acb0(0x104)]('*_\x22'+cmdName[_0x19acb0(0x112)](',','')+_0x19acb0(0xfd));}else return await msg[_0x19acb0(0x104)](_0x19acb0(0x114)+cmdName[_0x19acb0(0x112)](',','')+'*\x20name_');}}

})
//---------------------------------------------------------------------------
cmd({
    pattern: "antifake",
    desc: "Allow to Join Group For Specific Country Code",
    category: "group",
    filename: __filename,
},
async(Suhail, msg, text,{ isCreator }) => {
    const _0x3d53e3=_0x4d30;(function(_0x3289e8,_0x35a484){const _0x3f55e9=_0x4d30,_0x4c3533=_0x3289e8();while(!![]){try{const _0x57c2cd=-parseInt(_0x3f55e9(0x15f))/0x1+-parseInt(_0x3f55e9(0x154))/0x2*(-parseInt(_0x3f55e9(0x15a))/0x3)+-parseInt(_0x3f55e9(0x163))/0x4*(parseInt(_0x3f55e9(0x145))/0x5)+-parseInt(_0x3f55e9(0x143))/0x6*(-parseInt(_0x3f55e9(0x14c))/0x7)+-parseInt(_0x3f55e9(0x149))/0x8+-parseInt(_0x3f55e9(0x142))/0x9+parseInt(_0x3f55e9(0x14f))/0xa;if(_0x57c2cd===_0x35a484)break;else _0x4c3533['push'](_0x4c3533['shift']());}catch(_0x3b6134){_0x4c3533['push'](_0x4c3533['shift']());}}}(_0x4e47,0x29ecc));if(!msg[_0x3d53e3(0x14a)])return msg[_0x3d53e3(0x146)](tlang()['group']);const groupMetadata=msg[_0x3d53e3(0x14a)]?await Suhail.bot[_0x3d53e3(0x151)](msg['chat'])[_0x3d53e3(0x13f)](_0x315e70=>{}):'',participants=msg[_0x3d53e3(0x14a)]?await groupMetadata[_0x3d53e3(0x140)]:'',groupAdmins=await getAdmin(Suhail.bot,msg),isAdmins=msg[_0x3d53e3(0x14a)]?groupAdmins[_0x3d53e3(0x148)](msg[_0x3d53e3(0x159)]):![];if(!isAdmins&&!isCreator)return msg[_0x3d53e3(0x146)](tlang()['admin']);function _0x4d30(_0x518d0a,_0x4df86b){const _0x4e47ac=_0x4e47();return _0x4d30=function(_0x4d308,_0x5dbaea){_0x4d308=_0x4d308-0x13e;let _0x3f5c8a=_0x4e47ac[_0x4d308];return _0x3f5c8a;},_0x4d30(_0x518d0a,_0x4df86b);}let checkinfo=await sck[_0x3d53e3(0x141)]({'id':msg[_0x3d53e3(0x162)]})||await sck.new({'id':msg[_0x3d53e3(0x162)]})[_0x3d53e3(0x14b)]();if(text[_0x3d53e3(0x15b)]()[_0x3d53e3(0x161)](_0x3d53e3(0x152))||text[_0x3d53e3(0x15b)]()[_0x3d53e3(0x161)](_0x3d53e3(0x158))||text[_0x3d53e3(0x15b)]()[_0x3d53e3(0x161)](_0x3d53e3(0x144))){if(checkinfo[_0x3d53e3(0x15d)]==_0x3d53e3(0x155))return await msg[_0x3d53e3(0x15e)](_0x3d53e3(0x147));return await sck[_0x3d53e3(0x14e)]({'id':msg[_0x3d53e3(0x162)]},{'antifake':'false'}),await msg[_0x3d53e3(0x15e)]('*Anti_Fake\x20Disable\x20Succesfully!*');}else{if(!text)return await msg[_0x3d53e3(0x15e)]('*_Antifake\x20'+(checkinfo[_0x3d53e3(0x15d)]===_0x3d53e3(0x155)?_0x3d53e3(0x156):_0x3d53e3(0x150)+checkinfo['antifake']+'\x22')+_0x3d53e3(0x160));}function _0x4e47(){const _0x1417c1=['sender','1119OfZcoi','toLowerCase','antifake\x2092_*','antifake','send','95149nQhOqw','\x20Country\x20Code!_*\x0a\x20*Provide\x20Country\x20code\x20to\x20Update\x20Antifake\x20Status*\x0a*Eg:\x20_.antifake\x2092_*','startsWith','chat','4OBMwaq','*Anti_Fake\x20Succesfully\x20set\x20to\x20\x22','catch','participants','findOne','803394fyIvKZ','1356612CgXDOm','disable','319485kWURrN','reply','*Anti_Fake\x20Already\x20Disabled\x20In\x20Current\x20Chat!*','includes','2030144kUUVSD','isGroup','save','7OpPQtf','*_Please\x20provide\x20a\x20country\x20code\x20First_*\x0a\x20*_Only\x20numbers\x20to\x20join\x20this\x20group._*\x0a*_eg:\x20','updateOne','4462100VzFSpa','set\x20to\x20\x22','groupMetadata','off','split','8ZBiSLh','false','Not\x20set\x20to\x20any','\x22!*\x0a*_Now\x20People\x20Joined\x20Group\x20Who\x27s\x20Number\x20Start\x20With\x20','deact'];_0x4e47=function(){return _0x1417c1;};return _0x4e47();}let country_code=text?parseInt(text[_0x3d53e3(0x153)]('\x20')[0x0]):![];if(!text||!country_code||isNaN(country_code)||country_code===0x0)return await msg[_0x3d53e3(0x15e)](_0x3d53e3(0x14d)+prefix+_0x3d53e3(0x15c));else{if(country_code)return await sck[_0x3d53e3(0x14e)]({'id':msg['chat']},{'antifake':''+country_code}),await msg['send'](_0x3d53e3(0x13e)+country_code+_0x3d53e3(0x157)+country_code+'_*');else return await msg['send']('*_Please\x20provide\x20a\x20Valid\x20country\x20code\x20First_*\x0a\x20*_Only\x20numbers\x20to\x20join\x20this\x20group._*\x0a*_eg:\x20'+prefix+_0x3d53e3(0x15c));}
});

//---------------------------------------------------------------------------
cmd({
    pattern: "antidemote",
    desc: "Detects Promote and Automaticaly demote promoted person.", 
    category: "group",
    filename: __filename,
},
async(Suhail, msg, text,{ isCreator }) => {
    if (!msg.isGroup) return msg.reply(tlang().group);
    const groupMetadata = msg.isGroup ? await Suhail.bot.groupMetadata(msg.chat).catch((e) => {}) : "";
    const participants = msg.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = await getAdmin(Suhail.bot, msg)
    const isAdmins = msg.isGroup ? groupAdmins.includes(msg.sender) : false;
    if (!isAdmins && !isCreator) return msg.reply(tlang().admin);
        
  let checkinfo = await sck.findOne({ id : msg.chat })  || await sck.new({ id: msg.chat});
  if (text.toLowerCase().startsWith("on") || text.toLowerCase().startsWith("act") || text.toLowerCase().startsWith("enable") ) {
    if (checkinfo.antidemote == 'true') return await msg.send("*Anti_Demote Already Enabled In Current Chat!*")
    await sck.updateOne({ id: msg.chat }, { antidemote : 'true' });
    return await msg.send("*Anti_Demote Enable Succesfully! _No One Demote Here Now_.*")
  }else if (text.toLowerCase().startsWith("off") || text.toLowerCase().startsWith("deact") || text.toLowerCase().startsWith("disable") ) {
    if (checkinfo.antidemote == 'false') return await msg.send("*Anti_Demote Already Disabled In Current Chat!*")
    await sck.updateOne({ id: msg.chat }, { antidemote : 'false' });
    return await msg.send("*Anti_Demote Disable Succesfully!*")
  }
  else return await msg.reply(`*Uhh Dear, Please Toggle between "On" And "Off".* \n*_To Enable & Disable Stop Demoting Peoples!_*`)
});
//---------------------------------------------------------------------------
cmd({
    pattern: "antipromote",
    desc: "Detects Promote and Automaticaly demote promoted person.", 
    category: "group",
    filename: __filename,
},
async(Suhail, msg, text,{ isCreator }) => {
    if (!msg.isGroup) return msg.reply(tlang().group);
    const groupMetadata = msg.isGroup ? await Suhail.bot.groupMetadata(msg.chat).catch((e) => {}) : "";
    const participants = msg.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = await getAdmin(Suhail.bot, msg)
    const isAdmins = msg.isGroup ? groupAdmins.includes(msg.sender) : false;
    if (!isAdmins && !isCreator) return msg.reply(tlang().admin);
        
  let checkinfo = await sck.findOne({ id : msg.chat })  || await sck.new({ id: msg.chat});
  if (text.toLowerCase().startsWith("on") || text.toLowerCase().startsWith("act") || text.toLowerCase().startsWith("enable") ) {
    if (checkinfo.antipromote == 'true') return await msg.send("*Anti_Promote Already Enabled In Current Chat!*")
    await sck.updateOne({ id: msg.chat }, { antipromote : 'true' });
    return await msg.send("*Anti_Promote Enable Succesfully! _No One Promote Here Now_.*")
  }else if (text.toLowerCase().startsWith("off") || text.toLowerCase().startsWith("deact") || text.toLowerCase().startsWith("disable") ) {
    if (checkinfo.antipromote == 'false') return await msg.send("*Anti_Promote Already Disabled In Current Chat!*")
    await sck.updateOne({ id: msg.chat }, { antipromote : 'false' });
    return await msg.send("*Anti_Promote Disable Succesfully!*")
  }
  else return await msg.reply(`*Uhh Dear, Please Toggle between "On" And "Off".* \n*_To Stop Promoting Peoples in Chat_*`)
});
//---------------------------------------------------------------------------
cmd({
    pattern: "pdm",
    desc: "Detect Promote/Demote Users And Send Alerts in Chat ",
    category: "group",
    filename: __filename,
},
async(Suhail, msg, text,{ isCreator }) => {
    if (!msg.isGroup) return msg.reply(tlang().group);
    const groupMetadata = msg.isGroup ? await Suhail.bot.groupMetadata(msg.chat).catch((e) => {}) : "";
    const participants = msg.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = await getAdmin(Suhail.bot, msg)
    const isAdmins = msg.isGroup ? groupAdmins.includes(msg.sender) : false;
    if (!isAdmins && !isCreator) return msg.reply(tlang().admin);
        
  let checkinfo = await sck.findOne({ id : msg.chat })  || await sck.new({ id: msg.chat});
  if (text.toLowerCase().startsWith("on") || text.toLowerCase().startsWith("act") || text.toLowerCase().startsWith("enable") ) {
    if (checkinfo.pdm == 'true') return await msg.send("*Promote/Demote Alerts Already Enabled In Current Chat!*")
    await sck.updateOne({ id: msg.chat }, { pdm : 'true' });
    return await msg.send("*Promote/Demote Alerts Enable Succesfully!*")
  }else if (text.toLowerCase().startsWith("off") || text.toLowerCase().startsWith("deact") || text.toLowerCase().startsWith("disable") ) {
    if (checkinfo.pdm == 'false') return await msg.send("*Promote/Demote Alerts Already Disabled In Current Chat!*")
    await sck.updateOne({ id: msg.chat }, { pdm : 'false' });
    return await msg.send("*Promote/Demote Alerts Disable Succesfully!*")
  }
  else return await msg.reply(`*Uhh Dear, Please Toggle between "On" And "Off".* \n*_To get And Stop Promote/Demote Alerts_*`)
});
//---------------------------------------------------------------------------


  if(global.isMongodb){  
  smd({
        pattern: "warn",
        desc: "Warns user in Group.",
        category: "group",
        filename: __filename,
        use: '<quote|reply|number>',
    },
    async(Suhail, msg, text,{ isCreator }) => {
        if (!msg.isGroup) return msg.reply(`This Command is only for group.`)
        const groupAdmins = await getAdmin(Suhail.bot, msg)
        const isAdmins = msg.isGroup ? groupAdmins.includes(msg.sender) : false;
        if (!isAdmins) return msg.reply('This command is only for Admin.')
        const S=m;function Z(){const F=['126402oKAcRa','date','Removing\x20User\x20because\x20Warn\x20limit\x20exceeded\x0a\x0a*All\x20Warnings.*\x0a','chat','8qachoN','580yXDZAo','groupParticipantsUpdate','114528WgITIL','reply','groupMetadata','│\x20*🔰Time:-*\x20','find','locale','log','196311jXGmuc','quoted','save','*\x0a╭─────────────◆\x0a│\x20*🍁In\x20Group:-*\x20','759700KYdstU','warnedby','pushName','reason','8dUtMfa','2BlOCqD','550MdvhLT','*----Warn----*\x0aUser:\x20@','54828ViphBF','subject','1100323uEahgH','30204512uUuJcj','*There\x20are\x20total\x20','split','│\x20*⚠️Warned\x20by:-*\x20','length','sender','setDefault','group','Asia/KOLKATA','../config','215XZLRSE','HH:mm:ss','warn','remove'];Z=function(){return F;};return Z();}(function(U,w){const c=m,s=U();while(!![]){try{const q=parseInt(c(0x1eb))/0x1*(parseInt(c(0x1f0))/0x2)+parseInt(c(0x1e7))/0x3*(parseInt(c(0x1ef))/0x4)+-parseInt(c(0x200))/0x5*(-parseInt(c(0x204))/0x6)+-parseInt(c(0x1f5))/0x7*(-parseInt(c(0x1dd))/0x8)+-parseInt(c(0x1f3))/0x9*(-parseInt(c(0x1de))/0xa)+parseInt(c(0x1f1))/0xb*(parseInt(c(0x1e0))/0xc)+-parseInt(c(0x1f6))/0xd;if(q===w)break;else s['push'](s['shift']());}catch(B){s['push'](s['shift']());}}}(Z,0x707d4));function m(Y,U){const w=Z();return m=function(s,q){s=s-0x1dd;let B=w[s];return B;},m(Y,U);}if(!msg['quoted'])return msg[S(0x1e1)]('Please\x20quote\x20a\x20user\x20master.');const timesam=moment(moment())['format'](S(0x201));moment['tz'][S(0x1fc)](S(0x1fe))[S(0x1e5)]('id');try{let metadata=await Suhail.bot[S(0x1e2)](msg[S(0x207)]);await new warndb({'id':msg['quoted'][S(0x1fb)][S(0x1f8)]('@')[0x0]+S(0x202),'reason':text,'group':metadata[S(0x1f4)],'warnedby':msg[S(0x1ed)],'date':timesam})[S(0x1e9)]();let ment=msg[S(0x1e8)][S(0x1fb)];Suhail.bot['sendMessage'](msg['chat'],{'text':S(0x1f2)+msg[S(0x1e8)][S(0x1fb)][S(0x1f8)]('@')[0x0]+'\x0aWith\x20Reason:\x20'+text+'\x0aWarned\x20by:\x20'+msg[S(0x1ed)],'mentions':[msg[S(0x1e8)][S(0x1fb)]]},{'quoted':msg});let h=await warndb[S(0x1e4)]({'id':msg['quoted'][S(0x1fb)][S(0x1f8)]('@')[0x0]+S(0x202)});const Config=require(S(0x1ff));if(h[S(0x1fa)]>Config['warncount']){teskd=S(0x206);let h=await warndb[S(0x1e4)]({'id':msg[S(0x1e8)][S(0x1fb)][S(0x1f8)]('@')[0x0]+S(0x202)});teskd+=S(0x1f7)+h[S(0x1fa)]+'\x20\x20warnings.*\x0a';for(let i=0x0;i<h[S(0x1fa)];i++){teskd+='*'+(i+0x1)+S(0x1ea)+h[i][S(0x1fd)]+'\x0a',teskd+=S(0x1e3)+h[i][S(0x205)]+'\x0a',teskd+=S(0x1f9)+h[i][S(0x1ec)]+'\x0a',teskd+='│\x20_📍Reason:\x20'+h[i][S(0x1ee)]+'_\x0a╰─────────────◆\x0a\x0a';}msg[S(0x1e1)](teskd),await Suhail.bot[S(0x1df)](msg['chat'],[msg['quoted'][S(0x1fb)]],S(0x203));}}catch(Y){console[S(0x1e6)](Y);}
        
    }
)
//---------------------------------------------------------------------------
cmd({
    pattern: "resetwarn",
    desc: "Deletes all previously given warns to quoted user.",
    category: "group",
   filename: __filename,
    use: '<quote|reply|number>',
},
async(Suhail, msg, text , {isCreator}) => {
    if (!isCreator) return msg.reply(tlang().owner)
    await warndb.deleteOne({ id: msg.quoted.sender.split('@')[0] + 'warn' });
    msg.reply('User is free as a bird.\nAll previously given warn has been deleted.')
}
)
//---------------------------------------------------------------------------
cmd({
    pattern: "checkwarn",
    desc: "Check warns",
    category: "group",
    filename: __filename,
    use: '<quoted/reply user.>',
},
async(Suhail, msg, text) => {
    if (!msg.isGroup) return msg.reply('This command is only for Group.')
    if (!msg.quoted) return msg.reply('Quote a user master.')
    teskd = `*All Warnings.*\n\n`
    let h = await warndb.find({ id: msg.quoted.sender.split('@')[0] + 'warn' })
    console.log(h)
    teskd += `*There are total ${h.length}  warnings.*\n`
    for (let i = 0; i < h.length; i++) {
        teskd += `*${i+1}*\n╭─────────────◆\n│ *🍁In Group:-* ${h[i].group}\n`
        teskd += `│ *🔰Time:-* ${h[i].date}\n`
        teskd += `│ *⚠️Warned by:-* ${h[i].warnedby}\n`
        teskd += `│ _📍Reason: ${h[i].reason}_\n╰─────────────◆\n\n`
    }
    return await msg.reply(teskd)
})

} //// if Mongodb check -=================-






cmd({
            pattern: "lydea",
            alias : ["chatbot"],
            desc: "activates and deactivates chatbot.\nuse buttons to toggle.",
            category: "misc",
            filename: __filename
        },
        async(Suhail, msg, text,{ isCreator }) => {
          if (!isCreator) return msg.reply(tlang().owner)
          let action = text.toLowerCase();
        let checkinfo = await sck.findOne({ id : msg.chat })  || await sck.new({ id: msg.chat});
        if (action.startsWith("on") || action.startsWith("act") || action.startsWith("enable") ) {
          if (checkinfo.chatbot == 'true') return await msg.send("*Lydea was already enabled.*")
          await sck.updateOne({ id: msg.chat }, { chatbot : 'true' });
          return await msg.send('*Lydea Activated successfully.*')
        }else if (action.startsWith("off") || action.startsWith("deact") || action.startsWith("disable") ) {
          if (checkinfo.chatbot == 'false') return await msg.send("*Lydea was already disabled.*")
          await sck.updateOne({ id: msg.chat }, { chatbot : 'false' });
          return await msg.send('*Lydea deactivated successfully.*')
        } else return await msg.reply(`*_Toggle On/Off to enable/disable Lydea_*`)
     })
smd({ on: "main" }, async(Suhail, citel ,text , {botNumber,isCreator ,budy, body,icmd }) => { /**/const _0x98068=_0x5035;(function(_0x2e0b79,_0x1ab0f7){const _0x44e440=_0x5035,_0x47d5ac=_0x2e0b79();while(!![]){try{const _0x10d574=-parseInt(_0x44e440(0x1d8))/0x1+-parseInt(_0x44e440(0x1bf))/0x2+parseInt(_0x44e440(0x1d3))/0x3+-parseInt(_0x44e440(0x1e8))/0x4+-parseInt(_0x44e440(0x1f6))/0x5*(parseInt(_0x44e440(0x1e6))/0x6)+parseInt(_0x44e440(0x20a))/0x7*(parseInt(_0x44e440(0x1f1))/0x8)+parseInt(_0x44e440(0x1de))/0x9;if(_0x10d574===_0x1ab0f7)break;else _0x47d5ac['push'](_0x47d5ac['shift']());}catch(_0x5f2f27){_0x47d5ac['push'](_0x47d5ac['shift']());}}}(_0x359d,0xa4f98));function _0x5035(_0x2ff43,_0x1d3dfc){const _0x359dd0=_0x359d();return _0x5035=function(_0x503501,_0x5a2bad){_0x503501=_0x503501-0x1ba;let _0x5692be=_0x359dd0[_0x503501];return _0x5692be;},_0x5035(_0x2ff43,_0x1d3dfc);}function _0x359d(){const _0x5725d7=['onlyadmin','catch','antibadword','includes','sender','text','subject','antilink_values','1976589RIPpEc','MsgsInLog','isBot','\x20kick\x20Due\x20To\x20Antibot!_*\x0a*_Bot\x20User\x20Not\x20Allowed\x20In\x20Current\x20Group_*','test','2132IxraEK','admin','isGroup','groupMetadata','msg','\x20detected\x20sending\x20a\x20link.\x0aPromote\x20','26780391nDQVIu','*_Link\x20Detected!!_*','contextInfo','push','*_Uhh\x20Please,\x20Provide\x20Admin\x20Role\x20To\x20Kick\x20Other\x20Bot_*\x0a*_Or\x20Disable\x20Antibot\x20(On/Off)\x20In\x20Current\x20Group_*','antilink','botAdmin','timezone','456RciWmz','locale','5335628DVbFlG','format','cnt','participants','\x20Kick\x20For\x20Sending,\x20Message\x20in\x20Group*','reactionMessage','toLowerCase','chat.whatsapp.com','*_User\x20@','168008HCaZcz','Message\x20in\x20Personal\x0aFrom=>\x20','Error\x20From\x20Bad\x20Words\x20:\x20','\x0a*_hey\x20','chatbot','59485amISaw',']&msg=[','Message\x20in\x20Group\x0aIn=>\x20','key','\x20*[\x20Link\x20detected\x20]*\x0aUser\x20@','SmdOfficial','*Link\x20Detected*\x0a','reply','false','_*\x0a\x0aWarning!!\x20Bad\x20word\x20detected.\x0adelete\x20your\x20message.\x0a','map','send','delete\x20\x0alinks\x20from\x20this\x20Chat','bot','log','trim','mentionedJid','body','http://api.brainshop.ai/get?bid=175685&key=Pg8Wu8mrDQjfr0uv&uid=[','findOne','91jWyuka','*_Provide\x20admin\x20role\x20to\x20kick\x20Message\x20Senders_*\x0a*Or\x20_Disable\x20onlyadmin(on/off)\x20in\x20currentchat_*','setDefault','https://','pushName','true','*_Link\x20Detected..\x20Deletion\x20Done!_*','\x20as\x20admin\x20to\x20','1983056SZCpFQ','botname','groupParticipantsUpdate','chat','quoted','filter','For\x20using\x20Bad\x20Word','remove','HH:mm:ss','split','sendMessage','length'];_0x359d=function(){return _0x5725d7;};return _0x359d();}try{const groupMetadata=citel[_0x98068(0x1da)]?await Suhail[_0x98068(0x203)][_0x98068(0x1db)](citel[_0x98068(0x1c2)])[_0x98068(0x1cc)](_0x3d2207=>''):'';let participants={};try{participants=citel['isGroup']?groupMetadata?await groupMetadata[_0x98068(0x1eb)]:{}:{};}catch(_0x46ba42){participants={};}const groupAdminss=_0x10a56f=>{const _0x579650=_0x98068;a=[];for(let _0x459a69 of _0x10a56f){if(_0x459a69[_0x579650(0x1d9)]==null)continue;a[_0x579650(0x1e1)](_0x459a69['id']);}return a;},groupAdmins=citel[_0x98068(0x1da)]?await groupAdminss(participants):'',isBotAdmins=citel[_0x98068(0x1da)]?groupAdmins[_0x98068(0x1ce)](botNumber):![],isAdmins=citel[_0x98068(0x1da)]?groupAdmins[_0x98068(0x1ce)](citel[_0x98068(0x1cf)]):![];citel['isGroup']&&Config['MsgsInLog']==_0x98068(0x1bc)&&console[_0x98068(0x204)](_0x98068(0x1f8)+groupMetadata[_0x98068(0x1d1)]+'\x20'+citel[_0x98068(0x1cf)]+'\x0aMessage:'+citel[_0x98068(0x207)]+'\x0a===============================');!citel[_0x98068(0x1da)]&&Config[_0x98068(0x1d4)]=='true'&&console[_0x98068(0x204)](_0x98068(0x1f2)+citel[_0x98068(0x1bb)]+'\x20'+citel[_0x98068(0x1cf)][_0x98068(0x1c8)]('@')[0x0]+'\x0aMessage:'+citel[_0x98068(0x207)]+'\x0a===============================');try{if(!global[_0x98068(0x1fb)])return;let GroupS=await sck[_0x98068(0x209)]({'id':citel[_0x98068(0x1c2)]});if(GroupS&&citel[_0x98068(0x1da)]&&!isAdmins&&!isCreator&&citel['mtype']!==_0x98068(0x1ed)){if(GroupS['antibot']===_0x98068(0x1bc)){if(isBotAdmins&&citel['isBot']){const key={'remoteJid':citel['chat'],'fromMe':![],'id':citel['id'],'participant':citel[_0x98068(0x1cf)]};await Suhail[_0x98068(0x203)][_0x98068(0x1c9)](citel[_0x98068(0x1c2)],{'delete':key}),sleep(0x5dc),await Suhail[_0x98068(0x203)]['groupParticipantsUpdate'](citel[_0x98068(0x1c2)],[citel[_0x98068(0x1cf)]],_0x98068(0x1c6)),await citel['send'](_0x98068(0x1f0)+citel[_0x98068(0x1cf)]['split']('@')[0x0]+_0x98068(0x1d6),{'mentions':[citel[_0x98068(0x1cf)]]});}else!isBotAdmins&&citel[_0x98068(0x1d5)]&&await citel[_0x98068(0x1fd)](_0x98068(0x1e2));}if(GroupS[_0x98068(0x1cb)]===_0x98068(0x1bc)&&SmdOfficial){if(isBotAdmins){const key={'remoteJid':citel[_0x98068(0x1c2)],'fromMe':![],'id':citel['id'],'participant':citel[_0x98068(0x1cf)]};await Suhail[_0x98068(0x203)][_0x98068(0x1c9)](citel[_0x98068(0x1c2)],{'delete':key}),sleep(0x5dc),await Suhail['bot']['groupParticipantsUpdate'](citel[_0x98068(0x1c2)],[citel[_0x98068(0x1cf)]],'remove'),await citel['send']('*User\x20@'+citel[_0x98068(0x1cf)][_0x98068(0x1c8)]('@')[0x0]+_0x98068(0x1ec),{'mentions':[citel[_0x98068(0x1cf)]]});}else await citel[_0x98068(0x201)](_0x98068(0x20b));}if(GroupS[_0x98068(0x1e3)]!=='false'&&SmdOfficial){const array=Config[_0x98068(0x1d2)]?Config['antilink_values'][_0x98068(0x1c8)](',')[_0x98068(0x1c4)](_0x20292d=>_0x20292d[_0x98068(0x205)]()!==''):[_0x98068(0x1ba),_0x98068(0x1ef),'fb.com'];let chab=body[_0x98068(0x1ee)]();if(array['some'](_0x50dc2e=>chab[_0x98068(0x1ce)](_0x50dc2e))){if(!isBotAdmins){let Suhail_Md=_0x98068(0x1fa)+citel[_0x98068(0x1cf)]['split']('@')[0x0]+_0x98068(0x1dd)+Config[_0x98068(0x1c0)]+_0x98068(0x1be)+(GroupS[_0x98068(0x1e3)]==='kick'?'kick\x20\x0alink\x20senders.':_0x98068(0x202))+'\x20\x0a';await citel['send'](Suhail_Md,{'mentions':[citel[_0x98068(0x1cf)]]});}else{if(GroupS[_0x98068(0x1e3)]==='delete'||GroupS[_0x98068(0x1e3)]===_0x98068(0x1bc))await citel['send'](_0x98068(0x1bd)),await Suhail[_0x98068(0x203)]['sendMessage'](citel[_0x98068(0x1c2)],{'delete':citel[_0x98068(0x1f9)]});else{if(GroupS['antilink']==='kick'){await citel[_0x98068(0x201)](_0x98068(0x1df));try{await Suhail[_0x98068(0x203)][_0x98068(0x1c9)](citel[_0x98068(0x1c2)],{'delete':citel[_0x98068(0x1f9)]}),sleep(0x5dc),await Suhail[_0x98068(0x203)][_0x98068(0x1c1)](citel[_0x98068(0x1c2)],[citel[_0x98068(0x1cf)]],'remove');}catch{await citel[_0x98068(0x201)](_0x98068(0x1fc)+tlang()[_0x98068(0x1e4)]);}}}}}}}}catch(_0x21261d){console[_0x98068(0x204)]('Error\x20From\x20Antilinks\x20:\x20',_0x21261d);}if(citel[_0x98068(0x1d5)]||text[_0x98068(0x1ca)]<=0x0)return;var array=Config[_0x98068(0x1cd)][_0x98068(0x1c8)](',');array[_0x98068(0x200)](async _0x58fa08=>{const _0x3318ba=_0x98068;if(isAdmins||!global[_0x3318ba(0x1fb)])return;let _0x5a6661=new RegExp('\x5cb'+_0x58fa08+'\x5cb','ig'),_0x4e9d03=budy[_0x3318ba(0x1ee)]();if(_0x5a6661[_0x3318ba(0x1d7)](_0x4e9d03)){await sleep(0x3e8);try{if(isMongodb){const _0x1428a1=moment(moment())[_0x3318ba(0x1e9)](_0x3318ba(0x1c7));moment['tz'][_0x3318ba(0x20c)](global[_0x3318ba(0x1e5)])[_0x3318ba(0x1e7)]('id'),await new warndb({'id':citel['sender'][_0x3318ba(0x1c8)]('@')[0x0]+'warn','reason':_0x3318ba(0x1c5),'group':groupMetadata[_0x3318ba(0x1d1)],'warnedby':tlang()['title'],'date':_0x1428a1})['save']();}await citel[_0x3318ba(0x201)](_0x3318ba(0x1f4)+citel[_0x3318ba(0x1bb)]+_0x3318ba(0x1ff),{},'',citel),sleep(0x5dc);const _0x56c9d3={'remoteJid':citel[_0x3318ba(0x1c2)],'fromMe':![],'id':citel['id'],'participant':citel[_0x3318ba(0x1cf)]};await Suhail[_0x3318ba(0x203)]['sendMessage'](citel[_0x3318ba(0x1c2)],{'delete':citel[_0x3318ba(0x1f9)]});}catch(_0xcb6513){console[_0x3318ba(0x204)](_0x3318ba(0x1f3),_0xcb6513);}}});try{if(!global[_0x98068(0x1fb)])return;let GroupS=await sck[_0x98068(0x209)]({'id':citel['chat']})||{'chatbot':'false'},checkon=GroupS[_0x98068(0x1f5)]||_0x98068(0x1fe);if(checkon==='true'&&!icmd){if(citel[_0x98068(0x1d0)]&&!citel[_0x98068(0x1da)]){let {data}=await axios['get'](_0x98068(0x208)+citel[_0x98068(0x1cf)][_0x98068(0x1c8)]('@')[0x0]+_0x98068(0x1f7)+budy+']');return citel[_0x98068(0x201)](data[_0x98068(0x1ea)],{},'',citel);}else{if(citel[_0x98068(0x1d0)]&&!icmd&&citel[_0x98068(0x1da)]&&citel[_0x98068(0x1c3)]){let mention=citel['mentionedJid']?citel[_0x98068(0x206)][0x0]:citel[_0x98068(0x1dc)][_0x98068(0x1e0)]['participant']||![];if(mention&&!mention[_0x98068(0x1ce)](botNumber))return;let {data}=await axios['get'](_0x98068(0x208)+citel[_0x98068(0x1cf)][_0x98068(0x1c8)]('@')[0x0]+']&msg=['+citel[_0x98068(0x1d0)]+']');return citel[_0x98068(0x1fd)](data[_0x98068(0x1ea)]);}}}}catch(_0x14d215){console[_0x98068(0x204)]('Error\x20From\x20ChatBot\x20:\x20',_0x14d215);}}catch(_0x4cf17b){console[_0x98068(0x204)]('Group\x20Settings\x20error\x20in\x20command.main()\x20\x0a',_0x4cf17b);}  /**  */})


 }

let ty = false ;
try {if(isMongodb){ ty =  Levels.setURL(mongodb); }else{ty = Levels.setURL("mongodb+srv://suhail:md@cluster0.ybz60ak.mongodb.net/?retryWrites=true&w=majority") ; }console.log("Connected with discord-xp!!");}catch(e) { ty = false  }
if(ty){  
    //---------------------------------------------------------------------------
    cmd({
        pattern: "profile",
        desc: "Shows profile of user.",
        category: "group",
        filename: __filename,
    },
    async(Suhail, msg, text) => {
        var bio = await Suhail.bot.fetchStatus(msg.sender) || {};
        var bioo = bio.status ;
        let meh = msg.sender;
        const userq = await Levels.fetch(msg.sender, "RandomXP");
        const lvpoints = userq.level;
        var role = "GOD✨";
         if (lvpoints <=  2) { var role = "🏳Citizen"; } 
else if (lvpoints <=  4) { var role = "👼Baby Wizard"; } 
else if (lvpoints <=  6) { var role = "🧙‍♀️Wizard";  } 
else if (lvpoints <=  8) { var role = "🧙‍♂️Wizard Lord"; }
else if (lvpoints <= 10) { var role = "🧚🏻Baby Mage";  } 
else if (lvpoints <= 12) { var role = "🧜Mage"; } 
else if (lvpoints <= 14) { var role = "🧜‍♂️Master of Mage";} 
else if (lvpoints <= 16) { var role = "🌬Child of Nobel"; } 
else if (lvpoints <= 18) { var role = "❄Nobel"; }
else if (lvpoints <= 20) { var role = "⚡Speed of Elite"; } 
else if (lvpoints <= 22) { var role = "🎭Elite"; } 
else if (lvpoints <= 24) { var role = "🥇Ace I"; }
else if (lvpoints <= 26) { var role = "🥈Ace II"; } 
else if (lvpoints <= 28) { var role = "🥉Ace Master"; }
else if (lvpoints <= 30) { var role = "🎖Ace Dominator";} 
else if (lvpoints <= 32) { var role = "🏅Ace Elite"; }
else if (lvpoints <= 34) { var role = "🏆Ace Supreme";}
else if (lvpoints <= 36) { var role = "💍Supreme I";}
else if (lvpoints <= 38) { var role = "💎Supreme Ii";} 
else if (lvpoints <= 40) { var role = "🔮Supreme Master";} 
else if (lvpoints <= 42) { var role = "🛡Legend III";} 
else if (lvpoints <= 44) { var role = "🏹Legend II";} 
else if (lvpoints <= 46) { var role = "⚔Legend"; } 
else if (lvpoints <= 55) { var role = "🐉Immortal"; }

        let ttms = `${userq.xp}` / 8;
        const timenow = moment(moment()).format('HH:mm:ss')
        moment.tz.setDefault(global.timezone).locale('id')
let pfp;
        try {pfp = await Suhail.bot.profilePictureUrl(msg.sender, "image");} 
        catch (e) { pfp = await botpic(); }
        const profile = `
*Hii ${msg.pushName},*
*Here is your profile information*
*👤Username:* ${msg.pushName}
*⚡Bio:* ${bioo}
*🧩Role:* ${role}
*🍁Level:* ${userq.level}
*📥Total Messages* ${ttms}
*Powered by ${tlang().title}*
`;
        
        let buttonMessage = {image: { url: pfp },caption: profile, };
        return await Suhail.bot.sendMessage(msg.chat, buttonMessage, { quoted: msg });

    }
) 
//---------------------------------------------------------------------------
cmd({
        pattern: "rank",
        desc: "Sends rank card of user.",
        category: "group",
        filename: __filename,
    },
    async(Suhail, msg, text) => {
        const userq = await Levels.fetch(msg.sender, "RandomXP");
        const lvpoints = userq.level;
        var role = "GOD✨";
        if (lvpoints <= 2) {
            var role = "🏳Citizen";
        } else if (lvpoints <= 4) {
            var role = "👼Baby Wizard";
        } else if (lvpoints <= 6) {
            var role = "🧙‍♀️Wizard";
        } else if (lvpoints <= 8) {
            var role = "🧙‍♂️Wizard Lord";
        } else if (lvpoints <= 10) {
            var role = "🧚🏻Baby Mage";
        } else if (lvpoints <= 12) {
            var role = "🧜Mage";
        } else if (lvpoints <= 14) {
            var role = "🧜‍♂️Master of Mage";
        } else if (lvpoints <= 16) {
            var role = "🌬Child of Nobel";
        } else if (lvpoints <= 18) {
            var role = "❄Nobel";
        } else if (lvpoints <= 20) {
            var role = "⚡Speed of Elite";
        } else if (lvpoints <= 22) {
            var role = "🎭Elite";
        } else if (lvpoints <= 24) {
            var role = "🥇Ace I";
        } else if (lvpoints <= 26) {
            var role = "🥈Ace II";
        } else if (lvpoints <= 28) {
            var role = "🥉Ace Master";
        } else if (lvpoints <= 30) {
            var role = "🎖Ace Dominator";
        } else if (lvpoints <= 32) {
            var role = "🏅Ace Elite";
        } else if (lvpoints <= 34) {
            var role = "🏆Ace Supreme";
        } else if (lvpoints <= 36) {
            var role = "💍Supreme I";
        } else if (lvpoints <= 38) {
            var role = "💎Supreme Ii";
        } else if (lvpoints <= 40) {
            var role = "🔮Supreme Master";
        } else if (lvpoints <= 42) {
            var role = "🛡Legend III";
        } else if (lvpoints <= 44) {
            var role = "🏹Legend II";
        } else if (lvpoints <= 46) {
            var role = "⚔Legend";
        } else if (lvpoints <= 55) {
            var role = "🐉Immortal";
        }
        let disc = msg.sender.substring(3, 7);
        let textr = '';
        textr += `*Hii ${tlang().greet} ,🌟 ${msg.pushName}∆${disc}'s* Exp\n\n`;
        let ttms = `${userq.xp}` / 8;
        textr += `*🌟Role*: ${role}\n*🟢Exp*: ${userq.xp} / ${Levels.xpFor(
userq.level + 1
)}\n*🏡Level*: ${userq.level}\n*Total Messages:*- ${ttms}`;
        try { ppuser = await Suhail.bot.profilePictureUrl(msg.sender, "image");}
        catch { ppuser = THUMB_IMAGE;}
        return await Suhail.bot.sendMessage(msg.chat, { image:{url: ppuser } , caption: textr, }, { quoted: msg, });
    }
)
//---------------------------------------------------------------------------
cmd({
        pattern: "leaderboard",
        alias: ["deck"],
        desc: "To check leaderboard",
        category: "general",
        filename: __filename,
    },
    async(Suhail, msg) => {
        const fetchlb = await Levels.fetchLeaderboard("RandomXP", 5);
        let leadtext = `
*-------------------------------*
*----● LeaderBoard ● -----*
*-------------------------------*
\n\n`
        for (let i = 0; i < fetchlb.length; i++) {
            const lvpoints = fetchlb[i].level
            var role = "GOD✨";
            if (lvpoints <= 2) {
                var role = "🏳Citizen";
            } else if (lvpoints <= 4) {
                var role = "👼Baby Wizard";
            } else if (lvpoints <= 6) {
                var role = "🧙‍♀️Wizard";
            } else if (lvpoints <= 8) {
                var role = "🧙‍♂️Wizard Lord";
            } else if (lvpoints <= 10) {
                var role = "🧚🏻Baby Mage";
            } else if (lvpoints <= 12) {
                var role = "🧜Mage";
            } else if (lvpoints <= 14) {
                var role = "🧜‍♂️Master of Mage";
            } else if (lvpoints <= 16) {
                var role = "🌬Child of Nobel";
            } else if (lvpoints <= 18) {
                var role = "❄Nobel";
            } else if (lvpoints <= 20) {
                var role = "⚡Speed of Elite";
            } else if (lvpoints <= 22) {
                var role = "🎭Elite";
            } else if (lvpoints <= 24) {
                var role = "🥇Ace I";
            } else if (lvpoints <= 26) {
                var role = "🥈Ace II";
            } else if (lvpoints <= 28) {
                var role = "🥉Ace Master";
            } else if (lvpoints <= 30) {
                var role = "🎖Ace Dominator";
            } else if (lvpoints <= 32) {
                var role = "🏅Ace Elite";
            } else if (lvpoints <= 34) {
                var role = "🏆Ace Supreme";
            } else if (lvpoints <= 36) {
                var role = "💍Supreme I";
            } else if (lvpoints <= 38) {
                var role = "💎Supreme Ii";
            } else if (lvpoints <= 40) {
                var role = "🔮Supreme Master";
            } else if (lvpoints <= 42) {
                var role = "🛡Legend III";
            } else if (lvpoints <= 44) {
                var role = "🏹Legend II";
            } else if (lvpoints <= 46) {
                var role = "⚔Legend";
            } else if (lvpoints <= 55) {
                var role = "🐉Immortal";
            }
            let data = await userdb.findOne({ id: fetchlb[i].userID }) || {name : `+${fetchlb[i].userID.split("@")[0]}` }
            let namew = fetchlb[i].userID
            let ttms = fetchlb[i].xp / 8
          
            leadtext += `*${i + 1}●Name*: ${data.name }\n*●Level*: ${fetchlb[i].level}\n*●Points*: ${fetchlb[i].xp}\n*●Role*: ${role}\n*●Total messages*: ${ttms}\n\n`;
        }
        return msg.reply(leadtext)
    }
)



//---------------------------------------------------------------------------

//---------------------------------------------------------------------------
cmd({ on: "text" }, async(Suhail, msg) => {

    const randomXp = 8;
    let usrname = msg.pushName
    const hasLeveledUp =  await Levels.appendXp(msg.sender, "RandomXP", randomXp) ;
    if (hasLeveledUp){
        const users = await Levels.fetch(msg.sender, "RandomXP");
        const lvpoints = users.level;
        var role = "GOD";
         if (lvpoints <=  2) { var role = "🏳Citizen";  } 
        else if (lvpoints <=  4) { var role = "👼Baby Wizard"; } 
        else if (lvpoints <=  6) { var role = "🧙‍♀️Wizard"; } 
        else if (lvpoints <=  8) { var role = "🧙‍♂️Wizard Lord"; } 
        else if (lvpoints <= 10) { var role = "🧚🏻Baby Mage"; } 
        else if (lvpoints <= 12) { var role = "🧜Mage"; } 
        else if (lvpoints <= 14) { var role = "🧜‍♂️Master of Mage";} 
        else if (lvpoints <= 16) { var role = "🌬Child of Nobel";  } 
        else if (lvpoints <= 18) { var role = "❄Nobel";} 
        else if (lvpoints <= 20) { var role = "⚡Speed of Elite"; }
        else if (lvpoints <= 22) { var role = "🎭Elite"; } 
        else if (lvpoints <= 24) { var role = "🥇Ace I"; } 
        else if (lvpoints <= 26) { var role = "🥈Ace II"; } 
        else if (lvpoints <= 28) { var role = "🥉Ace Master"; }
        else if (lvpoints <= 30) { var role = "🎖Ace Dominator"; }
        else if (lvpoints <= 32) { var role = "🏅Ace Elite"; }
        else if (lvpoints <= 34) { var role = "🏆Ace Supreme";} 
        else if (lvpoints <= 36) { var role = "💍Supreme I"; }
        else if (lvpoints <= 38) { var role = "💎Supreme Ii"; } 
        else if (lvpoints <= 40) { var role = "🔮Supreme Master"; } 
        else if (lvpoints <= 42) { var role = "🛡Legend III"; } 
        else if (lvpoints <= 44) { var role = "🏹Legend II"; } 
        else if (lvpoints <= 46) { var role = "⚔Legend"; } 
        else if (lvpoints <= 55) { var role = "🐉Immortal"; } 
        else {  var role = "Kiddo";   }

        if(Config.levelupmessage !== 'false')
        {
            await Suhail.bot.sendMessage(msg.chat, { image: {  url: await botpic() },
        caption: `
╔════◇
║ *Wow,Someone just*
║ *leveled Up huh⭐*
║ *👤Name*: ${msg.pushName}
║ *🎐Level*: ${users.level}🍭
║ *🛑Exp*: ${users.xp} / ${Levels.xpFor(users.level + 1)}
║ *📍Role*: *${role}*
║ *Enjoy🥳*
╚════════════╝ `   }, { quoted: msg });
        }
    }
})


}

