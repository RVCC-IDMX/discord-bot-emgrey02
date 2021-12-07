import { Client } from 'discord.js';
import getFiles from './get-files';
import dotenv from 'dotenv';

//get bot prefix
const PREFIX = process.env.PREFIX;

//get channel codes
const CHANNELS = process.env.CHANNELS || null;
if (!CHANNELS) {
  console.error('CHANNELS is not defined');
  process.exit(1);
}
const channels = CHANNELS.split(',');
console.table(channels);

dotenv.config();

let suffix = '.ts';
let src = 'src';
if (process.env.NODE_ENV === 'production') {
  suffix = '.js';
  src = 'dist';
  console.log('Running in production mode');
}

export default (client: Client) => {
  const commands = {} as {
    [key: string]: any;
  };

  const commandFiles = getFiles(src, './commands', suffix);
  console.log(commandFiles);

  for (const command of commandFiles) {
    let commandFile = require(command);
    if (commandFile.default) commandFile = commandFile.default;

    const split = command.replace(/\\/g, '/').split('/');
    const commandName = split[split.length - 1].replace(suffix, '');

    commands[commandName.toLowerCase()] = commandFile;
  }
  console.log(commands);

  client.on('messageCreate', (message) => {
    if (message.author.bot) {
      return;
    }
    if (!message.content.startsWith(`${PREFIX}`)) return;
    if (!channels.includes(message.channel.id)) return;

    const args = message.content.slice(3).split(/ +/);
    const commandName = args.shift()!.toLowerCase();

    if (!commands[commandName]) {
      return;
    }

    try {
      commands[commandName].callback(message, ...args);
    } catch (error) {
      console.error(error);
    }
  });
};
