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

    if (cmd === "ping") {
      const timeTaken = Date.now() - message.createdTimestamp;
      let gatewayLatency = Math.floor(client.ws.ping);
      message.channel.send(`Ping: \`${timeTaken}ms\`\nApi: \`${gatewayLatency}ms\``);
    }
  })
} catch (e) {
  console.log(e)
}

keepAlive()
client.login(process.env.token);