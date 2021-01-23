const { exec } = require("child_process");


module.exports = {
  name: 'exec',
  displayName: 'exec',
  userPermissions: [],
  botPermissions: [],
  ownerOnly: true,
  dm: true,
  run: (client, message, args)=>{
    exec(args.join(" "), (error, stdout, stderr) => {
      message.channel.send(`\`\`\`${stdout||error||stderr}\`\`\``)
  });
    
  },
};
