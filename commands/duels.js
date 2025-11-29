// commands/duels.js
// Sistema de Duelos - Desafios entre usuários

const progression = require('../utils/progression');
const logger = require('../utils/logger');

module.exports = {
    // Armazenar duelos em progresso
    activeDuels: new Map(),

    // Iniciar um duelo
    async startDuel(challengerJid, challengedJid, challengerName, challengedName) {
        // Evitar duelo contra si mesmo
        if (challengerJid === challengedJid) {
            return { error: 'Você não pode se desafiar!' };
        }

        // Verificar se tem um duelo ativo
        if (this.activeDuels.has(challengedJid)) {
            return { error: 'O usuário já está em um duelo!' };
        }

        // Criar duelo
        const duelId = `${challengerJid}_${challengedJid}_${Date.now()}`;
        const duel = {
            duelId,
            challenger: {
                jid: challengerJid,
                name: challengerName,
                power: 50,
                maxPower: 100,
                movesUsed: []
            },
            challenged: {
                jid: challengedJid,
                name: challengedName,
                power: 50,
                maxPower: 100,
                movesUsed: []
            },
            round: 1,
            maxRounds: 5,
            turn: 'challenger', // Quem é a vez
            status: 'waiting', // waiting, ongoing, finished
            winner: null,
            createdAt: Date.now(),
            expiresAt: Date.now() + (5 * 60 * 1000) // Expira em 5 minutos
        };

        this.activeDuels.set(duelId, duel);

        const message = `
⚔️ *DUELO INICIADO!* ⚔️

${challengerName} 🆚 ${challengedName}

${challengerName}: ❤️${duel.challenger.power}/${duel.challenger.maxPower}
${challengedName}: ❤️${duel.challenged.power}/${duel.challenged.maxPower}

*${challengedName}, escolha seu movimento:*

1️⃣ *Ataque Básico* - 10-15 dano
2️⃣ *Ataque Forte* - 15-25 dano (50% chance falhar)
3️⃣ *Defesa* - Reduz próximo dano em 50%
4️⃣ *Kagune* - 20-30 dano, gasta muita energia

_Responda com: /duelo movimento 1_
_Ex: /duelo movimento 2_
_Tempo limite: 5 minutos_
        `.trim();

        logger.info(`Duelo iniciado: ${challengerName} vs ${challengedName}`);
        return { success: true, duel, message, duelId };
    },

    // Executar movimento do duelo
    executar_movimento(duelId, playerJid, movement) {
        const duel = this.activeDuels.get(duelId);

        if (!duel) {
            return { error: 'Duelo não encontrado ou expirou!' };
        }

        // Verificar se é a vez do jogador
        if (duel.turn === 'challenger' && playerJid !== duel.challenger.jid) {
            return { error: 'Não é sua vez!' };
        }
        if (duel.turn === 'challenged' && playerJid !== duel.challenged.jid) {
            return { error: 'Não é sua vez!' };
        }

        // Mapear movimento
        const movements = {
            '1': { name: 'Ataque Básico', minDamage: 10, maxDamage: 15, failChance: 0 },
            '2': { name: 'Ataque Forte', minDamage: 15, maxDamage: 25, failChance: 0.5 },
            '3': { name: 'Defesa', minDamage: 0, maxDamage: 0, isDefense: true },
            '4': { name: 'Kagune', minDamage: 20, maxDamage: 30, failChance: 0.3 }
        };

        const move = movements[movement];
        if (!move) {
            return { error: 'Movimento inválido! Use 1, 2, 3 ou 4' };
        }

        const attacker = duel.turn === 'challenger' ? duel.challenger : duel.challenged;
        const defender = duel.turn === 'challenger' ? duel.challenged : duel.challenger;

        attacker.movesUsed.push(move.name);

        // Verificar falha
        if (Math.random() < move.failChance) {
            return this.processDuelRound(duel, attacker, defender, move, true, duelId);
        }

        // Calcular dano
        let damage = Math.floor(Math.random() * (move.maxDamage - move.minDamage + 1) + move.minDamage);

        if (move.isDefense) {
            // Próximo ataque do defensor causa 50% menos dano
            duel.nextAttackReduction = 0.5;
            return this.processDuelRound(duel, attacker, defender, move, false, duelId);
        }

        // Aplicar redução se defesa anterior
        if (duel.nextAttackReduction) {
            damage = Math.floor(damage * (1 - duel.nextAttackReduction));
            duel.nextAttackReduction = 0;
        }

        defender.power -= damage;

        return this.processDuelRound(duel, attacker, defender, move, false, duelId, damage);
    },

    // Processar resultado do round
    processDuelRound(duel, attacker, defender, move, failed, duelId, damage = 0) {
        const isChallenger = attacker.jid === duel.challenger.jid;
        const attackerName = attacker.name;
        const defenderName = defender.name;

        let roundMessage = `
🔄 *ROUND ${duel.round}* 🔄

${attackerName} usou: *${move.name}*
`;

        if (failed) {
            roundMessage += `❌ *FALHOU!*\n`;
        } else if (move.isDefense) {
            roundMessage += `🛡️ *${attackerName} se defendeu!*\n`;
        } else {
            roundMessage += `💥 Causou ${damage} de dano!\n`;
        }

        roundMessage += `
${duel.challenger.name}: ❤️${Math.max(0, duel.challenger.power)}/${duel.challenger.maxPower}
${duel.challenged.name}: ❤️${Math.max(0, duel.challenged.power)}/${duel.challenged.maxPower}
`;

        // Verificar vitória
        if (defender.power <= 0) {
            const winner = attacker.jid;
            const loser = defender.jid;

            // Registrar vitória
            progression.registerDuel(winner, loser);

            const winMessage = `
⚔️ *DUELO FINALIZADO!* ⚔️

🏆 *${attacker.name}* VENCEU! 🏆

_${attacker.name} ganhou 50 pontos de progression!_
_${defender.name} ganhou 10 pontos mesmo assim._
            `.trim();

            this.activeDuels.delete(duelId);
            logger.info(`Duelo finalizado: ${attacker.name} venceu`);

            return {
                success: true,
                finished: true,
                winner: winner,
                message: roundMessage + '\n' + winMessage
            };
        }

        // Próximo round
        duel.round += 1;
        duel.turn = isChallenger ? 'challenged' : 'challenger';

        if (duel.round > duel.maxRounds) {
            // Verificar quem tem mais vida
            const winner = duel.challenger.power > duel.challenged.power 
                ? duel.challenger.jid 
                : duel.challenged.jid;
            const loser = winner === duel.challenger.jid 
                ? duel.challenged.jid 
                : duel.challenger.jid;

            progression.registerDuel(winner, loser);

            const drawMessage = `
⚔️ *DUELO FINALIZADO!* ⚔️

🏆 *${duel.challenger.power > duel.challenged.power ? duel.challenger.name : duel.challenged.name}* VENCEU POR PONTOS! 🏆
            `.trim();

            this.activeDuels.delete(duelId);
            return {
                success: true,
                finished: true,
                message: roundMessage + '\n' + drawMessage
            };
        }

        const nextPlayer = isChallenger ? duel.challenged.name : duel.challenger.name;
        roundMessage += `\n*${nextPlayer}, sua vez!*\n_/duelo movimento <1-4>_`;

        return {
            success: true,
            finished: false,
            message: roundMessage
        };
    },

    // Obter duelo ativo do usuário
    getActiveDuel(userJid) {
        for (const [duelId, duel] of this.activeDuels.entries()) {
            if (duel.challenger.jid === userJid || duel.challenged.jid === userJid) {
                return { duelId, duel };
            }
        }
        return null;
    },

    // Limpar duelos expirados
    cleanupExpiredDuels() {
        for (const [duelId, duel] of this.activeDuels.entries()) {
            if (Date.now() > duel.expiresAt) {
                this.activeDuels.delete(duelId);
                logger.debug(`Duelo expirado removido: ${duelId}`);
            }
        }
    }
};
