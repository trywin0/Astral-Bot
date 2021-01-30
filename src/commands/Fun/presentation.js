const { Client, Message, Util, MessageAttachment } = require('discord.js');
const { LisaPresentation } = require("discord-image-generation")
module.exports = {
  name: 'presentation',
  displayName: 'presentation',
  aliases: [],
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
    const text = args.join(" ").slice(0, 298)
    const image = await new LisaPresentation().getImage(text)
    const attachment = new MessageAttachment(image, "presentation.png");
    message.channel.send(attachment)
  },
};
