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
    client.snipes.set(message.id, message)
  },
};
