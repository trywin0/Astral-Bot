const {requireUncached} = require("../../utils")
module.exports = {
  name: 'whitelist',
  displayName: 'Whitelist',
  userPermissions: [],
  botPermissions: [],
  ownerOnly: true,
  dm: false,
  run: async (client, message, args)=>{
  const user = message.mentions.users.first()||await client.users.fetch(args[0]).catch(e=>null)

  if(!user) return message.reply("Invalid user")

  let data = JSON.parse(client.data.read())
  if(!data.blacklistedUsers) data.blacklistedUsers = [];
  data.blacklistedUsers.splice(data.blacklistedUsers.indexOf(user), 1) 
  client.data.write(JSON.stringify(data, 0, 1)) // Write the modified data to the data.json file, formatted with 1 space indent (?)
  message.reply(`Whitelisted \`${user.tag}\``)
  },
};
