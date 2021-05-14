export function post(url, body) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json().then(data => {
    if (res.ok) return data;
    else throw data.reason;
  }));
}