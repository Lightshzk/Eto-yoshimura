// utils/rateLimiter.js
// Sistema de rate limiting

const RATE_LIMIT_CONFIG = {
    default: { maxRequests: 10, windowMs: 60000 }, // 10 requests por minuto
    music: { maxRequests: 3, windowMs: 60000 },    // 3 downloads por minuto
    games: { maxRequests: 5, windowMs: 60000 }     // 5 comandos de jogo por minuto
};

const rateLimiters = new Map();

const createRateLimiter = (config) => {
    return {
        requests: [],
        config: config,
        check: function() {
            const now = Date.now();
            // Remove requisições antigas fora da janela de tempo
            this.requests = this.requests.filter(time => now - time < this.config.windowMs);

            if (this.requests.length >= this.config.maxRequests) {
                return false; // Limite atingido
            }

            this.requests.push(now);
            return true; // OK
        },
        reset: function() {
            this.requests = [];
        }
    };
};

const rateLimiter = {
    check: (userId, type = 'default') => {
        const config = RATE_LIMIT_CONFIG[type] || RATE_LIMIT_CONFIG.default;
        const key = `${userId}-${type}`;

        if (!rateLimiters.has(key)) {
            rateLimiters.set(key, createRateLimiter(config));
        }

        const limiter = rateLimiters.get(key);
        return limiter.check();
    },

    getRemainingTime: (userId, type = 'default') => {
        const key = `${userId}-${type}`;
        const limiter = rateLimiters.get(key);

        if (!limiter || limiter.requests.length === 0) {
            return 0;
        }

        const oldestRequest = limiter.requests[0];
        const remaining = limiter.config.windowMs - (Date.now() - oldestRequest);
        return Math.max(0, Math.ceil(remaining / 1000));
    },

    reset: (userId, type = 'default') => {
        const key = `${userId}-${type}`;
        if (rateLimiters.has(key)) {
            rateLimiters.get(key).reset();
        }
    }
};

module.exports = rateLimiter;
