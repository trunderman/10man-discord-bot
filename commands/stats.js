const Discord = require("discord.js");
const rp = require('request-promise');
const $ = require('cheerio');
let cheerio = require('cheerio');
const fs = require("fs");
const mongoose = require("mongoose");
const Stats = require("../models/stats.js");
mongoose.connect('mongodb://localhost/Stats');

module.exports.run = async (bot, message, args) => {

Stats.find(
    { userName: args},
    function(err,docs) {
        if(docs.length === 0){
            message.reply("no user exists moron. Please add the discord id (*stats user#idhere)")
        } else {
        console.log(docs);
         let 
         statsEmbed = new Discord.RichEmbed()
            .setDescription(args +"'s stats")
            .setColor("BLURPLE")
            .addField("Wins", `${docs[0].W}`)
            .addField("Losses", `${docs[0].L}`)
            .addField("Win Percentage", `${docs[0].win_percent}`)
            .addField("HLTV Ranking", `${docs[0].HLTV}`)
            .addField("ADR", `${docs[0].ADR}`)
            .addField("Headshot Percentage", `${docs[0].HS}`);

        message.channel.send(statsEmbed);
        }
    } 
);

}

module.exports.help = {
    name: "stats"
}