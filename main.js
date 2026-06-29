require('dotenv').config();

const { Client, GatewayIntentBits, Guild, MessageSearchAuthorType } = require('discord.js');

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

    const guild = client.guilds.cache.get(process.env.GUILD_ID);

    if (!guild) return console.log('Guild is nil');

    const guildMember = await guild.members.fetch(message.author.id);
    const joinedTimestamp = await guildMember.joinedTimestamp;
    const messageTimestamp = await message.createdTimestamp;
    const differenceUnix = Math.floor((messageTimestamp - joinedTimestamp) / 1000);

    console.log(differenceUnix.toString());

    if (differenceUnix < 172800) { // 48 Hours

        var hours = Math.floor(differenceUnix / 60 / 60);

        if (message.attachments.size > 0) {
            await message.reply('Possible scam, user has been in the server for ' + hours.toString() + " hours and is sending an image with no text or partial text.");
            await message.delete();
            return;
        }

        if (differenceUnix < 86400) {
            if (message.content.length > 60) {
                await message.reply('Possible scam, user has been in the server for ' + hours.toString() + " hours and is sending an image with no text or partial text.");
                await message.delete();
                return;
            }
        }
        
    }
    
});

client.once('clientReady', async () => {
    console.log('I am online beaches');
});

client.login(process.env.DISCORD_TOKEN);