const {requireUncached} = require("../../utils")
module.exports = {
  name: 'addsnipe',
  displayName: 'addsnipe',
  userPermissions: [],
  botPermissions: [],
  ownerOnly: true,
  dm: false,
  run: async (client, message, args)=>{
   const user = await client.users.fetch(args[0]).catch(e=>null)
   const content = args.slice(1).join(" ");
   if(!user) return message.reply("Invalid user ID")
   if(!content) return message.reply("You need to provide message content")

   let snipeMessage = {
     author: user,
     content,
     guild: message.guild
   }
   
   client.snipes.set(message.id, snipeMessage)
   console.log(client.snipes)

   message.reply("done.")
  },
};
