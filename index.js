require('dotenv').config();
const math = require('mathjs');
const { GatewayIntentBits } = require('discord.js');
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});
const prefix = '=';
const token = process.env.DISCORD_TOKEN;
client.login(token);

client.on('ready', () => {
  console.log(`${client.user.tag} is now online!`);
});

client.on('messageCreate', message => {
  // Only respond if the message starts with the prefix and is a valid equation
  if (message.content.startsWith(prefix) && message.content.slice(prefix.length).trim().match(/^[\d\.\+\-\*\/\(\)]+$/)) {
    try {
      const equation = message.content.slice(prefix.length).trim(); // Remove the prefix from the equation
      const solution = math.evaluate(equation);
      message.channel.send(`${solution}`);
    } catch (err) {}
  }
});