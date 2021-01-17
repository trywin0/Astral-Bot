const Discord = require('discord.js');

module.exports = {
  name: 'snipe',
  displayName: 'snipe',
  userPermissions: [],
  botPermissions: [],
  ownerOnly: false,
  dm: false,
  run: (client, message, args)=>{
    const snipe = client.snipes.filter(m=>m.guild === message.guild.id && !m.bot && !m.content.startsWith('*addsnipe')).random();
    if(!snipe) return message.reply("No snipes found");
    const snipeEmbed = new Discord.MessageEmbed()
    .setColor("#2F3136")
    .setAuthor(snipe.username, snipe.avatar)
    .setDescription(snipe.content)

    message.channel.send(snipeEmbed)
  },
};
