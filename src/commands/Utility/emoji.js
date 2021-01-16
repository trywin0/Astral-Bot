const {Client, Message} = require('discord.js');
const {twEmojiRegex} = require("../../utils")
function hexEncode(text){
  const hex = text.codePointAt(0).toString(16);
  const result = "0000".substring(0, 4 - hex.length) + hex;
  return result
}
module.exports = {
  name: 'emoji',
  displayName: 'emoji',
  aliases: ['emote'],
  userPermissions: ["MANAGE_EMOJIS"],
  botPermissions: ["MANAGE_EMOJIS"],
  ownerOnly: false,
  dm: false,
   /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */
  run: (client, message, args)=>{
    if(!args[0]) return message.reply("Missing arguments: `emoji|img_url, ?name`")
    const emojiRegex = /<?(a)?:?(\w{2,32}):(\d{17,19})>?/;
    const twEmoji = hexEncode(args[0])
    let name, url, deleted = false
    const emojiExec = emojiRegex.exec(args[0])
    if(emojiRegex.test(args[0]) && message.guild.emojis.cache.has(emojiExec[3])){
      const emoji = message.guild.emojis.cache.get(emojiExec[3])
      deleted = true
      emoji.delete().then(()=>{
        message.reply(`Deleted emoji: \`${emojiExec[2]}\``)
      }).catch(e=>{
        message.reply(`Something went wrong: \n${e}`)
      })
    }else if(emojiRegex.test(args[0])){
      const isAnimated = !!emojiExec[1]
      name = args[1]||emojiExec[2]
      const ID = emojiExec[3]
      url = isAnimated ? `https://cdn.discordapp.com/emojis/${ID}.gif`:`https://cdn.discordapp.com/emojis/${ID}.png`
    }else if(twEmoji){
      url = `https://twemoji.maxcdn.com/36x36/${twEmoji}.png`;
      name = args[1]
      if(!name) return message.reply("Missing arguments: `name`")
    }
    if(!deleted){
      message.guild.emojis.create(url, name).then(emoji=>{
      message.reply(`Added emoji: ${emoji}`)
    }).catch(e=>{
      message.reply(`Something went wrong: \n${e}`)
    })
  }
  },
};
