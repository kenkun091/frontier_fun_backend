import express from 'express';
import cors from 'cors';


import priceService from './services/priceService.js';

import aeroTokenRoute from './routes/aeroToken.js';
import raydiumTokenRoute from './routes/raydiumToken.js';
import projectsRoute from './routes/tokenProjects.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Frontier Fun Backend API' });
});

priceService.initializeAllPriceUpdates();

app.use('/api/aeroToken', aeroTokenRoute);
app.use('/api/raydiumToken', raydiumTokenRoute);
app.use('/api/projects', projectsRoute);

// Set port and start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});