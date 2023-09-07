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
   * @version 1.0.6
*
   * Licensed under the  GPL-3.0 License;
* 
   * Created By Suhail Tech Info.
   * © 2023 Suhail-Md.
* 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.

 **/

/*
const { cmd,sendAnimeReaction,} = require('../lib')
//-----------------------------------------------------------------------
cmd({pattern: "poke", category: "reaction", use: '<quote|reply|tag>', filename: __filename,  desc: "send Anime poke reaction." },async(Suhail, msg ,text, {cmdName}) => { await sendAnimeReaction(msg,'poke', 'poked to' , 'poked to everyone.' ) })
//-----------------------------------------------------------------------
cmd({pattern: "hug",  category: "reaction", use: '<quote|reply|tag>', filename: __filename,  desc: "send Anime hug reaction."  },async(Suhail, msg ,text, {cmdName}) => { await sendAnimeReaction(msg,cmdName, 'hug to' , 'hug with everyone.' ) })
//-----------------------------------------------------------------------
cmd({pattern: "hold", category: "reaction", use: '<quote|reply|tag>', filename: __filename,  desc: "send Anime hand hold reaction."},async(Suhail, msg) => { await sendAnimeReaction(msg,'handhold', 'hold hand of' , 'holded hand of everyone' ) })
//-----------------------------------------------------------------------
cmd({pattern: "hifi", category: "reaction", use: '<quote|reply|tag>', filename: __filename,  desc: "send Anime hifi reaction."  },async(Suhail, msg) => { await sendAnimeReaction(msg,'highfive', 'highfive with' , 'highfive with everyone.' ) })
    //---------------------------------------------------------------------------
cmd({pattern: "bite", category: "reaction", use: '<quote|reply|tag>', filename: __filename,  desc: "send Anime bite reaction."  },async(Suhail, msg ,text, {cmdName}) => { await sendAnimeReaction(msg,cmdName, 'bitten to' , 'bitten to everyone.' ) })
    //---------------------------------------------------------------------------
cmd({pattern: "blush",category: "reaction", use: '<quote|reply|tag>', filename: __filename,  desc: "send Anime blush reaction." },async(Suhail, msg ,text,  {cmdName}) => {await sendAnimeReaction(msg,cmdName, 'blushed to' , 'blushed to everyone.' )})
    //---------------------------------------------------------------------------
cmd({pattern: "punch",category: "reaction", use: '<quote|reply|tag>', filename: __filename,  desc: "send Anime punch reaction." },async(Suhail, msg ) => {  await sendAnimeReaction(msg,'kick', 'punched to' , 'punched everyone.' ) })
    //---------------------------------------------------------------------------
cmd({pattern: "pat",  category: "reaction", use: '<quote|reply|tag>', filename: __filename,  desc: "send Anime pated reaction." },async(Suhail, msg ,text , {cmdName}) => {  await sendAnimeReaction(msg,cmdName, 'patted with' , 'patted with everyone.' ) })
    //---------------------------------------------------------------------------
cmd({pattern: "kiss", category: "reaction", use: '<quote|reply|tag>', filename: __filename,  desc: "send Anime kiss reaction."  },async(Suhail, msg ,text , {cmdName}) => {  await sendAnimeReaction(msg,cmdName, 'kissed with' , 'kissed with everyone.' ) })
    //---------------------------------------------------------------------------
cmd({pattern: "kill", category: "reaction", use: '<quote|reply|tag>', filename: __filename,  desc: "send Anime kill reaction."  },async(Suhail, msg ,text , {cmdName}) => {  await sendAnimeReaction(msg,cmdName, 'kill ' , 'kill everyone over here' ) })
    //---------------------------------------------------------------------------
cmd({pattern: "happy", category: "reaction", use: '<quote|reply|tag>', filename: __filename,  desc: "send Anime happy reaction."},async(Suhail, msg) => {  await sendAnimeReaction(msg,'dance', 'feel happy with' , 'feel happy with everyone') })
    //---------------------------------------------------------------------------
cmd({pattern: "dance", category: "reaction", use: '<quote|reply|tag>', filename: __filename,  desc: "send Anime dance reaction."},async(Suhail, msg ,text , {cmdName}) => {  await sendAnimeReaction(msg,cmdName, 'dance with' , 'dance with everyone over here' ) })
    //---------------------------------------------------------------------------
cmd({pattern: "yeet", category: "reaction", use: '<quote|reply|tag>', filename: __filename,  desc: "send Anime yeet reaction."  },async(Suhail, msg ,text , {cmdName}) => {  await sendAnimeReaction(msg,cmdName, 'yeeted to' , 'yeeted with everyone' ) })
    //---------------------------------------------------------------------------
cmd({pattern: "wink", category: "reaction", use: '<quote|reply|tag>', filename: __filename,  desc: "send Anime wink reaction."  },async(Suhail, msg ,text , {cmdName}) => {  await sendAnimeReaction(msg,cmdName, 'winked with' , 'winked with everyone' ) })
    //---------------------------------------------------------------------------
cmd({pattern: "slap", category: "reaction", use: '<quote|reply|tag>', filename: __filename,  desc: "send Anime slap reaction."  },async(Suhail, msg ,text , {cmdName}) => {  await sendAnimeReaction(msg,cmdName, 'slap to' , 'slap to everyone' ) })
    //---------------------------------------------------------------------------
cmd({pattern: "bonk", category: "reaction", use: '<quote|reply|tag>', filename: __filename,  desc: "send Anime bonk reaction."  },async(Suhail, msg ,text , {cmdName}) => {  await sendAnimeReaction(msg,cmdName, 'bonked to' , 'bonked to everyone' ) })
    //---------------------------------------------------------------------------
cmd({pattern: "bully", category: "reaction", use: '<quote|reply|tag>', filename: __filename,  desc: "send Anime bully reaction."},async(Suhail, msg ,text , {cmdName}) => {  await sendAnimeReaction(msg,cmdName, 'bullied to' , 'bullied to everyone' ) })
    //---------------------------------------------------------------------------
cmd({pattern: "cringe",category: "reaction", use: '<quote|reply|tag>', filename: __filename,  desc: "send Anime cringe reaction."},async(Suhail, msg ,text , {cmdName}) => {  await sendAnimeReaction(msg,cmdName, 'cringed to' , 'cringed to everyone' ) })
    //---------------------------------------------------------------------------
cmd({pattern: "cuddle",category: "reaction", use: '<quote|reply|tag>', filename: __filename,  desc: "send Anime cuddle reaction."},async(Suhail, msg ,text , {cmdName}) => {  await sendAnimeReaction(msg,cmdName, 'cuddled with' , 'cuddled with everyone' ) })








*/