// Require modules and files
const {Client, Collection} = require('discord.js');
const {'discord-bot-token': token} = require('../secrets.json');
const config = require('../config.json');
const {File} = require('./utils.js')
const fs = require('fs');

// Discord client initialization and registering events
const client = new Client({partials: ['MESSAGE', 'REACTION', 'CHANNEL']});

client.config = config;
client.data = new File(__dirname + '/../data.json')
client.commands = new Collection();
client.snipes = new Collection(); // Be careful with the snipes, Discord may not like it.

// Read all of the files in the event folder
const eventFileNames = fs.readdirSync(`${__dirname}/events`);

// Loop through all of the event names and listen for that event
eventFileNames.forEach((eventFileName) => {
  const eventFile = require(`${__dirname}/events/${eventFileName}`);
  client.on(eventFile.event, (...args) => eventFile.run(client, ...args));
});

// Registering commands
const commands = fs.readdirSync(`${__dirname}/commands`).map((category)=>{
  return fs.readdirSync(`${__dirname}/commands/${category}`).map((cmd)=>{
    const commandObject = require(`${__dirname}/commands/${category}/${cmd}`);
    commandObject.category = category;
    return commandObject;
  });
}).flat(1);

// Registering each command in the client.commands collection
commands.forEach((command)=>client.commands.set(command.name, command));



// Logging in with the bot
client.login(token);
