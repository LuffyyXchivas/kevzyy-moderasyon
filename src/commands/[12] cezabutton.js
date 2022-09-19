const Discord = require("discord.js");
const conf = require("../configs/config.json");
const { jail } = require("../configs/emojis.json")
const disbut = require("discord-buttons")
module.exports = {
  conf: {
    aliases: ["cezalarım"],
    name: "cezabutton",
    owner: false,
  },

  run: async (client, message, args , embed) => {
    const member = message.member;
    if(!message.member.hasPermission(128)) return message.channel.error(message , `Bu komudu kullanmak için yeterli yetkiniz yok.`).then(x => x.delete({timeout: 5000}))

    let kalanZaman = new disbut.MessageButton().setEmoji("1013100959741788370").setStyle('red').setLabel('Kalan Zamanım?').setID('kalan')
    let ceza = new disbut.MessageButton().setEmoji("1013100966926622720").setStyle('red').setLabel('Cezalarım').setID('ceza')
    let cezaP = new disbut.MessageButton().setEmoji("1013100967677407282").setStyle('red').setLabel('Ceza Puanı').setID('cezaP')
    message.channel.send(`<:Valena_jail:1011284056232689745> Aşşağıdaki butonlara basarak **ceza listenizi, ceza puanınızı ve aktif cezanızı** görüntüleyebilirsiniz.`,
    {buttons: [ceza, cezaP, kalanZaman]
    })


  },
};

  
