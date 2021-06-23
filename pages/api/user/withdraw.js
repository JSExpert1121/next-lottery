import { sendWithdraw } from 'service/mailservice';

export default async function handler(req, res) {
    const { memberId, amount, address } = req.body;
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // call api
        const result = await sendWithdraw(memberId, amount, address);
        if (result.IsSuccess) res.status(200).json(result);
        else res.status(500).json({ reason: result });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ reason: error });
    }
}