import React from 'react';
import Link from 'next/link';

export const RaffleItem = (props) => {

	const { type, image, unit, amount, price, link } = props;

	return (
		<div className='slide track2' data-track-name="slideWM">
			<div className="raffle-item">
				<div className="lotteryImg">
					<img src={image} />
				</div>
				<div className='jackpot'>
					<div className="jackpot-amount">{`${unit}${parseInt(amount)}`}</div>
					<div className="jackpot-amount text-white">Jackpot</div>
					<Link href={`${link}`}><a className="playNowBtn">{`Ticket Price ${unit}${parseInt(price)}`}</a></Link>
				</div>
			</div>
		</div>
	)
}
