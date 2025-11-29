// utils/storage.js
// Sistema de armazenamento de dados

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');

// Criar diretório de dados se não existir
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

const storage = {
    // Salvar dados em arquivo JSON
    save: (filename, data) => {
        try {
            const filepath = path.join(DATA_DIR, `${filename}.json`);
            fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
            return true;
        } catch (error) {
            console.error(`Erro ao salvar ${filename}:`, error);
            return false;
        }
    },

    // Carregar dados de arquivo JSON
    load: (filename, defaultValue = {}) => {
        try {
            const filepath = path.join(DATA_DIR, `${filename}.json`);
            if (fs.existsSync(filepath)) {
                const data = fs.readFileSync(filepath, 'utf8');
                return JSON.parse(data);
            }
            return defaultValue;
        } catch (error) {
            console.error(`Erro ao carregar ${filename}:`, error);
            return defaultValue;
        }
    },

    // Converter Map para objeto para salvar em JSON
    mapToObject: (map) => {
        const obj = {};
        map.forEach((value, key) => {
            obj[key] = value;
        });
        return obj;
    },

    // Converter objeto de volta para Map
    objectToMap: (obj) => {
        const map = new Map();
        Object.keys(obj).forEach((key) => {
            map.set(key, obj[key]);
        });
        return map;
    }
};

module.exports = storage;
