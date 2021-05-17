const create_url = (path, params) => {
  let url = path;
  params && Object.keys(params).forEach((key, idx) => {
    if (idx === 0) url = url.concat(`?${key}=${params[key]}`);
    else url = url.concat(`&${key}=${params[key]}`);
  });

  return url;
}

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

export function get(url, params = undefined) {
  return fetch(create_url(url, params), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json().then(data => {
    if (res.ok) return data;
    else throw data.reason;
  }));
}