module.exports = {
    handleCommand: (text, chat) => {
        if (text === '/sexo') return 'MODO SEXO\n\nMarque alguém: /sexo @pessoa';
        if (text.startsWith('/sexo @')) return 'SEXO INTENSO!\n\nAlguém meteu gostoso! 😈';

        if (text === '/chupar') return 'CHUPADA\n\nMarque alguém: /chupar @pessoa';
        if (text.startsWith('/chupar @')) return 'CHUPADA GOSTOSA!\n\nTécnica perfeita! 😈';

        if (text === '/dominar') return 'DOMINACAO\n\nMarque alguém: /dominar @pessoa';
        if (text.startsWith('/dominar @')) return 'DOMINACAO ABSOLUTA!\n\nTentáculos! 😈';

        if (text === '/amarrar') return 'BONDAGE\n\nMarque alguém: /amarrar @pessoa';
        if (text.startsWith('/amarrar @')) return 'AMARRADO!\n\nTentáculos kagune! 😈';

        if (text === '/provocar') return 'PROVOCACAO\n\nMarque alguém: /provocar @pessoa';
        if (text.startsWith('/provocar @')) return 'PROVOCACAO FATAL!\n\nDesejo explodindo! 🔥';

        if (text === '/pegar') return 'PEGACAO\n\nMarque alguém: /pegar @pessoa';
        if (text.startsWith('/pegar @')) return 'PEGACAO APAIXONADA!\n\nBeijo profundo! 😈';

        if (text === '/meter') return 'SEM CENSURA\n\nMarque alguém: /meter @pessoa';
        if (text.startsWith('/meter @')) return 'METENDO GOSTOSO!\n\nSem pausa! 😈';

        if (text === '/suruba') return chat.isGroup ? 'SURUBA! ORGIA! 😈' : 'Suruba em grupo!';
        if (text === '/gemido') return 'GEMIDO: Aaaahhhhh! 😈';
        if (text === '/tesao') {
            const m = Math.floor(Math.random() * 101);
            return 'TESAO: ' + m + '%';
        }

        if (text.startsWith('/lamber @')) return 'LAMBIDA!\n\nToda saliva! 😈';

        return null;
    }
};
