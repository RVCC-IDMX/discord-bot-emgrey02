import * as cowsay from 'cowsay';
import { IOptions } from 'cowsay';
import getRandomInt from './random';
import quotes from './quotes.json';

export default function (imageName: string = 'lamb') {
  //generate random num
  let randomNum = getRandomInt(0, 25);

  //use template literals to insert random quote
  let opts: IOptions = {
    text: `${quotes[randomNum].quote} - ${quotes[randomNum].author}`,
    f: imageName,
  };

  let output: string = cowsay.say(opts);

  let fixedOutput = '';
  if (output.includes(`\`\`\``)) {
    fixedOutput = output.replace(`\`\`\``, `'''`);
  }

  return `\`\`\`${fixedOutput ? fixedOutput : output}\`\`\``;
}
