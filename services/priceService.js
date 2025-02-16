import db from '../models/index.js';
import getRaydiumPrice from '../scripts/getRaydiumPrice.js';
import getUniV2Price from '../scripts/getUniV2Price.js';
import getUniV3Price from '../scripts/getUniV3Price.js';
import getAeroPrice from '../scripts/getAeroPrice.js';
import getUSDtotal from '../scripts/getUsdData.js';
import getETFData from '../scripts/getETFData.js';
import getErc20Supply from '../scripts/getErc20Supply.js';

import { FEE_RATE_MEDIUM} from '../config/tokenUniV3Config.js';

const fetchInterval = 60000;
const ETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

class PriceService {
    constructor() {
        this.timers = new Map();
    }

    async initializeAllPriceUpdates() {
        try {
            // Get all tokens from each table
            const raydiumTokens = await db.RaydiumToken.findAll({ attributes: ['address'] });
            const uniV2Tokens = await db.UniV2Token.findAll({ attributes: ['address', 'chain', 'priceUnit'] });
            const uniV3Tokens = await db.UniV3Token.findAll({ attributes: ['address', 'chain', 'poolFee', 'priceUnit'] });
            const aeroTokens = await db.AeroToken.findAll({ attributes: ['address', 'chain'] });
            
            // Start timers for each token
            raydiumTokens.forEach(token => this.startRaydiumPriceTimer(token.address));
            uniV2Tokens.forEach(token => this.startUniV2PriceTimer(token.chain, token.address, token.priceUnit));
            uniV3Tokens.forEach(token => this.startUniV3PriceTimer(token.chain, token.address, token.poolFee, token.priceUnit));
            aeroTokens.forEach(token => this.startAeroPriceTimer(token.chain, token.address));
            
            // Start timers for ETF and USD data
            this.startDailyFetchTimer();

            console.log('[PriceService] All price update timers initialized');
        } catch (error) {
            console.error('[PriceService] Error initializing price updates:', error);
        }
    }

    startRaydiumPriceTimer(address) {
        const key = `raydium_${address}`;
        if (this.timers.has(key)) return;

        this.fetchRaydiumPrice(address);
        const timer = setInterval(() => this.fetchRaydiumPrice(address), 60000);
        this.timers.set(key, timer);
    }

    startUniV2PriceTimer(chain, address, priceUnit) {
        const key = `uniV2_${address}`;
        if (this.timers.has(key)) return;

        this.fetchUniV2Price(chain, address, priceUnit);
        const timer = setInterval(() => this.fetchUniV2Price(chain, address, priceUnit), fetchInterval);
        this.timers.set(key, timer);
    }

    startUniV3PriceTimer(chain, address, fee, priceUnit) {
        const key = `uniV3_${address}`;
        if (this.timers.has(key)) return;

        this.fetchUniV3Price(chain, address, fee, priceUnit);
        const timer = setInterval(() => this.fetchUniV3Price(chain, address, fee, priceUnit), fetchInterval);
        this.timers.set(key, timer);
    }

    startAeroPriceTimer(chain, address) {
        const key = `aero_${address}`;
        if (this.timers.has(key)) return;

        this.fetchAeroPrice(chain, address);
        const timer = setInterval(() => this.fetchAeroPrice(chain, address), fetchInterval);
        this.timers.set(key, timer);
    }

    startDailyFetchTimer(){
        const fetchData = async () => {
            try {
                await getETFData();
                await getUSDtotal();
                console.log(`[${new Date().toISOString()}] Successfully fetched ETF data and USD total.`);
            } catch (error) {
                console.error(`[${new Date().toISOString()}] Error fetching ETF data or USD total:`, error);
            }
        };

        // Fetch immediately on startup
        fetchData();

        // Set interval to fetch every 24 hours (86400000 milliseconds)
        const timer = setInterval(fetchData, 86400000);
        this.timers.set('dailyFetch', timer);
    }

