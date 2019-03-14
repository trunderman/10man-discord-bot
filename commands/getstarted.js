const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
        .setDescription("Popflash BOT commands")
        .setColor("BLURPLE")
        .setThumbnail(sicon)
        .addField("Link your popflash account", "*userid {id}")
        .addField("popflash linking instructions", "*instructions")
        .addField("Personal Stats", "*mystats")
        .addField("HLTV Ranking", "*ranking")


    return message.channel.send(serverembed);
}

module.exports.help = {
    name: "getstarted"
}