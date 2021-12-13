import DiscordJS, { Intents } from 'discord.js';
import 'dotenv/config';
import dotenv from 'dotenv';
import cowsay from './commands/cowsay';

//create client
const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('the bot is ready');
  let handler = require('./command-handler');
  if (handler.default) handler = handler.default;

  handler(client);
});

client.login(process.env.TOKEN);

// client.on('messageCreate', (message) => {
//

//   //separate user commands into an array of strings
//   let args = message.content.toLowerCase().slice(3).trim().split(' ');

//   if (args.includes('ping')) {
//     message
//       .reply('pong')
//       .then(() => console.log('pong reply sent.'))
//       .catch(console.error);
//     message
//       .react('🐌')
//       .then(() => console.log('ping reaction sent.'))
//       .catch(console.error);
//     message
//       .reply('I will never miss!')
//       .then(() => console.log('custom pong reply sent.'))
//       .catch(console.error);
//   }

// if (args.includes('cowsay')) {
//   //filter out args
//   let followingArgs = args.filter((arg) => arg != 'cowsay' && arg != 'ping');

//   message
//     .react('🍄')
//     .then(() => console.log('cowsay reaction sent.'))
//     .catch(console.error);
