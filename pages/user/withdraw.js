import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Layout from 'components/layout';
import { MinimumAmountForWithdraw } from 'helpers/constants';
import { requestWithdraw } from 'service/client/user';
import { ModalDialog } from 'components/dialog';

const WithdrawPage = () => {

	const profile = useSelector(state => state.user.profile);
	const balance = useSelector(state => state.user.balance);

	const [address, setAddress] = useState('');
	const [coin, setCoin] = useState('');
	const [amount, setAmount] = useState(10);
	const [error, setError] = useState('');
	const [busy, setBusy] = useState(false);
	const [modal, setModal] = useState(false);

	const addressChange = useCallback(e => {
		setAddress(e.target.value);
		setError('');
	}, []);
	const coinChange = useCallback(e => {
		setCoin(e.target.value);
		setError('');
	}, []);
	const amountChange = useCallback(e => {
		setAmount(e.target.value);
		setError('');
	}, []);

	const handleKeyPress = useCallback(evt => {
		const charCode = evt.which ?? evt.keyCode;
		if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
			evt.preventDefault();
			return false;
		}

		setError('');
		return true;
	}, []);

	const handleWithdraw = async e => {
		if (amount < MinimumAmountForWithdraw) {
			setError(`Minimum withdraw amount is €${MinimumAmountForWithdraw}`);
			return;
		}

		if (coin == '') {
			setError('You must select coin you wish to use');
			return;
		}

		if (amount == '') {
			setError('Please enter amount to withdraw');
			return;
		}

		if (address == '') {
			setError('Your wallet address is needed for withdrawal');
			return;
		}

		try {
			setError('');
			setBusy(true);
			await requestWithdraw(profile.MemberId, amount, `${coin}:${address}`);
			setBusy(false);
			setModal(true);
		} catch (error) {
			setError(error);
			setBusy(false);
		}
	};

	return (
		<Layout>
			<main id="main" className="clearfix">
				<ModalDialog
					show={modal}
					header={'Success'}
					body={'Email sent. Please wait for a sec'}
					footer={(
							<button onClick={() => setModal(false)} className='btn btn-primary'> OK </button>
					)}
				/>
				<div className="wrap">
					{busy && <div className="simple-spinner"></div>}
					<div className="hadding inner-hadding withdraw_title">
						<h1>Withdraw money</h1>
					</div>
					<div className="widthdrawpage">
						<div className="widthdrawpagetitle">
							<div className="widthdrawinnercontainer">
								<div className="widthdrawtitleinner">
									<div className="widthdrawtitlepart">
										<h2>
											<span id="ContentPlaceHolder1_Label1">Withdraw Your Winnings and Account Balance</span>
										</h2>
									</div>
								</div>
							</div>
						</div>
						<div className="withdrawexplanation">
							<div className="widthdrawinnercontainer">
								<p>
									<span id="ContentPlaceHolder1_Label2">At any time you may ask to withdraw your winnings and your account’s balance. After requesting to withdraw, Your withdrawal request will be processed within 48 hours. Please make sure your contact details are fully updated.</span>
								</p>
							</div>
						</div>
						<div className="widthdrawmoneyup">
							<div className="widthdrawmoneyupinner">
								<div className="widthdrawinnercontainer">
									<h2>
										<span id="ContentPlaceHolder1_Label3">Withdraw Your Money:</span>
									</h2>
									<p>
										<span id="ContentPlaceHolder1_Label4">On your account (Winnings &amp; Balance) you have an overall amount of: </span>
										<span id="ContentPlaceHolder1_real_money">
											€&nbsp;{(balance ? balance.AccountBalance + balance.WinningAmount : 0).toFixed(2)}
										</span>
									</p>
									<p>
										<span>Enter your Wallet Address </span>
										<input className="withdraw_wallet-address-input" type="text" placeholder="Your Crypto Wallet Address" value={address} onChange={addressChange} />
									</p>
								</div>
							</div>
						</div>
						<div className="widthdrawmoneydown">
							<div className="widthdrawmoneydowninner">
								<div className="widthdrawmoneydowninnerwrapper">
									<div className="howmuchwuthdrawtext">
										<p>
											<span id="ContentPlaceHolder1_Label5">Choose how much you would like to withdraw:</span>
										</p>
									</div>
									<div className="howmuchwuthdrawinputtext">
										<input type="text" className="cvc2_field" name="amt" onKeyPress={handleKeyPress} maxLength="6" value={amount} onChange={amountChange} />
										<span className="withdraw_amount-unit" id="withdraw_amount-unit">€</span>
									</div>
									<div className="ticker-select">
										<select id="withdraw_ticker-select" value={coin} onChange={coinChange}>
											<option value="">Select Coin</option>
											<option value="BCH">BCH</option>
											<option value="BTC">BTC</option>
										</select>
									</div>
									<div className="withdrawbtnpart">
										<div className="withdrawbtn">
											<div clientidmode="Static" id="btn_withdraw" onClick={handleWithdraw}>
												<p className="withdrawbtntxt">
													<span id="ContentPlaceHolder1_Label6">Request Withdraw</span>
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="myaccount_detail_error"></div>
								<div className="myaccount_detail_success"></div>
							</div>
						</div>
						<div className="myaccount_detail_error">
							{error}
						</div>
					</div>
				</div>
			</main>
		</Layout>
	)
}

export default WithdrawPage
