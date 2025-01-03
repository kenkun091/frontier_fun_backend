import axios from 'axios';
// import RaydiumToken from '../models/RaydiumToken.js';
import db from '../models/index.js';

async function getTokenSupply(token) {

    // fetch from the chain 
    const url = 'https://side-restless-vineyard.solana-mainnet.quiknode.pro/ce5d318b8322e2fc172505424d2e802385d20a5b';
    const data = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "getTokenSupply",
        "params": [
            token
        ]
    };
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const tokenSupply = response.data.result.value.uiAmount;

        return tokenSupply;
    } catch (error) {
        console.error('Error fetching token supply:', error);
    }
    return 0;
}

export default async function getRaydiumPrice(pair) {
    const poolUrl = `https://api-v3.raydium.io/pools/info/ids?ids=${pair}`;
    let price = 0;
    let tokenSupply = 0;
    let tokenData = null;

    try {
        const response = await fetch(poolUrl);
        const pool = await response.json();
        
        // Extract token information
        const tokenInfo = pool.data[0];
        price = tokenInfo.price;
        
        // Get total supply
        const tokenAddress = tokenInfo.mintB.address;
        tokenSupply = await getTokenSupply(tokenAddress);

        // Prepare token data for database
        tokenData = {
            symbol: tokenInfo.mintB.symbol || 'UNKNOWN',
            address: tokenAddress,
            url: `https://solscan.io/token/${tokenAddress}`
        };

        // Upsert token data (insert or update if exists)

        try {
            await upsertRaydiumToken(tokenData);
        } catch (error) {
            console.log('Error updating database',error)
        }
  

    } catch (error) {
        console.error('Error fetching price:', error);
    }

    return { 
        price, 
        tokenSupply, 
        tokenData 
    };
}

async function upsertRaydiumToken(tokenData) {
    try {
        // Use findOrCreate or upsert depending on your Sequelize version
        const [token, created] = await db.RaydiumToken.findOrCreate({
            where: { address: tokenData.address },
            defaults: tokenData
        });

        // If not created, update the existing token
        if (!created) {
            await token.update(tokenData);
        }

        return token;
    } catch (error) {
        console.error('Error upserting Raydium token:', error);
        throw error;
    }
}