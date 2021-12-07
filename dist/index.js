"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = (0, tslib_1.__importStar)(require("discord.js"));
const dotenv_1 = (0, tslib_1.__importDefault)(require("dotenv"));
const cowsay_1 = (0, tslib_1.__importDefault)(require("./utils/cowsay"));
dotenv_1.default.config();
const PREFIX = process.env.PREFIX;
const CHANNELS = process.env.CHANNELS || null;
if (!CHANNELS) {
    console.error('CHANNELS is not defined');
    process.exit(1);
}
const channels = CHANNELS.split(',');
console.table(channels);
const client = new discord_js_1.default.Client({
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES],
});
client.on('ready', () => {
    console.log('The bot is ready');
});
client.on('messageCreate', (message) => {
    if (!message.content.startsWith(`${PREFIX}`))
        return;
    if (!channels.includes(message.channel.id))
        return;
    let args = message.content.toLowerCase().slice(3).trim().split(' ');
    if (args.includes('ping')) {
        message
            .reply('pong')
            .then(() => console.log('pong reply sent.'))
            .catch(console.error);
        message
            .react('🐌')
            .then(() => console.log('ping reaction sent.'))
            .catch(console.error);
        message
            .reply('I will never miss!')
            .then(() => console.log('custom pong reply sent.'))
            .catch(console.error);
    }
    if (args.includes('cowsay')) {
        let followingArgs = args.filter((arg) => arg != 'cowsay' && arg != 'ping');
        message
            .react('🍄')
            .then(() => console.log('cowsay reaction sent.'))
            .catch(console.error);
        try {
            (0, cowsay_1.default)(followingArgs[0]);
        }
        catch (error) {
            message
                .reply("sorry, that's not a valid animal.")
                .then(() => console.log('error message sent.'))
                .catch(console.error);
            return;
        }
        const output = (0, cowsay_1.default)(followingArgs[0]);
        message
            .reply(output)
            .then(() => message
            .reply("That's right :)")
            .then(() => console.log('cowsay output success reply'))
            .catch(console.error))
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
