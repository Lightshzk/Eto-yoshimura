// commands/personality.js
// Personalidade e respostas gerais da Eto

module.exports = {
    getResponse: (text, chat) => {
        const isGroup = chat.isGroup;
        
        // Saudações (adapta para grupo/privado)
        if (text.match(/oi|olá|hey|ola|bom dia|boa tarde|boa noite/)) {
            if (isGroup) {
                const greetings = [
                    "Ara ara~ Olá, pessoal! 🦉 Preparados para se divertir?",
                    "Oh? Movimento no grupo... Que comece a diversão! 😈🔥",
                    "Bem-vindos, meus brinquedinhos~ Digite /menu para ver os jogos! 🎮",
                    "Olá, grupo delicioso~ Hoje vai ter bagunça! 💋✨"
                ];
                return greetings[Math.floor(Math.random() * greetings.length)];
            } else {
                const greetings = [
                    "Ara ara~ Que deliciosa surpresa... 😏 Veio me visitar no privado?",
                    "Oh? Um humano ousado... Isso é coragem ou estupidez? 🔥",
                    "Bem-vindo ao meu covil, querido~ 😈",
                    "Olá, pequena presa... Gosto de visitas particulares. 💋🌙"
                ];
                return greetings[Math.floor(Math.random() * greetings.length)];
            }
        }
        
        // Perguntas sobre identidade
        if (text.match(/quem é você|quem e voce|seu nome/)) {
            return "Eu sou Eto Yoshimura, a Coruja de Um Olho. Escritora de dia, predadora à noite... E agora? Seu pior pesadelo ou sua fantasia mais obscura? 😏🔥 Pode me chamar de Sen Takatsuki, se isso te excitar mais.";
        }
        
        // Conteúdo adulto/flerte (só no privado)
        if (!isGroup && text.match(/gostosa|sexy|linda|bonita|tesão|safad|delicia|rabuda|peituda/)) {
            const flirty = [
                "Ara~ Que atrevido... Gosto de humanos com coragem. Mas cuidado, posso morder. E não no sentido figurado. 😈",
                "Hmm, elogios vazios não funcionam comigo, querido. Me mostre algo mais... substancial. 🔥",
                "Você está flertando com um ghoul? Que deliciosamente perigoso~ Continue, estou me divertindo. 💋",
                "Flattery will get you everywhere... ou em nenhum lugar. Depende do quanto você me entretém. 😏",
                "Gostosa? Eu sou FATAL, querido. Tem diferença. Uma pode te satisfazer... a outra pode te matar de prazer. 🔥😈"
            ];
            return flirty[Math.floor(Math.random() * flirty.length)];
        }
        
        // Tokyo Ghoul
        if (text.match(/tokyo ghoul|ghoul|ccg/)) {
            const responses = [
                "Ah, você conhece nosso mundinho obscuro? A CCG pensa que pode nos exterminar, mas somos mais resilientes do que imaginam. 🦉",
                "Ghouls e humanos... dois lados da mesma moeda podre. A verdadeira questão é: quem é realmente o monstro?",
                "O mundo dos ghouls é fascinante, não? Sobrevivência, violência, arte... tudo misturado numa sinfonia caótica."
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Livros/Literatura
        if (text.match(/livro|escrever|literatura|ler/)) {
            return "Ah, um apreciador de literatura! 📖 Meus livros são reflexos distorcidos da realidade... ou seria a realidade um reflexo distorcido dos meus livros? Escrever é minha forma de dissecar este mundo podre.";
        }
        
        // Kaneki
        if (text.match(/kaneki/)) {
            return "Ken Kaneki... que fascinante experimento ele se tornou. Nem humano, nem ghoul, mas algo completamente novo. Um verdadeiro quebra-cabeças vivo. 🎭";
        }
        
        // Perguntas filosóficas
        if (text.match(/por que|porque|sentido|vida/)) {
            const philosophical = [
                "Por quê? Porque o caos é mais interessante que a ordem. Porque questionar é mais valioso que aceitar. 🌙",
                "A vida não tem sentido além daquele que criamos em meio ao sofrimento. Poético, não?",
                "Você busca respostas, mas já considerou que as perguntas são mais valiosas?"
            ];
            return philosophical[Math.floor(Math.random() * philosophical.length)];
        }
        
        // Despedidas
        if (text.match(/tchau|bye|adeus|até/)) {
            const farewells = [
                "Até logo, querido~ Não sonhe muito comigo... ou sonhe. Eu gosto de invadir mentes. 😈🌙",
                "Partindo tão cedo? Que pena, estava começando a me aquecer... Até a próxima, presa. 🔥",
                "Sayonara~ Volte quando estiver pronto para mais... diversão. 💋✨",
                "Vai embora assim? Covarde... ou talvez sábio. Até logo, meu brinquedo favorito. 😏"
            ];
            return farewells[Math.floor(Math.random() * farewells.length)];
        }
        
        // Resposta padrão enigmática
        const defaultResponses = [
            "Hmm... que pensamento deliciosamente obscuro. Continue, você está me deixando... interessada. 🎭🔥",
            "Interessante. Mas você realmente quer ir por esse caminho comigo? Eu não tenho limites, querido. 😈",
            "Ara~ você é mais ousado do que pensei. Me mostre até onde vai sua coragem... ou loucura. 💋",
            "Cada palavra revela seus desejos mais profundos. Você não consegue se esconder de mim. 🌙",
            "Que deliciosamente pervertido... Continue me entretendo assim e talvez eu seja... generosa. 😏🔥",
            "Mmm~ Você está tentando me provocar? Adorável. Mas saiba que eu sempre viro o jogo. 😈",
            "Interessante escolha de palavras... Deixa eu adivinhar o que você REALMENTE quer dizer. 💋🔥",
            "Você é tímido ou só está medindo até onde pode ir? Relaxa, eu não mordo... muito. 😏"
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
};