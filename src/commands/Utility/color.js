const {Client, Message, MessageAttachment} = require('discord.js');
const fetch = require("node-fetch");
function quickFetch(url) {
  return fetch(url).then(r => r.json())
}
function LightenDarkenColor(col, amt) {
  
  var usePound = false;

  if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
  }

  var num = parseInt(col,16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if  (r < 0) r = 0;

  var b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) b = 255;
  else if  (b < 0) b = 0;

  var g = (num & 0x0000FF) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

}
function invertColor(hex, bw) {
  if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
  }
  var r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
      // http://stackoverflow.com/a/3943023/112731
      return (r * 0.299 + g * 0.587 + b * 0.114) > 186
          ? '#000000'
          : '#FFFFFF';
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return "#" + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}
const Canvas= require('canvas')
Canvas.registerFont("./src/fonts/NotoSansJP-Bold.otf", {family: "Noto Sans Bold"})
Canvas.registerFont("./src/fonts/NotoSansJP-Light.otf", {family: "Noto Sans Light"})

function roundedImage(ctx, x, y, width, height, radius) {
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
module.exports = {
  name: 'color',
  displayName: 'Color',
  aliases: ['col'],
  userPermissions: [],
  botPermissions: [],
  ownerOnly: false,
  dm: true,
   /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */
  run: async (client, message, args)=>{
   if(!args[0]) return message.reply("You must provide a color.")
   const data = await quickFetch(`https://www.thecolorapi.com/id?hex=${args[0].replace(/#/g, "")}`)

   if(data.code === 400) return message.channel.send(data.message)
   const canvas = Canvas.createCanvas(1000, 1000);
   const ctx = canvas.getContext("2d");

   ctx.fillStyle = "#FFFFFF";
   ctx.save()
   roundedImage(ctx, 0,0, 1000, 1000, 50);
   ctx.clip()
   ctx.fillRect(0,0,1000,1000)



   ctx.fillStyle = "#000000"

   const previewData = {
     "Name": data.name.value,
     "Hex value": data.hex.value,
     "RGB value": data.rgb.value,
     "Closest named hex": data.name.closest_named_hex
   }

   Object.entries(previewData).forEach(([key, value], index)=>{
      const y = 100+(index*100)
      const x = 50
      ctx.font = '50px "Noto Sans Bold"'
      const keyWidth = ctx.measureText(key).width;
      ctx.fillStyle = "#000000"
      ctx.fillText(key+":", x, y);
      ctx.font = '50px "Noto Sans Light"'
      ctx.fillStyle = data.hex.value
      ctx.fillText(value, x+keyWidth+50, y);
      ctx.strokeStyle = "#000000"
      ctx.strokeText(value, x+keyWidth+50, y)
   })

   ctx.font = '70px "Noto Sans Bold"'



   const SHADES = 10; // Amount of shades to show

   const startY = Object.values(previewData).length*100+200 + ctx.lineWidth
   let startVal = -((SHADES/2)*10)

   for(var i = 0; i < SHADES; i++){
     while(data.hex.value.startsWith(LightenDarkenColor(data.hex.value, startVal+i*10))){
       startVal+=10
     }

     ctx.fillStyle = LightenDarkenColor(data.hex.value, startVal+i*10)
     ctx.fillRect(i*100, startY, 100, 1000-startY)
     let  color = LightenDarkenColor(data.hex.value, startVal+i*10)
     if(color.length < 6 && color.charAt(1) === "0") color = "#000000"
     if(color.length < 6 && color.charAt(1) === "1") color = "#ffffff"
     color = color.padEnd(7, "0")
     ctx.fillStyle = invertColor(color, true);
     ctx.font = '20px "Noto Sans Bold"'
     ctx.fillText(color, i*100+10, 980)
   }

   ctx.fillStyle = "#000000"
   ctx.fillRect(0, startY, 1000, 5)
   ctx.font = '80px "Noto Sans Bold"'

   ctx.fillText("Shades", 500-ctx.measureText("Shades").width/2, Object.values(previewData).length*100+150)
   ctx.lineWidth = 2

   ctx.restore()

   ctx.fillStyle = data.hex.value
   ctx.save()
   roundedImage(ctx, 50,Object.values(previewData).length*100+20,900, 40, 20)
   ctx.clip()
   ctx.fillRect(50,Object.values(previewData).length*100+20,900, 40)
   ctx.restore()

   const attachment = new MessageAttachment(canvas.toBuffer(), "color.png")
   message.channel.send(attachment)
  },
};