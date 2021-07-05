import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Layout from 'components/layout';
import { ModalDialog } from 'components/dialog';
import { currencies } from 'helpers/constants';
import { confirmOrder, confirmOrderFireGame } from 'service/client/order';

const CartPage = () => {

	const [currency, setCurrency] = useState('');
	const [error, setError] = useState('');
	const status = useSelector(state => state.game);
	const balance = useSelector(state => state.user.balance);
	const profile = useSelector(state => state.user.profile);
	const [modal, setModal] = useState(false);
	const [alert, setAlert] = useState(false);
	const router = useRouter();

	const enoughBalance = balance?.AccountBalance > status.price
	const isBTCPowerPlay = status.name === 'BTC Power Play'
	const handleCurrency = useCallback((e) => {
		setCurrency(e.target.value);
		setError('');
	}, []);

	const handleOrder = useCallback(e => {
		if (!enoughBalance && currency === '') {
			setAlert(true);
			return;
		}

		setModal(true);
	}, [currency, enoughBalance]);

	const handleSubmit = async e => {
		setModal(false);

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

			if (window.focus) newWindow.focus()
			return newWindow;
		}

		let orderWindow = null
		let confirmApi = isBTCPowerPlay ? confirmOrderFireGame : confirmOrder
		if (isBTCPowerPlay) {
			if ((balance.AccountBalance + balance.BonusAmount) < status.price) {
				setError('Not Enough Balance');
				router.push('/user/deposit');
			}

		} else if (!enoughBalance){
			orderWindow = popupCenter({ url: '', title: 'Submit order', w: 500, h: 700 })
		}

		try {
			const resp = await confirmApi(
				profile.MemberId,
				profile.Email,
				profile.UserSessionId,
				status.draws,
				status.lines,
				currency,
				status.typeId,
				false, true, 1,
				status.productId,
				status.picks
			);

			if (resp.PaymentId) {
				if (orderWindow) {
					resp.PaymentUrl ? orderWindow.location.replace(resp.PaymentUrl) : orderWindow.close();
				}

				if (orderWindow && resp.PaymentUrl.startsWith('https://pay.bitcoin.com/')) {
					let socket = new WebSocket(resp.PaymentWebSocket);

					socket.onopen = function () {
						console.log('Websocket Connection open!');
					}

					socket.onmessage = function (e) {
						const server_message = e.data;
						const res = JSON.parse(server_message);

						if (res.status === 'payed') {
							router.replace('/thankyou');
						}

						console.log('Message from bitcoin payment server');
						console.log(server_message);
					}

					socket.onclose = function () {
						setError("Websocket Connection closed");
					}
				} else {
					router.replace('/thankyou');
				}
			} else if (resp.Deposit) {
				orderWindow && orderWindow.close();
				router.replace('/thankyou');
			} else {
				setError(resp.reason);
				orderWindow && orderWindow.close();
			}
		} catch (error) {
			setError(error);
		}
	}

	const disabled = !status?.price || !status?.typeId;
	console.log('disabled = ', disabled);
	return (
		<Layout>
			<main id="main" className="clearfix">
				<ModalDialog
					show={modal}
					header={'Confirm'}
					body={'Do you want to submit your order?'}
					footer={(
						<>
							<button onClick={() => setModal(false)} className='btn btn-secondary'>No</button>
							<button onClick={handleSubmit} className='btn btn-primary'> YES </button>
						</>
					)}
				/>
				<ModalDialog
					show={alert}
					header={'Warning'}
					body={'Please select your coin'}
					footer={(
						<button onClick={() => setAlert(false)} className='btn btn-primary'>OK</button>
					)}
				/>
				<div className="wrap">
					<div id="middle" className="innerbg innerbg_select_page singleresult cart-page">
						<div className="banner_txt">
							<div className="hadding">
								<h1>Your order</h1>
							</div>
						</div>
						<div className="cart-wrapper">
							<div className='cart-page'>
								<div className="cart-static">
									<span className="part1">Product</span>
									<span className="part2">Lines</span>
									<span className="part3">Draws</span>
									<span className="part5">PRICE</span>
								</div>
								<div className='products'>
									{status?.name && (
										<div className='product'>
											<div className='product-title'>
												<div className='product-cover'>
													<div className={`cover ${status.name}`}></div>
												</div>
												<div className='product-name'>
													<span>{status.name.toUpperCase()}</span>
												</div>
											</div>
											<div className="lines">{status.lines}
											</div>
											<div className="draws">{status.draws}
											</div>
											<div className="price">€&nbsp;{status?.price.toFixed(2)}
											</div>
										</div>
									)}
								</div>
							</div>
							<div className='cart-total'>
								<span className='holder' />
								<span className='label'>Total Order</span>
								<span className='value'>€&nbsp;{status?.price ? status.price.toFixed(2) : 0.00}</span>
							</div>
							<div className='cart-actions'>
								<div className='title'>CHECKOUT</div>
								{balance?.AccountBalance > status.price ? null : (
									<div className="ticker-select">
										<select id="ticker-select" value={currency} onChange={handleCurrency}>
											<option value="" key="">Select Coin</option>
											{currencies.map(cur => (
												<option value={cur} key={cur}>{cur}</option>
											))}
										</select>
									</div>
								)}
								<div className='action'>
									<input type='button' value='Submit Order' onClick={handleOrder} disabled={disabled} />
								</div>
							</div>
							<div className='cart-error'>{error}</div>
						</div>
					</div>
				</div>
			</main>
		</Layout>
	)
}

export default CartPage
