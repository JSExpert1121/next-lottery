import Link from 'next/link';
import { formatNumber } from 'helpers/number';

const LotteryItem = (props) => {
	const {
		id, name, date, image, unit, amount, link
	} = props;
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
				<div className={`countdown caro_clock_${id}`} />
				<Link href={`${link}`}><a className="playNowBtn">Play Now</a></Link>
			</div>
		</div>
	)
}

export default LotteryItem;