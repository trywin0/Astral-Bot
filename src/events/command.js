const Discord = require('discord.js');
const {log, commandHandler} = require('../utils');

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
