// utils/progression.js
// Sistema de XP, Levels, Achievements e Progression

const logger = require('./logger');
const storage = require('./storage');

// Configuração de XP
const XP_CONFIG = {
    // XP por ação
    xpPerAction: {
        game: 10,           // Jogar um jogo
        gameWin: 30,        // Ganhar um jogo
        music: 5,           // Usar música
        action: 3,          // Usar ação (beijo, abraço)
        adult: 15,          // Comando adulto
        duelWin: 50,        // Vencer duelo
        duelLose: 10,       // Perder duelo (ainda ganha XP)
        streak: 100         // 10+ dias em sequência
    },
    
    // XP necessário por level (progressão exponencial)
    levelThresholds: [
        0,      // Level 0
        100,    // Level 1
        250,    // Level 2
        450,    // Level 3
        700,    // Level 4
        1000,   // Level 5
        1350,   // Level 6
        1750,   // Level 7
        2200,   // Level 8
        2700,   // Level 9
        3250,   // Level 10
        3850,   // Level 11
        4500,   // Level 12
        5200,   // Level 13
        5950,   // Level 14
        6750,   // Level 15 (Max)
    ]
};

// Achievements disponíveis
const ACHIEVEMENTS = {
    // Primeiros passos
    firstGame: {
        id: 'firstGame',
        name: '🎮 Primeiro Jogo',
        description: 'Jogar seu primeiro jogo',
        points: 10,
        rarity: 'comum'
    },
    firstDuel: {
        id: 'firstDuel',
        name: '⚔️ Primeiro Duelo',
        description: 'Participar de seu primeiro duelo',
        points: 20,
        rarity: 'comum'
    },
    firstAdult: {
        id: 'firstAdult',
        name: '🔥 Iniciação +18',
        description: 'Usar um comando adulto pela primeira vez',
        points: 15,
        rarity: 'comum'
    },
    
    // Milestones
    level5: {
        id: 'level5',
        name: '📈 Nível 5',
        description: 'Alcançar nível 5',
        points: 30,
        rarity: 'raro'
    },
    level10: {
        id: 'level10',
        name: '🚀 Nível 10',
        description: 'Alcançar nível 10',
        points: 50,
        rarity: 'épico'
    },
    level15: {
        id: 'level15',
        name: '👑 Máximo Poder',
        description: 'Alcançar nível 15 (máximo)',
        points: 100,
        rarity: 'lendário'
    },
    
    // Duelos
    duelMaster: {
        id: 'duelMaster',
        name: '⚔️ Mestre dos Duelos',
        description: 'Vencer 10 duelos',
        points: 75,
        rarity: 'épico'
    },
    undefeated: {
        id: 'undefeated',
        name: '🏆 Imbatível',
        description: 'Vencer 5 duelos seguidos',
        points: 100,
        rarity: 'épico'
    },
    
    // Streaks
    streak10: {
        id: 'streak10',
        name: '🔥 Racha de 10',
        description: 'Usar o bot 10 dias consecutivos',
        points: 40,
        rarity: 'raro'
    },
    streak30: {
        id: 'streak30',
        name: '⚡ Racha Épica',
        description: 'Usar o bot 30 dias consecutivos',
        points: 80,
        rarity: 'épico'
    },
    
    // Jogos
    gameWin20: {
        id: 'gameWin20',
        name: '🎯 Campeão',
        description: 'Vencer 20 jogos',
        points: 60,
        rarity: 'raro'
    },
    ship50: {
        id: 'ship50',
        name: '💕 Matchmaker',
        description: 'Shippar 50 casais',
        points: 50,
        rarity: 'raro'
    },
    
    // Ações
    action100: {
        id: 'action100',
        name: '🤗 Afetivo',
        description: 'Usar 100 ações (beijo, abraço, etc)',
        points: 40,
        rarity: 'raro'
    },
    
    // Música
    musicLover: {
        id: 'musicLover',
        name: '🎵 Amante de Música',
        description: 'Baixar 50 músicas',
        points: 50,
        rarity: 'raro'
    },
    
    // Temáticos (Tokyo Ghoul)
    ghoulMaster: {
        id: 'ghoulMaster',
        name: '🦑 Mestre Ghoul',
        description: 'Alcançar nível 15 E vencer 10 duelos',
        points: 150,
        rarity: 'lendário'
    },
    kagunePower: {
        id: 'kagunePower',
        name: '🗡️ Poder Kagune',
        description: 'Usar 200 comandos adultos +18',
        points: 120,
        rarity: 'lendário'
    }
};

