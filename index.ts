import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import * as cowsay from 'cowsay';
dotenv.config();

let output: string = cowsay.say({ text: 'MOOOOOOOOOOOOO' });

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
  }
  if (message.content === 'cowsay') {
    message.reply(`
    \`\`\`
    ${output}
    \`\`\`
    `);
  }
});

client.login(process.env.TOKEN);
