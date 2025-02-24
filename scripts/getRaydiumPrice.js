import axios from 'axios';
import db from '../models/index.js';
import { Connection, PublicKey } from '@solana/web3.js';


async function getTokenSupply(token) {

    // fetch from the chain 
    try {
        const connection = new Connection('https://api.mainnet-beta.solana.com');
        const supply = await connection.getTokenSupply(new PublicKey(token));
        return supply.value.uiAmount;
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

        // await db.RaydiumToken.update(
        //     { 
        //         price: price,
        //         totalSupply: tokenSupply
        //     }, 
        //     { where: { address: tokenAddress } } 
        // );
        // try {
        //     await upsertRaydiumToken(tokenData);
        // } catch (error) {
        //     console.log('Error updating database',error)
        // }
  
    } catch (error) {
        console.error('Error fetching price:', error);
    }

    return { 
        price, 
        tokenSupply, 
        tokenData 
    };
}

// async function upsertRaydiumToken(tokenData) {
//     try {
//         // Use findOrCreate or upsert depending on your Sequelize version
//         const [token, created] = await db.RaydiumToken.findOrCreate({
//             where: { address: tokenData.address },
//             defaults: tokenData
//         });

//         // If not created, update the existing token
//         if (!created) {
//             await token.update(tokenData);
//         }

//         return token;
//     } catch (error) {
//         console.error('Error upserting Raydium token:', error);
//         throw error;
//     }
// }