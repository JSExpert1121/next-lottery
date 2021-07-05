import ExLotteryItem from './exlottery-item';

const ExLotteryList = ({ items }) => {
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