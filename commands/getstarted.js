const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
        .setDescription("Popflash BOT commands")
        .setColor("BLURPLE")
        .addField("popflash linking instructions", "!instructions") 
        .addField("Link your popflash account", "!userid {id}...see !instructions on how to get your Id.")
        .addField("Personal Stats", "!stats")
        .addField("others stats", "!stats {discordtag} !stats woah#6472")
        .addField("Leaderboards", "!hltvboard, !winsboard, !totalgamesboard")
        


    return message.channel.send(serverembed);
}

module.exports.help = {
    name: "getstarted"
}