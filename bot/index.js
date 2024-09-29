const TelegramBot = require('node-telegram-bot-api');
const token = "7811968929:AAFEExjXm-yOuIPwIul0JQFoEjUzbBHpDQQ";

const bot = new TelegramBot(token, {polling: true});

const bootstrap = () => {
    bot.on('message', async msg => {
        const chatId = msg.chat.id
        const text = msg.text

        if (text == "/start") {
            await bot.sendMessage(chatId, `Salom ${msg.from.first_name} botga hush kelibsiz😊`)
        }
    })
}

bootstrap()