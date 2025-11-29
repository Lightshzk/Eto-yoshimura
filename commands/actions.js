// commands/actions.js
// Comandos de ações com GIFs

module.exports = {
    handleCommand: (text) => {
        // Beijo
        if (text.startsWith('/beijo')) {
            const kissgifs = [
                'https://aniyuki.com/wp-content/uploads/2021/07/aniyuki-anime-gif-kiss-10.gif',
                'https://aniyuki.com/wp-content/uploads/2021/07/aniyuki-anime-gif-kiss-7.gif',
                'https://aniyuki.com/wp-content/uploads/2021/07/aniyuki-anime-gif-kiss-4.gif',
                'https://aniyuki.com/wp-content/uploads/2021/07/aniyuki-anime-gif-kiss-2.gif',
                'https://aniyuki.com/wp-content/uploads/2021/07/aniyuki-anime-gif-kiss-1.gif'
            ];
            const gif = kissgifs[Math.floor(Math.random() * kissgifs.length)];
            return { 
                text: `💋 *BEIJO ENVIADO!* 💋\n\nAra ara~ Que momento romântico... ou não. 😏💕\n\n_Um beijo meu deixa marca... literal e metaforicamente. 😈_`, 
                media: gif 
            };
        }
        
        // Tapa
        if (text.startsWith('/tapa')) {
            const slapgifs = [
                'https://media1.tenor.com/m/SmVEuFYER5UAAAAd/tapa-anime-tapas.gif',
                        ];
            const gif = slapgifs[Math.floor(Math.random() * slapgifs.length)];
            return { 
                text: `👋 *TAPÃO APLICADO!* 👋\n\nTOMA! 😈💥\n\n_Violência é minha linguagem do amor~ Gostou? 🔥_`, 
                media: gif 
            };
        }
        
        // Abraço
        if (text.startsWith('/abraco')) {
            const huggifs = [
                'https://media1.tenor.com/m/kJgTfbVqA18AAAAC/cling.gif'
            ];
            const gif = huggifs[Math.floor(Math.random() * huggifs.length)];
            return { 
                text: `🤗 *ABRAÇO APERTADO!* 🤗\n\nAwwn~ Que fofo... 💕\n\n_Cuidado, eu abraço MUITO apertado... Não consigo me controlar. 😏🔥_`, 
                media: gif 
            };
        }
        
        // Morder
        if (text.startsWith('/morder')) {
            const bitegifs = [
                'https://giffiles.alphacoders.com/189/189004.gif',
            ];
            const gif = bitegifs[Math.floor(Math.random() * bitegifs.length)];
            return { 
                text: `🦷 *MORDIDA DE GHOUL!* 🦷\n\nNHAM~ 😈🩸\n\n_Minha mordida é especial... Você vai gostar. Ou sangrar. Ou ambos. Provavelmente ambos. 🔥💋_`, 
                media: gif 
            };
        }
              
        // Lamber
        if (text.startsWith('/lamber')) {
            const lickgifs = [
                'https://media.tenor.com/qT4wjVLNLqkAAAAC/anime-lick.gif',
                'https://media.tenor.com/X8mE0gS2wEEAAAAC/lick-anime.gif',
                'https://media.tenor.com/9cCO7lghXs0AAAAC/anime-tongue.gif'
            ];
            const gif = lickgifs[Math.floor(Math.random() * lickgifs.length)];
            return { 
                text: `👅 *LAMBIDA APLICADA* 👅\n\nMmmm~ Delicioso... 😈🔥\n\n_Ghoul provando sua presa... Você tem gosto de medo e desejo misturados. Perfeito. 💋_`, 
                media: gif 
            };
        }
        
        // Agarrar
        if (text.startsWith('/agarrar')) {
            const grabgifs = [
                'https://media.tenor.com/Q8N9jxiNg04AAAAC/anime-grab.gif',
                'https://media.tenor.com/VkpYRJ-X8xQAAAAC/anime-hug.gif',
                'https://media.tenor.com/gCkzQ5E7eGcAAAAC/anime-pull.gif'
            ];
            const gif = grabgifs[Math.floor(Math.random() * grabgifs.length)];
            return { 
                text: `😈 *AGARROU!* 😈\n\nVem aqui você! 💪🔥\n\n_Te peguei. Agora você é MEU brinquedinho. Não tem escapatória~ 😏💋_`, 
                media: gif 
            };
        }
        
        return null;
    }
};