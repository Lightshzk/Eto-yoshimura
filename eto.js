// index.js - Arquivo Principal
// Bot de WhatsApp - Eto Yoshimura +18 (Tokyo Ghoul)
// ⚠️ CONTEÚDO ADULTO - APENAS +18 ANOS

const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const etoPersonality = require('./commands/personality');
const gameCommands = require('./commands/games');
const adultCommands = require('./commands/adult');
const actionCommands = require('./commands/actions');
const musicCommands = require('./commands/music');
const duels = require('./commands/duels');
const admin = require('./commands/admin');
const menus = require('./commands/menus');
const logger = require('./utils/logger');
const storage = require('./utils/storage');
const progression = require('./utils/progression');
const rateLimiter = require('./utils/rateLimiter');

const client = new Client({
    authStrategy: new LocalAuth()
});

// Sistema de verificação de idade com persistência
let userAges = new Map();

// Carregar dados salvos ao iniciar
const loadUserData = () => {
    try {
        const savedAges = storage.load('userAges', {});
        userAges = storage.objectToMap(savedAges);
        logger.info(`Carregados ${userAges.size} usuários verificados`);
    } catch (error) {
        logger.error('Erro ao carregar dados de usuários', error);
    }
};

// Salvar dados periodicamente
const saveUserDataPeriodically = () => {
    setInterval(() => {
        try {
            const agesObj = storage.mapToObject(userAges);
            storage.save('userAges', agesObj);
            logger.debug('Dados de usuários salvos');
        } catch (error) {
            logger.error('Erro ao salvar dados', error);
        }
    }, 60000); // A cada 1 minuto
};

// Evento: QR Code para conectar
client.on('qr', (qr) => {
    logger.info('QR Code gerado para autenticação');
    console.log('📱 Escaneie o QR Code abaixo com seu WhatsApp:');
    qrcode.generate(qr, { small: true });
});

// Evento: Bot conectado
client.on('ready', () => {
    logger.success('Bot Eto Yoshimura conectado e pronto!');
    console.log('✅ Bot Eto Yoshimura conectado e pronto!');
    console.log('🦉 "Que comece a diversão..."');
    
    // Inicializar jogos
    gameCommands.initGames();
    
    // Carregar dados de usuários
    loadUserData();
    
    // Carregar blacklist
    admin.loadBlacklist();
    
    // Salvar dados periodicamente
    saveUserDataPeriodically();
    
    // Limpar duelos expirados a cada minuto
    setInterval(() => {
        duels.cleanupExpiredDuels();
    }, 60000);
});

