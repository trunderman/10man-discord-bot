
const Discord = require("discord.js");
//const instructions = new Discord.Attachment('assets/instructions.png')

module.exports.run = async (bot, message, args) => {

    //let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
        .setDescription("Popflash Linking")
        .setColor("BLURPLE")
        .setImage("https://i.gyazo.com/ab65c019441af29605302b314da6cfe4.png")
        .setFooter("take your 6 digit ID from popflash and amend it to the *userid command");


    return message.channel.send(serverembed);
}

module.exports.help = {
    name: "instructions"
}