class ProgressionSystem {
    constructor() {
        this.userStats = new Map();
        this.duelRecords = new Map();
        this.loadData();
    }

    // Carregar dados salvos
    loadData() {
        try {
            const statsObj = storage.load('userStats', {});
            const duelsObj = storage.load('duelRecords', {});
            
            this.userStats = storage.objectToMap(statsObj);
            this.duelRecords = storage.objectToMap(duelsObj);
            
            logger.info(`Sistema de Progression carregado - ${this.userStats.size} usuários`);
        } catch (error) {
            logger.error('Erro ao carregar progression data', error);
        }
    }

    // Salvar dados
    saveData() {
        try {
            const statsObj = storage.mapToObject(this.userStats);
            const duelsObj = storage.mapToObject(this.duelRecords);
            
            storage.save('userStats', statsObj);
            storage.save('duelRecords', duelsObj);
        } catch (error) {
            logger.error('Erro ao salvar progression data', error);
        }
    }

    // Obter ou criar perfil do usuário
    getUserProfile(userId) {
        if (!this.userStats.has(userId)) {
            this.userStats.set(userId, {
                userId: userId,
                xp: 0,
                level: 0,
                points: 0,
                
                // Customização
                nickname: null,
                title: null,
                bio: null,
                
                // Estatísticas
                gamesPlayed: 0,
                gamesWon: 0,
                duelsPlayed: 0,
                duelsWon: 0,
                streakDays: 0,
                lastSeen: Date.now(),
                commandsUsed: 0,
                actionsUsed: 0,
                musicDownloads: 0,
                shipsCreated: 0,
                adultCommandsUsed: 0,
                
                // Achievements
                achievements: [],
                unlockedAt: {}
            });
        }
        return this.userStats.get(userId);
    }

    // Adicionar XP
    addXP(userId, amount, reason = 'action') {
        const profile = this.getUserProfile(userId);
        const oldLevel = profile.level;
        
        profile.xp += amount;
        profile.commandsUsed += 1;
        
        // Verificar level up
        const newLevel = this.calculateLevel(profile.xp);
        profile.level = newLevel;
        
        let levelUpMessage = '';
        if (newLevel > oldLevel) {
            levelUpMessage = `\n✨ *LEVEL UP!* ${oldLevel} → ${newLevel}\n`;
            profile.points += (newLevel * 10); // Bonus points
            
            // Verificar achievements de level
            this.checkLevelAchievements(userId, newLevel);
        }
        
        this.saveData();
        return {
            xp: profile.xp,
            level: newLevel,
            levelUp: newLevel > oldLevel,
            message: levelUpMessage
        };
    }

    // Calcular level baseado em XP
    calculateLevel(xp) {
        for (let i = XP_CONFIG.levelThresholds.length - 1; i >= 0; i--) {
            if (xp >= XP_CONFIG.levelThresholds[i]) {
                return i;
            }
        }
        return 0;
    }

    // Obter XP necessário para próximo level
    getXPToNextLevel(userId) {
        const profile = this.getUserProfile(userId);
        const currentLevel = profile.level;
        
        if (currentLevel >= XP_CONFIG.levelThresholds.length - 1) {
            return { current: profile.xp, needed: XP_CONFIG.levelThresholds[currentLevel], remaining: 0 };
        }
        
        const nextThreshold = XP_CONFIG.levelThresholds[currentLevel + 1];
        return {
            current: profile.xp,
            needed: nextThreshold,
            remaining: nextThreshold - profile.xp
        };
    }

    // Registrar vitória em jogo
    registerGameWin(userId) {
        const profile = this.getUserProfile(userId);
        profile.gamesWon += 1;
        profile.gamesPlayed += 1;
        
        const xpGain = this.addXP(userId, XP_CONFIG.xpPerAction.gameWin, 'game_win');
        
        // Verificar achievement
        if (profile.gamesWon === 1) {
            this.unlockAchievement(userId, 'firstGame');
        }
        if (profile.gamesWon === 20) {
            this.unlockAchievement(userId, 'gameWin20');
        }
        
        return xpGain;
    }

