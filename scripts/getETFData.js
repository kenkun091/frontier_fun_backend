import dotenv from 'dotenv';
dotenv.config();

import puppeteer from 'puppeteer';
import db from '../models/index.js';

async function getETFData() {
  try {
    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();
    
    await page.setViewport({ width: 1920, height: 1080 });
    
    await page.goto('https://www.coinglass.com/zh/eth-etf', {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    await page.waitForSelector('table', { timeout: 30000 });

    const ethData = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('table tr'));
      return rows.slice(1).map(row => {
        const cells = Array.from(row.querySelectorAll('td'));
        const lastCell = cells[cells.length - 1];
        const flowText = lastCell?.textContent?.trim() || '0';
        
        let netFlow = 0;
        if (flowText.includes('万')) {
          netFlow = parseFloat(flowText.replace('+', '').replace('万', '')) * 10000;
        } else {
          netFlow = parseFloat(flowText.replace('+', '') || '0');
        }

        return {
          date: cells[0]?.textContent?.trim() || '',
          netFlow: netFlow,
        };
      }).filter(item => item.date !== '' && !isNaN(item.netFlow) && item.date !== '-');
    });

    // Save data to the ETFData table
    for (const data of ethData) {
      await db.ETFData.create({
        date: data.date,
        netFlow: data.netFlow,
      });
    }

    await browser.close();
    // return ethData;

  } catch (error) {
    console.error('ERROR retrieving ETF data:', error);
    throw error;
  }
}

export default getETFData;