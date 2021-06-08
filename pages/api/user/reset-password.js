import { resetPasswordCommit } from 'service/userinfo';

export default async function handler(req, res) {
    const { email, oldPwd, newPwd } = req.body;
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // call api
        const result = await resetPasswordCommit(email, oldPwd, newPwd);
        if (result.Result === 'Password updated') {
            res.status(200).json("OK");
        } else {
            res.status(403).json({ reason: 'Password not updated for some error' });
        }
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ reason: 'unknown server error' });
    }
}