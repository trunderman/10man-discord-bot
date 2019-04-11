const botconfig = require("./config.json");
const Discord = require("discord.js")
const bot = new Discord.Client({disableEveryone: true})
const rp = require('request-promise');
const fs = require("fs")
let cheerio = require('cheerio');
var request = require('request');
const $ = require('cheerio');
const RC = require('reaction-core');
const handler = new RC.Handler()
const mongoose = require("mongoose");
const Stats = require("./models/stats.js");


mongoose.connect('mongodb://localhost/Stats');
bot.commands = new Discord.Collection();


function scrape() {
    var ids = [];

    Stats.find({}, 'userId', { '_id': 0 }, function (err, docs) {

        for (i = 0; i < docs.length; i++) {
            ids.push(docs[i].userId);
        }

        ids.forEach(function (entry) {
            var userUrl = 'https://popflash.site/user/' + entry;
            rp(userUrl)
                .then(function (html) {
                    const arr = [];
                    var e = 0;            
                    $('.stat-container', html).each(function (key, value) {
                        arr[e++] = $(this).find(".stat").text();
                    });
                    var results = arr.map(Number)
                    function setRank(results) {
                        if (results[0] <= .6) {
                            return "E"
                        } else if (results[0] > 0.61 && results[0] < 0.80) {
                            return "D"
                        } else if (results[0] > 0.81 && results[0] < 1.0) {
                            return "C"
                        } else if (results[0] > 1.01 && results[0] < 1.15) {
                            return "B"
                        } else if (results[0] > 1.16 && results[0] < 1.25) {
                            return "A"
                        } else if (results[0] > 1.26 && results[0] < 1.5) {
                            return "G"
                        } else if (results[0] > 1.50) {
                            return "S"
                        }
                    }

                    Stats.findOne({ userId: entry }, function (err, doc) {
                        doc.HLTV = results[0]
                        doc.ADR = results[1]
                        doc.HS = results[2]
                        doc.W = results[3]
                        doc.L = results[4]
                        T = results[5]
                        totalGames = results[3] + results[4]
                        win_percent = results[6]
                        doc.rank = setRank(results)
                        doc.save();
                    })
                        .then(function (result) {

                           // console.log(result)
                        })
                })
        });

        console.log("scraped")
    });
}



fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("couldnt find commands");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);     
        bot.commands.set(props.help.name, props);
    });
})


bot.on("ready", async () => {
    scrape()
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

setInterval(function () {
    scrape()
}, 60 * 5000)



bot.login(botconfig.token);