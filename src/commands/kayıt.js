const conf = require("../configs/config.json");
const isimler = require("../schemas/names");
const regstats = require("../schemas/registerStats");

module.exports = {
  conf: {
    aliases: ["kaydet", "e", "k","erkek","kız"],
    name: "kayıt",
    help: "kayıt [kullanıcı] [isim] [yaş]",
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
    const agge = args.slice(2)
    if (!name) return message.channel.error(message, "Geçerli bir isim belirtmelisin!");
        if (!agge) return message.channel.error(message, "Geçerli bir yaş belirtmelisin!");
    if (name.length + conf.tag.tag2[0].length >= 30) return message.channel.error(message, "İsim ve yaşın uzunluğu 30 karakteri geçtiği için kayıt edemiyorum!");
 if (conf.taglıAlım == true) {
    if(!member.roles.cache.has("968984991730135101") && !member.roles.cache.has("968985003411267615") && !member.roles.cache.has("968976034382880769")) return message.channel.send(embed.setDescription(`${member.toString()} isimli üyenin kullanıcı adında tagımız (\`Ψ\`) olmadığı, <@&968976034382880769>, <@&968985003411267615> Rolü olmadığı için isim değiştirmekden başka kayıt işlemi yapamazsınız.`));
    }

    if (!member.manageable) return message.channel.error(message, "Bu kişinin yetkisi benden yüksek!");

  const İsim = `${member.user.username.includes(conf.tag.tag) ? conf.tag.tag : conf.tag.tag2} ${name} | ${agge}`
  
  await member.setNickname(İsim)

    const emojis = require("../configs/emojis.json");
  
    if(!member.roles.cache.has(conf.registration.manRoles) && !member.roles.cache.has(conf.registration.womanRoles)) {
const { MessageButton } = require('discord-buttons');
      const { MessageEmbed} = require('discord.js');
    var button_1 = new MessageButton()
    .setID("MAN")
    .setLabel("Erkek")
    .setStyle("blurple")
    .setEmoji("1008484332668719105")

    var button_2 = new MessageButton()
    .setID("WOMAN")
    .setLabel("Kadın")
    .setStyle("green")
    .setEmoji("1008484392106213457")

    var button_3 = new MessageButton()
    .setID("İPTAL")
    .setLabel("İptal")
    .setStyle("red")
    .setEmoji("920412153712889877")

    let erkekRol = conf.registration.manRoles;
    let kadinRol = conf.registration.womanRoles;
      
const nameData = require("../schemas/names");
    const data = await nameData.findOne({ guildID: message.guild.id, userID: member.user.id });


    let ozi = new MessageEmbed()
    .setColor("BLACK")
.setDescription(`
${emojis.inviteStar} ${member.toString()} üyesinin ismi **${İsim}** olarak değiştirildi!

${emojis.ping} Kullanıcının önceki isimlerine \`.isimler <@Kevzyy/ID>\` komutuyla bakabilirsiniz.
    `)
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
.setFooter(`Lütfen 30 saniye alttaki butonlara basarak kullanıcının cinsiyetini belirleyin.`)
   
 let msg = await message.channel.send({ buttons : [ button_1, button_2, button_3 ], embed: ozi})
 
    var filter = (button) => button.clicker.user.id === message.author.id;
   
    let collector = await msg.createButtonCollector(filter, { time: 30000 })

      collector.on("collect", async (button) => {

if(button.id === "MAN") {
await button.reply.defer()
let ozie = new MessageEmbed()
.setColor("BLUE")
.setDescription(`
\`•\` ${member.toString()} adlı kullanıcı \`erkek\` olarak kayıt edildi
`)
.setFooter(`Developed By Kevzyy`)
.setAuthor(member.displayName, member.user.displayAvatarURL({ dynamic: true }))


msg.edit({components: null, embed: ozie}); 

    await member.roles.add(conf.registration.manRoles)
    await member.roles.remove(conf.registration.unregRoles)
   await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { top: 1, topGuild24: 1, topGuild7: 1, top24: 1, top7: 1, top14: 1, erkek: 1, erkek24: 1, erkek7: 1, erkek14: 1, }, }, { upsert: true });
    await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: member.id }, { $inc: { kayıtlı: 1, }, }, { upsert: true });
    message.guild.channels.cache.get(conf.chat).send(`${member.toString()} aramıza katıldı!`).then(x=> x.delete({timeout: 5000})) 
    message.member.updateTask(message.guild.id, "kayıt", 1, message.channel);
    await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { names: { name: member.displayName, rol: `<@&${conf.registration.manRoles[0]}>`, date: Date.now() } } }, { upsert: true });


}
if(button.id === "WOMAN") {
  
await button.reply.defer()
let ozik = new MessageEmbed()
.setColor("#d723e9")
.setDescription(`
\`•\` ${member.toString()} adlı kullanıcı \`kız\` olarak kayıt edildi
`)
.setFooter(`Developed By Kevzyy`)
.setAuthor(member.displayName, member.user.displayAvatarURL({ dynamic: true }))

msg.edit({components: null, embed: ozik}); 

    await member.roles.add(conf.registration.womanRoles)

    await member.roles.remove(conf.registration.unregRoles)
await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { top: 1, topGuild24: 1, topGuild7: 1,	top24: 1, top7: 1, top14: 1, kız: 1, kız24: 1, kız7: 1, kız14: 1, }, }, { upsert: true });
    await regstats.findOneAndUpdate({ guildID: message.guild.id, userID: member.id }, { $inc: { kayıtlı: 1, }, }, { upsert: true });
    message.guild.channels.cache.get(conf.chat).send(`${member.toString()} aramıza katıldı!`).then(x=> x.delete({timeout: 5000})) 
    message.member.updateTask(message.guild.id, "kayıt", 1, message.channel);
    await isimler.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { names: { name: member.displayName, rol: `<@&${conf.registration.womanRoles[0]}>`, date: Date.now() } } }, { upsert: true });


}

if(button.id === "İPTAL") {
msg.edit(`${emojis.tik} İşlem Başarıyla İptal Edildi `,{components: null}); 
member.setNickname(`• İsim | Yaş`)
await member.roles.set(conf.registration.unregRoles)

}


      })
    }
  
  
  },
};