// Evento: Mensagem recebida
client.on('message', async (msg) => {
    try {
        const chat = await msg.getChat();
        
        // Ignorar mensagens do próprio bot
        if (msg.fromMe) return;
        
        const text = msg.body.toLowerCase();
        
        // GRUPOS: Apenas responde a comandos
        if (chat.isGroup) {
            // Responde apenas a comandos (/) ou se for mencionado
            if (!msg.body.startsWith('/') && !msg.mentionedIds.includes(client.info.wid._serialized)) {
                return;
            }

            try {
                await chat.sendStateTyping();
                await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));
                
                let response = null;
                
                // Verificar comandos de menu PRIMEIRO
                const menuResponse = menus.handleMenuInput(text, true);
                if (menuResponse) {
                    response = menuResponse;
                }
                // Progressão
                else if (text === '/perfil' || text === '/profile') {
                    response = progression.getProfileDisplay(msg.from);
                }
                else if (text === '/ranking' || text === '/top') {
                    response = progression.getGlobalRanking(10);
                }
                else if (text === '/ranking_duelos' || text === '/duels_ranking') {
                    response = progression.getDuelRanking(10);
                }
                // Duelos
                else if (text === '/duelos' || text === '/duelo') {
                    response = menus.getDuelsMenu();
                }
                else if (text.startsWith('/duelo @')) {
                    const mentioned = msg.mentionedIds[0] || msg.from;
                    const duelResult = await duels.startDuel(msg.from, mentioned, msg.pushName || 'Jogador 1', 'Jogador 2');
                    response = duelResult.message;
                }
                else if (text.startsWith('/duelo movimento')) {
                    const activeDuel = duels.getActiveDuel(msg.from);
                    if (!activeDuel) {
                        response = '❌ Você não está em um duelo ativo!';
                    } else {
                        const movement = text.split(' ')[2];
                        const result = duels.executar_movimento(activeDuel.duelId, msg.from, movement);
                        response = result.message;
                    }
                }
                // Verificar comandos de música
                else if (text.startsWith('/play') || text.startsWith('/buscar') || text.startsWith('/search') || text.startsWith('/letra') || text === '/musica' || text === '/music') {
                    response = await musicCommands.handleCommand(text, msg);
                }
                // Verificar comandos de jogos
                else if (gameCommands.handleCommand(text, chat)) {
                    response = gameCommands.handleCommand(text, chat);
                }
                // Verificar comandos adultos
                else if (adultCommands.handleCommand(text, chat)) {
                    response = adultCommands.handleCommand(text, chat);
                }
                // Verificar ações com GIF
                else if (actionCommands.handleCommand(text)) {
                    response = actionCommands.handleCommand(text);
                }
                // Respostas de personalidade
                else {
                    response = etoPersonality.getResponse(text, chat);
                }
                
                if (response) {
                    await sendResponse(msg, response);
                }
            } catch (error) {
                logger.error('Erro ao processar comando de grupo', error);
                msg.reply('❌ Oops! Algo deu errado. Tente novamente! 😔');
            }
            return;
        }
        
        // PRIVADO: Verificação de idade
        if (!userAges.has(msg.from)) {
            try {
                await chat.sendStateTyping();
                await new Promise(resolve => setTimeout(resolve, 1500));
                msg.reply("⚠️ *AVISO: CONTEÚDO +18* ⚠️\n\n🔞 Este bot contém conteúdo adulto explícito.\n\n*Você tem 18 anos ou mais?*\n\nResponda:\n✅ SIM - para continuar\n❌ NÃO - para sair");
                
                // Aguardar resposta de verificação de idade
                const ageResponseHandler = (response) => {
                    const answer = response.body.toLowerCase();
                    
                    if (answer.includes('sim') || answer.includes('yes') || answer === '✅') {
                        userAges.set(msg.from, true);
                        logger.info(`Usuário verificado como +18: ${msg.from}`);
                        chat.sendStateTyping();
                        setTimeout(() => {
                            response.reply("Ara ara~ Bem-vindo ao meu mundo, adulto corajoso. 😈🔥\n\nEu sou *Eto Yoshimura*, a Coruja de Um Olho.\n\n💋 *Modo Privado Ativado*\n- Conversas intensas e adultas\n- Respeito mútuo sempre\n- Digite /menu para ver comandos\n\nAgora... me entretenha. 🌙");
                        }, 2000);
                    } else {
                        logger.info(`Usuário rejeitado (não verificado como +18): ${msg.from}`);
                        response.reply("Ah, que pena... Volte quando crescer, pequeno. 👋");
                    }
                    
                    // Remover listener após resposta
                    client.removeEventListener('message', ageResponseHandler);
                };
                
                client.once('message', ageResponseHandler);
            } catch (error) {
                logger.error('Erro na verificação de idade', error);
                msg.reply('❌ Erro ao verificar idade. Tente novamente!');
            }
            return;
        }
        
        // Usuário verificado - responder normalmente
        try {
            await chat.sendStateTyping();
            await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
            
            let response = null;
            
            // Verificar comandos de menu PRIMEIRO
            const menuResponse = menus.handleMenuInput(text, false);
            if (menuResponse) {
                response = menuResponse;
            }
            // Progressão
            else if (text === '/perfil' || text === '/profile') {
                response = progression.getProfileDisplay(msg.from);
            }
            else if (text === '/ranking' || text === '/top') {
                response = progression.getGlobalRanking(10);
            }
            else if (text === '/ranking_duelos' || text === '/duels_ranking') {
                response = progression.getDuelRanking(10);
            }
            // Customização de perfil
            else if (text.startsWith('/setapelido ')) {
                const newNickname = text.substring('/setapelido '.length).trim();
                if (progression.setNickname(msg.from, newNickname)) {
                    response = `✅ Apelido alterado para: *${newNickname}*`;
                } else {
                    response = `❌ Apelido muito longo (máximo 20 caracteres)`;
                }
            }
            else if (text.startsWith('/settitulo ')) {
                const newTitle = text.substring('/settitulo '.length).trim();
                if (progression.setTitle(msg.from, newTitle)) {
                    response = `✅ Título alterado para: *${newTitle}*`;
                } else {
                    response = `❌ Título muito longo (máximo 30 caracteres)`;
                }
            }
            else if (text.startsWith('/setbio ')) {
                const newBio = text.substring('/setbio '.length).trim();
                if (progression.setBio(msg.from, newBio)) {
                    response = `✅ Bio alterada para: *${newBio}*`;
                } else {
                    response = `❌ Bio muito longa (máximo 60 caracteres)`;
                }
            }
            // Duelos
            else if (text === '/duelos' || text === '/duelo') {
                response = menus.getDuelsMenu();
            }
            else if (text.startsWith('/duelo @')) {
                const mentioned = msg.mentionedIds[0] || msg.from;
                const duelResult = await duels.startDuel(msg.from, mentioned, msg.pushName || 'Jogador 1', 'Jogador 2');
                response = duelResult.message;
            }
            else if (text.startsWith('/duelo movimento')) {
                const activeDuel = duels.getActiveDuel(msg.from);
                if (!activeDuel) {
                    response = '❌ Você não está em um duelo ativo!';
                } else {
                    const movement = text.split(' ')[2];
                    const result = duels.executar_movimento(activeDuel.duelId, msg.from, movement);
                    response = result.message;
                }
            }
            // Verificar comandos de música (async)
            else if (text.startsWith('/play') || text.startsWith('/buscar') || text.startsWith('/search') || text.startsWith('/letra') || text === '/musica' || text === '/music') {
                response = await musicCommands.handleCommand(text, msg);
            }
            // Verificar comandos de jogos
            else if (gameCommands.handleCommand(text, chat)) {
                response = gameCommands.handleCommand(text, chat);
            }
            // Verificar comandos adultos
            else if (adultCommands.handleCommand(text, chat)) {
                response = adultCommands.handleCommand(text, chat);
            }
            // Verificar ações com GIF
            else if (actionCommands.handleCommand(text)) {
                response = actionCommands.handleCommand(text);
            }
            // Respostas de personalidade
            else {
                response = etoPersonality.getResponse(text, chat);
            }
            
            if (response) {
                await sendResponse(msg, response);
            }
        } catch (error) {
            logger.error('Erro ao processar mensagem privada', error);
            msg.reply('❌ Erro ao processar sua mensagem. Tente novamente! 😔');
        }
    } catch (error) {
        logger.error('Erro crítico ao processar mensagem', error);
    }
});

