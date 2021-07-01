import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { currencies } from 'helpers/constants'
import { confirmRaffleOrder } from 'service/client/navidad'

const RaffleTickets = ({ tickets, draw }) => {

	const [selections, setSelections] = useState([])
	const [currency, setCurrency] = useState('')
	const [error, setError] = useState('')
	const [busy, setBusy] = useState(false)
	const balance = useSelector(state => state.user.balance)
	const profile = useSelector(state => state.user.profile)
	const router = useRouter()

	useEffect(() => {
		jQuery("#btcowl-demo").owlCarousel({
			nav: true,
			navText: ["<div class='owl-prev'></div>", "<div class='owl-next'></div>"],
			pagination: true,
			items: 3,
			responsiveClass: true,
			responsive: {
				0: { items: 1, nav: true },
				600: { items: 2, nav: false },
				1000: { items: 3, nav: true },
				1440: { items: 3, nav: true },
				1600: { items: 3, nav: true }
			}
		});
	}, []);

	const toggleSelections = id => {
		const idx = selections.indexOf(id);
		if (idx < 0) {
			selections.push(id);
		} else {
			selections.splice(idx, 1);
		}
		setError('');
		setSelections([...selections]);
	}

	const handleCurrency = useCallback((e) => {
		setCurrency(e.target.value);
		setError('');
	}, []);

	const enoughBalance = balance?.AccountBalance >= selections.length * draw.price
	const handleContinue = useCallback(async e => {
		if (selections.length === 0) {
			setError('Please select the numbers');
			return;
		}

		if (!enoughBalance && currency === '') {
			setError('Please select the coin');
			return;
		}

		try {
			setBusy(true);
			const result = await confirmRaffleOrder(profile.MemberId, currency, draw.type, selections);
			if (result.PaymentUrl) {
				popupwindow(result.PaymentUrl, 'Payment Information', 500, 700);
			}
			router.push('/thankyou');
		} catch (e) {
			setError(e);
		} finally {
			setBusy(false);
		}

	}, [selections, currency]);

	const rowClass = draw.amount >= 1000 ? 'flexRow sm' : 'flexRow';

	return (
		<section className='raffle-game'>
			<div id="btcowl-demo" className="owl-carousel">
				{tickets.map((ticket) => (
					<div className="slide track2" key={ticket.Id} style={{ cursor: 'pointer' }} onClick={() => toggleSelections(ticket.Id)}>
						<div className="flexRow">
							<label className="cb-container">
								<input type="checkbox" checked={selections.indexOf(ticket.Id) >= 0} readOnly />
								<span className="checkmark-b"></span>
							</label>
							<div className="lotteryImg left">
								<div className="id"><span>No.{ticket.Number}</span></div>
							</div>
							<div className={`jackpot ${rowClass}`}>
								<span>Win<br />BTC</span>
								<div className="jackpotAmount">€{parseInt(draw.amount)}</div>
							</div>
							<div className="lotteryImg right">
								<div className="id"><span>No.{ticket.Number}</span></div>
							</div>
						</div>
						<div className="play-now">
							<p>Guaranteed Win Game</p>
							<span className="ticket-price">Ticket Price: €{parseInt(draw.price)}</span>
						</div>
					</div>
				))}
			</div>
			<div className='action-bar'>
				{error && <span className='error-msg'>{error}</span>}
				{busy && <div className="simple-spinner"></div>}
				{enoughBalance || (
					<div className="ticker-select">
						<select id="deposit_ticker-select" value={currency} onChange={handleCurrency}>
							<option value="" key="">Select Coin</option>
							{currencies.map(cur => (
								<option value={cur} key={cur}>{cur}</option>
							))}
						</select>
					</div>
				)}
				<button onClick={handleContinue} className='playNowBtn'>
					Continue
				</button>
			</div>
		</section>
	)
}

export default RaffleTickets

function popupwindow(url, title, w, h) {
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
} 