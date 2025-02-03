import { ChainId, Token } from '@uniswap/sdk-core';
import { Pair } from '@uniswap/v2-sdk';
import { ethers, formatUnits } from "ethers";
import uniswapV2poolABI from '../config/uniswapV2poolABI.js'; 
import { provider } from '../config/rpcProvider.js';
import db from '../models/index.js';

export default async function getUniV2Price(chain, token0, priceUnit) {

    try {
        const token1 = getToken1Address(chain, priceUnit);
        const Token0 = new Token(ChainId.MAINNET, token0, 18);
        const Token1 = new Token(ChainId.MAINNET, token1, 18);

        const pairAddress = Pair.getAddress(Token0, Token1);
        const pairContract = new ethers.Contract(pairAddress, uniswapV2poolABI, await provider(chain));
        const reserves = await pairContract["getReserves"]();
        const totalSupply = await pairContract.totalSupply();
 

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
        await db.UniV2Token.update(
            { 
                price: price,
                totalSupply: totalSupply
            }, 
            { where: { address: token0 } } 
        );
        // return price;

    } catch (error) {
        console.error('Error getting price data', error);
        throw error;
    }
    
}

function getToken1Address(chain, priceUnit){
    if (chain == "ETH" && priceUnit =="ETH")
        return "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    else if (chain == "BASE" && priceUnit == "ETH") 
        return "0x4200000000000000000000000000000000000006";
    else if (chain == "BASE" && priceUnit == "USDC") 
        return "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
    return "";
}