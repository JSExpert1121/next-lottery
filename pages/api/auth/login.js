import { login } from 'service/userinfo';

export default async function handler(req, res) {
  const { email, password, remember } = req.body;
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // call api
    const result = await login(email, password);

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