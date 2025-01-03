import express from 'express';
import cors from 'cors';
import priceService from './services/priceService.js';

// import { seedProjects } from './src/database/seeders/projectSeeder.cjs';
// import { seedAeroTokens } from './src/database/seeders/aeroTokenSeeder.cjs';
// import { seedRaydiumTokens } from './src/database/seeders/raydiumTokenSeeder.cjs';
// import { seedUniV2Tokens } from './src/database/seeders/uniV2TokenSeeder.cjs';
// import { seedUniV3Tokens } from './src/database/seeders/uniV3TokenSeeder.cjs';

// await seedProjects();
// await seedAeroTokens();
// await seedRaydiumTokens();
// await seedUniV2Tokens();
// await seedUniV3Tokens();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Frontier Fun Backend API' });
});

priceService.initializeAllPriceUpdates();

// Set port and start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});