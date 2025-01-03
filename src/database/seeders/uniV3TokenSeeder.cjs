// src/database/seeders/uniV3TokenSeeder.cjs
// feeRate
const FEE_RATE_MEDIUM = 3000;
const FEE_RATE_LARGE = 10000;

const v3tokens = {
    PSY: {
        category: "BIO",
        chain: "ETH",
        symbol: "PSY",
        address: "0x2196b84eace74867b73fb003aff93c11fce1d47a",
        priceUnit: "ETH",
        type: "psy DAO",
        url: "https://x.com/psy_dao",
        poolFee: FEE_RATE_LARGE
    },
    VITA: {
        category: "BIO",
        chain: "ETH",
        symbol: "VITA",
        address: "0x81f8f0bb1cB2A06649E51913A151F0E7Ef6FA321",
        priceUnit: "ETH",
        type: "vita DAO",
        url: "https://x.com/vita_dao",
        poolFee: FEE_RATE_LARGE
    },
    ATH: {
        category: "BIO",
        chain: "ETH",
        symbol: "ATH",
        address: "0xA4fFdf3208F46898CE063e25c1C43056FA754739",
        priceUnit: "ETH",
        type: "athena DAO",
        url: "https://x.com/athena_DAO_",
        poolFee: FEE_RATE_LARGE
    },
    HAIR: {
        category: "BIO",
        chain: "ETH",
        symbol: "HAIR",
        address: "0x9Ce115f0341ae5daBC8B477b74E83db2018A6f42",
        priceUnit: "ETH",
        type: "hair DAO",
        url: "https://x.com/HairDAO_",
        poolFee: FEE_RATE_LARGE
    },
    GROW: {
        category: "BIO",
        chain: "ETH",
        symbol: "GROW",
        address: "0x761A3557184cbC07b7493da0661c41177b2f97fA",
        priceUnit: "ETH",
        type: "valley DAO",
        url: "https://x.com/valley_dao",
        poolFee: FEE_RATE_LARGE
    },
    NEURON: {
        category: "BIO",
        chain: "ETH",
        symbol: "NEURON",
        address: "0xab814ce69E15F6B9660A3B184c0B0C97B9394A6b",
        priceUnit: "ETH",
        type: "cerebrum DAO",
        url: "https://x.com/Cerebrum_DAO",
        poolFee: FEE_RATE_LARGE
    },
    ANON: {
        category: "ZK",
        chain: "BASE",
        symbol: "ANON",
        address: "0x0Db510e79909666d6dEc7f5e49370838c16D950f",
        priceUnit: "ETH",
        type: "zk(temp)",
        url: "https://anoncast.org/", 
        poolFee: FEE_RATE_LARGE
    },
    AIXBT: {
        category: "AI",
        chain: "BASE",
        symbol: "AIXBT",
        address: "0x4F9Fd6Be4a90f2620860d680c0d4d5Fb53d1A825",
        priceUnit: "USDC",
        type: "invest agent",
        url: "https://x.com/aixbt_agent",
        poolFee: FEE_RATE_MEDIUM
    },
    VIRTUAL: {
        category: "AI", 
        chain: "BASE",
        symbol: "VIRTUAL",
        address: "0x0b3e328455c4059EEb9e3f84b5543F74E24e7E1b",
        priceUnit: "ETH", 
        type: "launchpad", 
        url: "https://x.com/virtuals_io",
        poolFee: FEE_RATE_MEDIUM
    },
    Clanker: {
        category: "AI",
        chain: "BASE",
        symbol: "Clanker",
        address: "0x1bc0c42215582d5A085795f4baDbaC3ff36d1Bcb",
        priceUnit: "ETH",
        type: "launchpad",
        url: "https://www.clanker.world/clanker",
        poolFee: FEE_RATE_LARGE
    },
    BYTES: {
        category: "AI",
        chain: "ETH",
        symbol: "BYTES",
        address: "0xa19f5264f7d7be11c451c093d8f92592820bea86",
        priceUnit: "ETH",
        type: "AI meme",
        url: "-",
        poolFee: FEE_RATE_LARGE
    },
};

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            // Dynamically import the db module
            const db = await import('../../../models/index.js');

            // Clear existing records
            await db.default.UniV3Token.destroy({ where: {} });

            // Insert new records
            const tokensArray = Object.entries(v3tokens).map(([key, value]) => ({
                name: key,
                ...value
            }));
            await db.default.UniV3Token.bulkCreate(tokensArray);

            console.log('UniV3Tokens seeded successfully');
        } catch (error) {
            console.error('Error seeding UniV3Tokens:', error);
        }
    },

    down: async (queryInterface, Sequelize) => {
        // Optionally, you can define how to undo the seeding
        const db = await import('../../../models/index.js');
        await db.default.UniV3Token.destroy({ where: {} });
    }
};