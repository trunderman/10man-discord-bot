const Discord = require('discord.js')
const rp = require('request-promise');
const client = new Discord.Client()
const fs = require("fs")
const { token } = require("./config.json")
let cheerio = require('cheerio');
var request = require('request');
const $ = require('cheerio');
const instructions = new Discord.Attachment('assets/instructions.png')

    client.on('ready', () => {
        console.log("Connected as " + client.user.tag)

        client.user.setActivity("CS", { type: "PLAYING" })

        client.guilds.forEach((guild) => {
            console.log(guild.name)
            guild.channels.forEach((channel) => {
                console.log(` -${channel.name} ${channel.type} ${channel.id}`)
            })
        })
    })

    client.on('message', (receivedMessage) => {
        if (receivedMessage.author == client.user) {
            return
        }

        if (receivedMessage.content.startsWith("*")) {
            processCommand(receivedMessage)
        }
    })

    //command processing        
    function processCommand(receivedMessage, popflashscraper) {
        let fullCommand = receivedMessage.content.substr(1)
        let splitCommand = fullCommand.split(" ")
        let primaryCommand = splitCommand[0]
        let arguments = splitCommand.slice(1)
        var sender = receivedMessage.author


        if (primaryCommand == "popflash") {
            console.log("hello");
            receivedMessage.channel.send("Hello " + receivedMessage.author + ", thanks for using the Popflash bot. enter your popflash user ID (*userid ____). Example in screenshot below.")
            receivedMessage.channel.send(instructions)
        }

        if (primaryCommand == "userid") {
            var id = arguments
           // console.log(id);
            statScrape(id, sender)
            receivedMessage.channel.send(receivedMessage.author +",your userId for Popflash has been set, please you *stats to view results");
        }

        if (primaryCommand == "stats") {
           
        }

    }


    //functions

    //function hello(arguments, receivedMessage) {
    //    receivedMessage.channel.send("Hello " + receivedMessage.author)
    //}

    //function roastJosh(arguments, receivedMessage) {
    //    receivedMessage.channel.send("Josh stop full hopping")
    //}

    //function helpCommand(arguments, receivedMessage) {
    //    if (arguments.length == 0) {
    //        receivedMessage.channel.send("Invalid command, try `*help [topic]`")

    //    } else if (arguments != "commands") {
    //        receivedMessage.channel.send("it looks like you need help with " + arguments)
    //    }
    //}

function statScrape(id, sender) {
 
    var userUrl = 'https://popflash.site/user/' + id;
   // console.log(userUrl);

    
    rp(userUrl)
        .then(function (html) {
            const arr = [];
            var i = 0;

            $('.stat-container', html).each(function (key, value) {
                arr[i++] = $(this).find(".stat").text();

            });

            var json = {

            
                HLTV: arr[0],
                ADR: arr[1],
                HS: arr[2],
                W: arr[3],
                L: arr[4],
                T: arr[5],
                win_percent: arr[6]

            };

            fs.writeFile(id + '.json', JSON.stringify(json, null, 4), function (err) {
                
                console.log('File successfully written! - Check your project directory for the user output.json file');

            })
            console.log(sender.username);
            console.log(json);
            return json;
        })

        .catch(function (err) {
            console.log("oops error yikes");
        });
}

function statRetriever(sender, id,) {

}

    client.login(token)





