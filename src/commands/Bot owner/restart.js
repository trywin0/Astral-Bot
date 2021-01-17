const {requireUncached} = require("../../utils")
module.exports = {
  name: 'restart',
  displayName: 'restart',
  userPermissions: [],
  botPermissions: [],
  ownerOnly: true,
  dm: false,
  run: async (client, message, args)=>{
   let data = JSON.parse(client.data.read())
   
   const msg = await message.channel.send("Restarting...") // Send a message and save it to a variable saying that it's restarting
   data.restartMessage = {channel: message.channel.id, message: msg.id} // Add the message to the data
   client.data.write(JSON.stringify(data, 0, 1)) // Write the modified data to the data.json file, formatted with 1 space indent (?)
   await client.user.setActivity('Restarting...', { type: 'COMPETING' }) // Set the bot activity to "Restarting..." so that incase someone tries to use a command, it will not reply because it's offline so they see the status.
   process.exit(0) // Exit the process

   // The editing the message to "Restarted." is inside the events/ready.js file where it reads from the database and fetches the message.
  },
};
