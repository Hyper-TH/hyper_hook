require('dotenv').config()

const DiscordJS = require('discord.js');

const client = new DiscordJS.Client({ 
    presence: {
        status: 'online',
        afk: false,
        activities: [{
            name: 'figuring out webhooks',
            type: 'PLAYING'
        }],
    },
    intents: [
        DiscordJS.Intents.FLAGS.GUILDS, 
        DiscordJS.Intents.FLAGS.GUILD_MESSAGES
    ] , 
    partials: ['MESSAGE', 'REACTION']
}); 

// First parameter is id while second is token
const webhookData = {
    id: process.env.WEBHOOK_ID,
    token: process.env.WEBHOOK_TOKEN
}
const webhook = new DiscordJS.WebhookClient(webhookData);
webhook.send('Hyper Hook was here!')

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.login(process.env.TOKEN);