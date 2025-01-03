'use strict';

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize } from 'sequelize';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import config directly
import config from '../config/config.cjs';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'local';
const dbConfig = config[env];
const db = {};

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
);

// New approach for loading models
const files = await fs.readdir(__dirname);
for (const file of files) {
    if (file !== basename && file.endsWith('.js')) {
        try {
            const modelModule = await import(`./${file}`);
            const model = modelModule.default(sequelize, Sequelize.DataTypes);
            db[model.name] = model;
        } catch (error) {
            console.error(`Error loading model ${file}:`, error);
        }
    }
}

// Run associations
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// console.log('Defined models in db:', Object.keys(db));

export default db;
