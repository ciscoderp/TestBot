const Discord = require("discord.js")
const Image = require("./Image")
require("dotenv").config()
const Channel = "950532498373373952"

const client = new Discord.Client({
    intents:[
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", async (message) => {
    if(message.author.bot) return

    const img = await Image(message)

    message.channel.send({
        content: 'Welcome',
        files: [img]
    })

  /**  message.channel.send(`
    \`\`\`
        Channel ID: ${message.channelId}\n
        Author ID: ${message.author.id}\n
        Author Username: ${message.author.username}\n
        Author Avatar Id: ${message.author.avatar}
    \`\`\`
    `)
    */


})


client.login(process.env.TOKEN)

