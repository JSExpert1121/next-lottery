import React from 'react';
import Layout from 'components/layout';

const Affiliate = () => {
	return (
		<Layout>
			<div id="main" className="clearfix">
				<div className="wrap">
					<div id="middle" className="innerbg view-all-lottery" style={{ marginTop: 32 }}>
						<div className="wrap">
							<div className="innerpage">
								<div className="all-lot-title">
									<h1>Partner With <span className='text-primary'>Bitcoin</span><span className='text-secondary'>Lotterys.com</span> and Earn up to up to 50% Revenue Share with Us Today</h1>
									<hr />
									<h1>Why Join <span className='text-primary'>Bitcoin</span><span className='text-secondary'>Lotterys.com</span> Affiliate Program?</h1>
								</div>
								<div className="main-content affiliate">
									<div className='content'>
										<h1 className="item-title">Net Revenue Share up to 50%</h1>
										<p>Our affiliates enjoy high percentages and secure income.</p>
										<h1 className="item-title">No Negative Carryover</h1>
										<p>At the start of each month any negative balance is reset to zero.</p>
										<h1 className="item-title">The Fastest Monthly Payouts</h1>
										<p>We pay on the 1st business day of every month!</p>
										<h1 className="item-title">Lifetime Earnings</h1>
										<p>Your referred players bring you lifetime earnings!</p>
										<h1 className="item-title" id="contact-us">Dedicated Affiliate Management Team</h1>
										<p>An experienced team ready to help you at any time.</p>
										<h1 className="item-title" id="contact-us">Unique and Trusted Brand</h1>
										<p>Unique to <span className='text-primary'>bitcoin</span><span className='text-secondary'>lotterys.com</span> play official lotteries and BTC games your players can’t find elsewhere!</p>
									</div>
									<div className='action'>
										<a href="mailto:support@bitcoinlotterys.com" className='playNowBtn'>Join Now</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Affiliate
