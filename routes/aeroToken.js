import express from 'express';
import db from '../models/index.js'; // Adjust the path as necessary

const router = express.Router();

// GET /api/aeroToken
router.get('/', async (req, res) => {
    const { addr } = req.query; // Get the pair (token address) from the query parameters

    try {
        const tokenData = await db.AeroToken.findOne({
            where: { address: addr }
        });

        if (!tokenData) {
            return res.status(404).json({ success: false, message: 'Token not found' });
        }

        res.status(200).json({
            success: true,
            tokenData
        });
    } catch (error) {
        console.error('Error fetching Aero token data:', error);
        res.status(500).json({ success: false, message: 'Error fetching token data' });
    }
});

export default router;