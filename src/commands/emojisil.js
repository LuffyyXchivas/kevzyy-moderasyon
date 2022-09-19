const conf = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const banLimit = new Map();
moment.locale("tr");

module.exports = {
  conf: {
    aliases: [""],
    name: "emojisil",
    help: "",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
  message.guild.emojis.cache.filter(u => {
            u.delete()
         })
  },
};
