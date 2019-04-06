
const buttons = [
    {
        emoji: '1⃣',
        run: (user, message) => {
            let newEmbed = embed   
        
            embed.fields[0].value = bannedMap.cacheBan; 
            setTimeout(function () {

                embed.fields[0].value = activeMap.cacheActive; 

            }, 60 * 1000);
         
            message.edit({ embed: newEmbed }) 
        }
    },
    {
        emoji: '2⃣',
        run: (user, message) => {
            let newEmbed = embed
            embed.fields[1].value = bannedMap.infernoBan;
            setTimeout(function () {

                embed.fields[1].value = activeMap.infernoActive;

            }, 60 * 1000);
            message.edit({ embed: newEmbed })
        }
    },
    {
        emoji: '3⃣',
        run: (user, message) => {
            let newEmbed = embed
            embed.fields[2].value = bannedMap.mirageBan;

            setTimeout(function () {

                embed.fields[2].value = activeMap.mirageActive;

            }, 60 * 1000);
            message.edit({ embed: newEmbed })
        }
    },
    {
        emoji: '4⃣',
        run: (user, message) => {
            let newEmbed = embed
            embed.fields[3].value = bannedMap.dust2Ban;

            setTimeout(function () {

                embed.fields[3].value = activeMap.dust2Active;

            }, 60 * 1000);
            message.edit({ embed: newEmbed })
        }
    },
    {
        emoji: '5⃣',
        run: (user, message) => {
            let newEmbed = embed
            embed.fields[4].value = bannedMap.overpassBan;

            setTimeout(function () {

                embed.fields[4].value = activeMap.overpassActive;

            }, 60 * 1000);
            message.edit({ embed: newEmbed })
      
        }
    },
    {
        emoji: '6⃣',
        run: (user, message) => {
            let newEmbed = embed
            embed.fields[5].value = bannedMap.trainBan;
            setTimeout(function () {

                embed.fields[5].value = activeMap.trainActive;

            }, 60 * 1000);
            message.edit({ embed: newEmbed })
        }
    },
    {
        emoji: '7⃣',
        run: (user, message) => {
            let newEmbed = embed
            embed.fields[6].value = bannedMap.nukeBan;
            setTimeout(function () {

                embed.fields[6].value = activeMap.nukeActive;

            }, 60 * 1000);
            message.edit({ embed: newEmbed })
        }
    },
    {
        emoji: '8⃣',
        run: (user, message) => {
            let newEmbed = embed
            embed.fields[7].value = bannedMap.vertigoBan;
            setTimeout(function () {

                embed.fields[7].value = activeMap.vertigoActive;

            }, 60 * 1000);
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
    ]
    
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

const activeMap = {
    cacheActive: `${embed.fields[0].value}`,
    infernoActive: `${embed.fields[1].value}`,
    mirageActive: `${embed.fields[2].value}`,
    dust2Active: `${embed.fields[3].value}`,
    overpassActive: `${embed.fields[4].value}`,
    trainActive: `${embed.fields[5].value}`,
    nukeActive: `${embed.fields[6].value}`,
    vertigoActive: `${embed.fields[7].value}`
}

module.exports = {
    activeMap: activeMap,
    bannedMap: bannedMap,
    buttons: buttons,
    embed: embed,  
}