const Discord = require('discord.js');
const {log, commandHandler} = require('../utils');

module.exports = {
  event: 'messageDelete',
  /**
     *
     * @param {Discord.Client} client
     * @param {Discord.Message} message
     */
  run: (client, message) => {
    if(!message.author) return;
    if(message.author.bot) return;
    // Add the deleted message as a snipe
    client.snipes.set(message.id, {
      avatar: message.author.displayAvatarURL({dynamic:true}),
      content: message.content,
      username: message.author.username, 
      guild: message.guild.id, 
      bot: false,
    })
  },
};
