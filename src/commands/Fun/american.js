const {Client, Message} = require('discord.js');
var gis = require('g-i-s');
function searchImage(query){
  return new Promise(function(resolve, reject){
    gis(query, (err, res) => {
      if(err) reject(err);
      else resolve(res)
    });

  })
}
module.exports = {
  name: 'american',
  displayName: 'american',
  aliases: ['kkona'],
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
    searchImage("fat american").then(res=>{
      const image = res[Math.floor(Math.random()*res.length)];
      message.channel.send(image.url).catch(e=>null)
    })
  },
};
