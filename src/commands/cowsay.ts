import * as cowsay from 'cowsay';
import { IOptions } from 'cowsay';
import getRandomInt from '../utils/random';
import quotes from '../utils/quotes.json';
import { Message } from 'discord.js';

export default {
  callback: (message: Message, ...args: string[]) => {
    //generate random num
    let randomNum = getRandomInt(0, quotes.length);

    //use template literals to insert random quote
    let opts: IOptions = {
      text: `${quotes[randomNum].quote} - ${quotes[randomNum].author}`,
      f: args[0],
    };

    let output: string = cowsay.say(opts);

    let fixedOutput = '';
    if (output.includes(`\`\`\``)) {
      fixedOutput = output.replace(`\`\`\``, `'''`);
    }

    let finalOutput = `\`\`\`${fixedOutput ? fixedOutput : output}\`\`\``;

    message
      .reply(`${finalOutput}`)
      .then(() => {
        message
          .react('🍄')
          .then(() => console.log('cowsay reaction sent.'))
          .catch(console.error);
        message
          .reply("that's right :)")
          .then(() => console.log('cowsay reply sent.'))
          .catch(console.error);
        console.log('success');
      })
      .catch((err) => {
        if (err.code === 50035) {
          message
            .reply(`I can't post that...`)
            .then(() => console.log('error message sent'))
            .catch(console.error);
        }
      });
  },
};
