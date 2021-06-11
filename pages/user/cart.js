import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Layout from 'components/layout';
import { ModalDialog } from 'components/dialog';
import { currencies } from 'helpers/constants';

const CartPage = () => {

	const [ticker, setTicker] = useState('');
	const [currency, setCurrency] = useState('');
	const [error, setError] = useState('');
	const status = useSelector(state => state.game);
	const balance = useSelector(state => state.user.balance);
	const [modal, setModal] = useState(false);

	const handleCurrency = useCallback((e) => {
		setCurrency(e.target.value);
		setError('');
	}, []);

	const handleSubmit = e => {
		setModal(false);
		console.log('submit order');
	}

	return (
		<Layout>
			<main id="main" className="clearfix">
				<ModalDialog 
					show={modal} 
					header={'Confirm'}
					body={'Do you want to submit your order?'}
					footer={(
						<>
							<button onClick={handleSubmit} className='btn btn-primary'>OK</button>
							<button onClick={() => setModal(false)} className='btn btn-primary'>Cancel</button>
						</>
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
							<div className='cart-error'>{error}</div>
							<div className='cart-actions'>
								{balance?.AccountBalance > status.price ? null : (
									<>
										<div className='title'>CHECKOUT</div>
										<div className="ticker-select">
											<select id="ticker-select" value={currency} onChange={handleCurrency}>
												<option value="" key="">Select Coin</option>
												{currencies.map(cur => (
													<option value={cur} key={cur}>{cur}</option>
												))}
											</select>
										</div>
									</>
								)}
								<div className='action'>
									<input type='button' value='Submit Order' onClick={() => setModal(true)} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</Layout>
	)
}

export default CartPage
