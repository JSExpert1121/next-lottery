import Link from 'next/link';
import { useSelector } from 'react-redux';
import styles from './footer.module.scss';

export default function Footer() {
	const balance = useSelector(state => state.user?.balance)
	return (
		<footer>
			{/* <!-- Contact US Modal --> */}
			<div id="contact-us-modal" className="modal">
				<div className="right close-modal"><span className="fa fa-close" rel="modal:close"></span></div>
				<div className="modal-header">CONTACT US</div>
				<div className="modal-body">If you want to contact us directly, you can email us at<br /><a href="mailto:support@bitcoinlotterys.com">support@bitcoinlotterys.com</a></div>
			</div>

			<div id="gradient-bg" className="pt-4 pb-2">
				<div className="pb-3 text-center logo">
					<span>Bitcoin</span>
					<span>Lotterys.com</span>
				</div>
				<div className="center-list text-center">
					<ul className="link-list">
						{/* <li><a target="_blank" href="https://t.me/bitcoincomlottery" className="f_social_icon"><i className="fab fa-telegram-plane"></i></a></li>
						<li><a href="https://www.twitter.com/bitcoincomlott?lang=en" target="_blank" className="f_social_icon"><i className="fab fa-twitter"></i></a></li>
						<li><a target="_blank" href="https://www.facebook.com/BitcoincomLottery" className="f_social_icon"><i className="fab fa-facebook-f"></i></a></li> */}
						<li><a href="#" className="f_social_icon"><i className="fab fa-telegram-plane"></i></a></li>
						<li><a href="#" className="f_social_icon"><i className="fab fa-twitter"></i></a></li>
						<li><a href="#" className="f_social_icon"><i className="fab fa-facebook-f"></i></a></li>
					</ul>
				</div>
				<div className="center-list text-center">
					<ul className="link-list">
						<li>
							<Link href='/lotteries/powerball'>
								<a>US PowerBall</a>
							</Link>
						</li>
						<li>
							<Link href='/lotteries/megamillions'>
								<a>Mega Millions</a>
							</Link>
						</li>
						<li>
							<Link href='/lotteries/euromillions'>
								<a>Euro Millions</a>
							</Link>
						</li>
						<li>
							<Link href='/lotteries/eurojackpot'>
								<a>Euro Jackpot</a>
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
								<Link href='/help/affiliate'>
									<a>Affiliate</a>
								</Link>
							</li>
							<li>
								<Link href='/help/faq'>
									<a>FAQ</a>
								</Link>
							</li>
							<li>
								<a href="#" className="contact-us-modal">Contact Us</a>
							</li>
							<li>
								<Link href='/lottery'>
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
							This website is operated by Bravio Technologies Limited
						</span>
					</div>
				</div>
			</div>
			{balance && (
				<div className={styles.depositBar}>
					<span className={styles.balance}>
						My Wallet: <span className={styles.amount}>€ {balance.AccountBalance}</span>
					</span>
					<Link href='/user/deposit'>
						<a className={styles.button}>Deposit</a>
					</Link>
				</div>
			)}
		</footer>
	)
}