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
		jQuery('#owl-demo .slide').each(function () {
			var deadline = jQuery(this).data('date');
			var number = jQuery(this).data('number');
			var x = setInterval(function () {
				var now = new Date().getTime();
				var timezoneOffset = new Date().getTimezoneOffset();
				var t = (deadline - timezoneOffset * 60 * 1000) - now;
				var days = Math.floor(t / (1000 * 60 * 60 * 24));
				var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = Math.floor((t % (1000 * 60)) / 1000);
				jQuery("#owl-demo .caro_clock_" + number).html('<div class="itemCt"><div class="itemBg">' + days + 'd ' + hours + ':' + minutes + ':' + seconds + '</div></div>');

				if (t < 0) {
					clearInterval(x);
					jQuery("#owl-demo .caro_clock_" + number).html('<div class="itemExpired"><div class="itemBg">EXPIRED</div></div>');
				}
			}, 1000);
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