const {Client, Message, MessageEmbed} = require('discord.js');
const CustomCommand = require('../../models/custom-commands')

function truncate(str, length) {
return str.slice(0, length)+(str.length > length?"...":"")
}
module.exports = {
  name: 'customcommand',
  displayName: 'Custom Command',
  aliases: ['cc'],
  userPermissions: ["MANAGE_GUILD"],
  botPermissions: [],
  ownerOnly: false,
  dm: false,
   /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */
  run: async (client, message, args)=>{
    switch(args[0]){
      case 'add': {
        const command = args[1];
        const response = args.slice(2).join(" ");

        if(!command || !response) return message.reply('Incorrect usage. `customcommand add <command name> <response>`')

        await CustomCommand.create({
          cmd: command,
          rsp: response,
          guild: message.guild.id
        })

        message.reply(`Added a new custom command \`${command}\``)
      }
      break;
      case 'delete': {
        const command = args[1];

        if(!command) return message.reply('Incorrect usage. `customcommand delete <command name>`')

        const dbCmd = await CustomCommand.findOne({cmd: command})

        if(!dbCmd) return message.reply('Could not find a custom command with that name');

        await CustomCommand.findByIdAndDelete(dbCmd._id)

        message.reply(`Deleted custom command \`${command}\``)
      }
      break;

      default: {
        const commands = await CustomCommand.find({guild: message.guild.id})
        const formattedCommands = commands.map(command=>`**${command.cmd}**: \`${truncate(command.rsp, 30)}\``).join('\n')

        const embed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle("Custom commands")
        .setDescription(formattedCommands||"This server has no configured custom commands")
      
        message.reply(embed)
      }
      break;
    }
  },
};
