const uwuify = require('uwuify');

 
const uwuifier = new uwuify();


const {Client, Message, MessageEmbed} = require('discord.js');
const chat = require("../../chatbot")

module.exports = {
  name: 'uwuify',
  displayName: 'degenerate command',
  aliases: ['uwu'],
  userPermissions: [],
  botPermissions: [],
  ownerOnly: false,
  dm: true,
   /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */
  run: async (client, message, args)=>{
    const chatEmbed = new MessageEmbed()
    .setColor("#2F3136")
    //.setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(uwuifier.uwuify(args.join(" ")||"send a message dumbass"))

    message.channel.send(chatEmbed)
  },
};
