import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import cowsay from './utils/cowsay';
dotenv.config();

let prefix = process.env.PREFIX!;

const CHANNELS = process.env.CHANNELS || null;

if (!CHANNELS) {
  console.error('CHANNELS is not defined');
  process.exit(1);
}

const channels = CHANNELS.split(',');
console.table(channels);

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('The bot is ready');
});

client.on('messageCreate', (message) => {
  if (!message.content.startsWith(prefix)) return;
  if (!channels.includes(message.channel.id)) return;
  let args = message.content.toLowerCase().slice(3).trim().split(' ');

  if (args.includes('ping')) {
    message.reply('pong').then(console.log).catch(console.error);
    message.react('🐌').then(console.log).catch(console.error);
    message.reply('I will never miss!').then(console.log).catch(console.error);
  }

  if (args.includes('cowsay')) {
    let followingArgs = args.filter((arg) => arg != 'cowsay' && arg != 'ping');

    message.react('🍄').then(console.log).catch(console.error);

    try {
      cowsay(followingArgs[0]);
    } catch (error) {
      message
        .reply("sorry, that's not a valid animal.")
        .then(console.log)
        .catch(console.error);
      return;
    }

    const output = cowsay(followingArgs[0]);

    message
      .reply(output)
      .then(console.log)
      .catch((error) => {
        if (error.code == 50035) {
          message
            .reply(`I can't post that...`)
            .then(() => console.log('error message'))
            .catch(console.error);
        }
      });

    message.reply("That's right :)").then(console.log).catch(console.error);
  }
});

client.login(process.env.TOKEN);
