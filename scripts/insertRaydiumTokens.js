import db from '../models/index.js'; // Import your database models

const solPairs = {
    RIF: {
        category: "BIO",
        address: "A8iNixG97AjK5kCXTdi5ooDg2DrKeEBpnW2Ghchpe4j1",
        type: "pump.science",
        url: "https://www.pump.science/"
    },
    URO: {
        category: "BIO",
        address: "3hsdbMFsiCh3YCsXoFjgx4TVpxECsUE9nRMgvaoyveQT",
        type: "pump.science",
        url: "https://www.pump.science/"
    },
    Ai16z: {
        category: "AI",
        address: "DuYFmgxA4KnXV2Sm754UKw1gZ6B3zksaf4E7ibY4fg9R",
        type: "invest agent",
        url: ""
    },
    ZEREBRO: {
        category: "AI", 
        address: "3sjNoCnkkhWPVXYGDtem8rCciHSGc9jSFZuUAzKbvRVp",
        type: "agent meme",
        url: ""
    },
    VVAIFU: {
        category: "AI",
        address: "9UMuN94bbuH53F4PTVWDYZoQjsJ3zgEx2j2vtT5Rbo1x",
        type: "launchpad",
        url: "https://vvaifu.fun/"
    },
};

async function insertRaydiumTokens() {
    try {
        for (const [symbol, tokenData] of Object.entries(solPairs)) {
            // Prepare the data to be inserted
            const data = {
                symbol: symbol,
                category: tokenData.category,
                address: tokenData.address,
                type: tokenData.type,
                url: tokenData.url
            };

            // Upsert the token data into the database
            const [token, created] = await db.RaydiumToken.findOrCreate({
                where: { address: tokenData.address },
                defaults: data
            });

            if (!created) {
                // If the token already exists, update it
                await token.update(data);
                console.log(`Updated token: ${symbol}`);
            } else {
                console.log(`Inserted token: ${symbol}`);
            }
        }
    } catch (error) {
        console.error('Error inserting Raydium tokens:', error);
    }
}

// Execute the function
insertRaydiumTokens();