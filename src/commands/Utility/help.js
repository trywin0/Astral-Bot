const {Client, Message, MessageEmbed} = require('discord.js');
module.exports = {
  name: 'help',
  displayName: 'help',
  aliases: ['commands'],
  userPermissions: [],
  botPermissions: [],
  ownerOnly: false,
  cooldown: 20,
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
    //FFBAFF

    // Make a embed that displays all of the commands and categories
    const helpEmbed = new MessageEmbed()
    .setTitle("Help")
    .setColor("#FFBAFF")
    .setDescription(
    Object.keys(categories).map(category=>{
    return `
> **${category}**
\`${categories[category].map(cmd=>cmd.name).join("`, `")}\`` // Makes the commands look very good :)
    }).join("\n")
    )
    
    message.channel.send(helpEmbed) // Send the help embed to the channel that it was sent in, might move to DMS later if needed.
  },
};
