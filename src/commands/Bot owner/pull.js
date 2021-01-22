const simpleGit = require('simple-git')
const git = simpleGit()

(async () => {
  try {
    await git.init();
    await git.addRemote("Astral-Bot", "https://github.com/trywin0/Astral-Bot");
}
catch (e) { /* handle all errors here */ }
})()

module.exports = {
  name: 'pull',
  displayName: 'pull',
  userPermissions: [],
  botPermissions: [],
  ownerOnly: true,
  dm: true,
  run: (client, message, args)=>{
    git.pull()
  },
};
