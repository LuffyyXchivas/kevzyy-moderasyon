const { Client, Collection } = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));
const settings = require("./src/configs/settings.json");
client.commands = new Collection();
client.invites = new Collection();
client.cooldown = new Map();
const { Database } = require("ark.db");
global.confdb = new Database("./src/configs/config.json");
const rankdb = global.rankdb = new Database("./src/configs/ranks.json");
client.ranks = rankdb.get("ranks") ? rankdb.get("ranks").sort((a, b) => a.coin - b.coin) : [];
client.tasks = rankdb.get("tasks") || [];
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);
const disbut = require('discord-buttons');
disbut(client);
require("discord-banner")(process.env.token)
client.login(process.env.token).then(() => console.log("[BOT] Bot connected!")).catch(() => console.log("[BOT] Bot can't connected!"));
const fs = require("fs");
fs.readdir('./src/commands', (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    fs.readdir("./src/commands/" + f, (err2, files2) => {
      files2.forEach(file => {
        let props = require(`./src/commands/${f}/` + file);
        console.log(`[COMMAND] ${props.conf.name} komutu yüklendi!`);
        client.commands.set(props.conf.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.conf.name);
        });
      })
    })
  });
});