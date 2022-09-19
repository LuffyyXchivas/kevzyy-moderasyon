const { emojis } = require("../configs/config.json");
const moment = require("moment");
moment.locale("tr");
const penals = require("../schemas/penals");
const disbut = require("discord-buttons");
const discord = require("discord.js");
const { MessageButton,MessageActionRow } = require('discord-buttons');
module.exports = {
  conf: {
    aliases: [],
    name: "sıfırla",
    help: "sıfırla [kullanıcı]",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    if (!message.member.hasPermission(8)) return;
   const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!member) return message.channel.send(embed.setDescription('Bir kullanıcı belirtmelisin. <@Kevzyy/ID>'))

 var DeleteName = new MessageButton()
    .setLabel("İsimlerini")
    .setID("isim_sıfırla")
    .setStyle("blurple")

    var DeletePenalty = new MessageButton()
    .setLabel("Teyitlerini")
    .setID("cezapuan_sıfırla")
    .setStyle("green")

    var DeletePenal = new MessageButton()
    .setLabel("Sicilini")
    .setID("sicil_sıfırla")
    .setStyle("red")

    var Iptal = new MessageButton()
    .setLabel("İptal")
    .setID("iptal_button")
    .setStyle("gray")
    .setEmoji("909485171240218634")

    const row = new MessageActionRow()
    .addComponents(DeleteName, DeletePenalty, DeletePenal, Iptal)

 
  const kevzyy = new discord.MessageEmbed()
 .setAuthor( message.author.tag, message.author.avatarURL({ dynamic: true }))
  .setColor("BLACK")
   .setDescription(`${member} kullanıcısının verilerini silmek için istediğiniz butonu seçin.
   
   \`\`\`diff
- Kayıt verileri (Teyitleri)
- Kayıtlı Olduğu İsimler (İsimleri)
- Almış Olduğu Cezaları (Sicili)\`\`\`
`)
  
 let msg = await message.channel.send(kevzyy, { components: [row] });
 
 var filter = (button) => button.clicker.user.id === message.author.id;
   
    let collector = await msg.createButtonCollector(filter, { time: 99999999 })
    collector.on("collect", async (button) => {
     
     if(button.id === "isim_sıfırla") {
       DeleteName.setDisabled(true)
        await button.reply.defer()
       const name = require("../schemas/names");
        await name.deleteMany({userID: member.user.id, guildID: message.guild.id})
      const isim = new discord.MessageEmbed()
      .setDescription(`<a:green:1007661631041441842>${member.toString()} üyesinin isim verileri temizlendi!`)

 msg.edit({ components: null, embed: isim }); 
      
      }

  if(button.id === "cezapuan_sıfırla") {
    DeletePenalty .setDisabled(true)
    await button.reply.defer()
   const regstats = require("../schemas/registerStats");
    await regstats.deleteMany({userID: member.user.id, guildID: message.guild.id})
    const cezapuan = new discord.MessageEmbed()
    .setDescription(`<a:green:1007661631041441842> ${member.toString()} üyesinin teyit verileri temizlendi!`) 


 msg.edit({ components: null, embed: cezapuan }); 
    }
 if(button.id === "sicil_sıfırla") {  
   
    await button.reply.defer()
   const penals = require("../schemas/penals");
    await penals.deleteMany({userID: member.user.id, guildID: message.guild.id})
    const sicil = new discord.MessageEmbed()
    .setDescription(`<a:green:1007661631041441842> ${member.toString()} üyesinin sicili temizlendi!`) 

 msg.edit({ components: null, embed: sicil });
    }

 if(button.id === "iptal_button") {   
   DeleteName.setDisabled(true)
   DeletePenalty.setDisabled(true)
   DeletePenal.setDisabled(true)
   Iptal.setDisabled(true)
    await button.reply.defer()
    const iptal = new discord.MessageEmbed()
    .setDescription(`<a:green:1007661631041441842> Sıfırlama işlemi iptal edildi!`) 

msg.edit({ components:null, embed: iptal });
 }
    }
                 )
  },
};
