import express from 'express';
import cors from 'cors';

import { seedProjects } from './src/database/seeders/projectSeeder.js';
import { seedAeroTokens } from './src/database/seeders/aeroTokenSeeder.js';
import { seedRaydiumTokens } from './src/database/seeders/raydiumTokenSeeder.js';
import { seedUniV2Tokens } from './src/database/seeders/uniV2TokenSeeder.js';
import { seedUniV3Tokens } from './src/database/seeders/uniV3TokenSeeder.js';

await seedProjects();
await seedAeroTokens();
await seedRaydiumTokens();
await seedUniV2Tokens();
await seedUniV3Tokens();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Frontier Fun Backend API' });
});

// Set port and start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});