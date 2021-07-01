import React from 'react';
import Layout from 'components/layout';

const About = () => {
	return (
		<Layout>
			<main id="main" className="clearfix about">
				<div className="wrap">
					<div id="middle" className="innerbg view-all-lottery" style={{ marginTop: 32 }}>
						<div className="wrap">
							<div className="innerpage">
								<div className="all-lot-title">
									<h1>About Us</h1>
								</div>
								<div className="oro-aboutus-contact-us">
									<a href="">
										<img src="/images/chat_icon.png" />
											Live Chat
									</a>
									<a href="mailto:support@bitcoin.braviotechnology.com">
										<img src="/images/mail_icon.png" />
												With Us
									</a>
									<a href="">
										<img src="/images/phone_icon.png" />
													+35 725 030 326
									</a>
								</div>
							</div>
							<div className="main-content">
								<h1 className="item-title">Our Mission</h1>
								<p>
									The <span className='text-primary'>Bitcoin</span><span className='text-secondary'>Lotterys.com</span> web portal provides our&nbsp;BCH and BTC wallet holders with a interactive lottery experience that combines high technological advances with a simple interface that fosters a satisfying user experience.</p>
								<h1 className="item-title">Our Commitment</h1>
								<p>
									The <span className='text-primary'>Bitcoin</span><span className='text-secondary'>Lotterys.com</span> is committed to providing its clients with seamless access and a quality service. The Company has a dedicated team of well-trained customer support and sales team specialists who are able to provide excellent services, delivered in a timely and cost-effective manner, to lottery ticket purchasers.</p>
								<h1 className="item-title">Our Advantage</h1>
								<p>
									The <span className='text-primary'>Bitcoin</span><span className='text-secondary'>Lotterys.com</span> services included in this website acts as a portal for all major lotteries, where you may choose your lotto, pick your favourite numbers and buy your tickets using BCH and BTC as a preferred currency.</p>
								<h1 className="item-title">Our Enviroment</h1>
								<p>
									Once your order is submitted our team of select local distributors will purchase your order with an official lottery agent and shortly thereafter you will receive a scanned copy of your lotto ticket in your account.</p>
								<h1 className="item-title" id="contact-us">Contact Us</h1>
								<p>
									Send us an e-mail to: <a href="mailto:support@bitcoinlotterys.com">support@<span className='text-primary'>bitcoin</span><span className='text-secondary'>lotterys.com</span></a>
								</p>
							</div>
						</div>
					</div>

				</div>
			</main>
		</Layout>
	)
}

export default About
