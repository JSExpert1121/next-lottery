import { confirmProcessorOrder } from 'service/cashier';

export default async function handler(req, res) {
    const { memberID, amount, ticker } = req.query;
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // call api
        const result = await confirmProcessorOrder(memberID, amount, ticker);

        // check the api resultult
        if (typeof result === 'string') {
            res.status(401).json({ reason: 'invalid email or password' });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ reason: 'unknown server error' });
    }
}