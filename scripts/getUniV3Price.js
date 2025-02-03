import { ethers } from "ethers";
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json' assert {type: "json"};
import { provider } from '../config/rpcProvider.js';
import db from '../models/index.js';

const calculatePrice = (sqrtPriceX96) => {
    const numerator = BigInt(sqrtPriceX96) * BigInt(sqrtPriceX96);
    const denominator = BigInt(2) ** BigInt(192); // 2^(96*2)
    return Number(numerator) / Number(denominator);
};

const factoryABI = [
    "function getPool(address tokenA, address tokenB, uint24 fee) external view returns (address)"
];

export default async function getUniV3Price(chain, token0, fee, priceUnit) {

    const factoryAddress = getFactoryAddress(chain);
    const token1 = getToken1Address(chain, priceUnit);

    // construct Uni V3 factory contract
    const factoryContract = new ethers.Contract(factoryAddress, factoryABI, await provider(chain));
    const poolAddress = await factoryContract.getPool(token0, token1, fee);

    // construct pool contract
    const poolContract = new ethers.Contract(poolAddress, IUniswapV3PoolABI.abi, await provider(chain));
    // invoke slot0() to get sqrtPriceX96
    const { sqrtPriceX96 } = await poolContract.slot0();
    // calculatePrice
    const price = calculatePrice(sqrtPriceX96);


    const totalSupply = await poolContract.liquidity();

    new Promise(resolve => setTimeout(resolve, 10000));

    await db.UniV3Token.update(
        { price: price ,
            totalSupply: totalSupply
        }, 
        { where: { address: token0 } } 
    );
    // return price;

}

function getFactoryAddress(chain){
    if (chain == "ETH") {
        return "0x1F98431c8aD98523631AE4a59f267346ea31F984";
    } else if (chain == "BASE") {
        return "0x33128a8fC17869897dcE68Ed026d694621f6FDfD";
    } else {
        return ""
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