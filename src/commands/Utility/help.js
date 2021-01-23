const {Client, Message, MessageEmbed} = require('discord.js');
const CustomCommand = require('../..//models/custom-commands')

module.exports = {
  name: 'help',
  displayName: 'help',
  aliases: ['commands'],
  userPermissions: [],
  botPermissions: [],
  ownerOnly: false,
  cooldown: 3,
  dm: true,
   /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */
  run: async (client, message, args)=>{
    const categories = {}
    // Add all of the categories and its command to an object
    client.commands.forEach(command=>{
      if(!categories[command.category]) categories[command.category] = []
      categories[command.category].push(command)
    })

    const customCommands = await CustomCommand.find({guild: message.guild.id})
    if(customCommands.length){
    customCommands.forEach(command=>{
      if(!categories["Custom Commands"]) categories["Custom Commands"] = []
      categories["Custom Commands"].push(command.cmd)
    })
    }


    // Make a embed that displays all of the commands and categories
    const helpEmbed = new MessageEmbed()
    .setTitle("Help")
    .setColor("#FFBAFF")
    .setDescription(
    Object.keys(categories).map(category=>{
    return `
> **${category}**
\`${categories[category].map(cmd=>cmd.name||cmd).join("`, `")}\`` // Makes the commands look very good :)
    }).join("\n")
    )
    
    message.channel.send(helpEmbed) // Send the help embed to the channel that it was sent in, might move to DMS later if needed.
  },
};
