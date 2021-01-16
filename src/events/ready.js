const {Client, Message} = require('discord.js');
const {log} = require('../utils');

module.exports = {
  event: 'ready',
  /**
     *
     * @param {Client} client
     */
  run: (client) => {
    log('Ready!', 'green');
  },
};
