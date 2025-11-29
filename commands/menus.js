// commands/menus.js
// Sistema de menus centralizados
const progression = require('../utils/progression');

module.exports = {
    // Menu principal
    getMainMenu: () => {
        return `┌─═━┈┈━═─⊱🦉⊰─═━┈┈━═─┐
┊ 『 🦉 』 𝐄𝐓𝐎 𝐘𝐎𝐒𝐇𝐈𝐌𝐔𝐑𝐀 『 🦉 』
└─═━┈┈━═─⊱🦉⊰─═━┈┈━═─┘
╎
┊📱 /menu 1 - JOGOS 🎮
┊🎵 /menu 2 - MÚSICA 🎧
┊💋 /menu 3 - AÇÕES 💕
┊🔥 /menu 4 - ADULTO +18 🔞
┊⚔️ /menu 5 - DUELOS ⚔️
┊📊 /menu 6 - PROGRESSÃO 📈
┊❓ /menu 7 - AJUDA 📖
┊ℹ️ /menu 8 - SOBRE 🦉
╎
_Responda com /menu 1 ou /jogos_`;
    },

    // Menu de jogos
    getGamesMenu: () => {
        return `┌─═━┈┈━═─⊱🎮⊰─═━┈┈━═─┐
┊ 『 🎮 』 𝐌𝐄𝐍𝐔 𝐃𝐄 𝐉𝐎𝐆𝐎𝐒 『 🎮 』
└─═━┈┈━═─⊱🎮⊰─═━┈┈━═─┘
╎
┊🎯 /verdade - Verdade ou Desafio
┊🎮 /vd - Sorteia V ou D
┊🌙 /eununca - Eu nunca...
┊💭 /voceprefe - Você prefere?
┊💞 /ship - Shippar casais
┊⭐ /nota - Avaliar (0-10)
┊💍 /casar - Case-se
┊💔 /divorciar - Se divorcie
┊🏆 /top - Top do grupo
┊👤 /perfil - Seu perfil
┊📊 /stats - Estatísticas
╎
_Ara ara~ Escolha seu jogo!_ 😈`;
    },

    // Menu de música
    getMusicMenu: () => {
        return `┌─═━┈┈━═─⊱🎵⊰─═━┈┈━═─┐
┊ 『 🎵 』 𝐌𝐄𝐍𝐔 𝐃𝐄 𝐌𝐔́𝐒𝐈𝐂𝐀 『 🎵 』
└─═━┈┈━═─⊱🎵⊰─═━┈┈━═─┘
╎
┊🎧 /play <música> - Tocar música
┊🔍 /buscar <música> - Buscar música
┊📝 /letra <música> - Ver letra
┊💾 /download <link> - Baixar áudio
╎
_Exemplo: /play unravel tokyo ghoul_
_Boa audição!_ 🎧💋`;
    },

    // Menu de ações
    getActionsMenu: () => {
        return `┌─═━┈┈━═─⊱💋⊰─═━┈┈━═─┐
┊ 『 💋 』 𝐀̧𝐎𝐄𝐒 𝐂𝐎𝐌 𝐆𝐈𝐅 『 💋 』
└─═━┈┈━═─⊱💋⊰─═━┈┈━═─┘
╎
┊💕 /beijo @pessoa - Beijo apaixonado
┊🤗 /abraco @pessoa - Abraço carinhoso
┊👋 /tapa @pessoa - Tapa na cara
┊🦷 /morder @pessoa - Morder malandro
┊👅 /lamber @pessoa - Lambida sensual
┊😈 /agarrar @pessoa - Agarrar firme
╎
_Escolha sua ação!_ 😏`;
    },

    // Menu adulto
    getAdultMenu: () => {
        return `┌─═━┈┈━═─⊱🔥⊰─═━┈┈━═─┐
┊ 『 🔥 』 𝐌𝐄𝐍𝐔 𝐀𝐃𝐔𝐋𝐓𝐎 『 🔥 』
└─═━┈┈━═─⊱🔥⊰─═━┈┈━═─┘
╎
⚠️ *APENAS EM PRIVADO!*
⚠️ *CONTEÚDO EXPLÍCITO +18*
╎
┊🔥 /sexo @pessoa - Sexo intenso
┊👅 /chupar @pessoa - Chupada gostosa
┊⛓️ /dominar @pessoa - Dominação
┊🎀 /amarrar @pessoa - Bondage
┊😈 /provocar @pessoa - Provocação
┊💞 /pegar @pessoa - Pegação
┊🔞 /meter @pessoa - Sem censura
┊🎉 /suruba - Orgia em grupo
┊🎤 /gemido - Gemidos variados
┊💦 /tesao - Medidor de tesão
╎
_Comportamento adulto recomendado!_ 😈🔥`;
    },

    // Menu de duelos
    getDuelsMenu: () => {
        return `┌─═━┈┈━═─⊱⚔️⊰─═━┈┈━═─┐
┊ 『 ⚔️ 』 𝐃𝐔𝐄𝐋𝐎𝐒 𝐏𝐕𝐏 『 ⚔️ 』
└─═━┈┈━═─⊱⚔️⊰─═━┈┈━═─┘
╎
┊⚔️ /duelo @pessoa - Desafiar para duelo
┊💥 /duelo movimento 1 - Ataque Básico (10-15)
┊🔥 /duelo movimento 2 - Ataque Forte (15-25)
┊🛡️ /duelo movimento 3 - Defesa (-50%)
┊👹 /duelo movimento 4 - Kagune (20-30)
┊🏆 /ranking_duelos - Ver ranking de duelos
╎
_Quer testar sua força?_ ⚔️`;
    },

    // Menu de progressão
    getProgressionMenu: () => {
        return `┌─═━┈┈━═─⊱📊⊰─═━┈┈━═─┐
┊ 『 📊 』 𝐏𝐑𝐎𝐆𝐑𝐄𝐒𝐒𝐀̃𝐎 『 📊 』
└─═━┈┈━═─⊱📊⊰─═━┈┈━═─┘
╎
┊📊 /perfil - Ver seu perfil
┊🏆 /ranking - Top 10 geral
┊⚔️ /ranking_duelos - Top duelos
┊💾 /stats - Suas estatísticas
┊👤 /setapelido <nome> - Mudar apelido
┊👑 /settitulo <titulo> - Mudar título
┊📝 /setbio <bio> - Mudar bio
╎
_Fique mais forte!_ 💪`;
    },

    // Menu de ajuda
    getHelpMenu: () => {
        return `┌─═━┈┈━═─⊱❓⊰─═━┈┈━═─┐
┊ 『 ❓ 』 𝐀𝐉𝐔𝐃𝐀 『 ❓ 』
└─═━┈┈━═─⊱❓⊰─═━┈┈━═─┘
╎
*O que é este bot?*
Eu sou Eto Yoshimura, um bot de WhatsApp com jogos, música, duelos e conteúdo adulto! 😈
╎
*Como começar?*
1. Use /menu para ver categorias
2. Escolha um comando e comece
3. Ganhe XP com cada ação
4. Desbloqueie achievements
5. Aumente seu nível
╎
*Grupos vs Privado:*
📱 GRUPOS: Jogos, música, ações
🔒 PRIVADO: Tudo + conteúdo adulto
╎
*Rate Limiting:*
⏱️ Máximo 10 comandos por minuto
⏱️ Máximo 3 músicas por minuto
⏱️ Máximo 5 jogos por minuto
╎
_Dúvidas? Me questione!_ 🦉`;
    },

    // Menu sobre
    getAboutMenu: () => {
        return `┌─═━┈┈━═─⊱ℹ️⊰─═━┈┈━═─┐
┊ 『 ℹ️ 』 𝐒𝐎𝐁𝐑𝐄 『 ℹ️ 』
└─═━┈┈━═─⊱ℹ️⊰─═━┈┈━═─┘
╎
*Nome:* Eto Yoshimura Bot
*Versão:* 2.0.0
*Status:* ✅ Ativo
╎
*Features:*
✅ Sistema de Progressão XP
✅ Duelos PvP
✅ Jogos Interativos
✅ Música do YouTube
✅ Conteúdo +18
✅ Rate Limiting
✅ Persistent Data
✅ Achievements
╎
*Avisos:*
⚠️ Conteúdo 18+
⚠️ Use com responsabilidade
⚠️ Não repasse para menores
╎
_"Que comece a diversão..." - Eto_ 🦉🔥`;
    },

    // Handler para processar entradas de menu
    handleMenuInput: (text, isGroup) => {
        const input = text.toLowerCase().trim();

        // Opções numéricas do menu principal
        if (input === '1' || input === '/jogos') {
            return module.exports.getGamesMenu();
        }
        if (input === '2' || input === '/musica' || input === '/music') {
            return module.exports.getMusicMenu();
        }
        if (input === '3' || input === '/acoes' || input === '/actions') {
            return module.exports.getActionsMenu();
        }
        if (input === '4' || input === '/adulto' || input === '/adult') {
            if (isGroup) {
                return '❌ Conteúdo adulto não disponível em grupos!\n\n_Use em privado~ 😏_';
            }
            return module.exports.getAdultMenu();
        }
        if (input === '5' || input === '/duelos' || input === '/duelo') {
            return module.exports.getDuelsMenu();
        }
        if (input === '6' || input === '/progressao' || input === '/progression' || input === '/xp' || input === '/level') {
            return module.exports.getProgressionMenu();
        }
        if (input === '7' || input === '/ajuda' || input === '/help') {
            return module.exports.getHelpMenu();
        }
        if (input === '8' || input === '/sobre' || input === '/about') {
            return module.exports.getAboutMenu();
        }

        // Comandos diretos
        if (input === '/menu' || input === '/commands' || input === '/start') {
            return module.exports.getMainMenu();
        }

        return null;
    }
};
