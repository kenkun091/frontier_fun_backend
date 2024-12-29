import db from '../models/index.js';

function logAvailableTables() {
    console.log('Available table objects in db:');
    for (const modelName in db) {
        if (db[modelName].tableName) {
            console.log(`Model Name: ${modelName}, Table Name: ${db[modelName].tableName}`);
        }
    }
}

logAvailableTables();