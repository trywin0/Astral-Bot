const {Client, Message, Util} = require('discord.js');
const chat = require("../../chatbot")

module.exports = {
  name: 'chat',
  displayName: 'Chat',
  aliases: ['chatbot'],
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
    setTimeout(()=>{
      message.reply(Util.cleanContent(chat(args.join(" "))))
    }, 1000)
  },
};
