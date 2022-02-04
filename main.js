require('dotenv').config()

const DiscordJS = require('discord.js');
// const { webhookId, webhookToken } = require('./config.json');

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

const embed = new DiscordJS.MessageEmbed()
	.setTitle('Some Title')
	.setColor('#0099ff');


const webhook = new DiscordJS.WebhookClient(webhookData);
webhook.send('Hyper Hook was here!')

client.on('ready', async () => {

    console.log(`Logged in as ${client.user.tag}`);
    const channel = client.channels.cache.get(process.env.TEST_CHANNEL);
	try {
		const webhooks = await channel.fetchWebhooks();
		const webhook = webhooks.find(wh => wh.token);

		if (!webhook) {
			return console.log('No webhook was found that I can use!');
		}

		await webhook.send({
			content: 'Webhook test',
			username: 'some-username',
			avatarURL: 'https://i.imgur.com/AfFp7pu.png',
			embeds: [embed],
		});
	} catch (error) {
		console.error('Error trying to send: ', error);
	}

});

client.on('messageCreate', async (msg) => {

})

client.login(process.env.TOKEN);