const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require("fs")
const { token } = require("./config.json")


function discBot() {

    var userId;

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
    function processCommand(receivedMessage) {
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
            userId = arguments;
            console.log(userId);
            exports.userId = userId;
        }

    }


    //functions

    function hello(arguments, receivedMessage) {
        receivedMessage.channel.send("Hello " + receivedMessage.author)
    }

    function roastJosh(arguments, receivedMessage) {
        receivedMessage.channel.send("Josh stop full hopping")
    }

    function helpCommand(arguments, receivedMessage) {
        if (arguments.length == 0) {
            receivedMessage.channel.send("Invalid command, try `*help [topic]`")

        } else if (arguments != "commands") {
            receivedMessage.channel.send("it looks like you need help with " + arguments)
        }
    }

    client.login(token)

}

module.exports = discBot;

