const Discord = require("discord.js");
const rp = require('request-promise');
const $ = require('cheerio');
let cheerio = require('cheerio');
const fs = require("fs");
const mongoose = require("mongoose");
const Stats = require("../models/stats.js");

mongoose.connect('mongodb://localhost/Stats');


module.exports.run = async (bot, message, args) => {
    //pull most recent stats for all registered players
    var ids = [];


    Stats.find({}, 'userId', { '_id': 0 }, function (err, docs) {

        for (i = 0; i < docs.length; i++) {
            ids.push(docs[i].userId);
        }

       // console.log(ids);

        /////

        ids.forEach(function (entry) {          
            var userUrl = 'https://popflash.site/user/' + entry;
           // console.log(userUrl)


            rp(userUrl)
                .then(function (html) {
                    const arr = [];
                    var e = 0;

                    $('.stat-container', html).each(function (key, value) {
                        arr[e++] = $(this).find(".stat").text();

                    });

                    

                    var results = arr.map(Number)
                    console.log(results)

                    var query = { userId: entry };
                    console.log(query)
                    Stats.findOne(query, {
                        $set: {
                            HLTV:results[0],
                            ADR: results[1],
                            HS: results[2],
                            W: results[3],
                            L: results[4],
                            T: results[5],
                            totalGames: results[3] + results[4],
                            win_percent: results[6]
                        }
                    })
                        .then(function (result) {

                           console.log(result)

                        })
                 
                })
         }); 

    });

    Stats.find({}).sort([['HLTV', 'descending']]).exec((err, res) => {
        if (err) console.log(err);

        let embed = new Discord.RichEmbed()
            .setTitle("HLTV Leaderboard")
        //if there are no results
        if (res.length === 0) {
            embed.setColor("RED");
            embed.addField("No data found")
        } else if (res.length < 10) {
            //less than 10 results
            embed.setColor("BLURPLE");
            for (i = 0; i < res.length; i++) {
                let member = res[i].userName || "User Left"
                if (member === "User Left") {
                    embed.addField(`${i + 1}. ${member}`, `**HLTV**: ${res[i].HLTV}**Games Played**: ${res[i].totalGames} `);
                } else {
                    embed.addField(`${i + 1}. ${member}`, `**HLTV**: ${res[i].HLTV} **Games Played**: ${res[i].totalGames}`);
                }
            }
        } else {
            //more than 10 results
            embed.setColor("BLURPLE");
            for (i = 0; i < res.length; i++) {
                let member = res[i].userName || "User Left"
                if (member === "User Left") {
                    embed.addField(`${i + 1}. ${member}`, `**HLTV**: ${res[i].HLTV} **Games Played**: ${res[i].totalGames}`);
                } else {
                    embed.addField(`${i + 1}. ${member}`, `**HLTV**: ${res[i].HLTV} **Games Played**: ${res[i].totalGames}`);
                }
            }
        }

        message.channel.send(embed);
    })
}

module.exports.help = {
    name: "hltvboard",
    alias: "leaderboard"
}