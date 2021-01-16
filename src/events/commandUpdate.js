const Discord = require('discord.js');
const {log, commandHandler} = require('../utils');

module.exports = {
  event: 'messageUpdate',
  /**
     *
     * @param {Discord.Client} client
     * @param {Discord.Message} oldMessage
     * @param {Discord.Message} newMessage
     */
  run: (client, oldMessage, newMessage) => {
    // Checks if message is older than 15 seconds
    if (Date.now()-oldMessage.createdTimestamp>15000) return;

    // Handle the command
    commandHandler(client, newMessage);
  },
};
