const {Client} = require('discord.js');
const {log} = require('../utils');

module.exports = {
  event: 'ready',
  /**
     *
     * @param {Client} client
     */
  run: async (client) => {
    log('Ready!', 'green');

    client.user.setActivity("*help", {type: "LISTENING"})

/*
    SLASH COMMANDS (TESTING)

client.ws.on("INTERACTION_CREATE", async interaction => {
  // Do stuff here - interaction is an InteractionResponse object. To get the name, use interaction.data.name
  // In particular, the values you passed to the interaction when creating it will be passed back here
  if(interaction.data.name === "ping"){
  client.api.interactions(interaction.id, interaction.token).callback.post({data: {
    type: 2, // Doesn't log anything in the channel
    data: {
      flags: 1 << 6, // Sends it as a "Only you can see this" message. Not entirely sure why it does that but this works.
      content: 'Pong!'
      }
    }
  })
}

});

*/

    const data = JSON.parse(client.data.read())

    const channel = client.channels.cache.get(data.restartMessage.channel)
    if(!channel) return;
    const msg = await channel.messages.fetch(data.restartMessage.message).catch(e=>null)
    if(!msg) return;
    if(msg.createdTimestamp < Date.now()-30000) return;
    msg.edit("Restarted.")
    



  },
  
};
