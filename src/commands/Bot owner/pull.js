
const { exec } = require("child_process");

module.exports = {
  name: 'pull',
  displayName: 'pull',
  userPermissions: [],
  botPermissions: [],
  ownerOnly: true,
  dm: true,
  run: (client, message, args)=>{
    exec("cd ../../../ && git pull https://github.com/trywin0/Astral-Bot", (error, stdout, stderr) => {
      message.channel.send(`\`\`\`${stdout||error||stderr}\`\`\``)
  });
  },
};
