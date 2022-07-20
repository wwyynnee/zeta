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
    console.log("Запуск!");
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
    } else if (cmd === "rules") {
      if (message.author.id !== "980103023034527865") return;
      const rules = new Discord.MessageEmbed()
        .setTitle("Правила сервера")
        .setColor(`${blue}`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setDescription(`**Добро пожаловать на сервер ${message.guild.name}! Для комфортного общения, тебе следует прочитать наши правила! Вот что у нас запрещено:**`)
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
    }
  })
} catch (e) {
  console.log(e)
}

keepAlive()
client.login(process.env.token);