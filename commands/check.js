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
            option.setName('link').setDescription('Target invite link or code').setRequired(true)),
            
    async execute(interaction) {
        try {
            let input = interaction.options.getString('link').trim();
            const inviteCode = input.replace(/^(https?:\/\/)?(www\.)?(discord\.gg\/|discordapp\.com\/invite\/|discord\.com\/invite\/)/, '').split('/')[0];

            if (!inviteCode) {
                return await interaction.reply({ content: '❌ **Invalid Input.** Please provide a valid invite link or code.', ephemeral: true });
            }

            await interaction.deferReply();

            let invite;
            try {
                invite = await interaction.client.fetchInvite(inviteCode, { withCounts: true, withExpiration: true });
            } catch (fetchErr) {
                return await interaction.editReply({ content: '❌ **Trace Failed:** This invite code is expired, invalid, or unreadable.' });
            }

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
                .setTitle(`🔍 Deep Trace: discord.gg/${inviteCode}`)
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

            const finalUrl = `https://discord.gg/${inviteCode}`;
            const row = new ActionRowBuilder();
            
            try {
                row.addComponents(
                    new ButtonBuilder()
                        .setLabel('Join Server')
                        .setURL(finalUrl)
                        .setStyle(ButtonStyle.Link)
                );
                await interaction.editReply({ embeds: [embed], components: [row] });
            } catch (btnErr) {
                await interaction.editReply({ embeds: [embed], components: [] });
            }

        } catch (globalErr) {
            const errorMessage = { content: '❌ **System Error:** Forensic analysis encountered a terminal exception.', ephemeral: true };
            if (interaction.deferred || interaction.replied) {
                await interaction.editReply(errorMessage).catch(() => {});
            } else {
                await interaction.reply(errorMessage).catch(() => {});
            }
        }
    },
};
