import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from 'components/layout';
import { GameHeader } from 'components/games/header';
import SingleGame from 'components/games/single';
import { HowtoPlay } from 'components/games/howto';
import { getAllDraws } from 'service/globalinfo';
import { parseJsonFile } from 'helpers/json';
import { randomArrays } from 'helpers/array';


const LottoGame = (props) => {
	const router = useRouter();
	const { lotto } = router.query;
	const { data, post } = props;
	const [sels, setSels] = useState({ selMs: [[], [], [], [], []], selEs: [[], [], [], [], []] });

	if (!data) {
		return <div>Not Found</div>
	}

	let jackpot = 'PENDING';
	if (data.Jackpot < 0) {
		jackpot = 'PENDING';
	} else if (data.LotteryName === 'BTC Power Play') {
		jackpot = `${data.LotteryCurrency2}${data.Jackpot}`;
	} else {
		jackpot = `${data.LotteryCurrency2}${data.Jackpot / 1000000}M`;
	}

	const pickAll = useCallback(() => {
		let count = 0;
		const id = setInterval(() => {
			setSels({
				selMs: randomArrays(1, data.NumberOfMainNumbers, data.AmountOfMainNumbersToMatch, 5),
				selEs: randomArrays(1, data.NumberOfExtraNumbers, data.AmountOfExtraNumbersToMatch, 5)
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
							{lotto !== 'megajackpot' && lotto !== 'btcpowerplay' && (
								<div className="desktop-ticket-buttons">
									<a
										href={`/groups/${lotto}`}
										className="group-ticket-button"
										id="group-ticket-button"
									>
										Group ticket
									</a>
								</div>
							)}
						</div>
						<div className={`beton-header ${data.LotteryName}`}>
							<GameHeader
								name={data.LotteryName}
								image={`/images/${lotto}1.png`}
								jackpot={jackpot}
								drawDate={data.DrawDate}
								onPickAll={pickAll}
							/>
						</div>
						<SingleGame data={data} {...sels} />
						<div className="select_page_det left">
							{post?.content && (
								<div className="col8 left" dangerouslySetInnerHTML={{ __html: post?.content }} />
							)}
						</div>
					</div>
				</div>
			</main>
		</Layout >
	)
}

export async function getStaticPaths() {
	const draws = await getAllDraws();
	const paths = draws.map(draw => ({
		params: { lotto: draw.LotteryName.replace(/ /g, '').toLowerCase() }
	}));
	return {
		paths,
		fallback: true
	};
}

export async function getStaticProps(context) {
	const { params: { lotto } } = context;

	try {
		const result = await Promise.all([
			getAllDraws(),
			parseJsonFile('data/rules.json'),
			parseJsonFile('data/posts.json')
		]);

		const draws = result[0];
		const lottery = draws.find(item => item.LotteryName.replace(/ /g, '').toLowerCase() === lotto);

		const rules = result[1];
		const rule = rules.find(item => item.LotteryTypeId == lottery.LotteryTypeId);
		if (!rule) {
			return { props: {} };
		}

		const data = { ...lottery, MinExtraNumber: 1 };
		data.MinExtraNumber = rule.MinExtraNumber;
		data.MinLines = rule.MinLines;
		data.MaxLines = rule.MaxLines;
		data.EvenLinesOnly = rule.EvenLinesOnly;
		const options = rule.ProductsDrawOptions.find(option => option.ProductId === 1 && !option.IsSubscription)
		data.Options = options.MultiDrawOptions;

		const posts = result[2];
		const post = posts.find(item => item.name === lotto.replace(/ /g, '').toLowerCase());
		return {
			props: {
				data, post: post ?? {}
			},
			revalidate: 60
		}
	} catch (error) {
		console.log(error);
		return {
			props: {}
		}
	}
}

export default LottoGame;