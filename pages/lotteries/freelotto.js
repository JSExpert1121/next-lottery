import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from 'components/layout';
import { GameHeader } from 'components/games/header';
import SingleGame from 'components/games/single';
import { HowtoPlay } from 'components/games/howto';
import { parseJsonFile } from 'helpers/json';
import { randomArrays } from 'helpers/array';
import { formatNumber } from 'helpers/number';


const FreeLottoGame = (props) => {

	const router = useRouter();
	const { id } = router.query;
	const { lottos } = props;
	const lotto = lottos.find(lotto => lotto.id === `freelotto-${id}`)

	const [sels, setSels] = useState({ selMs: [[], [], [], [], []], selEs: [[], [], [], [], []] });

	if (!lotto) {
		return <div>Not Found</div>
	}

	const jackpot = `${lotto.unit}${formatNumber(lotto.amount)}`;
	const pickAll = useCallback(() => {
		let count = 0;
		const id = setInterval(() => {
			setSels({
				selMs: randomArrays(1, lotto.NumberOfMainNumbers, lotto.AmountOfMainNumbersToMatch, 5),
				selEs: randomArrays(1, lotto.NumberOfExtraNumbers, lotto.AmountOfExtraNumbersToMatch, 5)
			});

			count++;
			if (count === 5) clearInterval(id);
		}, 300)
	}, []);

	return (
		<Layout>
			<main id="main" className="clearfix">
				<div className='wrap'>
					<div id='middle' className='lotterydetail'>
						<div className='flex-container'>
							<HowtoPlay />
						</div>
						<div className={`beton-header ${lotto.name}`}>
							<GameHeader
								name={lotto.name}
								image={lotto.image}
								jackpot={jackpot}
								onPickAll={pickAll}
							/>
						</div>
						<SingleGame data={lotto} {...sels} />
					</div>
				</div>
			</main>
		</Layout >
	)
}

export default FreeLottoGame

export const getStaticProps = async (ctx) => {
	const freelottos = await parseJsonFile('data/freelotto.json');

	return {
		props: {
			lottos: freelottos.items
		}
	}
}