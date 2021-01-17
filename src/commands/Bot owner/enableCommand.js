const {requireUncached} = require("../../utils")
module.exports = {
  name: 'enablecommand',
  displayName: 'Enable Command',
  userPermissions: [],
  botPermissions: [],
  ownerOnly: true,
  dm: false,
  run: async (client, message, args)=>{
  const command = client.commands.find(cmd=>cmd.name === args[0])
  if(!command) return message.reply("Invalid command.") // If no command then reply that it's an invalid command name
   let data = JSON.parse(client.data.read())
   if(!data.disabledCommands) data.disabledCommands = [];
   if(!data.disabledCommands.includes(args[0])) return message.reply("That command is not disabled.")
   data.disabledCommands.splice(data.disabledCommands.indexOf(args[0]), 1)
   client.data.write(JSON.stringify(data, 0, 1)) // Write the modified data to the data.json file, formatted with 1 space indent (?)
   message.reply(`Enabled: \`${args[0]}\``)
  },
};
