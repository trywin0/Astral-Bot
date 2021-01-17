const { Collection } = require("discord.js");

const cooldowns = new Collection()
// Command handler
/**
   *
   * @param {Client} client
   * @param {Message} message
   * @return {void}
   */
const commandHandler = (client, message) => {
  const {owners, prefix} = client.config;

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).split(/ +/g);

  if (!args[0]) return;
   
  const blacklistedUsers = JSON.parse(client.data.read()).blacklistedUsers || []
  if(blacklistedUsers.includes(message.author.id)) return;

  const command = args.shift().toLowerCase();

  const cmdObject = client.commands.find((cmd) => {
    return cmd.aliases && cmd.aliases.includes(command) ||
     cmd.name === command ||
     cmd.trigger && cmd.trigger.test(command);
  });

  if(!cmdObject) return;

  if (cmdObject.ownerOnly && !owners.includes(message.author.id)) return;

  if (!message.guild.me.hasPermission('SEND_MESSAGES')) return;

  if (!message.member.hasPermission(cmdObject.botPermissions||[])){
    return message.reply(`To use this command you need the permissions \`${cmdObject.userPermissions.join("`, `")}\``)
  }

  // Handling and checking for command cooldowns
  const disabledCommands = JSON.parse(client.data.read()).disabledCommands || []

  if(disabledCommands.includes(command)) return message.reply("That command is disabled.")

  if (!message.guild.me.hasPermission(cmdObject.botPermissions||[])){
    return message.reply(`To use this command I need the permissions \`${cmdObject.botPermissions.join("`, `")}\``)
  }

  if (!message.guild.me.hasPermission('EMBED_LINKS')) {
    return message.reply('To work as expected I need the `Embed Links` permission.');
  }

  if (!cmdObject.dm && message.channel.type === 'dm') {
    return message.reply('This command cannot be used inside DMs');
  }

  cmdObject.run(client, message, args)
};

module.exports = commandHandler;