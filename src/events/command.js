const Discord = require('discord.js');
const commandHandler = require('../commandHandler');

module.exports = {
  event: 'message',
  /**
     *
     * @param {Discord.Client} client
     * @param {Discord.Message} message
     */
  run: (client, message) => {
    // Handle the command
    commandHandler(client, message);
  },
};
