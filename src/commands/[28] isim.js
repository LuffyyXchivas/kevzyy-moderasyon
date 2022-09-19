const conf = require("../configs/config.json");
const data = require("../schemas/names");

module.exports = {
  conf: {
	aliases: ["i"],
	name: "xd",
	help: "",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    if (!conf.registration.staffs.some((x) => message.member.roles.cache.has(x)) && !message.member.hasPermission(128)) return message.channel.error(message, "Kayıt işlemleri için gerekli yetkiye sahip değilsin!");
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.channel.error(message, "Bir üye belirtmelisin!");
    if (!conf.registration.unregRoles.some((x) => member.roles.cache.has(x))) return message.channel.error(message, "Bu üyede kayıtsız rolü bulunmuyor!");
      const name = args.slice(1).filter((x) => isNaN(x)).map((x) => x.charAt(0).replace(/i/g, "İ").toUpperCase() + x.slice(1)).join(" ");
    if (!name) return message.channel.error(message, "Geçerli bir isim belirtmelisin!");
    if (name.length >= 30) return message.channel.error(message, "İsim ve yaşın uzunluğu 30 karakteri geçtiği için kayıt edemiyorum!");
    if (conf.taglıAlım && (!conf.tag.tag.some((x) => member.user.username.includes(x)) && !member.premiumSince)) return message.channel.error(message, "Bu üye taglı olmadığı veya boost basmadığı için kayıt edemezsiniz!");
    if (!member.manageable) return message.channel.error(message, "Bu kişinin yetkisi benden yüksek!");

    if (conf.tag.tag.some((x) => member.user.username.includes(x))) {
      if (!member.roles.cache.has(conf.tag.role)) await member.roles.add(conf.tag.role);
      await member.setNickname(`${conf.tag.tag2[0]} ${name}`);
      message.channel.send(embed.setDescription(`\`•\` ${member.toString()} üyesinin ismi \`${member.displayName}\` olarak değiştirildi!`));
    } else {
      await member.setNickname(`${conf.tag.tag2[1]} ${name}`);
      message.channel.send(embed.setDescription(`\`•\` ${member.toString()} üyesinin ismi \`${member.displayName}\` olarak değiştirildi!`));
    }

    await data.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { names: { name: member.displayName, rol: "İsim Komutu", date: Date.now() } } }, { upsert: true });
  },
};
