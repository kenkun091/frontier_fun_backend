import db from '../models/index.js';
import getRaydiumPrice from '../scripts/getRaydiumPrice.js';
import getUniV2Price from '../scripts/getUniV2Price.js';
import getUniV3Price from '../scripts/getUniV3Price.js';
import getAeroPrice from '../scripts/getAeroPrice.js';
import getUSDtotal from '../scripts/getUsdData.js';
import getETFData from '../scripts/getETFData.js';

const fetchInterval = 60000;

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
        const timer = setInterval(() => this.fetchAeroPrice(chain, address), 60000);
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

            await getRaydiumPrice(address);
            // const result = await getRaydiumPrice(address);

            // await db.RaydiumToken.update(
            //     { 
            //         price: result.price, 
            //         updatedAt: new Date(), 
            //         totalSupply: result.tokenSupply
            //      },
            //     { where: { address: address } }
            // );
            console.log(`[${new Date().toISOString()}] Updated Raydium price for ${address}`);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error updating Raydium price for ${address}:`, error);
        }
    }


    async fetchUniV2Price(chain, address, priceUnit) {
        try {
            await getUniV2Price(chain, address, priceUnit);
            // await db.UniV2Token.update(
            //     { price: price, updatedAt: new Date() },
            //     { where: { address:address } }
            // );
            console.log(`[${new Date().toISOString()}] Updated UniV2 price for ${address}`);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error updating UniV2 price for ${address}:`, error);
        }
    }

    async fetchUniV3Price(chain, address, fee, priceUnit) {

        try {
            await getUniV3Price(chain, address, fee, priceUnit);
     
            // await db.UniV3Token.update(
            //     { price: price }, 
            //     { where: { address: address } } 
            // );

            console.log(`[${new Date().toISOString()}] Updated UniV3 price for ${address}`);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error updating UniV3 price for ${address}:`, error);
        }
    }

    async fetchAeroPrice(chain, address) {
        try {
            await getAeroPrice(chain, address);
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