import { updatePersonalDetails } from 'service/userinfo';

export default async function handler(req, res) {
    const { email, firstName, lastName,
        memberID, phone, mobile, countryCode,
        address, city, state, zipCode, birthday } = req.body;
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // call api
        const result = await updatePersonalDetails(
            email, firstName, lastName,
            memberID, phone, mobile, countryCode,
            address, city, state, zipCode, birthday
        );

        if (result.Result === 'Personal details updated' && result.MemberId == memberID) {
            const { Result, ...profile } = result;
            res.status(200).json(profile);
        } else {
            res.status(403).json({ reason: 'Profile not updated' });
        }
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ reason: 'unknown server error' });
    }
}