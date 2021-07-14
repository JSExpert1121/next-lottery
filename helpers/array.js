export const generateArray = (start, end) => {
	const arr = [];
	for (let i = start; i <= end; i++) {
		arr.push(i);
	}

	return arr;
}

export const randomArray = (start, numbers, count) => {
	const arr = [];
	for (let i = 0; i < count; i++) {
		let value = Math.floor(Math.random() * numbers) + start;
		while (arr.includes(value)) {
			value = Math.floor(Math.random() * numbers) + start;
		}

		arr.push(value);
	}

	return arr;
}

export const randomArrays = (start, numbers, count, total) => {
	return generateArray(1,total).map(idx => randomArray(start, numbers, count))
}