const { Client, Message, Util, MessageAttachment } = require('discord.js');
const { Triggered } = require("discord-image-generation")
module.exports = {
  name: 'triggered',
  displayName: 'triggered',
  aliases: ['trigger'],
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
    const image = await new Triggered().getImage(user.username ? user.displayAvatarURL({ format: "png" }) : user)
    const attachment = new MessageAttachment(image, "triggered.gif");
    message.channel.send(attachment)
  },
};
