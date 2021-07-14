import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatNumber, numberWithLength } from 'helpers/number';
import { useCountDown } from 'custom/count-down';

const LotteryItem = (props) => {
	const {
		id, name, date, image, unit, amount, link
	} = props;

	const curTime = useCountDown(date);

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
					{curTime.tm > 0 && <div className="itemCt"><div className="itemBg">{`${curTime.days}d ${numberWithLength(curTime.hours, 2)}:${numberWithLength(curTime.minutes, 2)}:${numberWithLength(curTime.seconds, 2)}`}</div></div>}
					{curTime.tm < 0 && <div className="itemExpired"><div className="itemBg">EXPIRED</div></div>}
				</div>
				<Link href={`${link}`}><a className="playNowBtn">Play Now</a></Link>
			</div>
		</div>
	)
}

export default LotteryItem;