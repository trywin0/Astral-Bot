const {requireUncached} = require("../../utils")
module.exports = {
  name: 'disablecommand',
  displayName: 'Disable Command',
  userPermissions: [],
  botPermissions: [],
  ownerOnly: true,
  dm: false,
  run: async (client, message, args)=>{
  const command = client.commands.find(cmd=>cmd.name === args[0])
  if(!command) return message.reply("Invalid command.") // If no command then reply that it's an invalid command name
   let data = JSON.parse(client.data.read())
   if(!data.disabledCommands) data.disabledCommands = [];
   data.disabledCommands.push(args[0]) 
   client.data.write(JSON.stringify(data, 0, 1)) // Write the modified data to the data.json file, formatted with 1 space indent (?)
   message.reply(`Disabled: \`${args[0]}\``)
  },
};
