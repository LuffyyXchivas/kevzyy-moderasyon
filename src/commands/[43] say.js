const conf = require("../configs/config.json");
const emojis = require("../configs/emojis.json");
const Discord = require("discord.js");

module.exports = {
  conf: {
    aliases: [],
    name: "say",
    help: "say",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args) => {
    let embed = new Discord.MessageEmbed()
    if (!message.member.hasPermission(128)) return;
    embed.setFooter(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }));
    embed.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));
    embed.setColor("BLACK")
    embed.setDescription(`${emojis.kevzyyuser} Sunucumuzda \`${message.guild.memberCount}\` adet **üye** bulunuyor.
    ${emojis.security} Sunucumuzda \`${message.guild.members.cache.filter((x) => x.user.presence.status !== "offline").size}\` adet **online** üye bulunuyor.
    ${emojis.kevzyyuser} Sunucumuzda \`${message.guild.members.cache.filter((x) => x.user.username.includes(conf.tag.tag[0])).size}\` **taglı** üye bulunuyor. 
    ${emojis.kevzyybooster} Sunucumuzda \`${message.guild.members.cache.filter((x) => x.premiumSince).size}\` adet **boost  basan** üye bulunuyor.
    ${emojis.kevzyyvoice} Sunucumuzda \`${message.guild.members.cache.filter((x) => x.voice.channel).size}\` adet **sesli** üye bulunuyor.
    `);

    message.channel.send(embed);
  },
};
