import { Agent } from 'https';
// import fetch from 'node-fetch';

const httpsAgent = new Agent({ rejectUnauthorized: false });

export const authPost = (url, token, body = {}) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Token: token,
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(body),
        agent: httpsAgent
    }).then(res => res.json());
}