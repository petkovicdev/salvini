require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

const fs = require('fs');

client.on('messageCreate', async (message) => {

    if (message.author.id == process.env.CLIENT_ID) return;

    await message.reply('I am the boss now beach');
});

client.once('clientReady', async () => {
    console.log('I am online beaches');
});

client.login(process.env.DISCORD_TOKEN);