import getUniV3Price from './getUniV3Price.js';
import getRaydiumPrice from './getRaydiumPrice.js';
import getUSDtotal from './getUsdData.js';
import db from '../models/index.js';

async function testConnection() {
    try {
      await db.sequelize.authenticate();
      console.log('Connection to the database has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  
//   testConnection();

// Token addresses on Ethereum mainnet
const ETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';  // WETH
const USDT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // USDT
const FEE_TIER = 3000; // 0.3%

const raydiumAddress = '8sLbNZoA1cfnvMJLPfp98ZLAnFSYCFApfJKMbiXNLwxj'

async function test() {
    // const result = await getRaydiumPrice(raydiumAddress);
    const result = await getUSDtotal();
    console.log(result);
}

// async function testPrice() {
//     try {
//         await getUniV3Price(
//             "ETH",
//             ETH_ADDRESS,
//             USDT_ADDRESS,
//             FEE_TIER
//         );
//         console.log("Price fetch completed");
//     } catch (error) {
//         console.error("Error fetching price:", error);
//     }
// }

test();