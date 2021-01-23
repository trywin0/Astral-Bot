const { Collection } = require("discord.js");
const CustomCommand = require('./models/custom-commands')

const cooldowns = new Collection()
// Command handler
/**
   *
   * @param {Client} client
   * @param {Message} message
   * @return {void}
   */
const commandHandler = async (client, message) => {
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


  const customCommand = await CustomCommand.findOne({guild:message.guild.id, cmd: command});

  if(customCommand){
    return message.channel.send(customCommand.rsp)
  }
  if(!cmdObject) return;

  let guildCooldowns = cooldowns.get(message.guild.id) 
  if(!guildCooldowns){
    cooldowns.set(message.guild.id, new Collection())
    guildCooldowns = cooldowns.get(message.guild.id) 
  }
  let commandCooldowns = guildCooldowns.get(cmdObject.name)

  if(!commandCooldowns){
    guildCooldowns.set(cmdObject.name, new Collection);
    commandCooldowns = guildCooldowns.get(cmdObject.name)
  }

  
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
  
  if(commandCooldowns.has(message.author.id)){
    // Author is on cooldown
    const cooldownStart = commandCooldowns.get(message.author.id)
    return message.reply(`You must wait \`${
      (((cmdObject.cooldown||client.config["default-cooldown"])*1000-(Date.now()-cooldownStart))/1000).toFixed(1)
    }\` second(s) until you can use this command again.`).then(msg=>setTimeout(()=>msg.delete(), 5000))
  }

  commandCooldowns.set(message.author.id, Date.now())

  cmdObject.run(client, message, args)

  setTimeout(() => {
    commandCooldowns.delete(message.author.id)
  }, (cmdObject.cooldown||client.config["default-cooldown"])*1000);
};

module.exports = commandHandler;