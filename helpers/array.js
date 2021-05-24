export const generateArray = (start, end) => {
	const arr = [];
	for (let i = start; i <= end; i++) {
		arr.push(i);
	}

	return arr;
}

export const randomArray = (start, end, count) => {
	const arr = [];
	for (let i = 0; i < count; i++) {
		let value = Math.floor(Math.random() * (end - start)) % (end - start);
		while (arr.includes(value)) {
			value = Math.floor(Math.random() * (end - start)) % (end - start);
		}

		arr.push(value);
	}

	return arr;
}