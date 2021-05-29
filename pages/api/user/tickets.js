import { getDrawsTickets } from 'service/playlottery';

export default async function handler(req, res) {
    const { page, memberID } = req.body;
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // call api
        const result = await getDrawsTickets(memberID, page);
        res.status(200).json(result);
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ reason: 'unknown server error' });
    }
}