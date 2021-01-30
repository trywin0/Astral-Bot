const Discord = require('discord.js');
const { createCanvas, loadImage } = require('canvas')
const { parse } = require("twemoji-parser")

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
  name: 'mask',
  displayName: 'mask',
  aliases: ['iguess'],
  userPermissions: [],
  botPermissions: [],
  ownerOnly: false,
  dm: false,
  /**
    * @param {Client} client
    * @param {Message} message
    * @param {string[]} args
    */
  run: async (client, message, args) => {
    if (!args[0]) return message.reply("Missing arguments: `emoji|img_url`")
    const emojiRegex = /<?(a)?:?(\w{2,32}):(\d{17,19})>?/; // Regex to parse custom discord emojis   <(a for animated):(emoji name):( emoji ID)>
    const entities = parse(args[0])
    const twEmoji = entities ? entities[0] : null
    let url;
    const emojiExec = emojiRegex.exec(args[0]) // Exec the first argument to see if it's a custom discord emoji
    const parsedEmote = await parseEmote(args[0])
    if (emojiRegex.test(args[0])) {
      const ID = emojiExec[3]
      url = `https://cdn.discordapp.com/emojis/${ID}.png`
    } else if (message.mentions.members.first()) {
      url = message.mentions.members.first().user.displayAvatarURL({ format: "png" })
    } else if (twEmoji && !parsedEmote) {
      url = twEmoji.url
    } else if (parsedEmote) {
      url = parsedEmote.imageURL
    } else {
      url = args[0]
    }
    if (!url) return message.reply("Invalid image url or emoji")
    const canvas = createCanvas(400, 400)
    const ctx = canvas.getContext("2d");

    const sadgeImage = await loadImage("https://cdn.discordapp.com/emojis/753233159692484761.png")

    ctx.drawImage(sadgeImage, 0, 200, 280, 200)


    ctx.fillRect(5, 300, 200, 5)
    const maskImage = await loadImage(url)

    ctx.save()
    roundedImage(130, 190, 200, 200, 30)
    ctx.clip()
    ctx.drawImage(maskImage, 130, 190, 200, 200)
    ctx.restore()



    function roundedImage(x, y, width, height, radius) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    }

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "mask.png")

    message.channel.send(attachment)
  },
};
