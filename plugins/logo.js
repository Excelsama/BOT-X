let { smd, textToLogoGenerator, prefix } = require("../lib");

smd(
  {
    cmdname: "glow",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      if (!match)
        return message.reply(`*_Example : ${prefix + cmdName} Asta_*`);
      await require("../lib").textToLogoGenerator(
        message,
        "hieu-ung-chu/tao-hieu-ung-chu-mam-anh-sang-74",
        match,
        "ser",
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);
//-----------------------------------------------------------------------------------
smd(
  {
    cmdname: "glitch",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      if (!match)
        return message.reply(`*_Example : ${prefix + cmdName} Asta_*`);
      return await textToLogoGenerator(
        message,
        "tao-hieu-ung-chu-digital-glitch-truc-tuyen-941",
        match,
        "suhail",
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);
//-----------------------------------------------------------------------------------
smd(
  {
    cmdname: "pixel",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      if (!match)
        return message.reply(`*_Example : ${prefix + cmdName} Asta_*`);
      return await textToLogoGenerator(
        message,
        "tao-hieu-ung-chu-pixel-glitch-truc-tuyen-940",
        match,
        "suhail",
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);

//--------------------------------------------------------------------------------------
smd(
  {
    cmdname: "grafiti",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      if (!match)
        return message.reply(`*_Example : ${prefix + cmdName} Asta_*`);
      return await textToLogoGenerator(
        message,
        "tao-hieu-ung-chu-graffiti-duong-pho-an-tuong-online-795",
        match,
        "suhail",
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);

//-------------------------------------------------------------------------------
smd(
  {
    cmdname: "grafiti2",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      if (!match)
        return message.reply(`*_Example : ${prefix + cmdName} Asta_*`);
      return await textToLogoGenerator(
        message,
        "hieu-ung-chu/chu-graffiti-online-mau-8-182",
        match,
        "suhail",
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);

//-------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------
smd(
  {
    cmdname: "grafiti3",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      //if (!text) return message.reply(`*_Example : ${prefix+cmdName} text1;text2_*`);
      let text1 = match ? match.split(";")[0] : "";
      let text2 = match ? match.split(";")[1] : "";
      if (!text2 || !text1)
        return await message.reply(
          `*_Example : ${prefix + cmdName} text1;text2_*`
        );
      return await textToLogoGenerator(
        message,
        "tao-hieu-ung-chu-graffiti-sieu-ngau-online-794",
        text1,
        text2
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);
//================================================================================================
smd(
  {
    cmdname: "grafiti4",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      //if (!text) return message.reply(`*_Example : ${prefix+cmdName} text1;text2_*`);
      let text1 = match ? match.split(";")[0] : "";
      let text2 = match ? match.split(";")[1] : "";
      if (!text1)
        return await message.reply(`*_Example : ${prefix + cmdName} text1_*`);
      return await textToLogoGenerator(
        message,
        "hieu-ung-chu/tao-cover-graffiti-online-181",
        text1,
        text2 || "ser",
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);
//================================================================================================

//-----------------------------------------------------------------------------------

smd(
  {
    cmdname: "gradient",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      // if (!text) return message.reply(`*_Example : ${prefix+cmdName} text1;text2_*`);
      let text1 = match ? match.split(";")[0] : "";
      let text2 = match ? match.split(";")[1] : "";
      if (!text2 || !text1)
        return await message.reply(
          `*_Example : ${prefix + cmdName} text1;text2_*`
        );
      await textToLogoGenerator(
        message,
        "tao-logo-gradient-3d-truc-tuyen-501",
        text1,
        text2,
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);
//-----------------------------------------------------------------------------------

smd(
  {
    cmdname: "wtone",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      // if (!text) return message.reply(`*_Example : ${prefix+cmdName} text1;text2_*`);
      let text1 = match ? match.split(";")[0] : "";
      let text2 = match ? match.split(";")[1] : "";
      if (!text2 || !text1)
        return await message.reply(
          `*_Example : ${prefix + cmdName} text1;text2_*`
        );
      await textToLogoGenerator(
        message,
        "tao-logo-chu-truc-tuyen-499",
        text1,
        text2,
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);

//-----------------------------------------------------------------------------------
//---------------------------------------------------------------------------
smd(
  {
    cmdname: "phub",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      // if (!text) return message.reply(`*_Example : ${prefix+cmdName} text1;text2_*`);
      let text1 = match ? match.split(";")[0] : "";
      let text2 = match ? match.split(";")[1] : "";
      if (!text2 || !text1)
        return await message.reply(
          `*_Example : ${prefix + cmdName} text1;text2_*`
        );
      await textToLogoGenerator(
        message,
        "tao-logo-phong-cach-pornhub-612",
        text1,
        text2,
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);

//-----------------------------------------------------------------------------------
smd(
  {
    cmdname: "avenger",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      //if (!text) return message.reply(`*_Example : ${prefix+cmdName} text1;text2_*`);
      let text1 = match ? match.split(";")[0] : "";
      let text2 = match ? match.split(";")[1] : "";
      if (!text2 || !text1)
        return await message.reply(
          `*_Example : ${prefix + cmdName} text1;text2_*`
        );
      return await textToLogoGenerator(
        message,
        "tao-logo-3d-phong-cach-avengers-445",
        text1,
        text2,
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);
//-----------------------------------------------------------------------------------
smd(
  {
    cmdname: "marvel",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      ///if (!text) return message.reply(`*_Example : ${prefix+cmdName} text1;text2_*`);
      let text1 = match ? match.split(";")[0] : "";
      let text2 = match ? match.split(";")[1] : "";
      if (!text2 || !text1)
        return await message.reply(
          `*_Example : ${prefix + cmdName} text1;text2_*`
        );
      return await textToLogoGenerator(
        message,
        "tao-logo-phong-cach-marvel-419",
        text1,
        text2,
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);