const { Client, Message } = require('discord.js');
const { parse } = require("twemoji-parser")
const { createCanvas, loadImage } = require("canvas")

const fetch = require("node-fetch");
function quickFetch(url) {
  return fetch(url).then(r => r.json())
}

async function parseEmote(url) {
  const ffzRegex = /frankerfacez\.com\/emoticon\/([0-9]+)-([a-zA-Z0-9]+)/
  const bttvRegex = /betterttv\.com\/emotes\/([a-zA-Z0-9]+)/
  if (ffzRegex.test(url)) {
    if (!ffzRegex.test(url)) return null;
    const execed = ffzRegex.exec(url);
    const ID = execed[1];
    const name = execed[2];
    const imageURL = `https://cdn.frankerfacez.com/emoticon/${ID}/1`;
    return { ID, name, imageURL }
  } else if (bttvRegex.test(url)) {
    const execed = bttvRegex.exec(url);
    const ID = execed[1];
    const data = await quickFetch(`https://api.betterttv.net/3/emotes/${ID}`)
    if (!data.code) return null;
    const name = data.code
    const imageURL = `https://cdn.betterttv.net/emote/${ID}/2x`;
    return { ID, name, imageURL }
  } else {
    return null;
  }

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
  run: async (client, message, args) => {
    if (!args[0]) return message.reply("Missing arguments: `emoji|img_url, ?name`")
    const emojiRegex = /<?(a)?:?(\w{2,32}):(\d{17,19})>?/; // Regex to parse custom discord emojis   <(a for animated):(emoji name):( emoji ID)>
    const entities = parse(args[0])
    const twEmoji = entities[0] // get the hex of the emoji provided, incase its a unicode twitter emoji
    let name, url, deleted = false
    const emojiExec = emojiRegex.exec(args[0]) // Exec the first argument to see if it's a custom discord emoji
    const parsedEmote = await parseEmote(args[0])
    if (emojiRegex.test(args[0]) && message.guild.emojis.cache.has(emojiExec[3])) {
      const emoji = message.guild.emojis.cache.get(emojiExec[3])
      deleted = true
      emoji.delete().then(() => {
        message.reply(`Deleted emoji: \`${emojiExec[2]}\``)
      }).catch(e => {
        message.reply(`Something went wrong: \n${e}`)
      })
    } else if (emojiRegex.test(args[0])) {
      const isAnimated = !!emojiExec[1]
      name = args[1] || emojiExec[2]
      const ID = emojiExec[3]
      url = `https://cdn.discordapp.com/emojis/${ID}.${isAnimated ? "gif" : "png"}`
    } else if (twEmoji && !parsedEmote) {
      url = twEmoji.url
      name = args[1]
      if (!name) return message.reply("Missing arguments: `name`")
      const img = await loadImage(url)
      const canvas = createCanvas(img.height, img.width)
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height)
      url = canvas.toBuffer()
    } else if (parsedEmote) {
      url = parsedEmote.imageURL
      name = parsedEmote.name
    } else {
      url = args[0];
      name = args[1]
    }
    if (!deleted) {
      message.guild.emojis.create(url, name).then(emoji => {
        message.reply(`Added emoji: ${emoji}`)
      }).catch(e => {
        message.reply(`Something went wrong: \n${e}`)
      })
    }
  },
};
