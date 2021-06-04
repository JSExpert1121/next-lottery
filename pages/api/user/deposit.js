import { confirmProcessorDeposit } from 'service/cashier';

export default async function handler(req, res) {
    const { memberID, amount, ticker } = req.body;
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // call api
        const result = await confirmProcessorDeposit(memberID, amount, ticker);
        res.status(200).json(result);
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ reason: 'unknown server error' });
    }
}