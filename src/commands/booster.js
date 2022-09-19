const conf = require("../configs/config.json");

module.exports = {
  conf: {
    aliases: ["zengin"],
    name: "booster",
    help: "booster [isim]",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */
  
  run: async (client, message, args, embed) => {
    if (!message.member.premiumSince) return message.channel.error(message, "Bu komutu kullanabilmek için boost basmış olmanız gerekmektedir!");
    if (!message.member.manageable) return message.channel.error(message, "Bu üyenin adını değiştiremiyorum!");

    let uye = message.guild.members.cache.get(message.author.id);
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yazilacakIsim;
    if (!isim) return message.channel.error(message, "Bir kullanıcı adı belirtmelisiniz!");
    if (isim.length >= 30) return message.channel.error(message, "Kullanıcı adınız en fazla 30 karakter olabilir!");
 yazilacakIsim = `${uye.user.username.includes(conf.tag) ? conf.tag : (conf.ikinciTag ? conf.ikinciTag : (conf.tag || ""))} ${isim}`;
    uye.setNickname(`${yazilacakIsim}`).catch() 
    
    message.channel.send(embed.setDescription(`Kullanıcı adınız başarıyla \`${yazilacakIsim}\` olarak değiştirildi!`));
  },
};