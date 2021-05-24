import { requestWithdraw } from 'service/cashier';

export default async function handler(req, res) {
    const { amount, ticker, address } = req.query;
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // call api
        const result = await requestWithdraw(amount, ticker, address);
        res.status(200).json(result);
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ reason: 'unknown server error' });
    }
}