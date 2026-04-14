const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
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
        console.log(`⏳ Refreshing ${slashCommands.length} slash commands...`);
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: slashCommands });
        console.log('✅ Forensic Engine Online');
    } catch (error) { 
        console.error(error); 
    }
})();

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try { 
        await command.execute(interaction); 
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: '❌ Command Error!', ephemeral: true });
    }
});

client.once('ready', () => {
    console.log(`🚀 Logged in as ${client.user.tag}`);
});

client.login(TOKEN);const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const TOKEN = '';
const CLIENT_ID = '';

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
        console.log(`⏳ Refreshing ${slashCommands.length} slash commands...`);
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: slashCommands });
        console.log('✅ Forensic Engine Online');
    } catch (error) { 
        console.error(error); 
    }
})();

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try { 
        await command.execute(interaction); 
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: '❌ Command Error!', ephemeral: true });
    }
});

client.once('ready', () => {
    console.log(`🚀 Logged in as ${client.user.tag}`);
});

client.login(TOKEN);
