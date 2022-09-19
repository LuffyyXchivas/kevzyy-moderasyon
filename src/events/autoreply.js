const conf = require("../configs/config.json");
const emojis = require("../configs/emojis.json");
const client = global.client;

/**
 * @param { Client } client
 * @param { Message } message
 */

module.exports = async (message) => {
  if (message.content.toLowerCase() === "tag" || message.content.toLowerCase() === "!tag" || message.content.toLowerCase() === ".tag" || message.content.toLowerCase() === "yarrak" || message.content.toLowerCase() === "am") {
    await message.channel.send(`${conf.tag.tag}`);
  }
};

module.exports.conf = {
  name: "message"
};
