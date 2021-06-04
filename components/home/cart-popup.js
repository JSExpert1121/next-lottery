import { useCallback } from 'react';

const CartPopup = props => {

	const viewMorePopUpHide = useCallback(() => {
		console.log('popup hide: ');
	}, []);
	return (
		<>
			<a href="#" onClick={viewMorePopUpHide}>
				<div className="close-btn" />
			</a>
			<div className="signinwrap">
				<div className="form-title">
					<div className="product-logo" id="popUpProduct" />
					<div className="form_hadding" id="popUpTitle" />
				</div>
				<div className="clear">&nbsp;</div>
				<br /><hr /><br />
				<span>
					<p id="popUpText">Win the biggest lottery jackpot in the world! Boost your winning odds by 5000%. With our Groups you get more tickets, win more and pay less.</p>
				</span>
				<hr /><br />
				<div className="form_part">
					<form method="post" className="ng-pristine ng-valid">
						<div className="numberofdraws">
							<div className="darwsselectpart">
								<div className="lable">
									<span id="ContentPlaceHolder1_Label19_draws">Number Of Draws:</span>
								</div>
								<select className="u_field" id="DrawsSelect" />
							</div>
							<br />
							<div className="total-sum">
								<div className="drawdiscount">
									<span id="ContentPlaceHolder1_Label19_discount">Discount:</span>
									<div id="popupDiscount" className="discountnum" style={{ display: "inline-block" }}>$0.00</div>
								</div>
								<div className="totalforview"> Total:
                                    <span id="PopUpTotalSum" className="totalsum"><b>&euro;27.00</b></span>
								</div>
							</div>
							<br /> <br />
							<input type="button" value="Join Group" id="popUpBuy" className="buy_button special" />
							<span className="signup_error" />
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default CartPopup;