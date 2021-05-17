export function getCoins() {
	return fetch('https://markets.api.bitcoin.com/live/bitcoin', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(res => res.json().then(data => {
		if (res.ok) return data.data;
		else throw 'error';
	}));
}