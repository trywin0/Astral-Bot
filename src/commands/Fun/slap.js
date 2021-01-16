module.exports = {
  name: 'slap',
  displayName: 'slap',
  aliases: ['s'],
  userPermissions: [],
  botPermissions: [],
  ownerOnly: false,
  dm: false,
  run: (client, message, args)=>{
    if (!message.mentions.members.first()) return message.reply("You need to mention who you want to slap.");
    message.channel.send(`${message.author.username} slapped ${message.mentions.members.first().user.username}`)
  },
};