// Função auxiliar para enviar respostas (trata todos os tipos)
const sendResponse = async (msg, response) => {
    try {
        if (!response) return;

        // Se resposta contém GIF
        if (response.media && typeof response.media === 'string') {
            try {
                const media = await MessageMedia.fromUrl(response.media);
                await msg.reply(media, null, { caption: response.text || 'Ara ara~ 😈' });
            } catch (error) {
                logger.warn(`Erro ao carregar GIF: ${response.media}`);
                msg.reply((response.text || 'Ara ara~ 😈') + '\n\n_[Erro ao carregar GIF]_');
            }
        }
        // Se resposta contém áudio (música)
        else if (response.type === 'audio' && response.buffer) {
            try {
                const media = new MessageMedia(response.mimetype, response.buffer.toString('base64'), response.filename);
                await msg.reply(media, null, { caption: response.caption || '🎵' });
            } catch (error) {
                logger.error('Erro ao enviar áudio', error);
                msg.reply('❌ Erro ao enviar o áudio. Tente novamente!');
            }
        }
        // Resposta de texto simples
        else if (typeof response === 'string') {
            msg.reply(response);
        }
        else {
            logger.warn('Tipo de resposta desconhecido');
        }
    } catch (error) {
        logger.error('Erro ao enviar resposta', error);
        msg.reply('❌ Erro ao enviar resposta! 😔');
    }
};

// Inicializar o bot
client.initialize();

console.log('🔄 Iniciando bot Eto Yoshimura...');
console.log('⏳ Aguarde o QR Code aparecer...');

// Tratamento de erro global
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at Promise', reason);
});

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception', error);
});