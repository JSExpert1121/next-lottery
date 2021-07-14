import React from 'react'
import { CountDown, AutoCountDown } from 'components/games/countdown';

export const GameHeader = (props) => {

	const { name, image, jackpot, drawDate, onPickAll } = props

	return (
		<div className="beton-header-mobile-section">
			<div className="lotto-name-container">
				<img src={image} className="lotto-logo" />
				<span className="lotto-name">{name}</span>
			</div>
			<div className="lotto-prize-container">
				<h1 className='lotto-prize'>{jackpot}<br />Win BTC</h1>
			</div>
			<div className="lotto-timer">
				{drawDate ? <CountDown drawDate={drawDate} /> : <AutoCountDown />}
			</div>
			<div className="lotto-action-container" id="pick-all-button">
				<button
					type="button"
					id="magic-pickall"
					className="btn-magic-all"
					onClick={onPickAll}
				>
					<i className="fa fa-magic"></i>
					<span className="btn-magic-all-text">Pick All</span>
				</button>
			</div>
		</div>
	)
}
