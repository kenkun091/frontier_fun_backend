const aeroTokens = [
    {
        name: 'AB4AD',
        category: "AERO",
        symbol: "BIO",
        chain: "BASE",
        address: "0x57414656AC535680367f519eeC9f0D7Ffe99e2D0",
        type: "first drug",
        url: ""
    },
];

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            // Dynamically import the db module
            const db = await import('../../../models/index.js');

            // Check if db.AeroToken is defined
            if (!db.default.AeroToken) {
                throw new Error('AeroToken model is not defined in the db object.');
            }

            // Clear existing records
            await db.default.AeroToken.destroy({ where: {} });

            // Insert new records
            await db.default.AeroToken.bulkCreate(aeroTokens);

            console.log('AeroTokens seeded successfully');
        } catch (error) {
            console.error('Error seeding AeroTokens:', error);
        }
    },

    down: async (queryInterface, Sequelize) => {
        // Optionally, you can define how to undo the seeding
        const db = await import('../../../models/index.js');
        await db.default.AeroToken.destroy({ where: {} });
    }
};