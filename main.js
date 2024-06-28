import { Telegraf, Markup } from 'telegraf';
import { FirebaseService } from './firebaseService';

// Инициализация Telegram бота
const bot = new Telegraf('6979302839:AAFn6yPdRu17MwLv4A40JAgueZznSQJ6ShE');
const WEB_APP_BASE_URL = 'https://tgappbrighfairy.web.app';
const firebaseService = new FirebaseService();

// Обработка команды /start
bot.start(async (ctx) => {
    const user = ctx.message.from;
    const telegramId = user.id;
    const username = user.username || '';

    // Извлечение start параметра
    const startParam = ctx.message.text.split(' ')[1];
    const referralId = startParam ? startParam : '';

    // Генерация уникальной ссылки
    let uniqueLink = `${WEB_APP_BASE_URL}?telegramId=${telegramId}&username=${username}`;
    if (referralId) {
        uniqueLink += `&referralId=${referralId}`;
    }

    // Сохранение реферальной информации в Firebase
    if (referralId) {
        await firebaseService.saveReferralData(telegramId, referralId);
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



