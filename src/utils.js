const chalk = require('chalk');
const {Client, Message} = require('discord.js');

const log = (msg, color = 'white', date = true) => {
  if (!chalk[color]) throw new Error('Invalid color');
  let logMsg = ``;
  if (date) {
    logMsg += `[${new Date().toLocaleString()}]`;
  }
  logMsg += ` ${chalk[color](msg)}`;
  console.log(logMsg);
};

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

  const command = args.shift().toLowerCase();

  const cmdObject = client.commands.find((cmd) => {
    return command.aliases && cmd.aliases.includes(command) ||
     cmd.name === command ||
     cmd.trigger && cmd.trigger.test(command);
  });

  if(!cmdObject) return;

  if (cmdObject.ownerOnly && !owners.includes(message.author.id)) return;

  if (!message.guild.me.hasPermission('SEND_MESSAGES')) return;

  if (!message.member.hasPermission(cmdObject.botPermissions||[])){
    return message.reply(`To use this command you need the permissions \`${cmdObject.userPermissions.join("`, `")}\``)
  }

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


const requireUncached = (module) => {
  delete require.cache[require.resolve(module)];
  return require(module);
};

module.exports = {log, requireUncached, commandHandler};
