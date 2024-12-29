import db from '../../../models/index.js';

const v2tokens = [
    {
        name: 'CRYO',
        symbol: 'CRYO',
        category: "BIO",
        chain: "ETH",
        address: "0xf4308b0263723b121056938c2172868E408079D0",
        priceUnit: "ETH",
        type: "cryo DAO",
        url: "https://x.com/cryodao"
    },
];

async function seedUniV2Tokens() {
    try {
        // Clear existing records
        await db.UniV2Token.destroy({ where: {} });

        // Insert new records
        await db.UniV2Token.bulkCreate(v2tokens);

        console.log('UniV2Tokens seeded successfully');
    } catch (error) {
        console.error('Error seeding UniV2Tokens:', error);
    }
}

export { seedUniV2Tokens }; 