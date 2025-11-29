// utils/logger.js
// Sistema de logging e tratamento de erros

const fs = require('fs');
const path = require('path');

const LOG_DIR = path.join(__dirname, '../logs');

// Criar diretório de logs se não existir
if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
}

const getTimestamp = () => {
    return new Date().toLocaleString('pt-BR');
};

const logger = {
    info: (message) => {
        const log = `[${getTimestamp()}] ℹ️ INFO: ${message}`;
        console.log(log);
        appendToLog(log, 'info');
    },

    error: (message, error = null) => {
        const errorMsg = error ? `${error.message}\n${error.stack}` : '';
        const log = `[${getTimestamp()}] ❌ ERROR: ${message}\n${errorMsg}`;
        console.error(log);
        appendToLog(log, 'error');
    },

    warn: (message) => {
        const log = `[${getTimestamp()}] ⚠️ WARNING: ${message}`;
        console.warn(log);
        appendToLog(log, 'warning');
    },

    debug: (message) => {
        const log = `[${getTimestamp()}] 🔍 DEBUG: ${message}`;
        console.log(log);
        appendToLog(log, 'debug');
    },

    success: (message) => {
        const log = `[${getTimestamp()}] ✅ SUCCESS: ${message}`;
        console.log(log);
        appendToLog(log, 'success');
    }
};

const appendToLog = (message, type = 'general') => {
    const date = new Date().toISOString().split('T')[0];
    const logFile = path.join(LOG_DIR, `${type}-${date}.log`);

    fs.appendFile(logFile, message + '\n', (err) => {
        if (err) console.error('Erro ao escrever log:', err);
    });
};

module.exports = logger;
