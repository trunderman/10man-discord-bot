const Discord = require("discord.js");
const rp = require('request-promise');
const $ = require('cheerio');
let cheerio = require('cheerio');
const fs = require("fs");
const mongoose = require("mongoose");
const Stats = require("../models/stats.js");

mongoose.connect('mongodb://localhost/Stats');


module.exports.run = async (bot, message, args) => {
    
    if (args.length === 0) {
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


             var query = { userName: message.member.user.tag};
             Stats.findOneAndUpdate(query, {
                 $set: {
                     //_id: mongoose.Types.ObjectId(),
                     userName: message.member.user.tag,
                     userId: args,
                     HLTV: arr[0],
                     ADR: arr[1],
                     HS: arr[2],
                     W: arr[3],
                     L: arr[4],
                     T: arr[5],
                     win_percent: arr[6]
                 }
             }, {upsert:true} )
                 .then(function (result) {
                     message.reply("popflash has been linked");
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
 
         //.catch(function (err) {
         //    console.log("oops error yikes");
         //});         //.catch(function (err) {
    }    //    console.log("oops error yikes");
         //});
}

module.exports.help = {
    name: "userid"
}