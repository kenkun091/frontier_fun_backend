import db from '../../../models/index.js';

const aeroTokens = [
    {
        name: 'AB4AD',
        category: "BIO",
        symbol: "BIO",
        chain: "BASE",
        address: "0x57414656AC535680367f519eeC9f0D7Ffe99e2D0",
        type: "first drug",
        url: ""
    },

];


async function seedAeroTokens() {
    try {

        // Check if db.AeroToken is defined
        if (!db.AeroToken) {
            throw new Error('AeroToken model is not defined in the db object.');
        }
        // Clear existing records
        await db.AeroToken.destroy({ where: {} });

        // Insert new records
        await db.AeroToken.bulkCreate(aeroTokens);

        console.log('AeroTokens seeded successfully');
    } catch (error) {
        console.error('Error seeding AeroTokens:', error);
    }
}

export {seedAeroTokens};