import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import UsdData from '../models/USDData.js'; // Import the UsdData model

async function getUSDtotal() {
  
  const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY, // Use environment variable for API key
        },
        params: {
          start: 1,
          limit: 20,
        }
      }
  );

  if (response && response.data.data) {
      const cryptoData = response.data.data;
      // look up for usdt & usdc
      const usdt = cryptoData.find((crypto) => crypto.symbol === 'USDT');
      const usdc = cryptoData.find((crypto) => crypto.symbol === 'USDC');
      const usdt_market_cap = usdt?.quote.USD.market_cap || 0;
      const usdc_market_cap = usdc?.quote.USD.market_cap || 0;
      console.log(usdt);
      console.log(usdc);

      // Save data to the database
      await UsdData.create({
        symbol: 'USDT',
        market_cap: usdt_market_cap,
      });

      await UsdData.create({
        symbol: 'USDC',
        market_cap: usdc_market_cap,
      });

      return usdt_market_cap + usdc_market_cap;
  } 

  return 0;
}

export default getUSDtotal;