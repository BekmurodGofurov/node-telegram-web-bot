const TelegramBot = require('node-telegram-bot-api');
const token = "7811968929:AAFEExjXm-yOuIPwIul0JQFoEjUzbBHpDQQ";

const bot = new TelegramBot(token, {polling: true});


const bootstrap = () => {
    bot.on('message', async msg => {
        const chatId = msg.chat.id
        const text = msg.text

        if (text == "/start") {
            await bot.sendMessage(chatId, `Salom ${msg.from.first_name} botga hush kelibsiz😊`, 
                {
                    reply_markup: {
                        resize_keyboard: true,
                        keyboard: [
                            [{text: "Click On", web_app: {url: "https://node-telegram-web-bot.vercel.app"}}]
                        ]
                    }
                }
            )
        }

        if (msg.web_app_data?.data) {
            try {
                const data = JSON.parse(msg.web_app_data?.data)

                await bot.sendMessage(chatId, "Bizga ishonch bildirganingiz uchun rahmat, siz sotib olgan mevalar ro'yhati.")

                for (item of data) {
                    await bot.sendMessage(chatId, `${item.title} - ${item.quontity}X`)
                }

                await bot.sendMessage(chatId,
                    `Umumiy narx: ${data.reduce((a, c)=> a + c.price * c.quontity, 0).toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD"
                    })}`
                )
            } catch (error) {
                return bot.sendMessage(chatId, error)
            }            
        }
    })
}

bootstrap()