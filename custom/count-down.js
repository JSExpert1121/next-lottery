import { useState, useEffect } from 'react'

export const useAutoCountDown = () => {

	const [curTime, setCurTime] = useState({
		days: 0, hours: 0, minutes: 0, seconds: 0, tm: 0
	});
	const [drawDate, setDrawDate] = useState(new Date())

	useEffect(() => {

		drawDate.setUTCHours(15, 0, 0, 0)
		const timezoneOffset = new Date().getTimezoneOffset();

		const id = setInterval(() => {
			let deadline = drawDate.getTime();
			let tm = deadline - 180 * 60 * 1000 - (new Date().getTime() + timezoneOffset * 60000);
			if (tm < 0) {
				drawDate.setTime(deadline + 86400000)
				setDrawDate(new Date(drawDate))
				deadline = drawDate.getTime();
				tm = deadline - 180 * 60 * 1000 - (new Date().getTime() + timezoneOffset * 60000);
			}
			setCurTime({
				days: parseInt(tm / (86400000)),
				hours: parseInt((tm % 86400000) / 3600000),
				minutes: parseInt((tm % 3600000) / 60000),
				seconds: parseInt((tm % (1000 * 60)) / 1000),
				tm
			});
		}, 1000);

		return () => clearInterval(id);
	}, [drawDate]);

	return curTime
}

export const useCountDown = (date) => {

	const [curTime, setCurTime] = useState({
		days: 0, hours: 0, minutes: 0, seconds: 0, tm: 0
	});

	useEffect(() => {
		const id = setInterval(() => {
			const deadline = new Date(date).getTime();
			const timezoneOffset = new Date().getTimezoneOffset();
			const tm = deadline - 180 * 60 * 1000 - (new Date().getTime() + timezoneOffset * 60000);
			setCurTime({
				days: parseInt(tm / (86400000)),
				hours: parseInt((tm % 86400000) / 3600000),
				minutes: parseInt((tm % 3600000) / 60000),
				seconds: parseInt((tm % (1000 * 60)) / 1000),
				tm
			});
		}, 1000);

		return () => clearInterval(id);
	}, [date]);

	return curTime
}