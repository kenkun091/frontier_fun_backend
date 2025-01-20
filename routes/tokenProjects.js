import express from 'express';
import db from '../models/index.js';

const router = express.Router();

// GET /api/tokenProjects
router.get('/', async (req, res) => {
    try {
        const projects = await db.Project.findAll();
        res.status(200).json({
            success: true,
            projects
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ success: false, message: 'Error fetching projects' });
    }
});

export default router;