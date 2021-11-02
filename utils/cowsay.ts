import * as cowsay from 'cowsay';
import { IOptions } from 'cowsay';

export default function () {
  let opts: IOptions = {
    text: "you're cute",
    r: true,
  };

  let output: string = cowsay.say(opts);

  let fixedOutput = '';
  if (output.includes(`\`\`\``)) {
    fixedOutput = output.replace(`\`\`\``, `'''`);
  }

  return `\`\`\`${fixedOutput ? fixedOutput : output}\`\`\``;
}
