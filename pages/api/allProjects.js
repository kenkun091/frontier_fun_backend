import db from '../../models/index.js';

export default async function handler(req, res) {
    if (req.method === 'GET') {
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
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}