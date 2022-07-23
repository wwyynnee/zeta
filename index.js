const Discord = require("discord.js");
const moment = require("moment");
const ms = require("ms");

const prefix = process.env.prefix;

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"]
});

// Подключаем сервер
const keepAlive = require("./server");

try {
  // Старт бота
  client.on("ready", async () => {
    client.user.setPresence({
      activities: [{
        name: "z.about",
        type: "PLAYING"
      }],
      //status: "dnd"
    });
    console.log(`Запуск ${client.user.username}!`);
  });

  // Команды
  client.on("messageCreate", async message => {
    const argument = message.content.slice(prefix.length);
    const args = argument.split(" ");
    const cmd = args.shift().toLowerCase();

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    // Цвета
    const green = "#bafd87";
    const blue = "#03ffc8";

    if (cmd === "ping") {
      const timeTaken = Date.now() - message.createdTimestamp;
      let gatewayLatency = Math.floor(client.ws.ping);
      message.channel.send(`Ping: \`${timeTaken}ms\`\nApi: \`${gatewayLatency}ms\``);
    } else if (cmd === "about") {
      const about = new Discord.MessageEmbed()
        .setTitle("Обо мне")
        .setColor(`${blue}`)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setDescription("Я бот для сервера Zeta Team")
        .addFields(
          {
            name: "Время безотказной работы", value: `${ms(client.uptime)}`
          },
          {
            name: "Пинг веб-сокета", value: `${client.ws.ping}ms`
          },
          {
            name: "Память", value: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap`
          },
          {
            name: "Node", value: `${process.version} в ${process.platform} ${process.arch}`
          },
        )
      message.channel.send({
        embeds: [about]
      })
    } else if (cmd === "rules") {
      if (message.author.id !== "980103023034527865") return;
      const rules = new Discord.MessageEmbed()
        .setTitle(`Правила ${message.guild.name}`)
        .setColor(`${blue}`)
        .setDescription(`*Для комфортного общения, тебе следует прочитать наши правила! Вот что у нас запрещено:*`)
        .addFields(
          {
            name: "Основное", value: `
1.1) Реклама чего-либо, спам\n1.2) Флуд, злоупотребление CAPS, многочисленные упоминания без причины\n1.3) Неадекватное, агрессивное и провокационное поведение, а также ответ на провокации\n1.4) Любые оскорбления, в т.ч семьи и себя, а также дискриминация и травля по любому признаку\n1.5) Торговля и обмен чем-либо, предложение различных услуг, а так же попрошайничество\n1.6) Распространение вредоносных файлов и ПО, а также фишинг ссылок\n1.7) Жестокие и откровенные материалы\n1.8) Пропаганда нездорового образа жизни, суицида и т.п\n1.9) Обход наказаний и ограничений любым способом\n1.10) Оффтоп, т.е сообщения не по теме канала`
          },
          {
            name: "Голосовые каналы", value: `2.1) Посторонние звуки, мешающие общению или прослушиванию\n2.2) Модификация голоса через сторонние программы\n2.3) Частое переподключение и перемещение по каналам\n2.4) Неадекватная манера речи, оскорбление, токсичность и прочее`
          },
          {
            name: "Правила Discord", value: `3.1) Нарушение [правил сообщества Discord](https://discord.com/guidelines)\n3.2) Несоблюдение [условий использования Discord](https://discord.com/terms)`
          },
          {
            name: "Дополнение", value: `Администраторы могут действовать в зависимости от ситуации по-разному и отходить от общих правил. За несоблюдение основных правил сервера и Discord может выдаваться предупреждение, мьют или бан, а за нарушения правил голосовых каналов грозит мьют микрофона, звука или запрет на голосовые каналы`
          },
        )
        .setFooter({ text: "Незнание правил не освобождает от ответственности" })
      message.delete().catch();
      message.channel.send({ embeds: [rules] });
    } else if (cmd === "info") {
      if (message.author.id !== "980103023034527865") return;
      if (args[0] === "about") {
        const info = new Discord.MessageEmbed()
          .setTitle(`О ${message.guild.name}`)
          .setColor(`${green}`)
          .setDescription(`${message.guild.name} — это уникальное сообщество программистов и дизайнеров`)
          .addFields(
            {
              name: "Чем здесь можно заняться?", value: `В этом месте можно обзавестись новыми друзьями, программистами и дизайнерами. Общаемся на разные темы, смеёмся с угарных (и не очень) картинок, вместе слушаем музыку, да и в целом душевно проводим время в прекрасной атмосфере ${message.guild.name}!`
            },
            {
              name: "Чем мы занимаемся?", value: `Здесь мы создаём совместные проекты, помогаем друг другу, работаем в команде. Программисты разрабатывают сайты, приложения, ботов, выполняют заказы на фрилансе и не только. Дизайнеры создают аватарки, логотипы, баннеры, иллюстрации и т.п.`
            },
            {
              name: "Что меня ждёт?", value: `Различные конкурсы и мероприятия, дружное сообщество и лаймовое общение в чатах или в войсах, найдёшь с кем провести время. Наш проект предназначен для объединения программистов и дизайнеров! ${message.guild.name} — это замечательное место, которое связывает приятных людей с различными интересами!`
            },
          )
          .setFooter({ text: `С любовью, команда ${message.guild.name} ❤` })
        message.delete().catch();
        message.channel.send({ embeds: [info] });
      } else if (args[0] === "channels" || args[0] === "channel") {
        const channels = new Discord.MessageEmbed()
          .setTitle(`Каналы ${message.guild.name}`)
          .setColor(`${green}`)
          .setDescription("Вы можете изучить каналы, чтобы ориентироваться по серверу")
          
          .setFooter({ text: `Ваш путеводитель по ${message.guild.name}` })
        message.delete().catch();
        message.channel.send({ embeds: [channels] });
      }
    }
  })
} catch (e) {
  console.log(e)
}

keepAlive()
client.login(process.env.token);