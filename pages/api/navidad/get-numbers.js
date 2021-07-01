import { getBtcNavidadNumbers } from 'service/playlottery';

export default async function handler(req, res) {
  const { LotteryType, MemberId, NumbersCount } = req.body;
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // call api
    const result = await getBtcNavidadNumbers(LotteryType, NumbersCount, MemberId);

    // check the api resultult
    if (typeof result === 'string') {
      res.status(400).json({ reason: result });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({ reason: 'unknown server error' });
  }
}