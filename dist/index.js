"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = (0, tslib_1.__importStar)(require("discord.js"));
require("dotenv/config");
const client = new discord_js_1.default.Client({
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES],
});
client.on('ready', () => {
    console.log('the bot is ready');
    let handler = require('./command-handler');
    if (handler.default)
        handler = handler.default;
    handler(client);
});
client.login(process.env.TOKEN);
