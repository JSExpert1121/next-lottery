import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatNumber } from 'helpers/number';

const LotteryItem = (props) => {
	const {
		id, name, date, image, unit, amount, link
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

		return () => clearInterval(id);
	}, []);

	return (
		<div className={`slide ${name} track2`} data-track-name="slideWM" data-date={date} data-number={`${id}`}>
			<div className="flexRow">
				<div className="lotteryImg">
					<img src={image} />
				</div>
				<div className="jackpot">
					<div className="jackpotAmount">{`${unit} ${formatNumber(amount)}`}</div>
					<div className="jackpotAmount">Win BTC</div>
				</div>
			</div>
			<div className="flexRow">
				<div className={`countdown caro_clock_${id}`}>
					{curTime.tm > 0 && <div class="itemCt"><div class="itemBg">{`${curTime.days}d ${curTime.hours}:${curTime.minutes}:${curTime.seconds}`}</div></div>}
					{curTime.tm < 0 && <div class="itemExpired"><div class="itemBg">EXPIRED</div></div>}
				</div>
				<Link href={`${link}`}><a className="playNowBtn">Play Now</a></Link>
			</div>
		</div>
	)
}

export default LotteryItem;