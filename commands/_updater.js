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
   * @project_name : blade-Md
   * @author : Suhail Tech Info
   * @youtube : https://www.youtube.com/c/@SuhailTechInfo0
   * @description : Suhail-Md ,A Multi-functional whatsapp user bot.
   * @version 1.2.2
*
   * Licensed under the  GPL-3.0 License;
* 
   * Created By blade bot.
   * © 2023 blade-Md.
* 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.

 **/

const DB = require('../lib/scraper')
const { tlang, Config, prefix,cmd , sleep } = require('../lib')
const simpleGit = require('simple-git');
const git = simpleGit();
const Heroku = require('heroku-client');
//---------------------------------------------------------------------------

 


async function updateHerokuApp(heroku = '') {
    function _0x3d2e(_0x26f4e6,_0x47f044){const _0x55f906=_0x55f9();return _0x3d2e=function(_0x3d2e65,_0x4469ac){_0x3d2e65=_0x3d2e65-0xb5;let _0x514c4e=_0x55f906[_0x3d2e65];return _0x514c4e;},_0x3d2e(_0x26f4e6,_0x47f044);}const _0x1d0f8e=_0x3d2e;(function(_0x59c352,_0x36a06a){const _0x376e2b=_0x3d2e,_0x98dc08=_0x59c352();while(!![]){try{const _0x2f6a54=-parseInt(_0x376e2b(0xc1))/0x1+parseInt(_0x376e2b(0xd4))/0x2*(parseInt(_0x376e2b(0xc5))/0x3)+parseInt(_0x376e2b(0xc2))/0x4*(parseInt(_0x376e2b(0xd2))/0x5)+parseInt(_0x376e2b(0xcc))/0x6*(parseInt(_0x376e2b(0xca))/0x7)+-parseInt(_0x376e2b(0xcf))/0x8*(parseInt(_0x376e2b(0xc0))/0x9)+-parseInt(_0x376e2b(0xbb))/0xa*(-parseInt(_0x376e2b(0xc3))/0xb)+-parseInt(_0x376e2b(0xd0))/0xc*(parseInt(_0x376e2b(0xb7))/0xd);if(_0x2f6a54===_0x36a06a)break;else _0x98dc08['push'](_0x98dc08['shift']());}catch(_0x499bd8){_0x98dc08['push'](_0x98dc08['shift']());}}}(_0x55f9,0x5667c));if(heroku==='no')try{return await require(_0x1d0f8e(0xbc))()[_0x1d0f8e(0xb5)](_0x1d0f8e(0xc8),[_0x1d0f8e(0xc9)]),await require(_0x1d0f8e(0xbc))()[_0x1d0f8e(0xcb)](),_0x1d0f8e(0xc6);}catch(_0xcbd0c2){return _0xcbd0c2;}else{if(heroku===_0x1d0f8e(0xb9)){const heroku=new Heroku({'token':process['env'][_0x1d0f8e(0xbe)]});await git['fetch']();const commits=await git['log'](['main..origin/main']);if(commits['total']===0x0)return _0x1d0f8e(0xc7);else{const app=await heroku[_0x1d0f8e(0xb6)](_0x1d0f8e(0xce)+process[_0x1d0f8e(0xd5)]['HEROKU_APP_NAME']),gitUrl=app[_0x1d0f8e(0xd6)][_0x1d0f8e(0xb8)](_0x1d0f8e(0xcd),_0x1d0f8e(0xba)+process[_0x1d0f8e(0xd5)][_0x1d0f8e(0xbe)]+'@');try{await git[_0x1d0f8e(0xbf)](_0x1d0f8e(0xd3),gitUrl);}catch(_0x5e8fe7){console['log'](_0x1d0f8e(0xd1));}return await git[_0x1d0f8e(0xbd)](_0x1d0f8e(0xd3),_0x1d0f8e(0xd7)),_0x1d0f8e(0xc4);}}}function _0x55f9(){const _0x125a76=['git_url','main','reset','get','13GFdUYX','replace','yes','https://api:','36590MKBZar','simple-git','push','HEROKU_API_KEY','addRemote','5634QUgJqy','79709kKZOpy','43376wDOQyY','1133cGbFCG','Bot\x20updated.\x20Restarting.','6dfrpsO','*Successfully\x20updated.\x20Bot\x20Restarting...!*','You\x20already\x20have\x20the\x20latest\x20version\x20installed.','hard','HEAD','950327rHYrgy','pull','18BYwcEn','https://','/apps/','6456XuMedl','10087764ixJlfC','Heroku\x20remote\x20adding\x20error','280MvqISw','heroku','388030OacCGg','env'];_0x55f9=function(){return _0x125a76;};return _0x55f9();}
}

  
//---------------------------------------------------------------------------
cmd({
            pattern: "update",
            desc: "Shows repo\'s refreshed commits.",
            category: "tools",
            filename: __filename
        },
        async(blade, msg, text,{ isCreator }) => {
            if (!isCreator) return msg.reply(`This command is only for my owner`)
            let commits = await DB.syncgit()
            if (commits.total === 0) return await msg.reply(`*BOT IS UPTO DATE...!!*`) 
            let update = `*BLADE_MD New Updates:*\n\n${await DB.sync()}`
            await blade.bot.sendMessage(msg.chat, { text: update, },{ quoted : msg });
            if(Config.HEROKU_APP_NAME && Config.HEROKU_API_KEY && text == 'start')
            {
               await msg.reply('Heroku Build started...');
              try{
                let updater = await updateHerokuApp('yes');
              }catch(e){return await msg.error(e)}
              return await msg.reply(updater);

            }
})
  
//---------------------------------------------------------------------------
//                  UPDATE COMMANDS
//---------------------------------------------------------------------------

        
     cmd({
                 pattern: "updatenow",
                 desc: "Shows repo\'s refreshed commits.",
                 category: "tools",
                 filename: __filename
             },
        async(blade, msg, text,{ isCreator }) => {
                if(!isCreator) return await msg.reply("Only Owner Can Use This Command")
                let commits = await DB.syncgit()
                if (commits.total === 0) return await msg.reply(`*YOU HAVE LATEST VERSION INSTALLED!*`)
                let update = await DB.sync()
                await msg.send(" *BLADE_MD Updater Started...!*\n\n*Please wait you have new updates*\n *───────────────────────────*\n"+update +"\n\n\n"+Config.caption);
                await sleep(3000);
          try{
               let res = await updateHerokuApp('no');
          }catch(e){return await msg.error(e)}
          await msg.reply(`*Successfully updated. Now You Have Latest Version Installed!*`);
                process.exit(0);
       })
cmd({   pattern: "restart", desc: "To restart bot",category: "tools", filename: __filename }, async(blade, msg,text,{ isCreator }) => {  if (!isCreator) return msg.reply(tlang().owner);  const { exec } = require("child_process"); msg.reply('Restarting'); exec('pm2 restart all'); });

 
 all'); });

 
