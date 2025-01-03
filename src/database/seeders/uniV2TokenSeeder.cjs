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

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            // Dynamically import the db module
            const db = await import('../../../models/index.js');

            // Clear existing records
            await db.default.UniV2Token.destroy({ where: {} });

            // Insert new records
            await db.default.UniV2Token.bulkCreate(v2tokens);

            console.log('UniV2Tokens seeded successfully');
        } catch (error) {
            console.error('Error seeding UniV2Tokens:', error);
        }
    },

    down: async (queryInterface, Sequelize) => {
        // Optionally, you can define how to undo the seeding
        const db = await import('../../../models/index.js');
        await db.default.UniV2Token.destroy({ where: {} });
    }
}; 