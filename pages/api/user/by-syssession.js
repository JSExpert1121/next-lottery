import { getUserBySysSessionId } from 'service/userinfo';

export default async function handler(req, res) {
  const { sessionId } = req.query;
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // call api
    const result = await getUserBySysSessionId(sessionId);

    // check the api resultult
    if (typeof result === 'string') {
			res.status(403).json({ reason: result });
		} else if (!result.Email || !result.Password) {
			res.status(403).json({ reason: 'Invalid session ID' });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    console.log('error: ', error);
    res.status(500).json({ reason: 'unknown server error' });
  }
}