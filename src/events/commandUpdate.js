const Discord = require('discord.js');
const commandHandler = require('../commandHandler');

module.exports = {
  event: 'messageUpdate',
  /**
     *
     * @param {Discord.Client} client
     * @param {Discord.Message} oldMessage
     * @param {Discord.Message} newMessage
     */
  run: (client, oldMessage, newMessage) => {
    if(oldMessage.content === newMessage.content) return;
    // Checks if message is older than 15 seconds
    if (Date.now()-oldMessage.createdTimestamp>15000) return;

    // Handle the command
    commandHandler(client, newMessage);
  },
};
