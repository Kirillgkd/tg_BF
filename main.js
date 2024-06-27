import { Telegraf, Markup } from 'telegraf';

// Инициализация Telegram бота
const bot = new Telegraf('6979302839:AAFn6yPdRu17MwLv4A40JAgueZznSQJ6ShE');
const WEB_APP_BASE_URL = 'https://tgappbrighfairy.web.app';

// Обработка команды /start
bot.start((ctx) => {
    const user = ctx.message.from;
    const telegramId = user.id;
    const username = user.username || '';
    
    // Извлечение startapp параметра
    const startapp = ctx.message.text.split(' ')[1];
    const referralIdMatch = startapp ? startapp.match(/^referralId_(\d+)$/) : null;
    const referralId = referralIdMatch ? referralIdMatch[1] : '';

    // Генерация уникальной ссылки
    let uniqueLink;
    if (referralId) {
        uniqueLink = username ?
            `${WEB_APP_BASE_URL}?telegramId=${telegramId}&username=${username}&referralId=${referralId}` :
            `${WEB_APP_BASE_URL}?telegramId=${telegramId}&referralId=${referralId}`;
    } else {
        uniqueLink = username ?
            `${WEB_APP_BASE_URL}?telegramId=${telegramId}&username=${username}` :
            `${WEB_APP_BASE_URL}?telegramId=${telegramId}`;
    }

    // Отправка сообщения пользователю
    ctx.reply('Добро пожаловать в магический мир Криптоленда! Чтобы начать путешествие, нажмите на кнопку «Магия»!',
        Markup.keyboard([
            Markup.button.webApp('Магия!', uniqueLink)
        ]).resize()
    );
});

bot.launch();
console.log('Бот запущен');
