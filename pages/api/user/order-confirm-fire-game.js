import { confirmProcessorFireGameOrder } from 'service/cashier';

export default async function handler(req, res) {
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { 
        memberId,
        email,
        session,
        ticker,
        draws,
        lines,
        lotteryTypeId,
        isVIP,
        isCash,
        isOnline,
        productId,
        numbers
    } = req.body;

    try {
        // construct orderData
        let orderData = 'EmailCode={emailcode}&productCounter=1';
        orderData += `&numOfDraws=${draws}`;
        orderData += `&numOfLines=${lines}`;
        if (productId === 3) {  // group ticket
            orderData += `&MemberId=${memberId}`;
            orderData += `&LotteryTypeID=${lotteryTypeId}`;
            orderData += `&SelectedNumbers=${numbers}`;
            orderData += `&IsVIP=${isVIP ? 'true' : 'false'}`;
            orderData += `&IsCash=${isCash ? 'true' : 'false'}`;
            orderData += `&isOnline=${isOnline}`;
            orderData += `&ProductID=${productId}`;
        } else {
            const selNumbers = numbers.split(':');
            selNumbers.forEach((number, index) => {
                orderData += `&MemberId=${memberId}`;
                orderData += `&LotteryTypeID=${lotteryTypeId}`;
                orderData += `&SelectedNumbers=${number}`;
                orderData += `&IsVIP=${isVIP ? 'true' : 'false'}`;
                orderData += `&IsCash=${isCash ? 'true' : 'false'}`;
                orderData += `&isOnline=${isOnline}`;
                orderData += `&ProductID=${productId}`;
                if (index < (lines - 1)) {
                    orderData += '|';
                }
            })
        }

        // call api
        const result = await confirmProcessorFireGameOrder(
            memberId,
            email,
            session,
            ticker,
            orderData
        );

        if (typeof result === 'string') {
            result.status(500).json({ reason: result });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ reason: 'unknown server error' });
    }
}