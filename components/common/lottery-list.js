import { useEffect } from 'react';
import LotteryItem from './lottery-item';

const LotteryList = ({ items }) => {
	useEffect(() => {
		jQuery("#owl-demo").owlCarousel({
			loop: true,
			nav: true,
			navText: ["<div class='owl-prev'></div>", "<div class='owl-next'></div>"],
			pagination: false,
			items: 5,

			responsiveClass: true,
			responsive: {
				0: {
					items: 1,
					nav: true,
					loop: true
				},
				600: {
					items: 2,
					nav: false,
					loop: true
				},
				1000: {
					items: 3,
					nav: true,
					loop: true
				},
				1440: {
					items: 4,
					nav: true,
					loop: true
				},
				1600: {
					items: 5,
					nav: true,
					loop: true
				}
			}
		});
	}, []);
	return (
		<div id="owl-demo" className="owl-carousel">
			{items && items.map(item => (
				<LotteryItem {...item} key={item.id} />
			))}
		</div>
	)
}

export default LotteryList;