    // Registrar derrota em jogo
    registerGameLoss(userId) {
        const profile = this.getUserProfile(userId);
        profile.gamesPlayed += 1;
        this.addXP(userId, XP_CONFIG.xpPerAction.game, 'game_play');
    }

    // Registrar duelo
    registerDuel(winnerId, loserId) {
        const winner = this.getUserProfile(winnerId);
        const loser = this.getUserProfile(loserId);
        
        winner.duelsWon += 1;
        winner.duelsPlayed += 1;
        loser.duelsPlayed += 1;
        
        // XP para vencedor
        const winXP = this.addXP(winnerId, XP_CONFIG.xpPerAction.duelWin, 'duel_win');
        
        // XP para perdedor (ainda ganha algo)
        this.addXP(loserId, XP_CONFIG.xpPerAction.duelLose, 'duel_lose');
        
        // Adicionar points ao vencedor
        winner.points += 50;
        
        // Verificar achievements
        if (winner.duelsWon === 1) {
            this.unlockAchievement(winnerId, 'firstDuel');
        }
        if (winner.duelsWon === 10) {
            this.unlockAchievement(winnerId, 'duelMaster');
        }
        
        // Registrar no ranking
        if (!this.duelRecords.has(winnerId)) {
            this.duelRecords.set(winnerId, { wins: 0, losses: 0 });
        }
        if (!this.duelRecords.has(loserId)) {
            this.duelRecords.set(loserId, { wins: 0, losses: 0 });
        }
        
        this.duelRecords.get(winnerId).wins += 1;
        this.duelRecords.get(loserId).losses += 1;
        
        this.saveData();
        return { winXP, winner, loser };
    }

    // Registrar ação (beijo, abraço, etc)
    registerAction(userId) {
        const profile = this.getUserProfile(userId);
        profile.actionsUsed += 1;
        this.addXP(userId, XP_CONFIG.xpPerAction.action, 'action');
        
        if (profile.actionsUsed === 100) {
            this.unlockAchievement(userId, 'action100');
        }
    }

    // Registrar comando adulto
    registerAdultCommand(userId) {
        const profile = this.getUserProfile(userId);
        profile.adultCommandsUsed += 1;
        this.addXP(userId, XP_CONFIG.xpPerAction.adult, 'adult');
        
        if (profile.adultCommandsUsed === 1) {
            this.unlockAchievement(userId, 'firstAdult');
        }
        if (profile.adultCommandsUsed === 200) {
            this.unlockAchievement(userId, 'kagunePower');
        }
    }

    // Registrar música
    registerMusic(userId) {
        const profile = this.getUserProfile(userId);
        profile.musicDownloads += 1;
        this.addXP(userId, XP_CONFIG.xpPerAction.music, 'music');
        
        if (profile.musicDownloads === 50) {
            this.unlockAchievement(userId, 'musicLover');
        }
    }

    // Registrar ship
    registerShip(userId) {
        const profile = this.getUserProfile(userId);
        profile.shipsCreated += 1;
        
        if (profile.shipsCreated === 50) {
            this.unlockAchievement(userId, 'ship50');
        }
    }

    // Verificar achievements de level
    checkLevelAchievements(userId, newLevel) {
        const profile = this.getUserProfile(userId);
        
        if (newLevel === 5) {
            this.unlockAchievement(userId, 'level5');
        } else if (newLevel === 10) {
            this.unlockAchievement(userId, 'level10');
        } else if (newLevel === 15) {
            this.unlockAchievement(userId, 'level15');
            // Verificar Ghoul Master
            if (profile.duelsWon >= 10) {
                this.unlockAchievement(userId, 'ghoulMaster');
            }
        }
    }

    // Desbloquear achievement
    unlockAchievement(userId, achievementId) {
        const profile = this.getUserProfile(userId);
        
        if (profile.achievements.includes(achievementId)) {
            return null; // Já desbloqueado
        }
        
        const achievement = ACHIEVEMENTS[achievementId];
        if (!achievement) return null;
        
        profile.achievements.push(achievementId);
        profile.unlockedAt[achievementId] = Date.now();
        profile.points += achievement.points;
        
        this.saveData();
        
        return achievement;
    }

