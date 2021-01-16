const {requireUncached} = require("../../utils")
module.exports = {
  name: 'reload',
  displayName: 'reload',
  userPermissions: [],
  botPermissions: [],
  ownerOnly: true,
  dm: true,
  run: (client, message, args)=>{
    const command = client.commands.find(cmd=>cmd.name === args[0])
    if(!command) return message.reply("Invalid command.")
    const newCommand = requireUncached(__dirname+`/../${command.category}/${command.name}.js`)
    newCommand.category = command.category
    client.commands.set(command.name, newCommand)
    message.reply(`Reloaded \`${command.name.toUpperCase()}\``)
  },
};
