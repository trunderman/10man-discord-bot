const Discord = require("discord.js");
const rp = require('request-promise');
const $ = require('cheerio');
let cheerio = require('cheerio');
const fs = require("fs");
const mongoose = require("mongoose");
const Stats = require("../models/stats.js");

mongoose.connect('mongodb://localhost/Stats');


module.exports.run = async (bot, message, args) => {
  
    var lengths = args.map(function (id) {
        return id.length
    });
    console.log(lengths)
    if (lengths < 5 || lengths > 6) {
        message.reply("invalid userId format")
    } else {

    var userUrl = 'https://popflash.site/user/' +args;
         

     rp(userUrl)
         .then(function (html) {
             const arr = [];
             var i = 0;
            
 
             $('.stat-container', html).each(function (key, value) {
                 arr[i++] = $(this).find(".stat").text();
 
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

             var query = { userId: args };
             console.log(query);
             Stats.findOneAndUpdate(query, {
                 $set: {

                     userName: message.member.user.tag,
                     userId: args,
                     HLTV: results[0],
                     ADR: results[1],
                     HS: results[2],
                     W: results[3],
                     L: results[4],
                     T: results[5],
                     totalGames: results[3] + results[4],
                     win_percent: results[6],
                     rank: setRank(results)
                 }
             }, {upsert:true} )
                 .then(function (result) {
                
                     message.reply("popflash has been linked");
                     
                 })

         })
 
        
    }    
         
}

module.exports.help = {
    name: "userid"
}