    async fetchRaydiumPrice(address) {
        try {
            const {price: tokenPriceSOL, tokenSupply, tokenData} =  await getRaydiumPrice(address);
            const { price: priceSOLUSDC } = await getRaydiumPrice("8sLbNZoA1cfnvMJLPfp98ZLAnFSYCFApfJKMbiXNLwxj");
            const price = priceSOLUSDC / tokenPriceSOL;

            await db.RaydiumToken.update(
                { 
                    price: price.toFixed(6), 
                    updatedAt: new Date(), 
                    totalSupply: tokenSupply
                 },
                { where: { address: address } }
            );

            console.log(`[${new Date().toISOString()}] Updated Raydium price for ${address}`);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error updating Raydium price for ${address}:`, error);
        }
    }


    async fetchUniV2Price(chain, address, priceUnit) {
        try {
            const priceETHUSDT = await getUniV3Price("ETH", USDT, FEE_RATE_MEDIUM, "ETH")* Math.pow(10, 12);
            const tokenPriceRaw = await getUniV2Price(chain, address, priceUnit);
            let price = 0;
            if (priceUnit == "ETH")
                price = priceETHUSDT * tokenPriceRaw;
            else if (priceUnit == "USDC")
                price = tokenPriceRaw * Math.pow(10, 12);
            const tokenSupply =  Number(await getErc20Supply(chain, address));
            
        await db.UniV2Token.update(
            { 
                price: price,
                totalSupply: tokenSupply
            }, 
            { where: { address: address } } 
        );
            console.log(`[${new Date().toISOString()}] Updated UniV2 price for ${address}`);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error updating UniV2 price for ${address}:`, error);
        }
    }

    async fetchUniV3Price(chain, address, fee, priceUnit) {

        try {
            const priceETHUSDT = await getUniV3Price("ETH", USDT, FEE_RATE_MEDIUM, "ETH")* Math.pow(10, 12);
            const tokenPriceRaw = await getUniV3Price(chain, address, fee, priceUnit);
            
            let price = 0;
            if (priceUnit == "ETH")
                price = priceETHUSDT * tokenPriceRaw;
            else if (priceUnit == "USDC")
                price = tokenPriceRaw * Math.pow(10, 12);
            const tokenSupply = Number(await getErc20Supply(chain, address));

            await db.UniV3Token.update(
                { price: price,
                  totalSupply: tokenSupply
                 }, 
                { where: { address: address } } 
            );

            console.log(`[${new Date().toISOString()}] Updated UniV3 price for ${address}`);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error updating UniV3 price for ${address}:`, error);
        }
    }

    async fetchAeroPrice(chain, address) {
        try {

            const priceETHUSDT = await getUniV3Price("ETH", USDT, FEE_RATE_MEDIUM, "ETH")* Math.pow(10, 12);
            const priceRaw = await getAeroPrice(chain, address);
            const price = priceETHUSDT * priceRaw;
            const totalSupply = Number(await getErc20Supply(chain, address));

            await db.AeroToken.update(
                {
                    price:price,
                    totalSupply: totalSupply
                },
    
                {where:{address: address}}
            );

            console.log(`[${new Date().toISOString()}] Updated Aero price for ${address}}`);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error updating Aero price for ${address}:`, error);
        }
    }

    async fetchETFData() {
        try {
            const result = await getETFData();
            console.log(`[${new Date().toISOString()}] Fetched ETF data:`, result);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error fetching ETF data:`, error);
        }
    }

    async fetchUSDtotal() {
        try {
            const result = await getUSDtotal();
            console.log(`[${new Date().toISOString()}] Fetched USD total:`, result);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error fetching USD total:`, error);
        }
    }

    stopTimer(pair) {
        const timer = this.timers.get(pair);
        if (timer) {
            clearInterval(timer);
            this.timers.delete(pair);
        }
    }

    stopAllTimers() {
        for (const [pair, timer] of this.timers) {
            clearInterval(timer);
        }
        this.timers.clear();
    }
}

export default new PriceService();