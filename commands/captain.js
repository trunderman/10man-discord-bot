const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

    let role = message.guild.roles.find(r => r.name === "captain");
    let member = message.mentions.members.first();
    member.addRole(role).catch(console.error);
    message.channel.send(`${member} is a captain.`)

    setTimeout(function () {

        message.guild.members.forEach(member => {
            if (!member.roles.find(t => t.name == 'captain')) return;
            member.removeRole(role.id)
        .then(function () {
                console.log(`Removed role from user ${member.user.tag}!`);
            })
        })

    }, 60 * 5000);

}

module.exports.help = {
    name: "captain"
}

