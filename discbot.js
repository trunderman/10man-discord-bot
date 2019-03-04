const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require("fs")
const { token } = require("./config.json")
let cheerio = require('cheerio');
var request = require('request');
let express = require('express');
let app = express();
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
            console.log(id);
            popflashScraper(id)
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

    function popflashScraper(arguments) {      

        app.get('/', function (req, res) {

            url = 'https://popflash.site/user/896175';

            request(url, function (error, response, html) {
                if (!error) {

                    var $ = cheerio.load(html);
                    var arr = [];
                    var i = 0;
                    console.log(arr);


                    $('.stat-container').each(function (key, value) {
                        arr[i++] = $(this).find(".stat").text();

                    });

                    var json = {
                        ``
                        HLTV: arr[0],
                        ADR: arr[1],
                        HS: arr[2],
                        W: arr[3],
                        L: arr[4],
                        T: arr[5],
                        win_percent: arr[6]

                    };


                    console.log(json);

                    fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {

                        console.log('File successfully written! - Check your project directory for the output.json file');

                    })


                    res.send('Check your console!')

                } else {

                    console.log('error happened :' + error);

                }



            });
        })
     }
   


    client.login(token)





