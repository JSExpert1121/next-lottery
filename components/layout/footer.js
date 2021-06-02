import styles from "./footer.module.css";
import Link from 'next/link';

export default function Footer() {
	return (
		<footer>
			{/* <!-- Contact US Modal --> */}
			<div id="contact-us-modal" className="modal">
				<div className="right close-modal"><span className="fa fa-close" rel="modal:close"></span></div>
				<div className="modal-header">CONTACT US</div>
				<div className="modal-body">If you want to contact us directly, you can email us at<br /><a href="mailto:support-lottery@bitcoin.com">support-lottery@bitcoin.com</a></div>
			</div>

			<div id="gradient-bg" className="pt-4 pb-2">
				<div className="pb-3 text-center">
					<img id="footer-logo" src="/images/bitcoinlottery@2x-1.png" alt="BitcoinLotterys.com" title="BitcoinLotterys.com" height="26" style={{ cursor: 'pointer' }} />
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
						<li>
							<Link href='/lottery'>
								<a>US PowerBall</a>
							</Link>
						</li>
						<li>
							<Link href='/lottery'>
								<a>Sure-Win Games</a>
							</Link>
						</li>
						<li>
							<Link href='/lotteries/megajackpot'>
								<a>Mega Jackpot</a>
							</Link>
						</li>
						<li>
							<Link href='/lotteries/btcpowerplay'>
								<a>PowerPlay</a>
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div id="bottom-footer text-center">
				<div className="footer-container">
					<div className="page-list text-center grayout">
						<ul className="link-list">
							<li>
								<Link href='/help/faq'>
									<a>FAQ</a>
								</Link>
							</li>
							<li>
								<a href="#" className="contact-us-modal">Contact Us</a>
							</li>
							<li>
								<Link href='/promotions'>
									<a>Promotion</a>
								</Link>
							</li>
							<li>
								<Link href='/help/terms-conditions'>
									<a className="tc-modal">Terms of Service</a>
								</Link>
							</li>
							<li>
								<Link href='/help/privacy'>
									<a className="privacy-modal">Private Policy</a>
								</Link>
							</li>
						</ul>
					</div>
					<div className="payment-list text-center">
						<ul className="link-list mt-0 mb-0">
							<li><span className="image-aligner">
								<img src="/images/bit-coin-2.png" />
							</span></li>
							<li><span className="image-aligner">
								<img src="/images/bit-coin-1.png" />
							</span></li>
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