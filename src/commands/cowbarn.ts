import * as cowsay from 'cowsay';
import { IOptions } from 'cowsay';
import getRandomInt from '../utils/random';
import quotes from '../utils/quotes.json';
import { Message, MessageEmbed } from 'discord.js';
import { channel } from 'diagnostics_channel';

export default {
  callback: (message: Message, ...args: string[]) => {
    //generate random num
    let randomNum = getRandomInt(0, quotes.length);

    //use template literals to insert random quote
    let opts: IOptions = {
      text: 'hi',
      f: args[0],
    };

    let output: string = cowsay.say(opts).slice(20);

    let fixedOutput = '';

    if (output.includes(`\`\`\``)) {
      fixedOutput = output.replace(`\`\`\``, `'''`);
    }

    if (fixedOutput.length > 4096) {
      let diff: number = fixedOutput.length - 4096;
      fixedOutput = fixedOutput.slice(0, fixedOutput.length - (diff + 10));
    }

    let finalOutput = `\`\`\`${fixedOutput ? fixedOutput : output}\`\`\``;

    const cowbarn = new MessageEmbed()
      .setColor('#9693EB')
      .setTitle(`Hello there, human`)
      .setDescription(`${finalOutput}`)
      .addField(
        `As ${quotes[randomNum].author} Once Said...`,
        `${quotes[randomNum].quote}`,
        true
      )
      .addField('\u200B', '\u200B')
      .addField('Drawing:', `${args[0]}`, true)
      .addField('You win:', 'a cool dog pic', true)
      .setImage(
        'https://res.cloudinary.com/greypse/image/upload/w_200,h_200,c_fill,e_hue:-85/IMG_8813_dmjsgp.jpg'
      )
      .setTimestamp()
      .setFooter(
        '\u2800'.repeat(40),
        'https://res.cloudinary.com/greypse/image/upload/v1639428779/discord-bot_gxtcrj.png'
      );

    message.channel
      .send({ embeds: [cowbarn] })
      .then(() => {
        message
          .react('🍄')
          .then(() => console.log('cowsay reaction sent.'))
          .catch(console.error);
        console.log('success');
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
