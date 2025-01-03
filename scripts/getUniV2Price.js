import { ChainId, Token } from '@uniswap/sdk-core';
import { Pair } from '@uniswap/v2-sdk';
import { ethers, formatUnits } from "ethers";
import uniswapV2poolABI from '../config/uniswapV2poolABI.js'; 
import { provider } from '../config/rpcProvider.js';

// import UniV2Token from '../models/UniV2Token';
import db from '../models/index.js';

export default async function getUniV2Price(pairAddress) {

    try {
  
        const pairContract = new ethers.Contract(pairAddress, uniswapV2poolABI, await provider(chain));
        const reserves = await pairContract["getReserves"]();
        const [reserveRaw0, reserveRaw1] = reserves;
        let reserve0 = 0;
        let reserve1 = 1;
        if (token0.toLowerCase() > token1.toLowerCase()) {
            reserve0 = formatUnits(reserveRaw0, 18); 
            reserve1 = formatUnits(reserveRaw1, 18);
        } else {
            reserve0 = formatUnits(reserveRaw1, 18); 
            reserve1 = formatUnits(reserveRaw0, 18);
        }
        const price = reserve0 / reserve1;
        const tokenData =  {
            address: pairAddress,
            price: price 
        };

        // Upsert token data (insert or update if exists)
        await upsertUniV2Token(tokenData);
    } catch (error) {
        console.error('Error getting price data', error);
        throw error;
    }
    
}

async function upsertUniV2Token(tokenData) {
    try {
        const [token, created] = await db.UniV2Token.findOrCreate({
            where: { address: tokenData.address },
            defaults: tokenData
        });

        if (!created) {
            // If the token already exists, update it
            await token.update(tokenData);
        }

        console.log('Upserted Token:', token);
        return token;
    } catch (error) {
        console.error('Error upserting UniV2 token:', error);
        throw error;
    }
}
