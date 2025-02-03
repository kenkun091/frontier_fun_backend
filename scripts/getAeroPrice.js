import db from '../models/index.js';
import {ethers, formatUnits} from 'ethers';
import uniswapV2poolABI from '../config/uniswapV2poolABI.js'; 
import { provider } from '../config/rpcProvider.js';


async function getAeroPrice(chain, token0) {
    try {
        const factoryAddress = "0x420DD381b31aEf6683db6B902084cB0FFECe40Da";
        const factoryABI = [
            "function getPool(address tokenA, address tokenB, bool stable) external view returns (address)"
        ];

        const token1 = getToken1Address(chain);
        const factoryContract = new ethers.Contract(factoryAddress, factoryABI, await provider(chain));
        const pairAddress = await factoryContract.getPool(token0, token1, false);        
        const pairContract = new ethers.Contract(pairAddress, uniswapV2poolABI, await provider(chain));
    
        const reserves = await pairContract.getReserves();
        const totalSupply = await pairContract.totalSupply();
 
        const [reserveRaw0, reserveRaw1] = reserves;
        let reserve0 = 0;
        let reserve1 = 1;
        reserve0 = formatUnits(reserveRaw0, 18); 
        reserve1 = formatUnits(reserveRaw1, 18);
        if (token0.toLowerCase() > token1.toLowerCase()) {
            reserve0 = formatUnits(reserveRaw0, 18); 
            reserve1 = formatUnits(reserveRaw1, 18);
        } else {
            reserve0 = formatUnits(reserveRaw1, 18); 
            reserve1 = formatUnits(reserveRaw0, 18);
        }
        const price = reserve0 / reserve1;
        // return price;

        await db.AeroToken.update(
            {
                price:price,
                totalSupply: totalSupply
            },
 
            {where:{address: token0}}
        );
    } catch(err){
        console.log('Error updating AeroToken:', err);
    }
    
}

function getToken1Address(chain){
    if (chain == "ETH")
        return "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    else if (chain == "BASE") 
        return "0x4200000000000000000000000000000000000006";
    return "";
}

export default getAeroPrice;
