const conf = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const banLimit = new Map();
moment.locale("tr");

module.exports = {
  conf: {
    aliases: [""],
    name: "emojilist",
    help: "",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
message.channel.send(`Sunucuda Bulunan Emojiler (${message.guild.emojis.cache.size} adet) \n\n${message.guild.emojis.cache.map(emoji => emoji.id + " | " + emoji.toString()).join('\n')}`, {code: 'xl', split: true})
  },
};
