import LotteryItem from './lottery-item';
import { OwlCarousel } from './carousel';
import { FreeLottoItem } from './freelotto-item';

const FreeLottoList = ({ items }) => (
	<div className="free-lotteries">
		<h1>Play Lottos Free</h1>
		<OwlCarousel
			id='owl-free-lotto-list'
			items={items}
			count={5}
			component={FreeLottoItem}
			responsive={{
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
			}}
		/>
	</div>
)

export default FreeLottoList