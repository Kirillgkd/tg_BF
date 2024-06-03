import { Telegraf, Markup } from 'telegraf';

// Инициализация Telegram бота
const bot = new Telegraf('6979302839:AAFn6yPdRu17MwLv4A40JAgueZznSQJ6ShE');
const WEB_APP_BASE_URL = 'https://tgappbrighfairy.web.app';


bot.start((ctx) => {
    const user = ctx.message.from;
    const telegramId = user.id;
    const username = user.username || ''; // Используем пустую строку, если username отсутствует
    const uniqueLink = username ? 
        `${WEB_APP_BASE_URL}?telegramId=${telegramId}&username=${username}` :
        `${WEB_APP_BASE_URL}?telegramId=${telegramId}`;
    ctx.reply('Добро пожаловать в магический мир Криптоленда! Чтобы начать путешествие, нажмите на кнопку «Магия»!', 
        Markup.keyboard([
            Markup.button.webApp('Магия!', uniqueLink)
        ]).resize()
    );
});

bot.launch();

console.log('Бот запущен');