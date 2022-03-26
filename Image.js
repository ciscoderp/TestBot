const Canvas = require("canvas")
const Discord = require("discord.js")
const dim = {
    height: 675,
    width: 1200,
    margin: 50
}

const av = {
    size: 256,
    x: 480,
    y: 170
}
const background = "https://i.imgur.com/zvWTUVu.jpg"


const Image = async (message) => {

    let username = message.author.username
    let discrim = message.author.discriminator
    let avatarURL = message.author.displayAvatarURL({format: "png", dynamic: "false", size: av.size})
    let author = message.author.id

    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")

    //draw background image
    const backimg = await Canvas.loadImage(background)
    ctx.drawImage(backimg, 0, 0)

    //draw box
    ctx.fillStyle = "rgba(0,0,0,0.8)"
    ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin)

    const avimg = await Canvas.loadImage(avatarURL)
    ctx.save()

    ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore()

    //text
    ctx.fillStyle = "white"
    ctx.textAlign = "center"

    ctx.font = "50px Sans"
    ctx.fillText(username, dim.width/2, dim.margin + 70)

    ctx.font = "60px Sans"
    ctx.fillText(discrim, dim.width/2, dim.height - dim.margin - 125)

    ctx.font = "40px Sans"
    ctx.fillText(author, dim.width/2, dim.height - dim.margin - 50)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
    return attachment

}

module.exports = Image
