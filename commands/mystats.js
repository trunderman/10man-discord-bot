const Discord = require("discord.js");
const rp = require('request-promise');
const $ = require('cheerio');
let cheerio = require('cheerio');
const fs = require("fs");
const mongoose = require("mongoose");
const Stats = require("../models/stats.js");
//const scrape = require("../commands/popflashscraper");


mongoose.connect('mongodb://localhost/Stats');


module.exports.run = async (bot, message, args) => {
    var ids = [];


    Stats.find({}, 'userId', { '_id': 0}, function (err, docs) {
    
        for (i = 0; i < docs.length; i++) {
            ids.push(docs[i].userId);
        }

        /////

        for (i = 0; i < ids.length; i++) {

            var userUrl = 'https://popflash.site/user/' + ids[i];


            rp(userUrl)
                .then(function (html) {
                    const arr = [];
                    var e = 0;

                    $('.stat-container', html).each(function (key, value) {
                        arr[e++] = $(this).find(".stat").text();

                    });

                    var results = arr.map(Number)

                    var query = { userId: ids[i] };
                    console.log(query);
                    Stats.findOneAndUpdate(query, {
                        $set: {
                            HLTV: results[0],
                            ADR: results[1],
                            HS: results[2],
                            W: results[3],
                            L: results[4],
                            T: results[5],
                            totalGames: results[3] + results[4],
                            win_percent: results[6]
                        }
                    }, { upsert: true })   
               
                })   
        }

    });



    Stats.find({ userName: message.member.user.tag }, { '_id': 0, '__v': 0, 'userId': 0, 'userName': 0}, function (err, docs) {

        if (docs.length == 0) {
            message.reply("error, no user in our database, please link your popflash with the command *userid ___")

        } else { 

            let statsEmbed = new Discord.RichEmbed()
            .setDescription("Your stats")
            .setColor("BLURPLE")
            .addField("Wins", `${docs[0].W}`)
            .addField("Losses", `${docs[0].L}`)
            .addField("Win Percentage", `${docs[0].win_percent}`)
            .addField("HLTV Ranking", `${docs[0].HLTV}`)
            .addField("ADR", `${docs[0].ADR}`)
            .addField("Headshot Percentage", `${docs[0].HS}`);

        message.channel.send(statsEmbed);

            

    
        }
      
    })
   
}

module.exports.help = {
    name: "mystats"
}