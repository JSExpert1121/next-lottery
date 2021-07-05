import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatNumber, numberWithLength } from 'helpers/number';

const ExLotteryItem = (props) => {
	const {
		id, name, date, image, amount, link, desc, daily
	} = props;

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

		return () => {
			clearInterval(id);
		}
	}, []);

	return (
		<div className="track" data-date={date} data-number={`${id}`}>
			<div className="flexRow">
				<h1>{name}</h1>
				<div className="jackpotAmount">$ {formatNumber(amount)} {daily}</div>
				<div className="jackpotDesciption">{desc}</div>
				<div className={`countdown caro_clock_${id}`}>

					{curTime.tm > 0 && <div className="itemCt"><div className="itemBg">Next Draw: {`${numberWithLength(curTime.hours, 2)}:${numberWithLength(curTime.minutes, 2)}:${numberWithLength(curTime.seconds, 2)}`}</div></div>}
					{curTime.tm < 0 && <div className="itemExpired"><div className="itemBg">EXPIRED</div></div>}
				</div>
				{date && curTime.tm > 0 && (
					<Link href={`${link}`}>
						<a className="playNowBtn">Play Now</a>
					</Link>
				)}
			</div>
			<div className="flexRow">
				<div className="lotteryImg">
					<img src={image} alt={name} />
				</div>
			</div>
		</div>
	)
}

export default ExLotteryItem;