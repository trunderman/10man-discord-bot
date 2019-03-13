const Discord = require("discord.js");
const rp = require('request-promise');
const $ = require('cheerio');
let cheerio = require('cheerio');
const fs = require("fs");
const mongoose = require("mongoose");
const Stats = require("../models/stats.js");

mongoose.connect('mongodb://localhost/Stats');


module.exports.run = async (bot, message, args) => {
    
 
    console.log(args);
    var userUrl = 'https://popflash.site/user/' +args;
    console.log(userUrl);
 
     
     rp(userUrl)
         .then(function (html) {
             const arr = [];
             var i = 0;
 
             $('.stat-container', html).each(function (key, value) {
                 arr[i++] = $(this).find(".stat").text();
 
             });
         

             const stats = new Stats({
                 _id: mongoose.Types.ObjectId(),
                 userId: args,
                 HLTV: arr[0],
                 ADR: arr[1],
                 HS: arr[2],
                 W: arr[3],
                 L: arr[4],
                 T: arr[5],
                 win_percent: arr[6]
             });

             stats.save()
                 .then(function (result) {                   
                     message.reply(", your stats are:" + result.toString());
                 })
                 //.then(result => console.log(result));
                 //    message.reply(result.toString());
         })
 
         //.catch(function (err) {
         //    console.log("oops error yikes");
         //});         //.catch(function (err) {
         //    console.log("oops error yikes");
         //});
}

module.exports.help = {
    name: "userid"
}