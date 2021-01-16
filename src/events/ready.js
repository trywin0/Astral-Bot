const {Client} = require('discord.js');
const {log} = require('../utils');

module.exports = {
  event: 'ready',
  /**
     *
     * @param {Client} client
     */
  run: (client) => {
    log('Ready!', 'green');

    
 /* 
// Testing slash commands
client.api.applications(client.user.id).commands.post({
  data: {
    name: "ping",
    description: "Pong?",
  },
});

client.ws.on("INTERACTION_CREATE", async interaction => {
  // Do stuff here - interaction is an InteractionResponse object. To get the name, use interaction.data.name
  // In particular, the values you passed to the interaction when creating it will be passed back here
  console.log(interaction)
});
*/

  },
  
};
