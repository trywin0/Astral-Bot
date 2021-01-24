const Discord = require('discord.js');
const {createCanvas, loadImage} = require('canvas')
module.exports = {
  name: 'piss',
  displayName: 'piss',
  userPermissions: [],
  botPermissions: [],
  ownerOnly: false,
  dm: false,
  run: async (client, message, args)=>{
    const mention = message.mentions.users.first()||message.author

    const pissImage = await loadImage(__dirname + '/../../images/pisstemplate.png')
    const mentionImage = await loadImage(mention.displayAvatarURL({format: 'png'}))
    const authorImage = await loadImage(message.author.displayAvatarURL({format: 'png'}))

    const canvas = createCanvas(pissImage.width-100, pissImage.height-100)
    const ctx = canvas.getContext('2d');

    ctx.drawImage(pissImage, 0, 0);
    
    ctx.drawImage(mentionImage, 345, 380, 200, 200);

    ctx.save()
    roundedImage(70, 50, 200, 200, 100)
    ctx.clip()
    ctx.drawImage(authorImage, 70, 50, 200, 200)
    ctx.restore()


    function roundedImage(x,y,width,height,radius){
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
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "piss.png")
    message.channel.send(attachment)
  },
};
