const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var availableSpots;
    const totalUsers = bot.channels.get('550384418619916327');
    var count = totalUsers.members.size;

    availableSpots = 10 - count;
  
    
    console.log(availableSpots)

    var testrole = "540947366635896832";
    var tenManner = "550097031411269645"
    message.guild.members.forEach((member) => {


        if (member.roles.has(tenManner)) {
            member.send(`**__ATTENTION ALL 10 MAN GAMERS, DIRTY TOM AND THE BOIS NEED ${availableSpots} GAMERS FOR 10s at 9:00pm EST. Reserve your spot NOW by joining the 10 mans pregame lobby.__**`,
                {
                    files: ['https://cdn.discordapp.com/attachments/278687214798503936/563944301042597908/UncleTom.png']
                }
            );
        }
    })

    message.channel.send("all gamers have been paged.");
    console.log("message sent");
}

module.exports.help = {
    name: "live"
}

