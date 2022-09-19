const conf = require("../configs/config.json");
const emojis = require("../configs/emojis.json");
const client = global.client;
const moment = require("moment");
moment.locale("tr");
const bannedTag = require("../schemas/bannedTags");

/**
 * @param { Client } client
 * @param { GuildMember } member
 */

module.exports = async (member) => {

  if (member.user.bot) return;
  const channel = member.guild.channels.cache.get(conf.registration.channel);
  const suspectChannel = member.guild.channels.cache.get(conf.registration.suspectChannel);
  const data = await bannedTag.findOne({ guildID: member.guild.id });
  if (Date.now() - member.user.createdTimestamp <= 1000 * 60 * 60 * 24 * 14) {
    await member.setRoles(conf.registration.suspectRoles);
    suspectChannel.wsend(`
    ${emojis.welcomeOne} ${member.toString()}, Sunucumuza hoşgeldiniz
Fakat hesap açılma tarihin 2 haftadan erken olduğu için Cezalıya düştün.
Hesabın açılma tarihi: **<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>**
	  `);
    channel.wsend(`${member.toString()} Adlı üye sunucumuza giriş yaptı fakar hesabı yeni hesap olduğu için Cezalıya atıldı!`);
  } else if (data && data.tags.length && data.tags.some((x) => member.user.username.includes(x.tag))) {
    member.setRoles(conf.registration.bannedTagRoles ? conf.registration.bannedTagRoles : conf.penals.jail.roles);
    member.guild.channels.cache.get(conf.registration.bannedTagChannel ? conf.registration.bannedTagChannel : conf.registration.suspectChannel).wsend(`
    ${emojis.welcomeOne} ${member.toString()}, Sunucumuza hoşgeldiniz
    ${emojis.red} Fakat etiketinde veya kullanıcı adında sunucumuzun yasaklı taglarından biri bulunduğu için Cezalıya atıldın!
    `);
    channel.wsend(`${member.toString()} Adlı üye sunucumuza giriş yaptı fakat kullanıcı adında yasaklı taglarımızından biri olduğu için cezalıya atıldı`);
  } else {
    var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
    var üs = üyesayısı.match(/([0-9])/g)
    üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
    if(üs) {
     üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
       return {
         '0': `0`, 
         '1': `1`,
         '2': `2`,
         '3': `3`,
         '4': `4`,
         '5': `5`,
         '6': `6`,
         '7': `7`,
         '8': `8`,
         '9': `9`}[d];})}
    await member.roles.add(conf.registration.unregRoles);
    channel.wsend(`
${emojis.welcomeTada} Merhaba ${member.toString()}, **${member.guild.name}** adlı sunucumuza hoşgeldin! 
${emojis.ping2} Sunucumuz seninle beraber **`+üyesayısı+`** kişiye ulaştı.

${emojis.kevzyyuser} Hesabın **<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>** oluşturulmuş. Güvenli!

${emojis.inviteStar} Sol tarafta bulunan <#${conf.registration.voiceChannel}> odalarında \`İsim Yaş\` vererek kayıt olabilirsin. 
\`\`\`fix
Kayıt olduktan sonra #kurallar kanalını okuduğunuzu kabul edeceğiz ve içeride yapılacak cezalandırma işlemlerini bunu göz önünde bulundurarak yapacağız.\`\`\` 
`);
  }
  if (conf.tag.tag.some((x) => member.user.username.includes(x))) member.roles.add(conf.tag.role);
};

module.exports.conf = {
  name: "guildMemberAdd",
};
