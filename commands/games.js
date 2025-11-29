// commands/games.js
// Comandos de jogos e brincadeiras

const menus = require('./menus');

const gameData = {
    truth: [],
    dare: [],
    wouldYouRather: [],
    neverHaveIEver: [],
    scores: new Map(),
    relationships: new Map()
};

module.exports = {
    initGames: () => {
        // Verdades +18
        gameData.truth = [
            "Qual foi sua fantasia sexual mais louca? 🔥",
            "Você já teve um crush em alguém deste grupo? Quem? 💋",
            "Qual parte do corpo você mais gosta em alguém? 😏",
            "Qual seu fetiche secreto que ninguém sabe? 😈",
            "Você já ficou com alguém só pela aparência? 🌙",
            "Qual foi a situação mais constrangedora numa transa? 🙈",
            "Você já viu conteúdo adulto de algum personagem de anime? Qual? 📱",
            "Se pudesse ficar com alguém do grupo, quem seria? 💕",
            "Quantas pessoas você já beijou? Seja honesto~ 💋",
            "Qual seu tipo ideal fisicamente? Descreva em detalhes 🔥",
            "Você já transou em local público? Onde? 😈",
            "Qual foi o sonho erótico mais intenso que você já teve? 💭",
            "Você já fingiu orgasmo? Quantas vezes? 🙈",
            "Qual foi a coisa mais ousada que você já fez na cama? 🔥",
            "Você já sentiu tesão por alguém do mesmo sexo? 💋"
        ];
        
        // Desafios +18
        gameData.dare = [
            "Mande um áudio gemendo suavemente (pode ser fake hehe) 🎤😈",
            "Envie uma foto sua fazendo cara sedutora 📸🔥",
            "Elogie alguém do grupo de forma bem sensual 💋",
            "Conte uma fantasia sexual sua em detalhes no grupo 😏",
            "Fale 'eu te desejo' para alguém aleatório do grupo 🌙",
            "Mande um vídeo dançando de forma sensual (10 segundos) 💃🔥",
            "Escolha alguém e diga o que você faria com essa pessoa numa ilha deserta 🏝️😈",
            "Mande uma mensagem cantando alguém do grupo de forma criativa 💕",
            "Imite um gemido de personagem de anime (áudio) 🎭😏",
            "Descreva como seria seu date perfeito, sem censura 🌹🔥",
            "Mande uma selfie fazendo biquinho 😘",
            "Escreva uma mensagem picante para alguém do grupo 🔥",
            "Conte a coisa mais pervertida que você já pensou hoje 😈",
            "Mande um áudio sussurrando algo sensual 🎤💋",
            "Use emoji para descrever sua última transa 🍆💦"
        ];
        
        // Você prefere +18
        gameData.wouldYouRather = [
            "Você prefere: Dar ou receber? 😏🔥",
            "Você prefere: Dominante ou submisso? 😈💋",
            "Você prefere: Sexo selvagem ou romântico? 🌹🔥",
            "Você prefere: Luzes acesas ou apagadas? 💡🌙",
            "Você prefere: Ficar com crush feio mas incrível de cama OU bonito mas ruim? 🤔",
            "Você prefere: Ser pego no flagra OU pegar alguém? 😱😏",
            "Você prefere: Fazer numa praia deserta OU num banheiro público? 🏖️🚻",
            "Você prefere: Seu parceiro tímido OU muito ousado? 🙈😈",
            "Você prefere: Roleplay de anime OU de filme? 🎭🎬",
            "Você prefere: Manhã, tarde OU noite? ⏰🌙",
            "Você prefere: Sexo rápido e intenso OU longo e apaixonado? 🔥💕",
            "Você prefere: Parceiro experiente OU virgem para ensinar? 😏",
            "Você prefere: Curtir sozinho OU com várias pessoas? 🎉",
            "Você prefere: Velas e música OU adrenalina e risco? 🕯️⚡",
            "Você prefere: Fazer no chuveiro OU na cama? 🚿🛏️"
        ];
        
        // Eu nunca +18
        gameData.neverHaveIEver = [
            "Eu nunca fiquei com alguém no primeiro encontro 💋",
            "Eu nunca enviei nudes para alguém 📱🔥",
            "Eu nunca fantasiei com alguém comprometido 😈",
            "Eu nunca fiz num lugar público/arriscado 🚗🌙",
            "Eu nunca menti sobre meu número de parceiros 🤥",
            "Eu nunca assisti hentai 📺😏",
            "Eu nunca fiquei com mais de uma pessoa no mesmo dia 🌹",
            "Eu nunca fiz roleplay sexual 🎭🔥",
            "Eu nunca tive interesse em BDSM 😈⛓️",
            "Eu nunca me masturbei pensando em alguém do trabalho/escola 💭🔥",
            "Eu nunca fiz sexting 📱💋",
            "Eu nunca transaram em um carro 🚗",
            "Eu nunca tive um one night stand 🌙",
            "Eu nunca usei brinquedos sexuais 🔥",
            "Eu nunca gemi o nome errado 🙈"
        ];
    },
    
    handleCommand: (text, chat) => {
        const isGroup = chat.isGroup;
        
        // Verdade ou Desafio
        if (text === '/verdade') {
            const options = ['verdade', 'desafio'];
            const choice = options[Math.floor(Math.random() * options.length)];
            
            if (choice === 'verdade') {
                const truth = gameData.truth[Math.floor(Math.random() * gameData.truth.length)];
                return `🎭 *VERDADE* 🎭\n\n${truth}\n\n_Responda com honestidade... ou não. Eu vou saber se mentir~ 😏_`;
            } else {
                const dare = gameData.dare[Math.floor(Math.random() * gameData.dare.length)];
                return `🔥 *DESAFIO* 🔥\n\n${dare}\n\n_Covarde não vale pontos~ 😈_`;
            }
        }
        
        if (text === '/vd') {
            return `Escolha seu destino, corajoso:\n\n*V* - Verdade 🎭\n*D* - Desafio 🔥\n\n_Digite V ou D para continuar~_`;
        }
        
        // Eu nunca
        if (text === '/eununca') {
            const statement = gameData.neverHaveIEver[Math.floor(Math.random() * gameData.neverHaveIEver.length)];
            return `🍷 *EU NUNCA...* 🍷\n\n${statement}\n\n_Se você já fez, reaja com 👀\nSe nunca fez, reaja com 😇_\n\nVamos ver quem são os safadinhos aqui~ 😈`;
        }
        
        // Você prefere
        if (text === '/voceprefe') {
            const question = gameData.wouldYouRather[Math.floor(Math.random() * gameData.wouldYouRather.length)];
            return `🤔 *VOCÊ PREFERE...* 🤔\n\n${question}\n\n_Respondam nos comentários, quero ver as justificativas~ 😏_`;
        }
        
        // Ship
        if (text === '/ship') {
            if (!isGroup) return "Ship só funciona em grupos, querido~ 💕";
            const compatibility = Math.floor(Math.random() * 101);
            let comment = '';
            
            if (compatibility <= 20) comment = 'Aí não dá... incompatíveis demais 😬';
            else if (compatibility <= 40) comment = 'Pode rolar uma amizade colorida 😏';
            else if (compatibility <= 60) comment = 'Tem química! Vale a pena tentar 💕';
            else if (compatibility <= 80) comment = 'CASAL PERFEITO! Shippo muito! 🔥';
            else comment = 'ALMAS GÊMEAS! Casem logo! 💍😈';
            
            return `💕 *SHIPANDO...* 💕\n\nCompatibilidade: *${compatibility}%*\n\n💭 _"${comment}"_\n\n✨ Marque duas pessoas para descobrir a química entre elas!\n/ship @pessoa1 @pessoa2`;
        }
        
        // Nota
        if (text.startsWith('/nota')) {
            const rating = Math.floor(Math.random() * 11);
            let comment = '';
            
            if (rating <= 3) comment = 'Aí não... nem eu como ghoul comeria 😬';
            else if (rating <= 5) comment = 'Mediano, nada especial 😐';
            else if (rating <= 7) comment = 'Interessante... continua assim 😏';
            else if (rating <= 9) comment = 'Uau~ Você é delicioso! 🔥';
            else comment = 'PERFEIÇÃO! Meu tipo ideal! 😈💋';
            
            return `📊 *AVALIAÇÃO DA ETO* 📊\n\n⭐ Nota: *${rating}/10*\n\n💭 _"${comment}"_\n\n🦉 Assinado: Eto Yoshimura`;
        }
        
        // Casamento
        if (text.startsWith('/casar')) {
            return `💍 *CASAMENTO* 💍\n\nAra ara~ Quer se casar? Que romântico! 😏\n\nMarque alguém:\n/casar @pessoa\n\n_Mas saiba: eu sou possessiva. Se aceitar, você é MEU. 😈💋_`;
        }
        
        if (text === '/divorciar') {
            return `💔 *DIVÓRCIO* 💔\n\nJá cansou? Que pena... Eu estava gostando de ter você como propriedade. 😔\n\n_Divórcio concedido. Você está livre... por enquanto. 🌙_`;
        }
        
        // Ranking
        if (text === '/top') {
            return `🏆 *RANKING DO GRUPO* 🏆\n\n_Sistema em desenvolvimento..._\n\nPor enquanto, todos são igualmente... interessantes. 😏\n\nGanhe pontos:\n✅ Completando desafios\n✅ Sendo ousado\n✅ Me entretendo\n\n_Os covardes perdem pontos~ 😈_`;
        }
        
        // Perfil
        if (text === '/perfil') {
            return `👤 *SEU PERFIL* 👤\n\n📊 Pontos: 0\n💕 Status: Solteiro(a)\n🎮 Desafios completados: 0\n🔥 Nível de ousadia: Iniciante\n\n_Continue jogando para evoluir~ 😏_`;
        }
        
        // Stats
        if (text === '/stats') {
            if (!isGroup) return "Stats só funcionam em grupos, querido~ 📊";
            return `📈 *ESTATÍSTICAS DO GRUPO* 📈\n\n👥 Membros ativos: Calculando...\n🎮 Jogos jogados: ${Math.floor(Math.random() * 100)}\n🔥 Nível de calor: MUITO ALTO 🌡️\n😈 Nível de safadeza: CRÍTICO ⚠️\n\n_Esse grupo é do meu tipo~ 💋_`;
        }
        
        return null;
    }
};