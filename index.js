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
        name: "Zeta Team",
        type: "WATCHING"
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

    // Цвета
    const green = "#bafd87";
    const blue = "#03ffc8";

    if (message.channel.id === "987734289284231178") {
      const args = message.content.slice().split(" ");

      if (message.content.startsWith(prefix)) {
        return message.delete().catch()
      } else if (message.content.indexOf(args) > -1 && message.author.bot == false) {
        const request = new Discord.MessageEmbed()
          .setTitle("Заполнение заявки")
          .setAuthor({
            name: `${message.author.username}`,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setColor(`${green}`)
          .setDescription( String(`${args}`) )
          .setFooter({ text: `${message.author.id}` })
        message.channel.send({ embeds: [request] })
        message.delete().catch()
        console.log("Заявка заполнена!")
        //client.channels.cache.get("987734289284231178").send(`${args.join(" ")}`)
      }
    }

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    if (cmd === "ping") {
      if (message.author.id !== "980103023034527865") return;
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

      // О сервере
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

      // Каналы сервера
      const channels = new Discord.MessageEmbed()
        .setTitle(`Каналы ${message.guild.name}`)
        .setColor(`${green}`)
        .setDescription("Вы можете изучить каналы, чтобы ориентироваться по серверу")
        .addFields(
          {
            name: `❤︙⌜ Информация ⌟`, value: `∙ <#998249098069155941> ‣ Правила сервера\n∙ <#998249098362765403> ‣ О сервере и рекомендации\n∙ <#998249098362765404> ‣ Важные новости, обновления и конкурсы`
          },
          {
            name: `💛︙⌜ Основное ⌟`, value: `∙ <#998249098362765406> ‣ Лаймовое общение\n∙ <#998249098362765407> ‣ Использование команд ботов\n∙ <#998249098362765408> ‣ Медиаконтент сервера\n∙ <#998249098362765409> ‣ Идеи к совместным проектам`
          },
          {
            name: `💚︙⌜ Общение ⌟`, value: `∙ <#998249098555707504> ‣ Основной для общения\n∙ <#1000656403645616158> ‣ Встречи людей\n∙ <#998283314601398322> ‣ Создание своего привата`
          },
          {
            name: `💙︙⌜ Другое ⌟`, value: `∙ <#1000276851203244062> ‣ Межсерверный чат\n∙ <#1000277360475652157> ‣ Общение с ИИ\n∙ <#999647959115378698> ‣ Заполнение заявок на роли`
          },
        )
        .setFooter({ text: `Ваш путеводитель по ${message.guild.name}` })

      // Роли сервера
      const roles = new Discord.MessageEmbed()
        .setTitle(`Роли ${message.guild.name}`)
        .setColor(`${green}`)
        .setDescription("Вы можете изучить роли, чтобы ориентироваться по участникам и узнать получение ролей")
        .addFields(
          {
            name: `Основные`, value: `◦ <@&998249098069155938> ‣ Получение по решению действующих администраторов\n◦ <@&998249098069155935> ‣ Нельзя получить пользователям\n◦ <@&998249098069155933> ‣ Получение при входе. Прим.: Если есть другая роль — роль <@&998249098069155933> убирается`
          },
          {
            name: `Программирование`, value: `◦ <@&998255124394803332> ‣ Получение после одобрения заявки в канале <#999647959115378698>\n◦ <@&998950665604833280> ‣ Получение, если деятельность **веб-разработка**. Прим.: Нельзя получить без роли <@&998255124394803332>\n ◦ <@&998950738254385262>, <@&998950784026804345>, <@&998952900036407326> и т.д ‣ Получение только при одобрении заявки в канале <#999647959115378698>. Прим.: Можно получить только одну из этих ролей, также нельзя взять без роли <@&998255124394803332>`
          },
          {
            name: `Дизайн`, value: `◦ <@&998255182645317782> ‣ Получение после одобрения заявки в канале <#999647959115378698>\n◦ <@&998950665604833280> ‣ Получение, если деятельность **веб-дизайн**. Прим.: Нельзя взять без роли <@&998255182645317782>`
          },
        )
        .setFooter({ text: `Ваш путеводитель по ${message.guild.name}` })

      message.channel.send({ embeds: [info, channels, roles] });
      message.delete().catch();
    } else if (cmd === "application" || cmd === "app") {
      if (message.author.id !== "980103023034527865") return;

      // Информация о мини-компании
      const app = new Discord.MessageEmbed()
        .setTitle("Заявки на участие в мини-компанию!")
        .setColor(`${blue}`)
        .setDescription("Ниже рассказываем обо всём")
        .addFields(
          {
            name: "Что такое мини-компания?", value: `Наш сервер — это и есть мини-компания, т.е связывает программистов и дизайнеров для совместных работ в команде, помощи друг другу и общению на разные темы`
          },
          {
            name: "Что мне это даёт?", value: `> Получение роли\n> Использование TTS-сообщений и просмотр журнала аудита\n> Продвижение Ваших услуг\n> Открытие приватного чата\n> Полезная информация для Вашей области: сайты, программы, книги и т.д\n> Возможность быть частью команды!`
          },
          {
            name: "О заявках", value: `Для того, чтобы вступить в сообщество, Вам следует заполнить заявку. **Шуточные, недостоверные и шаблонные заявки удаляются и не принимаются!** Если Вашу заявку не приняли, то попробуйте в следующий раз указать больше информации`
          },
        )
        .setFooter({ text: "Станьте участником нашей мини-компании!" })

      // Заявка
      const appinfo = new Discord.MessageEmbed()
        .setTitle("Заявка")
        .setColor(`${blue}`)
        .setDescription("Заявка на программиста / дизайнера")
        .addFields(
          {
            name: "Обязательно", value: `\`1.1\` Ваше имя\n\`1.2\` Ваш возраст\n\`1.3\` Ваша специальность (программист / дизайнер)\n\`1.4\` Вы относитесь к веб-разработчикам / веб-дизайнерам?\n\`1.5\` Укажите навыки и опыт, для программистов — указать знание языков программирования и технологий`
          },
          {
            name: "Желательно", value: `\`2.1\` Расскажите о себе\n\`2.2\` Покажите портфолио работ или киньте ссылку`
          },
        )
        .setFooter({ text: "Станьте участником нашей мини-компании!" })

      message.channel.send({ embeds: [app, appinfo] });
      message.delete().catch();
    }
  })
} catch (e) {
  console.log(e)
}

keepAlive()
client.login(process.env.token);