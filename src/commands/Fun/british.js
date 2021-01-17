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
  name: 'british',
  displayName: '3Head',
  aliases: ['3head'],
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
    searchImage("british person").then(res=>{
      const image = res[Math.floor(Math.random()*res.length)];
      message.channel.send({files: [image.url]})
    })
  },
};
