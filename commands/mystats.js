const Discord = require("discord.js");
const rp = require('request-promise');
const $ = require('cheerio');
let cheerio = require('cheerio');
const fs = require("fs");
const mongoose = require("mongoose");
const Stats = require("../models/stats.js");

mongoose.connect('mongodb://localhost/Stats');


module.exports.run = async (bot, message, args) => {
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

            console.log(docs[0]);

    
        }
      
    })
   
}

module.exports.help = {
    name: "mystats"
}