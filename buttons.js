const COLOURS = {
    red: 0xff0000,
    green: 0x00ff00,
    blue: 0x0000ff,
    white: 0xffffff
}




const buttons = [
    {
        emoji: '1⃣',
        run: (user, message) => {
            let newEmbed = embed   
        
            embed.fields[0].value = bannedMap.cacheBan; 
                      
            message.edit({ embed: newEmbed }) 
        }
    },
    {
        emoji: '2⃣',
        run: (user, message) => {
            let newEmbed = embed
            embed.fields[1].value = bannedMap.infernoBan;
            message.edit({ embed: newEmbed })
        }
    },
    {
        emoji: '3⃣',
        run: (user, message) => {
            let newEmbed = embed
            embed.fields[2].value = bannedMap.mirageBan;
            message.edit({ embed: newEmbed })
        }
    },
    {
        emoji: '4⃣',
        run: (user, message) => {
            let newEmbed = embed
            embed.fields[3].value = bannedMap.dust2Ban;
            message.edit({ embed: newEmbed })
        }
    },
    {
        emoji: '5⃣',
        run: (user, message) => {
            let newEmbed = embed
            embed.fields[4].value = bannedMap.overpassBan;
            message.edit({ embed: newEmbed })
        }
    },
    {
        emoji: '6⃣',
        run: (user, message) => {
            let newEmbed = embed
            embed.fields[5].value = bannedMap.trainBan;
            message.edit({ embed: newEmbed })
        }
    },
    {
        emoji: '7⃣',
        run: (user, message) => {
            let newEmbed = embed
            embed.fields[6].value = bannedMap.nukeBan;
            message.edit({ embed: newEmbed })
        }
    },
    {
        emoji: '8⃣',
        run: (user, message) => {
            let newEmbed = embed
            embed.fields[7].value = bannedMap.vertigoBan;
            message.edit({ embed: newEmbed })
        }
    }
]

var embed = {
    title: "Current Map Pool",
    description: "**__Wait for reactions to load before voting__**",
    fields: [
        {
            name: '1',
            value: 'de_cache'
        },
        {
            name: '2',
            value: 'de_inferno'
        },
        {
            name: '3',
            value: 'de_mirage'
        },
        {
            name: '4',
            value: 'de_dust2'
        },
        {
            name: '5',
            value: 'de_overpass'
        },
        {
            name: '6',
            value: 'de_train'
        },
        {
            name: '7',
            value: 'de_nuke'
        },
        {
            name: '8',
            value: 'de_vertigo'
        }
    ],
    color: COLOURS.white
}

const bannedMap = {
    cacheBan: `~~${embed.fields[0].value}~~`,
    infernoBan: `~~${embed.fields[1].value}~~`,
    mirageBan: `~~${embed.fields[2].value}~~`,
    dust2Ban: `~~${embed.fields[3].value}~~`,
    overpassBan: `~~${embed.fields[4].value}~~`,
    trainBan: `~~${embed.fields[5].value}~~`,
    nukeBan: `~~${embed.fields[6].value}~~`,
    vertigoBan: `~~${embed.fields[7].value}~~`
}

// var cacheBan = embed.fields[0].value.toString().strike();

// console.log(cacheBan)


module.exports = {
    bannedMap: bannedMap,
    buttons: buttons,
    embed: embed,
    COLOURS: COLOURS
}