const Discord = require("discord.js");
const RC = require('reaction-core');
const handler = new RC.Handler()
const b = require('../buttonPick.js')
var players = [];
module.exports.run = async (bot, message, args) => {
   
    const lobby = bot.channels.get('540947366635896837');
    
     lobby.members.forEach(function(guildMember, guildMemberId) {
        console.log(guildMemberId, guildMember.user.username);

        players.push(guildMember.user.username)
     })

     console.log(players)

    if (message.member.roles.some(role => role.name === 'captain')) {
        
        pickTeams()
      
    } else {message.channel.send(`${message.author}, you are not a captain`)}


    function pickTeams() {
   
        let mapBanner = new RC.Menu(b.embed, b.buttons, b.options)

        handler.addMenus(mapBanner)

        message.channel.sendMenu(mapBanner)


        bot.on('messageReactionAdd', (messageReaction, user) => handler.handle(messageReaction, user))
    }

    module.exports = {
        players: players
    }
}



module.exports.help = {
    name: "pickteams"
    
}