const Discord = require("discord.js");
const RC = require('reaction-core');
const handler = new RC.Handler()



module.exports.run = async (bot, message, args) => {

    let serverembed = new Discord.RichEmbed()
        .setTitle("Map Pool")
        .setDescription(`react by number to ban 
        
            1⃣ de_cache

            2⃣ de_inferno

            3⃣ de_mirage

            4⃣ de_dust2

            5⃣ de_overpass

            6⃣ de_train

            7⃣ de_nuke

            8⃣ de_vertigo

            `)


        .setColor("BLURPLE")

    //mapArr.forEach(function (x){
    //    serverembed.addField(`${x.number}:`, `${x.name}`)

    //})

    bot.on('messageReactionAdd', (messageReaction, user) => handler.handle(messageReaction, user))
    const b = require('../buttons.js')
    let mapBanner = new RC.Menu(b.embed, b.buttons, b.options)
  
    handler.addMenus(mapBanner)

    message.channel.sendMenu(mapBanner)
    //message.channel.send(serverembed).then(async function (message) {
    //    await message.react(mapArr[0].number)
    //    await message.react(mapArr[1].number)
    //    await message.react(mapArr[2].number)
    //    await message.react(mapArr[3].number)
    //    await message.react(mapArr[4].number)
    //    await message.react(mapArr[5].number)
    //    await message.react(mapArr[6].number)
    //    await message.react(mapArr[7].number)


    //});


    

}

module.exports.help = {
    name: "map"
}