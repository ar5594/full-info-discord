const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function formatPreciseDuration(ms) {
    if (ms <= 0) return '0s';
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    let parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0) parts.push(`${seconds}s`);

    return parts.join(' ');
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('check')
        .setDescription('High-precision forensic analysis & metadata extraction')
        .addStringOption(option => 
            option.setName('link').setDescription('Target invite link').setRequired(true)),
            
    async execute(interaction) {
        const url = interaction.options.getString('link');
        const match = url.match(/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/([a-zA-Z0-9\-]+)/);

        if (!match) return interaction.reply({ content: '❌ **Invalid Link Signature.**', ephemeral: true });

        await interaction.deferReply();

        try {
            const invite = await interaction.client.fetchInvite(match[5], { withCounts: true, withExpiration: true });
            const guild = invite.guild;
            const inviter = invite.inviter;

            const boosts = guild.premiumSubscriptionCount || 0;
            let boostLevel = "0";
            if (boosts >= 14) boostLevel = "3";
            else if (boosts >= 7) boostLevel = "2";
            else if (boosts >= 2) boostLevel = "1";

            const ownerId = guild.ownerId || `\`Protected / Unlisted\``;
            const vLevels = ['None', 'Low', 'Medium', 'High', 'Highest'];
            const guildCreatedAt = Math.floor(guild.createdTimestamp / 1000);

            let inviterForensic = '`System / Discovery`';
            if (inviter) {
                const timestamp = Math.floor(inviter.createdTimestamp / 1000);
                inviterForensic = `**User:** ${inviter.username} \`(${inviter.id})\`\n` +
                                  `> **Created:** <t:${timestamp}:D> (<t:${timestamp}:R>)`;
            }

            const isPermanent = !invite.expiresTimestamp;
            const integrityStatus = isPermanent ? '✅ **Permanent**' : '⚠️ **Not Permanent**';
            const vanityDisplay = guild.vanityURLCode ? `\`discord.gg/${guild.vanityURLCode}\`` : '`None`';
            
            let expiryDisplay = '`Never`';
            if (!isPermanent) {
                const timeLeft = invite.expiresTimestamp - Date.now();
                const preciseRemaining = formatPreciseDuration(timeLeft);
                expiryDisplay = `\`${preciseRemaining}\``;
            }

            const embed = new EmbedBuilder()
                .setAuthor({ name: `${guild.name}`, iconURL: guild.iconURL({ dynamic: true }) })
                .setTitle(`🔍 Deep Trace: discord.gg/${match[5]}`)
                .setColor(0x2B2D31)
                .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
                .addFields(
                    { 
                        name: '🛡️ Server Info', 
                        value: `> **Owner ID:** \`${ownerId}\`\n` +
                               `> **Created At:** <t:${guildCreatedAt}:D> (<t:${guildCreatedAt}:R>)\n` +
                               `> **Guild ID:** \`${guild.id}\`\n` +
                               `> **Verification:** \`${vLevels[guild.verificationLevel] || 'Unknown'}\``, 
                        inline: false 
                    },
                    { name: '👤 Link Creator', value: `> ${inviterForensic}`, inline: false },
                    { 
                        name: '🔗 Link Integrity', 
                        value: `> **Status:** ${integrityStatus}\n` +
                               `> **Vanity:** ${vanityDisplay}\n` +
                               `> **Expires In:** ${expiryDisplay}`, 
                        inline: false 
                    },
                    { name: '🧪 Server Boosts', value: `**${boosts} (Level ${boostLevel})**`, inline: true },
                    { 
                        name: '📊 Population', 
                        value: `**Total:** \`${invite.memberCount.toLocaleString()}\` \n**Online:** \`${invite.presenceCount.toLocaleString()}\``, 
                        inline: true 
                    }
                )
                .setImage(guild.bannerURL({ size: 1024 }))
                .setFooter({ 
                    text: `by k9k (r.vu) | Operator: r.vu`, 
                    iconURL: interaction.user.displayAvatarURL() 
                })
                .setTimestamp();

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setLabel('Join Server')
                    .setURL(url)
                    .setStyle(ButtonStyle.Link)
            );

            await interaction.editReply({ embeds: [embed], components: [row] });

        } catch (err) {
            if (err.code === 10006) {
                return await interaction.editReply({ 
                    content: '❌ **Trace Failed:** This link is either **expired** or **invalid**.' 
                });
            }
            console.error(err);
            await interaction.editReply({ 
                content: '❌ **Trace Aborted:** Critical forensic failure.', 
                ephemeral: true 
            });
        }
    },
};