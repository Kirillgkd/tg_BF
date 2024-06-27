import { Telegraf, Markup } from 'telegraf';
import { URLSearchParams } from 'url';

// Инициализация Telegram бота
const bot = new Telegraf('6979302839:AAFn6yPdRu17MwLv4A40JAgueZznSQJ6ShE'); // Замените на ваш токен
const WEB_APP_BASE_URL = 'https://tgappbrighfairy.web.app';

bot.start((ctx) => {
    const user = ctx.message.from;
    const telegramId = user.id;
    const username = user.username || '';
    const uniqueLink = username ? 
        `${WEB_APP_BASE_URL}?telegramId=${telegramId}&username=${username}` :
        `${WEB_APP_BASE_URL}?telegramId=${telegramId}`;
    ctx.reply('Добро пожаловать в магический мир Криптоленда! Чтобы начать путешествие, нажмите на кнопку «Магия»!', 
        Markup.keyboard([
            Markup.button.webApp('Магия!', uniqueLink)
        ]).resize()
    );
});

// Обработка реферальных ссылок
bot.on('message', (ctx) => {
    const message = ctx.message;
    
    if (message.entities && message.entities[0].type === 'url') {
        const urlEntity = message.entities[0];
        const url = message.text.slice(urlEntity.offset, urlEntity.offset + urlEntity.length);
        const urlParams = new URLSearchParams(new URL(url).search);
        const referralId = urlParams.get('referralId');
        
        if (referralId) {
            const user = ctx.message.from;
            const telegramId = user.id;
            const username = user.username || '';
            const uniqueLink = username ? 
                `${WEB_APP_BASE_URL}?telegramId=${telegramId}&username=${username}&referralId=${referralId}` :
                `${WEB_APP_BASE_URL}?telegramId=${telegramId}&referralId=${referralId}`;
            ctx.reply('Добро пожаловать в магический мир Криптоленда! Чтобы начать путешествие, нажмите на кнопку «Магия»!', 
                Markup.keyboard([
                    Markup.button.webApp('Магия!', uniqueLink)
                ]).resize()
            );
        }
    }
});

bot.launch();
console.log('Бот запущен');




