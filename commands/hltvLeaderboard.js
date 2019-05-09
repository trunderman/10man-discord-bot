const Discord = require("discord.js");
const rp = require('request-promise');
const $ = require('cheerio');
let cheerio = require('cheerio');
const fs = require("fs");
const mongoose = require("mongoose");
const Stats = require("../models/stats.js");


mongoose.connect('mongodb://localhost/Stats');


module.exports.run = async (bot, message, args) => {

    makeEmbed(); 

    function makeEmbed() {

        Stats.find({}).sort([['HLTV', 'descending']]).exec((err, res) => {
            if (err) console.log(err);
            console.log(res)

            let embed = new Discord.RichEmbed()
                .setTitle("HLTV Leaderboard")
                .setDescription("Past 31 days")
            //if there are no results
            if (res.length === 0) {
                embed.setColor("RED");
                embed.addField("No data found")
            } else if (res.length < 10) {
                //less than 10 results
                embed.setColor("BLURPLE");
                for (i = 0; i < res.length; i++) {

                    if (res[i].totalGames >= 5) {
                        let member = res[i].userName || "User Left"
                        if (member === "User Left") {
                            embed.addField(`- ${member}`, `**HLTV**: ${res[i].HLTV}**Games Played**: ${res[i].totalGames} ---${res[i].rank} `);
                        } else {
                            embed.addField(`- ${member}`, `**HLTV**: ${res[i].HLTV} **Games Played**: ${res[i].totalGames} ---${res[i].rank}`);
                        }
                    }
                }
            } else {
                //more than 10 results
                embed.setColor("BLURPLE");
                for (i = 0; i < res.length; i++) {
                    if (res[i].totalGames >= 5) {
                        var list = 0;
                        let member = res[i].userName || "User Left"
                        if (member === "User Left") {
                            embed.addField(`- ${member}`, `**HLTV**: ${res[i].HLTV} **Games Played**: ${res[i].totalGames} ---${res[i].rank}`);
                        } else {
                            embed.addField(`- ${member}`, `**HLTV**: ${res[i].HLTV} **Games Played**: ${res[i].totalGames} ---${res[i].rank}`);
                        }
                    }
                }
            }

            message.channel.send(embed);
        })

    }
}

module.exports.help = {
    name: "hltvboard",
    alias: "leaderboard"
}