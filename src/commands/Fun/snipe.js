const Discord = require('discord.js');

module.exports = {
  name: 'snipe',
  displayName: 'snipe',
  userPermissions: [],
  botPermissions: [],
  ownerOnly: false,
  dm: false,
  run: (client, message, args)=>{
    console.log(client.snipes)
    const snipe = client.snipes.filter(m=>m.guild.id === message.guild.id && m.author && !m.author.bot && !m.content.startsWith('*addsnipe')).random();
    if(!snipe) return message.reply("No snipes found");
    const snipeEmbed = new Discord.MessageEmbed()
    .setColor("#2F3136")
    .setAuthor(snipe.author.username, snipe.author.displayAvatarURL({dynamic:true}))
    .setDescription(snipe.content)

    message.channel.send(snipeEmbed)
  },
};
