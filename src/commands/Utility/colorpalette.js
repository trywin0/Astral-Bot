const {Client, Message, MessageAttachment} = require('discord.js');
const fetch = require("node-fetch");

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
const randomColor = ()=>Math.floor(Math.random()*16777215).toString(16);
module.exports = {
  name: 'colorpalette',
  displayName: 'Color Palette',
  aliases: ['colpal'],
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
   let ROWS = parseInt(args[0])||5
   if(ROWS > 10) ROWS = 10

   const canvas = Canvas.createCanvas(1000, 1000);
   const ctx = canvas.getContext("2d");

   ctx.fillStyle = "#FFFFFF";
   ctx.save()
   roundedImage(ctx, 0,0, 1000, 1000, 50);
   ctx.clip()
   ctx.fillRect(0,0,1000,1000)
   ctx.fillStyle = "#000000"
   ctx.fillRect(10, 10, 10, 10)
   const rowWidth = canvas.width/ROWS
   const setFontSize = (size)=>ctx.font = `${size}px "Sans"`
   let size = 80;
   setFontSize(size)
   while(ctx.measureText("#000000").width > rowWidth-10){
     setFontSize(size--)
   }
   for(let i = 0; i < ROWS; i++){
     const color = randomColor();
     ctx.fillStyle = "#"+color

     const x = rowWidth*i;
     ctx.fillRect(x, 0, rowWidth, canvas.height)

     const textWidth = ctx.measureText("#"+color).width
     ctx.fillStyle = invertColor(color.padEnd(6, "0"), true)
     ctx.fillText("#"+color.padEnd(6, "0"),x+rowWidth/2-textWidth/2, 900, rowWidth)
   }

   ctx.restore()

   const attachment = new MessageAttachment(canvas.toBuffer(), "color.png")
   message.channel.send(attachment)
  },
};