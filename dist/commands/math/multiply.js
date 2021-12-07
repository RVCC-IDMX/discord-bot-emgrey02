"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    callback: (message, ...args) => {
        let product = 1;
        for (const arg of args) {
            product *= parseInt(arg);
        }
        message.reply(`The product is ${product}`);
    },
};
