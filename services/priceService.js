import db from '../models/index.js';
import getRaydiumPrice from '../scripts/getRaydiumPrice.js';
import getUniV2Price from '../scripts/getUniV2Price.js';
import getUniV3Price from '../scripts/getUniV3Price.js';
import getAeroPrice from '../scripts/getAeroPrice.js';

class PriceService {
    constructor() {
        this.timers = new Map();
    }

    async initializeAllPriceUpdates() {
        try {
            // Get all tokens from each table
            const raydiumTokens = await db.RaydiumToken.findAll({ attributes: ['address'] });
            const uniV2Tokens = await db.UniV2Token.findAll({ attributes: ['address'] });
            const uniV3Tokens = await db.UniV3Token.findAll({ attributes: ['address'] });
            const aeroTokens = await db.AeroToken.findAll({ attributes: ['address'] });

            // Start timers for each token
            raydiumTokens.forEach(token => this.startRaydiumPriceTimer(token.address));
            uniV2Tokens.forEach(token => this.startUniV2PriceTimer(token.address));
            uniV3Tokens.forEach(token => this.startUniV3PriceTimer(token.address));
            aeroTokens.forEach(token => this.startAeroPriceTimer(token.address));

            console.log('[PriceService] All price update timers initialized');
        } catch (error) {
            console.error('[PriceService] Error initializing price updates:', error);
        }
    }

    startRaydiumPriceTimer(pair) {
        const key = `raydium_${pair}`;
        if (this.timers.has(key)) return;

        this.fetchRaydiumPrice(pair);
        const timer = setInterval(() => this.fetchRaydiumPrice(pair), 60000);
        this.timers.set(key, timer);
    }

    startUniV2PriceTimer(pair) {
        const key = `uniV2_${pair}`;
        if (this.timers.has(key)) return;

        this.fetchUniV2Price(pair);
        const timer = setInterval(() => this.fetchUniV2Price(pair), 60000);
        this.timers.set(key, timer);
    }

    startUniV3PriceTimer(pair) {
        const key = `uniV3_${pair}`;
        if (this.timers.has(key)) return;

        this.fetchUniV3Price(pair);
        const timer = setInterval(() => this.fetchUniV3Price(pair), 60000);
        this.timers.set(key, timer);
    }

    startAeroPriceTimer(pair) {
        const key = `aero_${pair}`;
        if (this.timers.has(key)) return;

        this.fetchAeroPrice(pair);
        const timer = setInterval(() => this.fetchAeroPrice(pair), 60000);
        this.timers.set(key, timer);
    }

    async fetchRaydiumPrice(pair) {
        try {
            const result = await getRaydiumPrice(pair);
            await db.RaydiumToken.update(
                { price: result.price, updatedAt: new Date() },
                { where: { address: pair } }
            );
            console.log(`[${new Date().toISOString()}] Updated Raydium price for ${pair}`);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error updating Raydium price for ${pair}:`, error);
        }
    }

    async fetchUniV2Price(pair) {
        try {
            const result = await getUniV2Price(pair);
            await db.UniV2Token.update(
                { price: result.price, updatedAt: new Date() },
                { where: { address: pair } }
            );
            console.log(`[${new Date().toISOString()}] Updated UniV2 price for ${pair}`);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error updating UniV2 price for ${pair}:`, error);
        }
    }

    async fetchUniV3Price(pair) {
        try {
            const result = await getUniV3Price(pair);
            await db.UniV3Token.update(
                { price: result.price, updatedAt: new Date() },
                { where: { address: pair } }
            );
            console.log(`[${new Date().toISOString()}] Updated UniV3 price for ${pair}`);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error updating UniV3 price for ${pair}:`, error);
        }
    }

    async fetchAeroPrice(pair) {
        try {
            const result = await getAeroPrice(pair);
            await db.AeroToken.update(
                { price: result.price, updatedAt: new Date() },
                { where: { address: pair } }
            );
            console.log(`[${new Date().toISOString()}] Updated Aero price for ${pair}`);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error updating Aero price for ${pair}:`, error);
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