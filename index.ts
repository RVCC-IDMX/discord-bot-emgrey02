import DiscordJS, { Emoji, Intents } from 'discord.js';
import dotenv from 'dotenv';
import cowsay from './utils/cowsay';
dotenv.config();

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('The bot is ready');
});

client.on('messageCreate', (message) => {
  if (message.content === 'ping') {
    message.reply({
      content: 'pong',
    });
    message
      .react('🐌')
      .then(() => console.log(`reacted to "${message.content}"`))
      .catch(console.error);
    message
      .reply('I will never miss!')
      .then(() => console.log(`replied to "${message.content}"`))
      .catch(console.error);
  }
  if (message.content === 'cowsay') {
    message
      .reply(cowsay())
      .then(() => {
        message
          .react('🍄')
          .then(() => console.log(`reacted to "${message.content}"`))
          .catch(console.error);
        message
          .reply(`that's right :)`)
          .then(() => console.log(`replied to "${message.content}"`))
          .catch(console.error);
      })
      .catch((error) => {
        if (error.code == 50035) {
          message
            .reply(`I can't post that...`)
            .then(() => console.log('error message'))
            .catch(console.error);
        }
      });
  }
});

client.login(process.env.TOKEN);
