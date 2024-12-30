astro_patch.cmd(

  {

    pattern: "shell",

    category: "tools",

    filename: __filename,

    fromMe: true,

    desc: "Runs a command in the server shell (e.g., Heroku).",

    use: "<shell commands | ls, cd >",

    dontAddCommandList: true,

  },

  async (message, query) => {

    try {

      if (!message.isCreator) {

        return message.reply(tlang().owner);

      }

      if (!query) {

        return message.reply("*Please provide a command to run*");

      }

      exec(query, (err, stdout) => {

        if (err) {

          return message.reply("----" + tlang().title + "----\n\n" + err);

        }

        if (stdout) {

          return message.reply("----" + tlang().title + "----\n\n" + stdout);

        }

      });

    } catch (error) {

      await message.error(error + "\n\ncommand shell", error);

    }

  }

);
astro_patch.cmd(

  {

    pattern: "eval",

    alias: ["$"],

    category: "tools",

    filename: __filename,

    fromMe: true,

    desc: "Runs JavaScript code on the Node.js server.",

    use: "< run code >",

    dontAddCommandList: true,

  },

  async (message, query, { isCreator, cmdName, Void }) => {

    try {

      if (!query) {

        return message.reply("*Provide a query to run*");

      }

      let result = eval("const a = async()=>{\n" + query + "\n}\na()");

      if (typeof result === "object") {

        await message.reply(JSON.stringify(result));

      } else {

        await message.reply(result.toString());

      }

    } catch (error) {

      return await message.reply(error.toString());

    }

  }

);