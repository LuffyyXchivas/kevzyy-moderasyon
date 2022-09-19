const emojis = require("../configs/emojis.json");
const { tag } = require("../configs/config.json");

module.exports = {
  conf: {
    aliases: ["taggeds"],
    name: "taglıbul",
    help: "taggeds ",
  },

  /**
   * @param { Client } client
   * @param { Message } message
   * @param { Array<String> } args
   */

  run: async (client, message, args, embed) => {

    //message.channel.send(`Aşşağıdan dağıtım yapılıcak katagoriyi seçiniz.` , embed.setDescription(``))

   
    let taglilar = message.guild.members.cache.filter(s => s.user.username.includes(tag.tag) && !s.roles.cache.has(tag.role))
    
    let tagsizlar = message.guild.members.cache.filter(s => !s.user.username.includes(tag.tag)  && s.roles.cache.has(tag.role))

    taglilar.array().forEach(async(member, index) => {
        setTimeout(async() => {
            await member.roles.add(tag.role)
        }, index * 1000)
    })
    
    tagsizlar.array().forEach(async(member, index) => {
        setTimeout(async() => {
            await member.roles.remove(tag.role)
        }, index * 1000)
    })
    embed.setDescription(`
${emojis.inviteStar} Toplamda **${taglilar.size }** adet kullanıcıda tagımız bulunuyor fakat <@&${tag.role}> rolü yok.
\`\`\`Dağıtım İşlemi Başlatıldı!\`\`\`

${emojis.ping} Toplamda **${tagsizlar.size}** adet kullanıcıda **eskiden** tagımız bulunmasına rağmen, tagımızı çıkardığı için <@&${tag.role}> rolü alınmıştır.
`)
    message.channel.send(embed)

  },
};
