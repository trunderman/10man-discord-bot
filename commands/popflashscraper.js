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
             //console.log(results)

             var query = { userId: args };
             console.log(query);
             Stats.findOneAndUpdate(query, {
                 $set: {
                     //_id: mongoose.Types.ObjectId(),
                     userName: message.member.user.tag,
                     userId: args,
                     HLTV: results[0],
                     ADR: results[1],
                     HS: results[2],
                     W: results[3],
                     L: results[4],
                     T: results[5],
                     totalGames: results[3] + results[4],
                     win_percent: results[6]
                 }
             }, {upsert:true} )
                 .then(function (result) {
                
                     message.reply("popflash stats have been scraped");
                     
                 })
            
             //const stats = new Stats({
                
             //});

             //console.log(stats.userName);

            
             //stats.save()
             //    .then(function (result) {                   
             //        message.reply(", your stats are:" + result.toString());
             //    })
                 //.then(result => console.log(result));
                 //    message.reply(result.toString());
         })
 
         //
         //    console.log("oops error yikes");
         //});         //.catch(function (err) {
    }    //    console.log("oops error yikes");
         //});
}

module.exports.help = {
    name: "userid"
}