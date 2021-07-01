import { useEffect } from 'react';
import { RaffleItem } from './raffle-item';

const RaffleList = ({ items }) => {
	useEffect(() => {
		jQuery("#owl-raffle").owlCarousel({
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
				820: {
					items: 3,
					nav: true,
					loop: true
				},
				1000: {
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
		<div className='raffle-list'>
			<div className='raffle-list-title'>
				<h1>Sure Win Raffle Games</h1>
			</div>
			<div id="owl-raffle" className="owl-carousel">
				{items && items.map(item => (
					<RaffleItem {...item} key={item.id} />
				))}
			</div>
		</div>
	)
}

export default RaffleList;