const Discord = require("discord.js");
const moment = require("moment");
const ms = require("ms");

const prefix = process.env.prefix;

const client = new Discord.Client({ intents: 28373 });

// Подключаем сервер
const keepAlive = require("./server");

try {
  // Старт бота
  client.on("ready", async () => {
    client.user.setPresence({
      activities: [{
        name: "Zeta Studio",
        type: "WATCHING"
      }],
      status: "idle"
    });
    console.log(`Запуск ${client.user.username}!`);
  });

  client.on("error", (e) => {
    console.log("Ошибка:", e);
  });
  
  client.on("debug", (e) => {
    console.log("Отладка:", e);
  });

  client.on("messageCreate", async message => {
    const argument = message.content.slice(prefix.length);
    const args = argument.split(" ");
    const cmd = args.shift().toLowerCase();

    // Цвета
    const green = "#bafd87";
    const blue = "#03ffc8";

    if (message.author.bot) return;
    if (message.author.id !== "980103023034527865") return;
    if (!message.content.startsWith(prefix)) return;

    /*if (message.channel.id === "999647959115378698" || message.channel.id === "1002477915918839880") {
      const args = message.content.slice().split(" ");
      
      if (message.content.indexOf(args) > -1 && message.author.bot == false) {
        const request = new Discord.MessageEmbed()
          .setTitle("Заполнение заявки")
          .setAuthor({
            name: `${message.author.username}`,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setColor(`${green}`)
          .setDescription( String(`${args}`) )
          .setFooter({ text: `🆔: ${message.author.id}` })
        message.channel.send({ embeds: [request] })
        message.delete().catch()
        client.channels.cache.get("998459468159389716").send(`Заявка была заполнена!\nИмя: ${message.author.username}\nСообщение: ${args}\nID: ${message.author.id}`)
      }
    }*/
    if (cmd === "help") {
      const help = new Discord.MessageEmbed()
        .setTitle("Список команд")
        .setColor(`${green}`)
        .setDescription("`eval`, `ping`, `about`, `rules`, `app`, `info`, `new`, `embed`, `role`, `services`, `exe`")
      message.delete()
      message.channel.send({ embeds: [help] })
    } else if (cmd === "eval") {
      try {
        eval(args.join(" "))
        message.delete()
      } catch (err) {
        const error = new Discord.MessageEmbed()
          .setTitle("Ошибка")
          .setColor("RED")
          .setDescription(`\`\`\`js\n${err}\n\`\`\``)
        message.channel.send({ embeds: [error] })
      }
    }
    if (cmd === "ping") {
      const timeTaken = Date.now() - message.createdTimestamp;
      let gatewayLatency = Math.floor(client.ws.ping);
      message.channel.send(`Ping: \`${timeTaken}ms\`\nApi: \`${gatewayLatency}ms\``);
    } else if (cmd === "about") {
      const about = new Discord.MessageEmbed()
        .setTitle("Обо мне")
        .setColor(`${blue}`)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setDescription("Я бот для сервера Zeta Studio")
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
    } else if (cmd === "new") {
      let interserverImage = message.attachments.size > 0 ? message.attachments.first().url : "";
      if (!args[0]) {
        return message.channel.send("Введите заголовок")
      }
      const embed = new Discord.MessageEmbed()
        .setTitle("Новость")
        .setColor(`${blue}`)
        .setDescription(`${args.join(" ")}`)
        .setImage(`${interserverImage}`)
      message.channel.send({ embeds: [embed] })
      message.delete()
    } else if (cmd === "embed") {
      if (!args[0]) {
        return message.channel.send("Введите заголовок")
      }
      const embed = new Discord.MessageEmbed()
        .setTitle("Важная информация")
        .setColor(`${green}`)
        .setDescription(`${args.join(" ")}`)
      message.channel.send({ embeds: [embed] })
      message.delete()
    } else if (cmd === "role") {
      const role = new Discord.MessageEmbed()
        .setTitle("Выберите себе роль")
        .setColor(`${green}`)
        .addFields(
          {
            name: "Гендер", value: `◜♂️ ▹ Парень\n◟♀️ ▹ Девушка`
          },
          {
            name: "Возраст", value: `◜🐥 ▹ <13\n⎸ 🐤 ▹ 14-18\n◟🐣 ▹ 18+`
          },
          {
            name: "Кто вы", value: `◜⚡ ▹ Программист\n◟✨ ▹ Дизайнер`
          },
        )
        .setFooter({
          text: "Выбор роли по реакции под этим сообщением"
        })
      message.channel.send({ embeds: [role] })
      message.delete()
    } else if (cmd === "rules") {
      const rules = new Discord.MessageEmbed()
        .setTitle(`Правила ${message.guild.name}`)
        .setColor(`${blue}`)
        .setDescription("*Для комфортного общения, тебе следует прочитать наши правила! Вот что у нас запрещено:*\n\n\`\`\`diff\n- Общие\`\`\`\n\`1.1\` Реклама чего-либо, в т.ч. в лс\n\`1.2\` Неадекватное, агрессивное и провокационное поведение, а также ответ на провокации, токсичность\n\`1.3\` Любые оскорбления, в т.ч. семьи и себя, а также дискриминация и травля по любому признаку\n\`1.4\` Торговля и обмен чем-либо, предложение различных услуг, а также попрошайничество\n\`1.5\` Пропаганда нездорового образа жизни, суицида и т.п\n\n\`\`\`diff\n- Текстовые каналы\`\`\`\n\`2.1\` Спам, флуд, злоупотребление CAPS, многочисленные упоминания без причины\n\`2.2\` Распространение вредоносных файлов и ПО, а также фишинг ссылок\n\`2.3\` Жестокие и откровенные материалы\n\`2.4\` Оффтоп, т.е сообщения не по теме канала\n\n\`\`\`diff\n- Голосовые каналы\`\`\`\n\`3.1\` Посторонние звуки, мешающие общению или прослушиванию\n\`3.2\` Модификация голоса через сторонние программы\n\`3.3\` Частое переподключение и перемещение по каналам\n\n\`\`\`diff\n- Discord\`\`\`\n\`4.1\` Нарушение [правил сообщества Discord](https://discord.com/guidelines)\n\`4.2\` Несоблюдение [условий использования Discord](https://discord.com/terms)\n\n\`\`\`diff\n- Дополнительно\`\`\`\n\`5.1\` Сервер не зависит от ситуации в мире. Следует помнить, что сообщество не является **политическим**. Любое упоминание о политике, в т.ч. СССР и СВО — нарушение этого пункта правил\n\`5.2\` Осуждение действий и решения администрации. Персонал сервера может действовать в зависимости от ситуации по-разному и отходить от общих правил. Если считаете решение администрации несправедливым, обращайтесь к **Wynne#5531**\n\`5.3\` Обход наказаний и ограничений любым способом. Например, создание ещё одного аккаунта. Таким образом, время наказания основного аккаунта увеличивается, а твинк блокируются\n\`5.4\` Рейд сервера. Все участники таких движений получают бан навсегда незамедлительно\n\n\`\`\`asciidoc\n= Остальное =\`\`\`\nЗа несоблюдение основных правил сервера и Discord может выдаваться предупреждение, мьют или бан, а за нарушения правил голосовых каналов грозит мьют микрофона, звука или запрет на голосовые каналы")
        .setFooter({ text: "Незнание правил не освобождает от ответственности" })
      message.delete().catch();
      message.channel.send({ embeds: [rules] });
    } else if (cmd === "info") {
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
            name: `💙︙⌜ Интересное ⌟`, value: `∙ <#1000277360475652157> ‣ Общение с ИИ\n∙ <#999647959115378698> ‣ Заполнение заявок на роли\n∙ <#1000276851203244062> и <#1009765734987079742> ‣ Общение между серверами\n`
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

      const support = new Discord.MessageEmbed()
        .setTitle(`Поддержка ${message.guild.name}`)
        .setColor(`${green}`)
        .addFields({
          name: "Вы можете помощь серверу!",
          value: `Оставьте лайк и отзыв на этих сайтах-мониторингах:\n∗ [Myserver.gg](https://myserver.gg/ru/998249098069155932)\n∗ [Server-discord](https://server-discord.com/998249098069155932)\n∗ [Discordserver](https://discordserver.info/998249098069155932)\nИ пригласите друзей по этой [ссылке](https://discord.io/zetateam). Заранее благодарим Вас за поддержку сервера, нам будет приятно получать лайки и отзывы!`
        })
        .setFooter({ text: `Поддержите ${message.guild.name}` })

      message.channel.send({ embeds: [info, channels, roles, support] });
      message.delete().catch();
    } else if (cmd === "application" || cmd === "app") {
      // Информация о студии
      const app = new Discord.MessageEmbed()
        .setTitle("Заявки на участие в студию!")
        .setColor(`${blue}`)
        .setDescription("Ниже рассказываем обо всём")
        .addFields(
          {
            name: "Что такое Zeta Studio?", value: `Наш сервер связывает программистов и дизайнеров для совместных работ в команде, помощи друг другу и общению на разные темы`
          },
          {
            name: "Что мне это даёт?", value: `> Получение роли\n> Использование TTS-сообщений и просмотр журнала аудита\n> Продвижение Ваших услуг\n> Открытие приватного чата\n> Полезная информация для Вашей области: сайты, программы, книги и т.д\n> Возможность быть частью команды!`
          },
          {
            name: "О заявках", value: `Для того, чтобы вступить в сообщество, Вам следует заполнить заявку. **Шуточные, недостоверные и шаблонные заявки удаляются и не принимаются!** Если Вашу заявку не приняли, то попробуйте в следующий раз указать больше информации`
          },
        )
        .setFooter({ text: "Станьте участником нашей студии!" })

      // Заявка
      const appinfo = new Discord.MessageEmbed()
        .setTitle("Заявка")
        .setColor(`${blue}`)
        .setDescription("Заявка на программиста / дизайнера")
        .addFields(
          {
            name: "Обязательно", value: `\`1.1\` Ваше имя\n\`1.2\` Ваш возраст\n\`1.3\` Ваша специальность (программист / дизайнер)\n\`1.4\` Вы относитесь к веб-разработчикам / веб-дизайнерам? (Да/Нет)\n\`1.5\` Укажите навыки и опыт, для программистов — указать знание языков программирования и технологий`
          },
          {
            name: "Желательно", value: `\`2.1\` Расскажите о себе\n\`2.2\` Покажите портфолио работ или киньте ссылку`
          },
        )
        .setFooter({ text: "Станьте участником нашей студии!" })

      message.channel.send({ embeds: [app, appinfo] });
      message.delete().catch();
    } else if (cmd == "partner") {
      const partner = new Discord.MessageEmbed()
        .setTitle("Партнёрство")
        .setColor(`${green}`)
        .setDescription("")
        .addFields(
          {
            name: "Текст", value: `\`\`\`🔥 Zeta Studio — это уникальное сообщество программистов и дизайнеров!
В этом месте можно обзавестись новыми друзьями, программистами и дизайнерами. Общаемся на разные темы, смеёмся с угарных (и не очень) картинок, вместе слушаем музыку, да и в целом душевно проводим время в прекрасной атмосфере Zeta Studio! 🚀
💥 Здесь мы создаём совместные проекты, помогаем друг другу, работаем в команде. Программисты разрабатывают сайты, приложения, ботов, выполняют заказы на фрилансе и не только. Дизайнеры создают аватарки, логотипы, баннеры, иллюстрации и т.п.
⚡ Различные конкурсы и мероприятия, дружное сообщество и лаймовое общение в чатах или в войсах, найдёшь с кем провести время. Наш проект предназначен для объединения программистов и дизайнеров! Zeta Studio — это замечательное место, которое связывает приятных людей с различными интересами! ✨
🔗 https://discord.gg/QRTDqhT7Jk\`\`\``
          },
          {
            name: "С серверами", value: `\`1.1\` От 50 участников без ботов\n\`1.2\` Сервера с сомнительной тематикой не принимаются\n\`1.3\` Сервер должен быть хорошо оформлен`
          },
          {
            name: "Условия", value: `\`2.1\` Оба партнёра должны взаимно зайти на сервер\n\`2.2\` Текст должен опубликоваться в отдельном канале с другими партнёрами, а сам канал открыт для просмотра всем участникам\n\`2.3\` Текст партнёра не должен удаляться, а партнёр уходить с сервера`
          },
        )
        .setFooter({ text: `Заключение партнёрства происходит, если все условия выполняются. Не соблюдение одной из этих условий — удаление текста и уход с сервера партнёра` })
      message.delete()
      message.channel.send({ embeds: [partner] })
    } else if (cmd == "services") {
      const services = new Discord.MessageEmbed()
        .setTitle("Услуги")
        .setColor(`${blue}`)
        .setDescription("Заказ услуг происходит через специальный канал — <#1030936671987966083>. В нём нужно будет создать запись и разместить там своё задание, после чего специалисты откликнуться Вам. Ниже основной список оказываемых нами услуг")

      const service1 = new Discord.MessageEmbed()
        .setTitle("Сайты")
        .setColor(`${blue}`)
        .addFields(
          {
            name: "Создание удобных сайтов", value: "> Построение любых веб-сайтов с красивым дизайном: от одностраничных (лендингов) до корпоративных порталов и интернет-магазинов\n`от 500 ₽`"
          },
          {
            name: "Специальная настройка сайта", value: "> Устранение неполадок, постановка проекта на хостинг, присоединение домена, установка контекстной рекламы и т.п\n`от 250 ₽`"
          },
          {
            name: "Профессиональное улучшение сайта", value: "> Корректное отображение портала на разных устройствах и функционирование в браузерах, быстрая загрузка страниц, продвижение в поисковых системах и т.д\n`от 750 ₽`"
          },
          {
            name: "Грамотное наполнение сайта", value: "> Разработка и модификация отдельных страниц сайта, наполнение текстовым и мультимедийным контентом\n`от 350 ₽`"
          },
        )

      const service2 = new Discord.MessageEmbed()
        .setTitle("Приложения")
        .setColor(`${blue}`)
        .addFields(
          {
            name: "Разработка приложений под Android и iOS", value: "> Построение приложений для операционных систем Android и iOS на основе React Native\n`от 750 ₽`"
          },
          {
            name: "Разработка программ под Windows и Linux", value: "> Построение программ для операционных систем Windows и Linux на основе Electron.js\n`от 750 ₽`"
          },
        )

      const service3 = new Discord.MessageEmbed()
        .setTitle("Чат-боты")
        .setColor(`${blue}`)
        .addFields(
          {
            name: "Создание Discord, Telegram, Viber, Вконтакте ботов", value: "> Разработка, модификация, улучшение и настройка чат-бота\n`от 500 ₽`"
          },
        )

      const service4 = new Discord.MessageEmbed()
        .setTitle("Дизайн")
        .setColor(`${blue}`)
        .addFields(
          {
            name: "Веб-дизайн", value: "> Проектирование макета для создания сайта\n`от 750 ₽`"
          },
          {
            name: "Создание логотипа, баннеров, открыток и флаеров, плакатов и т.п", value: "> Создание любых картинок с красивым дизайном: от логотипа до иллюстрации и брендбука\n`от 500 ₽`"
          },
          {
            name: "Создание иллюстрации", value: "> Создание любых картинок с красивым дизайном: от логотипа до иллюстрации и брендбука\n`от 5000 ₽`"
          },
          {
            name: "Создание брендбука", value: "> Создание любых картинок с красивым дизайном: от логотипа до иллюстрации и брендбука\n`от 20000 ₽`"
          },
        )
      message.delete()
      message.channel.send({ embeds: [services, service1, service2, service3, service4] })
    } else if (cmd === "executor" || cmd === "exe") {
      const exe = new Discord.MessageEmbed()
        .setTitle("Исполнители")
        .setColor(`${green}`)
        .setDescription(`Расскажите о себе, своих навыках и опыте, дайте знать какие услуги предоставляете. Перед этим заполните небольшую заявку на программиста / дизайнера в канале <#1030193508037951510>`)
      message.delete()
      message.channel.send({ embeds: [exe] })
    }
  })
} catch (e) {
  console.log(e)
}

keepAlive()
client.login(process.env.token);