const {Client, Message, MessageEmbed} = require('discord.js');
module.exports = {
  name: 'customcommand',
  displayName: 'Custom Command',
  aliases: ['cc'],
  userPermissions: ["MANAGE_GUILD"],
  botPermissions: [],
  ownerOnly: false,
  cooldown: 20,
  dm: true,
   /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */
  run: async (client, message, args)=>{
    
  },
};
