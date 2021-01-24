const {Client, Message, MessageEmbed} = require('discord.js');
const { EmoteFetcher } = require('twitch-emoticons-fork');
const fetcher = new EmoteFetcher();

module.exports = {
  name: 'pogchamp',
  displayName: 'PogChamp',
  aliases: ['pog'],
  userPermissions: [],
  botPermissions: [],
  ownerOnly: false,
  dm: false,
   /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */
  run: async (client, message, args)=>{
    const currentHours = new Date().getHours();
    let resetTime = 'PogChamp updates in '
    if (currentHours >= 18) {
      resetTime += `${(24 - currentHours) + 18} hours!`;
    } else if (currentHours == 17) {
      resetTime += `${60 - new Date().getMinutes()} minutes!`;
    } else {
      resetTime += `${18 - currentHours} hours!`
    }

  await fetcher.fetchTwitchEmotes()
  const embed = new MessageEmbed()
  .setImage(fetcher.emotes.get("PogChamp").toLink().replace("1.0", "3.0"))
  .setColor("#FFBAFF")
  .setFooter(resetTime)
  message.channel.send(embed)
  },
};
