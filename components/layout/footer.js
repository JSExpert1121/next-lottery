import styles from "./footer.module.css"

export default function Footer() {
	return (
		<footer>
			{/* <!-- Contact US Modal --> */}
			<div id="contact-us-modal" className="modal">
				<div className="right close-modal"><span className="fa fa-close" rel="modal:close"></span></div>
				<div className="modal-header">CONTACT US</div>
				<div className="modal-body">If you want to contact us directly, you can email us at<br /><a href="mailto:support-lottery@bitcoin.com">support-lottery@bitcoin.com</a></div>
			</div>

			{/* <!-- T&C Modal --> */}
			<div id="tc-modal" className="modal">
				<div className="right close-modal"><span className="fa fa-close" rel="modal:close"></span></div>
				<div className="modal-header">TERMS AND CONDITIONS</div>
				<div className="modal-body">
					{/* <iframe src="pdf/tc.pdf" width="100%" height="100%" style={{width: '100%', height: '100%'}} frameborder="0" scrolling="no"></iframe> */}
					<div className="top_toolbar"></div>
				</div>
			</div>

			{/* <!-- Privacy Policy Modal --> */}
			<div id="privacy-modal" className="modal">
				<div className="right close-modal"><span className="fa fa-close" rel="modal:close"></span></div>
				<div className="modal-header">PRIVACY POLICY</div>
				<div className="modal-body">
					{/* <iframe src="pdf/privacy.pdf" width="100%" height="100%" style={{width: '100%', height: '100%'}} frameborder="0" scrolling="no"></iframe> */}
					<div className="top_toolbar"></div>
				</div>
			</div>

			<div id="gradient-bg" className="pt-4 pb-2">
				<div className="pb-3 text-center">
					<img id="footer-logo" src="/images/bitcoinlottery@2x-1.png" alt="Bitcoin.com" title="Bitcoin.com" height="26" style={{ cursor: 'pointer' }} />
				</div>
				<div className="center-list text-center">
					<ul className="link-list">
						<li><a target="_blank" href="https://t.me/bitcoincomlottery" className="f_social_icon"><i className="fab fa-telegram-plane"></i></a></li>
						<li><a href="https://www.twitter.com/bitcoincomlott?lang=en" target="_blank" className="f_social_icon"><i className="fab fa-twitter"></i></a></li>
						<li><a target="_blank" href="https://www.facebook.com/BitcoincomLottery" className="f_social_icon"><i className="fab fa-facebook-f"></i></a></li>
					</ul>
				</div>
				<div className="center-list text-center">
					<ul className="link-list">
						<li><a href="/lottery/">US PowerBall</a></li>
						<li><a href="#owl-demo-user">Sure-Win Games</a></li>
						<li><a href="/megajackpot-lottery/">Mega Jackpot</a></li>
						<li><a href="/btcpowerplay-lottery/">PowerPlay</a></li>
					</ul>
				</div>
			</div>
			<div id="bottom-footer text-center">
				<div className="footer-container">
					<div className="page-list text-center grayout">
						<ul className="link-list">
							<li><a href="/faq/">FAQ</a></li>
							<li><a href="#" className="contact-us-modal">Contact Us</a></li>
							<li><a href="/promotions/">Promotion</a></li>
							<li><a href="#" className="tc-modal">Terms of Service</a></li>
							<li><a href="#" className="privacy-modal">Private Policy</a></li>
						</ul>
					</div>
					<div className="payment-list text-center">
						<ul className="link-list mt-0 mb-0">
							<li><span className="image-aligner"><img src="/images/bit-coin-2.png" /></span></li>
							<li><span className="image-aligner"><img src="/images/bit-coin-1.png" /></span></li>
						</ul>
					</div>
					<div className="age-18-plus text-center grayout">
						<span id="age-18-plus-text">
							<img src="/images/18-plus.png" />
							This website is operated by Saint Bitts LLC
						</span>
					</div>
				</div>
			</div>
		</footer>
	)
}