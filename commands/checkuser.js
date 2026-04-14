const { 
    SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, 
    ComponentType, PermissionsBitField, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle 
} = require('discord.js');
const { Client: SelfClient } = require('discord.js-selfbot-v13');

const USER_TOKEN = 'token'; 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkuser')
        .setDescription('Forensic Radar 2026: Deep Permission Analysis')
        .addStringOption(option => 
            option.setName('id').setDescription('Target User ID').setRequired(true)),

    async execute(interaction) {
        const targetId = interaction.options.getString('id');
        await interaction.deferReply();

        const scraper = new SelfClient({ checkUpdate: false });
        
        try {
            await scraper.login(USER_TOKEN);
            const scraperUser = await scraper.users.fetch(targetId).catch(() => null);
            if (!scraperUser) return await interaction.editReply('❌ **Node Failure:** User not found.');

            let fullProfile = null;
            try { fullProfile = await scraper.users.fetchFullProfile(targetId); } catch (e) {}

            const mutualGuilds = scraper.guilds.cache.filter(g => g.members.cache.has(targetId));
            const ownedList = mutualGuilds.filter(g => g.ownerId === targetId).map(g => `• ${g.name}`).join('\n');
            
            const createGuildEmbed = async (guild) => {
                const member = guild.members.cache.get(targetId);
                if (!member) return new EmbedBuilder().setDescription('Failed to sync member data.');
                
                const f = PermissionsBitField.Flags;
                const isOwner = guild.ownerId === targetId;

                const roleMatrix = member.roles.cache
                    .filter(r => r.name !== '@everyone')
                    .sort((a, b) => b.position - a.position)
                    .map(r => {
                        if (r.permissions.has(f.Administrator)) {
                            return `**${r.name}**\n\`[ Administrator ]\``;
                        }
                        const perms = [];
                        if (r.permissions.has(f.ManageGuild)) perms.push('Manage Server');
                        if (r.permissions.has(f.ManageRoles)) perms.push('Manage Roles');
                        if (r.permissions.has(f.ManageChannels)) perms.push('Manage Channels');
                        if (r.permissions.has(f.BanMembers)) perms.push('Ban');
                        if (r.permissions.has(f.KickMembers)) perms.push('Kick');
                        if (r.permissions.has(f.ModerateMembers)) perms.push('Timeout');
                        if (r.permissions.has(f.ManageMessages)) perms.push('Manage Msgs');
                        if (r.permissions.has(f.MuteMembers)) perms.push('Mute');
                        if (r.permissions.has(f.MoveMembers)) perms.push('Move');
                        if (r.permissions.has(f.ManageWebhooks)) perms.push('Webhooks');
                        if (r.permissions.has(f.MentionEveryone)) perms.push('@Everyone');

                        return `**${r.name}**\n\`[ ${perms.join(' · ') || 'No Special Perms'} ]\``;
                    });

                let serverInvite = null;
                if (guild.vanityURLCode) {
                    serverInvite = `https://discord.gg/${guild.vanityURLCode}`;
                } else {
                    try {
                        const invites = await guild.invites.fetch().catch(() => null);
                        const existing = invites?.first();
                        if (existing) serverInvite = existing.url;
                    } catch (e) {}
                }

                const inviteDisplay = serverInvite ? serverInvite : "*No public link accessible*";
                const joinedTS = Math.floor(member.joinedTimestamp / 1000);

                return new EmbedBuilder()
                    .setAuthor({ 
                        name: `${guild.name} ${isOwner ? '👑' : ''}`, 
                        iconURL: guild.iconURL({ dynamic: true }) || scraperUser.displayAvatarURL({ dynamic: true }) 
                    })
                    .setDescription(`**Server Details Analysis**`) 
                    .setColor(0x2B2D31)
                    .setThumbnail(scraperUser.displayAvatarURL({ dynamic: true, size: 1024 }))
                    .addFields(
                        { 
                            name: '👤 Identity Status', 
                            value: `• **Rank:** \`${isOwner ? 'Grand Owner' : 'Member'}\``, 
                            inline: true 
                        },
                        { 
                            name: '📅 Arrival Date', 
                            value: `**Joined At**\n<t:${joinedTS}:f>\n<t:${joinedTS}:R>`, 
                            inline: true 
                        },
                        { 
                            name: '📜 Permission Trace (Full Matrix)', 
                            value: roleMatrix.length ? roleMatrix.slice(0, 8).join('\n') : '*Empty role directory.*' 
                        },
                        { 
                            name: '🌐 Network Link', 
                            value: `> ${inviteDisplay}` 
                        }
                    )
                    .setFooter({ text: `by k9k (r.vu) | Cluster ID: ${guild.id}` });
            };

            const mainEmbed = new EmbedBuilder()
                .setAuthor({ 
                    name: `profile @${scraperUser.username}`, 
                    iconURL: 'https://i.imgur.com/8N9S8X4.gif' 
                })
                .setDescription(`📡 **Object Analysis:** ${scraperUser.bot ? 'Artificial Intelligence' : 'Human Entity'}`)
                .setThumbnail(scraperUser.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setImage(fullProfile?.bannerURL({ size: 1024 }) || null)
                .setColor(0x2B2D31)
                .addFields(
                    { 
                        name: '📋 Core Identity', 
                        value: `> **Name:** \`${scraperUser.globalName || scraperUser.username}\`\n> **User:** \`${scraperUser.username}\`\n> **ID:** \`${scraperUser.id}\``, 
                        inline: true 
                    },
                    { 
                        name: '🕰 Time Logs', 
                        value: `> **Created:** <t:${Math.floor(scraperUser.createdTimestamp / 1000)}:R>\n> **Timestamp:** <t:${Math.floor(scraperUser.createdTimestamp / 1000)}:D>`, 
                        inline: true 
                    },
                    { 
                        name: '👑 server owner', 
                        value: ownedList ? `\`\`\`${ownedList}\`\`\`` : '> *No ownership signal detected.*' 
                    }
                )
                .setFooter({ text: `by k9k (r.vu) | Nodes Secured: ${mutualGuilds.size}` })
                .setTimestamp();

            const allServersList = mutualGuilds.map(g => {
                const member = g.members.cache.get(targetId);
                const joinedTS = member ? Math.floor(member.joinedTimestamp / 1000) : null;
                const roles = member ? member.roles.cache
                    .filter(r => r.name !== '@everyone')
                    .sort((a, b) => b.position - a.position)
                    .map(r => r.name)
                    .join(', ') : 'No Roles Found';

                return `**🌐 Server:** \`${g.name}\` ${g.ownerId === targetId ? '👑' : ''}\n**📅 Joined:** ${joinedTS ? `<t:${joinedTS}:f>` : '`Unknown`'}\n**📜 Roles:** \`[ ${roles || 'No Roles'} ]\`\n────────────────`;
            }).join('\n');

            const allServersEmbed = new EmbedBuilder()
                .setAuthor({ name: `Mutual Server Directory: @${scraperUser.username}`, iconURL: scraperUser.displayAvatarURL({ dynamic: true }) })
                .setDescription(allServersList.length > 4000 ? allServersList.substring(0, 3900) + '...' : allServersList || '*No mutual nodes found.*')
                .setColor(0x2B2D31)
                .setFooter({ text: `by k9k (r.vu) | Total Nodes: ${mutualGuilds.size}` })
                .setTimestamp();

            const rows = [];
            if (mutualGuilds.size > 0) {
                rows.push(new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('node_select')
                        .setPlaceholder('📡 Search for information...') 
                        .addOptions(
                            { label: 'profile', value: 'main', emoji: '📑' },
                            ...mutualGuilds.first(24).map(g => ({
                                label: g.name.substring(0, 25),
                                description: `server`, 
                                value: g.id,
                                emoji: g.ownerId === targetId ? '👑' : '🏢'
                            }))
                        )
                ));

                rows.push(new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('view_all_nodes')
                        .setLabel('View All Mutual Servers')
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji('🌐')
                ));
            }

            const response = await interaction.editReply({ embeds: [mainEmbed], components: rows });
            const collector = response.createMessageComponentCollector({ time: 600000 });
            
            collector.on('collect', async i => {
                if (i.user.id !== interaction.user.id) return i.reply({ content: '❌ Access Denied.', ephemeral: true });
                
                if (i.isStringSelectMenu()) {
                    if (i.values[0] === 'main') return await i.update({ embeds: [mainEmbed] });
                    const selectedGuild = scraper.guilds.cache.get(i.values[0]);
                    const guildEmbed = await createGuildEmbed(selectedGuild);
                    await i.update({ embeds: [guildEmbed] });
                } else if (i.isButton()) {
                    if (i.customId === 'view_all_nodes') {
                        await i.update({ embeds: [allServersEmbed] });
                    }
                }
            });

        } catch (err) {
            console.error(err);
            await interaction.editReply('❌ **System Aborted: Secure Connection Required.**');
        }
    },
};