    // Obter perfil formatado
    getProfileDisplay(userId) {
        const profile = this.getUserProfile(userId);
        const xpToNext = this.getXPToNextLevel(userId);
        
        const displayName = profile.nickname || `Usuário ${userId.slice(0, 8)}`;
        const displayTitle = profile.title ? `*${profile.title}*` : '(sem título)';
        const displayBio = profile.bio ? `📝 ${profile.bio}` : '';
        
        const levelBar = this.createProgressBar(xpToNext.current - XP_CONFIG.levelThresholds[profile.level], 
                                              xpToNext.needed - XP_CONFIG.levelThresholds[profile.level], 10);
        
        return `
👤 *${displayName}* ${displayTitle}
${displayBio}

📊 *ESTATÍSTICAS*
├─ 🎮 Nível: ${profile.level}/15
├─ ⭐ XP: ${profile.xp} (${levelBar})
├─ 💎 Pontos: ${profile.points}
├─ 🏆 Achievements: ${profile.achievements.length}/${Object.keys(ACHIEVEMENTS).length}

📈 *RECORDES*
├─ 🎯 Jogos: ${profile.gamesWon}/${profile.gamesPlayed} vitórias
├─ ⚔️ Duelos: ${profile.duelsWon}/${profile.duelsPlayed} vitórias
├─ 💋 Ações: ${profile.actionsUsed}
├─ 🎵 Músicas: ${profile.musicDownloads}

_Use /setapelido, /settitulo, /setbio para customizar seu perfil!_
        `.trim();
    }

    // Criar barra de progresso
    createProgressBar(current, total, length = 10) {
        const filled = Math.floor((current / total) * length);
        const empty = length - filled;
        return '█'.repeat(filled) + '░'.repeat(empty);
    }

    // Obter ranking geral
    getGlobalRanking(limit = 10) {
        const rankings = Array.from(this.userStats.values())
            .sort((a, b) => {
                // Primeiro por level
                if (b.level !== a.level) return b.level - a.level;
                // Depois por XP
                return b.xp - a.xp;
            })
            .slice(0, limit);
        
        let ranking = '🏆 *RANKING GLOBAL* 🏆\n\n';
        rankings.forEach((user, index) => {
            const medal = ['🥇', '🥈', '🥉'][index] || `${index + 1}.`;
            const name = user.nickname || `User ${user.userId.slice(0, 8)}`;
            ranking += `${medal} *${name}* - Nv${user.level} | ${user.xp} XP\n`;
        });
        
        return ranking;
    }

    // Obter ranking de duelos
    getDuelRanking(limit = 10) {
        const rankings = Array.from(this.duelRecords.entries())
            .map(([userId, record]) => ({
                userId,
                wins: record.wins,
                losses: record.losses,
                winRate: record.wins / (record.wins + record.losses)
            }))
            .sort((a, b) => {
                // Primeiro por número de vitórias
                if (b.wins !== a.wins) return b.wins - a.wins;
                // Depois por taxa de vitória
                return b.winRate - a.winRate;
            })
            .slice(0, limit);
        
        let ranking = '⚔️ *RANKING DE DUELOS* ⚔️\n\n';
        rankings.forEach((record, index) => {
            const medal = ['🥇', '🥈', '🥉'][index] || `${index + 1}.`;
            const name = this.userStats.get(record.userId).nickname || `User ${record.userId.slice(0, 8)}`;
            const winRate = (record.winRate * 100).toFixed(1);
            ranking += `${medal} *${name}* - ${record.wins}V-${record.losses}D (${winRate}%)\n`;
        });
        
        return ranking;
    }

    // Customizar perfil
    setNickname(userId, nickname) {
        if (nickname.length > 20) return false;
        this.getUserProfile(userId).nickname = nickname;
        this.saveData();
        return true;
    }

    setTitle(userId, title) {
        if (title.length > 30) return false;
        this.getUserProfile(userId).title = title;
        this.saveData();
        return true;
    }

    setBio(userId, bio) {
        if (bio.length > 60) return false;
        this.getUserProfile(userId).bio = bio;
        this.saveData();
        return true;
    }
}

module.exports = new ProgressionSystem();
