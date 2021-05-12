import { useEffect } from 'react';
import ExLotteryItem from './exlottery-item';

const ExLotteryList = ({ items }) => {
	useEffect(() => {
		jQuery('.exclusive-lotteries .track').each(function () {
			var self = this;
			function countdownDrawDate(deadline) {
				var number = jQuery(self).data('number');
				if (!deadline) {
					deadline = jQuery(self).data('date');
					// if (number === 1) {
					// 	deadline += (-180*60*1000);
					// }
				} else {
					var timezoneOffset = new Date().getTimezoneOffset();
					if (number === 1) {
						deadline += (-180 - timezoneOffset) * 60 * 1000;
					} else {
						deadline += timezoneOffset * 60 * 1000;
					}
				}

				var x = setInterval(function () {
					var now = new Date().getTime();
					var t = deadline - now;
					var days = Math.floor(t / (1000 * 60 * 60 * 24));
					var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
					var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
					var seconds = Math.floor((t % (1000 * 60)) / 1000);

					var formattedHours = hours < 10 ? '0' + hours : hours;
					var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
					var formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

					if (t < 0) {
						clearInterval(x);
						jQuery(".exclusive-lotteries .caro_clock_" + number).html('<div class="itemExpired"><div class="itemBg">EXPIRED</div></div>');

						if (number === 1) {

						}
					} else {
						jQuery(".exclusive-lotteries .caro_clock_" + number).html('<div class="itemCt"><div class="itemBg">Next Draw: ' + formattedHours + ':' + formattedMinutes + ':' + formattedSeconds + '</div></div>');
					}
				}, 1000);
			}
			countdownDrawDate();
		});
	}, []);

	return (
		<div className="exclusive-lotteries">
			<h1>Play Crypto Games</h1>
			<div className="lottery-container">
				{items && items.map(item => (
					<ExLotteryItem {...item} key={item.id} />
				))}
			</div>
		</div>
	)
}

export default ExLotteryList;