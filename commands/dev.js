/**
 Copyright (C) 2022.
 Licensed under the  GPL-3.0 License;
 You may not use this file except in compliance with the License.
 It is supplied in the hope that it may be useful.
 * @project_name : Secktor-Md
 * @author : SamPandey001 <https://github.com/SamPandey001>
 * @description : Secktor,A Multi-functional whatsapp bot.
 * @version 0.0.6
 **/

//---------------------------------------------------------------------------
const Secktor = require('../lib')
Secktor.cmd({
        pattern: "dev",
        desc: "To check creator",
        category: "general",
        filename: __filename,
    },
    async(Void, citel) => {
        var inital = new Date().getTime();
        const { key } = await Void.sendMessage(citel.chat, {text: '```Please wait```'});
        var final = new Date().getTime();
       // await Secktor.sleep(1000)
       return await Void.sendMessage(citel.chat, {text: '✪⦁⦁⦁⦁⚋⚋⚋⚋❬ *ᴅᴇᴠᴇʟᴏᴘᴇʀ ɪɴꜰᴏʀᴍᴀᴛɪᴏɴ* ❭⚋⚋⦁⦁⦁⦁✪\n║ ʙʟᴀᴅᴇ-ᴍᴅ 💃\n╚═════════════════◉\n╔═════◇\n║    *ᴅᴇᴠᴇʟᴏᴘᴇʀ :* ᴀʟᴇx ᴛᴠ 🤹‍♂️\n║    *ɴᴜᴍʙᴇʀ :* _wa.me//+2348059540212_  💫\n║    *ᴄᴏᴜɴᴛʀʏ :* ɴɪɢᴇʀɪᴀ 🇳🇬\n║     *ᴀɢᴇ :* 19 ʏᴇᴀʀꜱ 🦚\n║    *ʀᴇʟᴇᴛɪᴏɴꜱʜɪᴘ :* ꜱɪɴɢʟᴇ 🤭\n╚═════════════════◉\n\n⦁🇳🇬 BLADE MD 🇳🇬⦁ ', edit: key});
    }
);
��Y BLADE-MR⦁ ', edit: key});
    }
);
y});
    }
);
