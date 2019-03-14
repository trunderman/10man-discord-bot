const botconfig = require("./config.json");
const Discord = require("discord.js")
const bot = new Discord.Client({disableEveryone: true})
const rp = require('request-promise');
const fs = require("fs")
let cheerio = require('cheerio');
var request = require('request');
const $ = require('cheerio');
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("couldnt find commands");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded`);
        bot.commands.set(props.help.name, props);
    });
})


bot.on("ready", async() => {
    console.log(`${bot.user.username} is online ! `);
    //bot.user.setActivity("10 mans", { type: "Watching" });
}); 

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);

    if (cmd === `${prefix}hello`) {
        return message.channel.send("Well hello there");
    }



});

bot.login(botconfig.token);