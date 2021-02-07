const {Client, Message} = require('discord.js');
const {twEmojiRegex} = require("../../utils")
function hexEncode(text){
  const hex = text.codePointAt(0).toString(16);
  const result = "0000".substring(0, 4 - hex.length) + hex;
  return result
}
module.exports = {
  name: 'idlookup',
  displayName: 'ID Lookup',
  aliases: ['id'],
  userPermissions: [],
  botPermissions: [],
  ownerOnly: true,
  dm: true,
   /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */
  run: async (client, message, args)=>{
   const validTypes = ["user", "channel", "guild"] // The only valid properties that the user can have access to fetch from in the bot client
   if(!validTypes.includes(args[0])) return message.reply("Invalid ID type specified. Available ID types: `user, channel, guild`") 
   // If the specified argument they provided isnt any of those in the argument then it sends a message saying that
   let fetchedID = await client[args[0]+"s"].fetch(args[1]).catch(e=>null) // Fetch the <specified argument> and if it errors (invalid ID most likely) then the variable is just null
   if(!fetchedID) return message.reply(`I couldn't fetch a ${args[0]} with that ID`); // If the fetch failed, and it's null then reply saying it couldnt fetch something with that ID.
   message.channel.send("```json\n"+JSON.stringify(fetchedID, 0, 1)+"```") // Send the fetched object in the channel 
   // TODO: Make the message sent into an embed ^
  },
};
