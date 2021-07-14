import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { formatNumber, numberWithLength } from 'helpers/number';

export const FreeLottoItem = (props) => {

	const { id, name, image, unit, amount, link } = props
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

	return (
		<div className='free-lotto-item'>
			<div className='flex-row'>
				<div className='cover'>
					<img src={image} alt={name} />
				</div>
				<div className='title'>
					<div>{name}</div>
					<div>{`${unit} ${formatNumber(amount)}`}</div>
				</div>
			</div>
			<div className='flex-row'>
				<div className='countdown'>
					{curTime.tm > 0 && <div className="itemCt"><div className="itemBg">{`${curTime.days}d ${numberWithLength(curTime.hours, 2)}:${numberWithLength(curTime.minutes, 2)}:${numberWithLength(curTime.seconds, 2)}`}</div></div>}
					{curTime.tm < 0 && <div className="itemExpired"><div className="itemBg">EXPIRED</div></div>}
				</div>
				<Link href={`${link}`}><a className="playNowBtn">Play Now</a></Link>
			</div>
		</div>
	)
}
