import { Telegraf, Markup } from 'telegraf';
// Инициализация Telegram бота
const bot = new Telegraf('6979302839:AAFn6yPdRu17MwLv4A40JAgueZznSQJ6ShE');
const WEB_APP_BASE_URL = 'https://tgappbrighfairy.web.app';


// Обработка команды /start
bot.start(async (ctx) => {
    const user = ctx.message.from;
    const telegramId = user.id;
    const username = user.username || '';

    // Логирование полученного сообщения
    console.log(`Получено сообщение: ${ctx.message.text}`);

    // Извлечение start параметра
    const startParam = ctx.message.text.split(' ')[1];
    const referralInfo = startParam ? startParam.split('_') : [];
    const referralId = referralInfo[0] || '';
    const referrerUsername = referralInfo[1] || '';

    // Логирование информации о реферальном ID
    if (referralId) {
        console.log(`Пользователь ${telegramId} был приглашен пользователем ${referralId} (${referrerUsername})`);
    } else {
        console.log(`Пользователь ${telegramId} начал без реферального ID`);
    }

    // Генерация уникальной ссылки
    let uniqueLink = `${WEB_APP_BASE_URL}?telegramId=${telegramId}&username=${username}`;
    if (referralId) {
        uniqueLink += `&referralId=${referralId}&referrerUsername=${referrerUsername}`;
        
    console.log(uniqueLink)
    }


    // Отправка сообщения пользователю
    ctx.reply('Добро пожаловать в магический мир Криптоленда! Чтобы начать путешествие, нажмите на кнопку «Магия»!',
        Markup.keyboard([
            Markup.button.webApp('Магия!', uniqueLink)
        ]).resize()
    );
});

bot.command('get_referral_link', (ctx) => {
    const user = ctx.message.from;
    const telegramId = user.id;
    const username = user.username || '';
    
    const referralLink = `https://t.me/BrightFairyBot?start=${telegramId}_${username}`;
    ctx.reply(`Ваша реферальная ссылка: ${referralLink}`);
});

bot.launch();
console.log('Бот запущен прямо сейчас');
