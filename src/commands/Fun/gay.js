const { Client, Message, Util, MessageAttachment } = require('discord.js');
const { Gay } = require("discord-image-generation")
module.exports = {
  name: 'gay',
  displayName: 'gay',
  aliases: ['pride'],
  userPermissions: [],
  botPermissions: [],
  ownerOnly: false,
  dm: true,
  /**
    * @param {Client} client
    * @param {Message} message
    * @param {string[]} args
    */
  run: async (client, message, args) => {
    const user = message.mentions.users.first() || (message.embeds[0] ? message.embeds[0].thumbnail.url : null) || message.author
    const image = await new Gay().getImage(user.username ? user.displayAvatarURL({ format: "png" }) : user)
    const attachment = new MessageAttachment(image, "gay.png");
    message.channel.send(attachment)
  },
};
