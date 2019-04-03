const Discord = require("discord.js");
var currentMaps = [];

var mapArr = [
        {
            name: 'de_cache',
            number: '1⃣'
        },
        {
            name: 'de_inferno',
            number: '2⃣'
        },
        {
            name: 'de_mirage',
            number: '3⃣'
        },
        {
            name: 'de_dust2',
            number: '4⃣'
        },
        {
            name: 'de_overpass',
            number: '5⃣'
        },
        {
            name: 'de_train',
            number: '6⃣'
        },
        {
            name: 'de_nuke',
            number: '7⃣'
        },
        {
            name: 'de_vertigo',
            number: '8⃣'
        }
];

console.log(mapArr[0].name)
// console.log(mapObj);
//const instructions = new Discord.Attachment('assets/instructions.png')

module.exports.run = async (bot, message, args) => {

    let serverembed = new Discord.RichEmbed()
    .setTitle("Map Pool")
    .setDescription("react by number to ban")
     
  
    .setColor("BLURPLE")
    
    mapArr.forEach(function (x){
        serverembed.addField(`${x.number}:`, `${x.name}`)
        
    })

    
message.channel.send(serverembed).then(async function (message) {
    await message.react(mapArr[0].number)
    await message.react(mapArr[1].number)
    await message.react(mapArr[2].number)
    await message.react(mapArr[3].number)
    await message.react(mapArr[4].number)
    await message.react(mapArr[5].number)
    await message.react(mapArr[6].number)
    await message.react(mapArr[7].number)

    
});



}

module.exports.help = {
    name: "map"
}