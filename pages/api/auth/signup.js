import { signUp } from 'service/userinfo';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // call api
    console.log(req.body);
    const result = await signUp(req.body);

    // check the api resultult
    if (typeof result === 'string') {
      res.status(409).json({ reason: result });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({ reason: 'unknown server error' });
  }
}