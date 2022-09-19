const { emojis } = require("../configs/config.json");
const moment = require("moment");
moment.locale("tr");
const { MessageEmbed } = require('discord.js')
const penals = require("../schemas/penals");
const disbut = require("discord-buttons");
module.exports = {
  conf: {
    aliases: ["kontrol"],
    name: "control",
    help: "kontrol"
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {
    let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author);

    if( !message.member.hasPermission('ADMINISTRATOR')) 
    { 
    message.channel.send(`Yetkin bulunmamakta dostum. `).then(x=> x.delete({timeout: 5000})) 
    return }
 
     
    
 
  
    let ozicim = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

let ecdagit = new disbut.MessageButton().setStyle('red').setLabel('Etkinlik/Çekiliş Rol Dağıt').setID('ecdagit')
let tagrol = new disbut.MessageButton().setStyle('green').setLabel('Tag Rol Dağıt').setID('tagrol')
let kayıtsızdagit = new disbut.MessageButton().setStyle('blurple').setLabel('Kayıtsız Rol Dağıt').setID('kayıtsızdagit')

let ozi = new MessageEmbed()
.setDescription(`
${message.member.toString()}, \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` rolü olmayan üyelerin rol dağıtım tablosu aşağıda belirtilmiştir.
`)

.addFields(

{ name: "__**Kayıtsız Rol**__", value: `
\`\`\`fix
${ozicim.size} kişi
\`\`\`
`, inline: true }
)

.setColor("BLACK")
.setFooter(message.author.tag, message.author.avatarURL())
.setTimestamp()
.setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
 
 
  let msg = await message.channel.send({ buttons : [kayıtsızdagit], embed: ozi})
 
    var filter = (button) => button.clicker.user.id === message.author.id;
   
    let collector = await msg.createButtonCollector(filter, { time: 30000 })

      collector.on("collect", async (button) => {



    if (button.id === 'kayıtsızdagit') {
 
    let ozicim = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

    button.reply.send(`
Kayıtsız rolü olmayan ${ozicim.size} kullanıcıya kayıtsız rolü verildi !
Kayıtsız Rolü verilen kullanıcılar;
${ozicim.map(x => x || "Rolü olmayan Kullanıcı bulunmamaktadır.")} `)

    message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0).map(x=> x.roles.add("1015920482144485397"))

    }
      })
  }
}
