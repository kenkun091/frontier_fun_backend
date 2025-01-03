import db from '../models/index.js';
import axios from 'axios';

async function getAeroPrice(pairAddress) {
  
    const pairContract = new ethers.Contract(pairAddress, uniswapV2poolABI, await provider(chain));
    const reserves = await pairContract.getReserves();
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
    // return price;
    await db.AeroToken.update(
        {price:price},
        {where:{address: pairAddress}}
    );
}

export default getAeroPrice;
