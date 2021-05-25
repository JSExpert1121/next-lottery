import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Layout from 'components/layout';

import { currencies } from 'helpers/constants';

const CartPage = () => {

	const [ticker, setTicker] = useState('');
	const [currency, setCurrency] = useState('');
	const [error, setError] = useState('');
	const status = useSelector(state => state.game);

	const handleCurrency = useCallback((e) => {
		setCurrency(e.target.value);
		setError('');
	}, []);

	const handleSubmit = e => {
		e.preventDefault();

	}

	return (
		<Layout>
			<main id="main" className="clearfix">
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
								<div className='title'>CHECKOUT</div>
								<div className="ticker-select">
									<select id="ticker-select" value={currency} onChange={handleCurrency}>
										<option value="" key="">Select Coin</option>
										{currencies.map(cur => (
											<option value={cur} key={cur}>{cur}</option>
										))}
									</select>
								</div>
								<div className='action'>
									<input type='button' className='' value='Submit Order' onClick={handleSubmit} />
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
