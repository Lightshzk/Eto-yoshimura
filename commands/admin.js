// commands/admin.js
// Comandos de administração do bot

const logger = require('../utils/logger');
const storage = require('../utils/storage');
const progression = require('../utils/progression');

module.exports = {
    // Blacklist
    blacklist: new Set(),

    // Carregar blacklist
    loadBlacklist() {
        try {
            const stored = storage.load('blacklist', []);
            this.blacklist = new Set(stored);
            logger.info(`Blacklist carregada: ${this.blacklist.size} usuários`);
        } catch (error) {
            logger.error('Erro ao carregar blacklist', error);
        }
    },

    // Salvar blacklist
    saveBlacklist() {
        try {
            const stored = Array.from(this.blacklist);
            storage.save('blacklist', stored);
        } catch (error) {
            logger.error('Erro ao salvar blacklist', error);
        }
    },

    // Adicionar à blacklist
    addToBlacklist(userId, reason = 'Sem motivo') {
        this.blacklist.add(userId);
        this.saveBlacklist();
        logger.warn(`Usuário ${userId} adicionado à blacklist. Motivo: ${reason}`);
        return `✅ Usuário adicionado à blacklist!\nMotivo: ${reason}`;
    },

    // Remover da blacklist
    removeFromBlacklist(userId) {
        if (this.blacklist.has(userId)) {
            this.blacklist.delete(userId);
            this.saveBlacklist();
            logger.info(`Usuário ${userId} removido da blacklist`);
            return `✅ Usuário removido da blacklist!`;
        }
        return `❌ Usuário não está na blacklist`;
    },

    // Verificar se está na blacklist
    isBlacklisted(userId) {
        return this.blacklist.has(userId);
    },

    // Limpar dados do grupo
    clearGroupData(groupId) {
        try {
            // Encontrar e limpar dados de usuários deste grupo
            const stats = progression.userStats;
            let cleared = 0;

            for (const [userId, profile] of stats.entries()) {
                // Se o ID contém o ID do grupo, é desse grupo
                if (userId.includes(groupId)) {
                    stats.delete(userId);
                    cleared++;
                }
            }

            progression.saveData();
            logger.info(`Dados do grupo ${groupId} limpos: ${cleared} usuários`);
            return `✅ Dados do grupo limpos!\n${cleared} usuários tiveram dados removidos.`;
        } catch (error) {
            logger.error('Erro ao limpar dados do grupo', error);
            return `❌ Erro ao limpar dados do grupo`;
        }
    },

    // Backup de dados
    createBackup() {
        try {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const backupName = `backup_${timestamp}`;

            const data = {
                userStats: storage.mapToObject(progression.userStats),
                duelRecords: storage.mapToObject(progression.duelRecords),
                timestamp: Date.now(),
                version: '2.0'
            };

            storage.save(backupName, data);
            logger.info(`Backup criado: ${backupName}`);
            return `✅ Backup criado com sucesso!\nNome: ${backupName}`;
        } catch (error) {
            logger.error('Erro ao criar backup', error);
            return `❌ Erro ao criar backup`;
        }
    },

    // Restaurar backup
    restoreBackup(backupName) {
        try {
            const data = storage.load(backupName, null);
            if (!data) {
                return `❌ Backup não encontrado: ${backupName}`;
            }

            progression.userStats = storage.objectToMap(data.userStats || {});
            progression.duelRecords = storage.objectToMap(data.duelRecords || {});
            progression.saveData();

            logger.info(`Backup restaurado: ${backupName}`);
            return `✅ Backup restaurado com sucesso!`;
        } catch (error) {
            logger.error('Erro ao restaurar backup', error);
            return `❌ Erro ao restaurar backup`;
        }
    },

    // Resetar usuário
    resetUser(userId) {
        try {
            progression.userStats.delete(userId);
            progression.duelRecords.delete(userId);
            progression.saveData();

            logger.info(`Dados do usuário ${userId} resetados`);
            return `✅ Dados do usuário resetados!`;
        } catch (error) {
            logger.error('Erro ao resetar usuário', error);
            return `❌ Erro ao resetar usuário`;
        }
    },

    // Panel de status
    getStatusPanel() {
        const totalUsers = progression.userStats.size;
        const totalDuels = progression.duelRecords.size;
        const blacklistedUsers = this.blacklist.size;

        return `
📊 *PAINEL DE ADMINISTRAÇÃO* 📊

*Estatísticas:*
├─ 👥 Total de usuários: ${totalUsers}
├─ ⚔️ Usuários com duelos: ${totalDuels}
├─ 🚫 Usuários bloqueados: ${blacklistedUsers}

*Comandos Admin:*
/admin blacklist @pessoa <motivo> - Bloquear usuário
/admin unblacklist @pessoa - Desbloquear usuário
/admin limpar_grupo - Limpar dados do grupo
/admin backup - Criar backup
/admin status - Ver este painel

*Backup:*
/admin restore <nome_backup> - Restaurar backup

_Apenas o proprietário pode usar esses comandos!_
        `.trim();
    },

    // Processar comando admin
    async handleCommand(text, msg, isGroupAdmin = false) {
        const args = text.split(' ');
        
        if (!isGroupAdmin && !msg.from.includes('@c.us')) {
            return '❌ Você não tem permissão para usar esse comando!';
        }

        const command = args[1]?.toLowerCase();

        switch (command) {
            case 'blacklist':
                if (!args[2]) return '❌ Use: /admin blacklist @pessoa <motivo>';
                // Processar blacklist
                return `✅ Usuário adicionado à blacklist`;

            case 'unblacklist':
                if (!args[2]) return '❌ Use: /admin unblacklist @pessoa';
                return this.removeFromBlacklist(args[2]);

            case 'limpar_grupo':
            case 'clear_group':
                return this.clearGroupData(msg.from);

            case 'backup':
                return this.createBackup();

            case 'restore':
                if (!args[2]) return '❌ Use: /admin restore <nome_backup>';
                return this.restoreBackup(args[2]);

            case 'status':
                return this.getStatusPanel();

            case 'reset':
                if (!args[2]) return '❌ Use: /admin reset @pessoa';
                return this.resetUser(args[2]);

            default:
                return `❌ Comando admin desconhecido: ${command}`;
        }
    }
};
