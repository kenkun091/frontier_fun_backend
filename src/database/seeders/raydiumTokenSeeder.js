import db from '../../../models/index.js';
// import { isAddress } from "ethers";

const solPairs = {
    RIF: {
        category: "BIO",
        symbol: "RIF",
        address: "A8iNixG97AjK5kCXTdi5ooDg2DrKeEBpnW2Ghchpe4j1",
        type: "pump.science",
        url: "https://www.pump.science/"
    },
    URO: {
        category: "BIO",
        symbol: "URO",
        address: "3hsdbMFsiCh3YCsXoFjgx4TVpxECsUE9nRMgvaoyveQT",
        type: "pump.science",
        url: "https://www.pump.science/"
    },
    Ai16z: {
        category: "AI",
        symbol: "Ai16z",
        address: "DuYFmgxA4KnXV2Sm754UKw1gZ6B3zksaf4E7ibY4fg9R",
        type: "invest agent",
        url: ""
    },
    ZEREBRO: {
        category: "AI",
        symbol: "ZEREBRO", 
        address: "3sjNoCnkkhWPVXYGDtem8rCciHSGc9jSFZuUAzKbvRVp",
        type: "agent meme",
        url: ""
    },
    VVAIFU: {
        category: "AI",
        symbol: "VVAIFU",
        address: "9UMuN94bbuH53F4PTVWDYZoQjsJ3zgEx2j2vtT5Rbo1x",
        type: "launchpad",
        url: "https://vvaifu.fun/"
    },
};

async function seedRaydiumTokens() {
    try {
        // Clear existing records
        await db.RaydiumToken.destroy({ where: {} });

        // Prepare data for bulk insert
        const raydiumTokens = Object.entries(solPairs).map(([key, value]) => ({
            name: key,
            ...value
        }));

        // Insert new records
        await db.RaydiumToken.bulkCreate(raydiumTokens);

        console.log('RaydiumTokens seeded successfully');
    } catch (error) {
        console.error('Error seeding RaydiumTokens:', error);
    }
}

export { seedRaydiumTokens }; 