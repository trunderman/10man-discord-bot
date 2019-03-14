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
            message.reply('here are your popflash stats: \n' + docs.toString());
            console.log(message.guild.id);
        }
      
    })
   
}

module.exports.help = {
    name: "mystats"
}