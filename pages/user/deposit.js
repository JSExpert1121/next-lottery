import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Layout from 'components/layout';

import { currencies } from 'helpers/constants';
import { prepareConfirmDeposit } from 'service/client/user';

const DepositPage = () => {

	const [currency, setCurrency] = useState('');
	const [amount, setAmount] = useState(0);
	const [error, setError] = useState('');
	const [busy, setBusy] = useState(false);
	const profile = useSelector(state => state.user.profile);

	const handleDeposit = useCallback(async () => {
		if (amount <= 0) {
			setError('Please enter amount to deposit');
			return;
		}

		if (!currency) {
			setError('You must select coin you wish to use');
			return;
		}
		
		const popupCenter = ({ url, title, w, h }) => {
			// Fixes dual-screen position                             Most browsers      Firefox
			const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
			const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

			const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
			const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

			const systemZoom = width / window.screen.availWidth;
			const left = (width - w) / 2 / systemZoom + dualScreenLeft
			const top = (height - h) / 2 / systemZoom + dualScreenTop
			const newWindow = window.open(url, title,
				`
				scrollbars=yes,
				width=${w / systemZoom}, 
				height=${h / systemZoom}, 
				top=${top}, 
				left=${left}
				`
			)

			if (window.focus && newWindow) {
				newWindow.focus();
			}

			return newWindow;
		}

		const orderWindow = popupCenter({ url: '', title: 'Submit order', w: 500, h: 700 });
		try {
			setBusy(true);
			const resp = await prepareConfirmDeposit(profile.MemberId, amount, currency);
			if (resp.PaymentId) {
				// popupCenter({ url: resp.PaymentUrl, title: 'Deposit', w: 500, h: 700 });
				orderWindow.location.replace(resp.PaymentUrl);
				orderWindow.title = 'Deposit';

				if (resp.PaymentUrl.startsWith('https://pay.bitcoin.com/')) {
					// connect socket
					let socket = new WebSocket(resp.PaymentWebSocket);

					socket.onopen = function () {
						console.log('Websocket Connection open!');
					}

					socket.onmessage = function (e) {
						var server_message = e.data;
						var res = JSON.parse(server_message);

						if (res.status === 'payed') {
							alert('payment done');
						}
						console.log('Message from bitcoin payment server');
						console.log(server_message);
					}

					socket.onclose = function () {
						console.log('Websocket Connection closed');
					}
				}
			}

			setBusy(false);
		} catch (error) {
			console.log('error: ', error);
			orderWindow.close();
			setError(error);
			setBusy(false);
		}
	}, [amount, currency]);

	const handleCurrency = useCallback((e) => {
		console.log(e.target.value);
		setCurrency(e.target.value);
		setError('');
	}, []);

	const handleKeyPress = useCallback(evt => {
		const charCode = evt.which ?? evt.keyCode;
		console.log(charCode);
		if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
			evt.preventDefault();
			return false;
		}

		setError('');
		return true;
	}, []);

	const amountChange = useCallback(e => setAmount(e.target.value.length === 0 ? 0 : parseInt(e.target.value)), []);

	return (
		<Layout>
			<main id="main" className="clearfix">
				<div className="wrap">
					{busy && <div className="simple-spinner"></div>}
					<div className="widthdrawpage">
						<div className="widthdrawpagetitle">
							<div className="widthdrawinnercontainer">
								<div className="widthdrawtitleinner">
									<div className="widthdrawtitlepart">
										<h2>
											<span id="ContentPlaceHolder1_Label1">Deposit cash to your <span className='text-primary'>Bitcoin</span><span className='text-secondary'>Lotterys.com</span> wallet</span>
										</h2>
									</div>
								</div>
							</div>
						</div>
						<h2 className="deposit_subtitle">The <span className='text-primary'>Bitcoin</span><span className='text-secondary'>Lotterys.com</span> supports 20 different types of cryptocurrencies</h2>
						<div className="withdrawexplanation">
							<div className="widthdrawinnercontainer">
								<p>
									Directly deposit cryptocurrency to your <span className='text-primary'>Bitcoin</span><span className='text-secondary'>Lotterys.com</span> secure wallet<br />
                    				You set the amount you want to deposit, all amounts are defined in a Euro format
              					</p>
							</div>
						</div>
						<div className="widthdrawmoneydown">
							<div className="widthdrawmoneydowninner">
								<p className="deposit_amount-description">Once funds are deposited into your personal wallet, you can play lotto as freely as you want.</p>
								<div className="widthdrawmoneydowninnerwrapper">
									<div className="howmuchwuthdrawtext">
										Choose how much you would like to deposit:
                					</div>
									<div className="howmuchwuthdrawinputtext">
										<input type="text" className="cvc2_field" name="amt" onKeyPress={handleKeyPress} maxLength="6" value={amount} onChange={amountChange} />
										<span className="deposit_amount-unit" id="deposit_amount-unit">€</span>
									</div>
									<div className="ticker-select">
										<select id="deposit_ticker-select" value={currency} onChange={handleCurrency}>
											<option value="" key="">Select Coin</option>
											{currencies.map(cur => (
												<option value={cur} key={cur}>{cur}</option>
											))}
										</select>
									</div>
									<div className="withdrawbtnpart" id="deposit_submit-btn">
										<div className="withdrawbtn" onClick={handleDeposit}>
											Deposit
                    					</div>
									</div>
								</div>
								<div className="myaccount_detail_error">
									{error}
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</Layout>
	)
}

export default DepositPage
