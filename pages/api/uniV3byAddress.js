import db from '../../models/index.js';

export default async function handler(req, res) {
    const { pair } = req.query; // Get the pair (token address) from the query parameters

    if (req.method === 'GET') {
        try {
            const tokenData = await db.UniV3Token.findOne({
                where: { address: pair }
            });

            if (!tokenData) {
                return res.status(404).json({ success: false, message: 'Token not found' });
            }

            res.status(200).json({
                success: true,
                tokenData
            });
        } catch (error) {
            console.error('Error fetching UniV3 token data:', error);
            res.status(500).json({ success: false, message: 'Error fetching token data' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}