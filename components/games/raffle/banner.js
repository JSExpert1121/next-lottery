import React, { useEffect } from 'react';
import styles from './raffle.module.scss';

const RaffleBanner = () => {
	useEffect(() => {
		jQuery("#owl-raffle-banner").owlCarousel({
			autoplay: true,
			loop: true,
			navigation: false, // Show next and prev buttons
			dots: false,
			slideSpeed: 1000,
			paginationSpeed: 400,
			singleItem: true,
			pagination: false,
			items: 1,
		});
	}, []);
	return (
		<section id="owl-raffle-banner" className="owl-carousel owl-theme">
			{[1].map((item, idx) => (
				<div className="item" key={idx}>
					<div className='lotto_banner' style={{ height: '400px', width: '100%', background: "url('/images/raffle-slider.jpg') no-repeat", backgroundSize: 'cover', backgroundPosition: '72% 30%' }}>
						<div className='slogan_block slogan_block_1'>
							<span className='slogan_1'>
								<span className='text-primary'>Sure-Win</span>
								<span className='text-secondary'> Games</span>
							</span>
							<span className="slogan_description">
								Win up to €25,000 in 10 Exclusive Lotteries<br />
								Guaranteed Winners Daily
							</span><br />
						</div>
					</div>
				</div>
			))}
		</section>
	)
}

export default RaffleBanner
