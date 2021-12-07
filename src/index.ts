import DiscordJS, { Intents } from 'discord.js';
import 'dotenv/config';
import dotenv from 'dotenv';
import cowsay from './utils/cowsay';
// dotenv.config();

// //get bot prefix
// const PREFIX = process.env.PREFIX;

// //get channel codes
// const CHANNELS = process.env.CHANNELS || null;

// if (!CHANNELS) {
//   console.error('CHANNELS is not defined');
//   process.exit(1);
// }

// const channels = CHANNELS.split(',');
// console.table(channels);

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

//   try {
//     cowsay(followingArgs[0]);
//   } catch (error) {
//     message
//       .reply("sorry, that's not a valid animal.")
//       .then(() => console.log('error message sent.'))
//       .catch(console.error);
//     return;
//   }

//   const output = cowsay(followingArgs[0]);

//   message
//     .reply(output)
//     .then(() =>
//       message
//         .reply("That's right :)")
//         .then(() => console.log('cowsay output success reply'))
//         .catch(console.error)
//     )
//     .catch((error) => {
//       if (error.code == 50035) {
//         message
//           .reply(`I can't post that...`)
//           .then(() => console.log('error message'))
//           .catch(console.error);
//       }
//     });
//   }
// });
