import { Message } from 'discord.js';

export default {
  callback: (message: Message, ...args: string[]) => {
    let product = 1;

    for (const arg of args) {
      product *= parseInt(arg);
    }

    message.reply(`The product is ${product}`);
  },
};
