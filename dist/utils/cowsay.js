"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cowsay = (0, tslib_1.__importStar)(require("cowsay"));
const random_1 = (0, tslib_1.__importDefault)(require("./random"));
const quotes_json_1 = (0, tslib_1.__importDefault)(require("./quotes.json"));
function default_1(imageName = 'lamb') {
    let randomNum = (0, random_1.default)(0, 25);
    let opts = {
        text: `${quotes_json_1.default[randomNum].quote} - ${quotes_json_1.default[randomNum].author}`,
        f: imageName,
    };
    let output = cowsay.say(opts);
    let fixedOutput = '';
    if (output.includes(`\`\`\``)) {
        fixedOutput = output.replace(`\`\`\``, `'''`);
    }
    return `\`\`\`${fixedOutput ? fixedOutput : output}\`\`\``;
}
exports.default = default_1;
