const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    //var role = message.guild.roles.find(r => r.name === "captain");
    console.log(message.guild.roles)
    var testrole = "540947366635896832";
    var role = "550097031411269645"
    message.guild.members.forEach((member) => {
        if (member.roles.has(role || testrole)) {
            member.send(`ATTENTION ALL 10 MAN GAMERS, DIRTY TOM AND THE BOIS NEED 3 GAMERS FOR 10s`);

        }
    })

    message.channel.send("all gamers have been paged.");
    console.log("message sent");
}

module.exports.help = {
    name: "live"
}

