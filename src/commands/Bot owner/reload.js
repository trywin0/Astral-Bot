const {requireUncached, log} = require("../../utils")
module.exports = {
  name: 'reload',
  displayName: 'reload',
  userPermissions: [],
  botPermissions: [],
  ownerOnly: true,
  dm: true,
  run: (client, message, args)=>{
    const command = client.commands.find(cmd=>cmd.name === args[0]) // Find a command with the name of the first argument
    if(!command) return message.reply("Invalid command.") // If no command then reply that it's an invalid command name
    const newCommand = requireUncached(__dirname+`/../${command.category}/${command.name}.js`) // Clean the cache of the required module and re-require it
    newCommand.category = command.category // Since categories are not defined inside the command file itself, but instead when registering the commands, we have to do this.
    client.commands.set(command.name, newCommand) // Set the command in the command collection to the newly updated command
    message.reply(`Reloaded \`${command.name.toUpperCase()}\``) // Send a message saying it's updated
    log(`Reloaded: ${command.name.toUpperCase()}`, "blue") // Log blue text in the console saying that it's reloaded.
  },
};
