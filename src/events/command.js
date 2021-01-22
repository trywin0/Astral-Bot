const Discord = require('discord.js');
const commandHandler = require('../commandHandler');
const {Util} = require('discord.js');
const chat = require("../chatbot")

module.exports = {
  event: 'message',
  /**
     *
     * @param {Discord.Client} client
     * @param {Discord.Message} message
     */
  run: (client, message) => {
   if(message.author.bot) return;
    // Incase its in the chatbot channel
    if(message.channel.id === "800434851605774436"){
      setTimeout(() =>message.channel.send(Util.cleanContent(chat(message.content))), 1500)
    }else{
     // Handle the command
     commandHandler(client, message);

    }
  },
};
