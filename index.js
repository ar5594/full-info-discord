const { Client, GatewayIntentBits, Collection, REST, Routes, ActivityType } = require('discord.js');
const fs = require('fs');
const path = require('path');

const TOKEN = 'token';
const CLIENT_ID = 'idbot';

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const slashCommands = [];

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        slashCommands.push(command.data.toJSON());
    }
}

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.clear();
        console.log('\x1b[36m%s\x1b[0m', '=================================================');
        console.log('\x1b[33m%s\x1b[0m', '          FORENSIC ENGINE - INITIALIZING         ');
        console.log('\x1b[36m%s\x1b[0m', '=================================================');
        console.log(`\x1b[32m[SYSTEM]\x1b[0m Loading ${slashCommands.length} commands...`);
        
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: slashCommands });
        
        console.log('\x1b[32m[SUCCESS]\x1b[0m Slash commands deployed successfully.');
    } catch (error) { 
        console.log('\x1b[31m[ERROR]\x1b[0m Failed to deploy commands.');
    }
})();

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try { 
        await command.execute(interaction); 
    } catch (error) {
        console.log(`\x1b[31m[COMMAND ERROR]\x1b[0m Failed: ${interaction.commandName}`);
    }
});

client.once('clientReady', (c) => {
    c.user.setActivity('/check ・ by (r.vu)', { 
        type: ActivityType.Streaming, 
        url: 'https://www.twitch.tv/discord' 
    });

    const separator = '-------------------------------------------------';
    console.log('\x1b[35m%s\x1b[0m', separator);
    console.log('\x1b[37m%s\x1b[0m', `  DEVELOPER : by k9k (r.vu)`);
    console.log('\x1b[37m%s\x1b[0m', `  BOT TAG   : ${c.user.tag}`);
    console.log('\x1b[37m%s\x1b[0m', `  GUILDS    : ${c.guilds.cache.size} Servers`);
    console.log('\x1b[37m%s\x1b[0m', `  STATUS    : System Fully Operational`);
    console.log('\x1b[35m%s\x1b[0m', separator);
    
    console.log('\x1b[34m%s\x1b[0m', '  Active Commands:');
    client.commands.forEach(cmd => {
        console.log(`  > /${cmd.data.name.padEnd(10)} : ${cmd.data.description}`);
    });
    console.log('\x1b[35m%s\x1b[0m', separator);
});

client.login(TOKEN);
