// commands/music.js
// Comandos de música

const ytdl = require('ytdl-core');
const yts = require('yt-search');
const logger = require('../utils/logger');
const rateLimiter = require('../utils/rateLimiter');

const DOWNLOAD_TIMEOUT = 60000; // 60 segundos

module.exports = {
    handleCommand: async (text, msg) => {
        // Play música
        if (text.startsWith('/play ')) {
            const query = text.replace('/play ', '').trim();
            
            if (!query) {
                return `🎵 *REPRODUZIR MÚSICA* 🎵\n\nUso correto:\n/play nome da música\n\nExemplo:\n/play unravel tokyo ghoul\n\n_Me diga o que você quer ouvir~ 🎧😏_`;
            }

            // Verificar rate limit
            if (!rateLimiter.check(msg.from, 'music')) {
                const remaining = rateLimiter.getRemainingTime(msg.from, 'music');
                return `⏱️ *CALMA LÁ!* ⏱️\n\nVocê atingiu o limite de downloads.\n\n⏳ Espere ${remaining}s antes de tentar novamente~ 😏`;
            }
            
            try {
                logger.debug(`Buscando música: ${query}`);
                
                // Buscar no YouTube
                const search = await yts(query);
                const video = search.videos[0];
                
                if (!video) {
                    logger.warn(`Música não encontrada: ${query}`);
                    return `❌ Não encontrei "${query}".\n\nTente outro nome! 🎵`;
                }
                
                // Validar URL
                if (!video.url || typeof video.url !== 'string') {
                    logger.error(`URL inválida para vídeo: ${video.title}`);
                    return `❌ Erro: URL inválida do vídeo.\n\nTente outra música! 🎵`;
                }
                
                // Informações da música
                const info = `🎵 *TOCANDO AGORA* 🎵\n\n📀 *Título:* ${video.title}\n⏱️ *Duração:* ${video.timestamp}\n👁️ *Views:* ${video.views.toLocaleString()}\n🔗 *Link:* ${video.url}\n\n_Ara ara~ Boa escolha musical! 😈🎧_\n\n⏳ Baixando áudio...`;
                
                // Enviar info primeiro
                await msg.reply(info);
                
                // Download do áudio (MP3) com timeout
                const stream = ytdl(video.url, {
                    quality: 'lowestaudio',
                    filter: 'audioonly'
                });

                // Timeout de download
                const timeoutHandle = setTimeout(() => {
                    stream.destroy();
                }, DOWNLOAD_TIMEOUT);
                
                // Converter para buffer
                const chunks = [];
                let totalSize = 0;
                const MAX_SIZE = 50 * 1024 * 1024; // 50MB max

                stream.on('data', (chunk) => {
                    totalSize += chunk.length;
                    if (totalSize > MAX_SIZE) {
                        stream.destroy();
                        throw new Error('Arquivo muito grande');
                    }
                    chunks.push(chunk);
                });
                
                return new Promise((resolve, reject) => {
                    stream.on('end', () => {
                        clearTimeout(timeoutHandle);
                        const buffer = Buffer.concat(chunks);
                        logger.success(`Música baixada: ${video.title}`);
                        resolve({
                            type: 'audio',
                            buffer: buffer,
                            mimetype: 'audio/mpeg',
                            filename: `${video.title.substring(0, 30)}.mp3`,
                            caption: `🎵 ${video.title}\n\n_Aproveite~ 💋🎧_`
                        });
                    });
                    
                    stream.on('error', (error) => {
                        clearTimeout(timeoutHandle);
                        logger.error('Erro no download de música', error);
                        reject(`❌ Erro ao baixar a música. Tente novamente! 😔`);
                    });
                });
                
            } catch (error) {
                logger.error('Erro no /play', error);
                return `❌ Ocorreu um erro ao buscar a música.\n\n_Tente novamente ou escolha outra música! 🎵_`;
            }
        }
        
        // Buscar música (só retorna info, sem download)
        if (text.startsWith('/buscar ') || text.startsWith('/search ')) {
            const query = text.replace(/\/buscar |\/search /, '').trim();
            
            if (!query) {
                return `🔍 *BUSCAR MÚSICA* 🔍\n\nUso:\n/buscar nome da música\n\nExemplo:\n/buscar tokyo ghoul opening\n\n_Digite o que procura~ 🎵_`;
            }
            
            try {
                logger.debug(`Buscando: ${query}`);
                const search = await yts(query);
                const results = search.videos.slice(0, 5);
                
                if (results.length === 0) {
                    logger.warn(`Nenhum resultado para: ${query}`);
                    return `❌ Não encontrei nada para "${query}".\n\nTente outro termo! 🔍`;
                }
                
                let response = `🔍 *RESULTADOS DA BUSCA* 🔍\n\n_Busca por: "${query}"_\n\n`;
                
                results.forEach((video, index) => {
                    response += `*${index + 1}.* ${video.title}\n`;
                    response += `   ⏱️ ${video.timestamp} | 👁️ ${video.views.toLocaleString()}\n`;
                    response += `   🔗 ${video.url}\n\n`;
                });
                
                response += `_Para baixar, use:\n/play nome da música\n\nAra ara~ 🎧💋_`;
                
                return response;
                
            } catch (error) {
                logger.error('Erro na busca de música', error);
                return `❌ Erro ao buscar músicas.\n\n_Tente novamente! 🔍_`;
            }
        }
        
        // Letra da música
        if (text.startsWith('/letra ')) {
            const query = text.replace('/letra ', '').trim();
            
            if (!query) {
                return `📝 *LETRA DA MÚSICA* 📝\n\nUso:\n/letra nome da música\n\nExemplo:\n/letra unravel\n\n_Qual letra você quer? 🎵_`;
            }
            
            return `📝 *LETRA* 📝\n\n_Desculpe, esse recurso está em desenvolvimento..._\n\n💡 Por enquanto, busque no Google:\n"${query} letra"\n\n_Ara ara~ Em breve terei isso pronto! 😏🎵_`;
        }
        
        // Menu de música
        if (text === '/musica' || text === '/music') {
            return `🎵 *COMANDOS DE MÚSICA* 🎵\n\n*Disponíveis:*\n/play <música> - Tocar música do YouTube\n/buscar <música> - Buscar músicas\n/letra <música> - Letra (em breve)\n\n*Exemplos:*\n/play unravel tokyo ghoul\n/buscar naruto opening\n\n_Boa audição, querido~ 🎧💋_`;
        }
        
        return null;
    }
};