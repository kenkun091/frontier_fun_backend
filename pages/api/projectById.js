import db from '../../models/index.js';

export default async function handler(req, res) {
    const { id } = req.query; // Get the project ID from query parameters

    if (req.method === 'GET') {
        try {
            const projectData = await db.Project.findOne({
                where: { id: id }
            });

            if (!projectData) {
                return res.status(404).json({ success: false, message: 'Project not found' });
            }

            res.status(200).json({
                success: true,
                projectData
            });
        } catch (error) {
            console.error('Error fetching project data:', error);
            res.status(500).json({ success: false, message: 'Error fetching project data' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}