const Discord = require("discord.js");
const rp = require('request-promise');
const $ = require('cheerio');
let cheerio = require('cheerio');
const fs = require("fs");
const mongoose = require("mongoose");
const Stats = require("../models/stats.js");

mongoose.connect('mongodb://localhost/Stats');


module.exports.run = async (bot, message, args) => {

    Stats.find({}).sort([['totalGames', 'descending']]).exec((err, res) => {

        if (err) console.log(err);

        let embed = new Discord.RichEmbed()
            .setTitle("Total Wins Leaderboard")
            .setDescription("Past 31 days")
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
                    embed.addField(`${i + 1}. ${member}`, `**Games Played**: ${res[i].totalGames}`);
                } else {
                    embed.addField(`${i + 1}. ${member}`, `**Games Played**: ${res[i].totalGames}`);
                }
            }
        } else {
            //more than 10 results
            embed.setColor("BLURPLE");
            for (i = 0; i < res.length; i++) {
                let member = res[i].userName || "User Left"
                if (member === "User Left") {
                    embed.addField(`${i + 1}. ${member}`, `**Games Played**: ${res[i].totalGames}`);
                } else {
                    embed.addField(`${i + 1}. ${member}`, `**Games Played**: ${res[i].totalGames}`);
                }
            }
        }

        message.channel.send(embed);
    })
}

module.exports.help = {
    name: "totalgamesboard",
    alias: "leaderboard"
}