const Discord = require("discord.js");
const RC = require('reaction-core');
const handler = new RC.Handler()
const b = require('../buttons.js')



module.exports.run = async (bot, message, args) => {

    if (message.member.roles.some(role => role.name === 'captain')) {
        let mapBanner = new RC.Menu(b.embed, b.buttons, b.options)

        handler.addMenus(mapBanner)

        message.channel.sendMenu(mapBanner)


        bot.on('messageReactionAdd', (messageReaction, user) => handler.handle(messageReaction, user))

        
        
    } else {message.channel.send(`${message.author}, you are not a captain`)}



}

module.exports.help = {
    name: "map"
}