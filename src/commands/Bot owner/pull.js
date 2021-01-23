const shell = require('shelljs')
const path = __dirname + '/../'

function pull(){
  shell.cd(path)
  shell.exec('git pull https://github.com/trywin0/Astral-Bot')
}
module.exports = {
  name: 'pull',
  displayName: 'pull',
  userPermissions: [],
  botPermissions: [],
  ownerOnly: true,
  dm: true,
  run: (client, message, args)=>{
    pull()
    message.channel.send("Dona?")
  },
};
