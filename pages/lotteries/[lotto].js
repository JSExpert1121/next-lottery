import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from 'components/layout';
import SingleGame from 'components/games/single';
import { getAllDraws, getLotteryRules, getPricesAndDiscounts } from 'service/globalinfo';
import { parseJsonFile } from 'helpers/json';
import { randomArray } from 'helpers/array';

const LottoGame = (props) => {
	const router = useRouter();
	const { lotto } = router.query;
	const { data, post } = props;
	const [sels, setSels] = useState({ selMs: [[], [], [], []], selEs: [[], [], [], []] });

	const [curTime, setCurTime] = useState({
		days: 0, hours: 0, minutes: 0, seconds: 0, tm: 0
	});

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

	useEffect(() => {
		const id = setInterval(() => {
			const tm = deadline - new Date().getTime();
			const deadline = new Date(data.DrawDate).getTime();
			setCurTime({
				days: parseInt(tm / (86400000)),
				hours: parseInt((tm % 86400000) / 3600000),
				minutes: parseInt((tm % 3600000) / 60000),
				seconds: parseInt((tm % (1000 * 60)) / 1000),
				tm
			});
		}, 1000);

		return () => clearInterval(id);
	}, []);

	const pickAll = useCallback(() => {
		let count = 0;
		const id = setInterval(() => {
			setSels({
				selMs: [
					randomArray(1, data.NumberOfMainNumbers, data.AmountOfMainNumbersToMatch),
					randomArray(1, data.NumberOfMainNumbers, data.AmountOfMainNumbersToMatch),
					randomArray(1, data.NumberOfMainNumbers, data.AmountOfMainNumbersToMatch),
					randomArray(1, data.NumberOfMainNumbers, data.AmountOfMainNumbersToMatch)
				],
				selEs: [
					randomArray(1, data.NumberOfExtraNumbers, data.AmountOfExtraNumbersToMatch),
					randomArray(1, data.NumberOfExtraNumbers, data.AmountOfExtraNumbersToMatch),
					randomArray(1, data.NumberOfExtraNumbers, data.AmountOfExtraNumbersToMatch),
					randomArray(1, data.NumberOfExtraNumbers, data.AmountOfExtraNumbersToMatch)
				]
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
							<div className="how-to-play">
								<div className="label">Only 3 easy steps</div>
								<div className="step">
									<img className="icon" src="/images/step1-icon.png" />
									<div className="text" id="how-to-play-label-step1">Choose your numbers or QuickPick</div>
									<div className="step-arrow fa fa-angle-right"></div>
								</div>
								<div className="step">
									<img className="icon" src="/images/step2-icon.png" />
									<div className="text">Select your draws</div>
									<div className="step-arrow fa fa-angle-right"></div>
								</div>
								<div className="step">
									<img className="icon" src="/images/step3-icon.png" />
									<div className="text">Click continue</div>
								</div>
							</div>
							<div className="desktop-ticket-buttons">
								<a href="#single" className="person-ticket-button" id="person-ticket-button" style={{ display: 'none' }}>Person ticket</a>
								<a href="#group" className="group-ticket-button" id="group-ticket-button">Group ticket</a>
							</div>
						</div>
						<div className={`beton-header ${data.LotteryName}`}>
							<div className="beton-header-mobile-section">
								<div className="lotto-name-container">
									<img src={`/images/${lotto}1.png`} className="lotto-logo" />
									<span className="lotto-name">{data.LotteryName}</span>
								</div>
								<div className="lotto-prize-container">
									<h1 className='lotto-prize'>{jackpot}<br />Win BTC</h1>
								</div>
								<div className="lotto-timer">
									<div className="timer-view">
										{curTime.tm < 0 && <div className="item-expired">EXPIRED</div>}
										{curTime.tm >= 0 && (
											<table>
												<tbody>
													<tr>
														<td><div className="timer-value timer-value-days value-days">{curTime.days}</div></td>
														<td><div className="timer-delimiter">:</div></td>
														<td><div className="timer-value timer-value-hours value-hours">{curTime.days}</div></td>
														<td><div className="timer-delimiter">:</div></td>
														<td><div className="timer-value timer-value-minutes value-minutes">{curTime.minutes}</div></td>
														<td><div className="timer-delimiter">:</div></td>
														<td><div className="timer-value timer-value-seconds value-seconds">{curTime.seconds}</div></td>
													</tr>
													<tr>
														<td><div className="timer-unit unit-0">days</div></td><td></td>
														<td><div className="timer-unit unit-1">hrs</div></td><td></td>
														<td><div className="timer-unit unit-2">min</div></td><td></td>
														<td><div className="timer-unit unit-3">sec</div></td>
													</tr>
												</tbody>
											</table>
										)}
									</div>
								</div>
								<div className="lotto-action-container" id="pick-all-button">
									<button type="button" id="magic-pickall" className="btn-magic-all" onClick={pickAll}>
										<i className="fa fa-magic"></i> <span className="btn-magic-all-text">Pick All</span>
									</button>
								</div>
							</div>
						</div>
						<SingleGame data={data} {...sels} />
						<div className="select_page_det left">
							{post?.content && (
								<div className="col8 left" dangerouslySetInnerHTML={{ __html: post?.content }} />
							)}

							<div className="col2 left">
								<img src="/images/scanned_ticket.png" />
							</div>
							<div className="select_page_det2">
								<div className="del_cup"><img src="/images/del_cup.png" /></div>
								<div className="star"><img src="/images/star.png" /></div>
								<div className="font13"></div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</Layout >
	)
}

export async function getStaticPaths() {
	const draws = await getAllDraws();
	// const draws = await parseJsonFile('data/lotteries.json');
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
		// const result = await Promise.all([
		// 	parseJsonFile('data/lotteries.json'),
		// 	parseJsonFile('data/rules.json'),
		// 	parseJsonFile('data/prices.json'),
		// 	parseJsonFile('data/posts.json')
		// ]);
		const result = await Promise.all([
			getAllDraws(),
			getLotteryRules(),
			// getPricesAndDiscounts(1, 3),
			parseJsonFile('data/posts.json')
		]);

		console.log('param: ', lotto);
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

		// const groups = result[2];
		// const group = groups.find(item => item.LotteryTypeId == lottery.LotteryTypeId);
		// const posts = result[3];
		const posts = result[2];
		const post = posts.find(item => item.name === lotto.replace(/ /g, '').toLowerCase());
		return {
			props: {
				data, post: post ?? {}
				// group
			}
		}
	} catch (error) {
		console.log(error);
		return {
			props: {}
		}
	}
}

export default LottoGame;