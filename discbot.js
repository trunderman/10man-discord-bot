const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require("fs")
const { token } = require("./config.json")

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)

    console.log(f);

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
  

    var userData = JSON.parse(fs.readFileSync("Storage/userData.json", "utf8"))
    var sender = receivedMessage.author


    if (primaryCommand == commands[0]) {
        helpCommand(arguments, receivedMessage)
    }

    if (primaryCommand == commands[1]) {
        roastJosh(arguments, receivedMessage)
    }

    if (primaryCommand == commands[2]) {
        hello(arguments, receivedMessage)
    }

    if (primaryCommand == commands[0] && arguments == "commands") {
        receivedMessage.channel.send("commands are as follows: help, josh, hi")
    }

    if (primaryCommand == commands[5]) {
        receivedMessage.channel.send("ez ", momo)
    }

    if (primaryCommand == commands[3] && userData[sender].mainCharacter != "") {

        userData[sender].gamesWon++
        fs.writeFile("Storage/userData.json", JSON.stringify(userData), (err) => {
            if (err) console.err
        })
        receivedMessage.channel.send("GG, score updated")
    } else if (userData[sender].mainCharacter == " ") {
        receivedMessage.channel.send("declare your main")
    }

    if (primaryCommand == commands[4]) {
        receivedMessage.channel.send(sender + " has won this many times: " + userData[sender].gamesWon)
    }

    if (primaryCommand == commands[6]) {
        receivedMessage.channel.send(sender + " has won this many times: " + userData[sender].gamesWon)
    }
}


//functions


function castIteration() {

}

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
