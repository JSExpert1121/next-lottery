import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from 'components/layout';
import SingleGame from 'components/games/single';
import { getAllDraws, getLotteryRules, getPricesAndDiscounts } from 'service/globalinfo';
import { parseJsonFile } from 'helpers/json';

const LottoGame = (props) => {
	const router = useRouter();
	const { lotto } = router.query;
	const { data } = props;

	const [curTime, setCurTime] = useState({
		days: 0, hours: 0, minutes: 0, seconds: 0, tm: 0
	});

	let jackpot = 'PENDING';
	if (data.Jackpot < 0) {
		jackpot = 'PENDING';
	} else if (data.LotteryName === 'BTC Power Play') {
		jackpot = `${data.LotteryCurrency2}${data.Jackpot}`;
	} else {
		jackpot = `${data.LotteryCurrency2}${data.Jackpot / 1000000}M`;
	}

	useEffect(() => {
		const deadline = new Date(data.DrawDate).getTime();
		const id = setInterval(() => {
			const tm = deadline - new Date().getTime();
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
						<div class={`beton-header ${data.LotteryName}`}>
							<div class="beton-header-mobile-section">
								<div class="lotto-name-container">
									<img src={`/images/${lotto}1.png`} class="lotto-logo" />
									<span class="lotto-name">{data.LotteryName}</span>
								</div>
								<div class="lotto-prize-container">
									<h1 class='lotto-prize'>{jackpot}<br />Win BTC</h1>
								</div>
								<div class="lotto-timer">
									<div class="timer-view">
										{curTime.tm < 0 && <div class="item-expired">EXPIRED</div>}
										{curTime.tm >= 0 && (
											<table>
												<tbody>
													<tr>
														<td><div class="timer-value timer-value-days value-days">{curTime.days}</div></td>
														<td><div class="timer-delimiter">:</div></td>
														<td><div class="timer-value timer-value-hours value-hours">{curTime.days}</div></td>
														<td><div class="timer-delimiter">:</div></td>
														<td><div class="timer-value timer-value-minutes value-minutes">{curTime.minutes}</div></td>
														<td><div class="timer-delimiter">:</div></td>
														<td><div class="timer-value timer-value-seconds value-seconds">{curTime.seconds}</div></td>
													</tr>
													<tr>
														<td><div class="timer-unit unit-0">days</div></td><td></td>
														<td><div class="timer-unit unit-1">hrs</div></td><td></td>
														<td><div class="timer-unit unit-2">min</div></td><td></td>
														<td><div class="timer-unit unit-3">sec</div></td>
													</tr>
												</tbody>
											</table>
										)}
									</div>
								</div>
								<div class="lotto-action-container" id="pick-all-button">
									<button type="button" id="magic-pickall" class="btn-magic-all"><i class="fa fa-magic"></i> <span class="btn-magic-all-text">Pick All</span></button>
								</div>
							</div>
						</div>
						<SingleGame data={data} />
						<div class="select_page_det left">

							<div class="col8 left">
								<h1 class="Play-online">Play MegaMillions online</h1>
								<p>
									Initially called ‘The Big Game Mega Millions’ – the US Mega Millions is an American multi-jurisdictional lottery game; it is offered in 44 states, the District of Columbia, and the U.S. Virgin Islands. Draws take place twice a week, on Tuesdays at 23:00, and on Fridays at 23:00 USA Eastern time.</p>
								<h1 class="play-about">About MegaMillions</h1>
								<p></p>
								<h2 class="play-winn">WINNING THE US MEGAMILLIONS</h2>
								<p>
									There are 9 different ways to win with the US Mega Millions. In order to win the Jackpot one needs to match 5 correct numbers along with an additional number, the Mega ball. As the prize divisions move further away from the top prize!</p>
								<h2 class="play-jackpot">LARGEST JACKPOTS WON</h2>
								<p>
									The highest individual US Mega Millions win ever to be claimed was by Jesus Davila Jr. who matched all six numbers (26; 32; 44; 45; 58 and 11) and claimed $265 Million on February 24th 2015.</p>
								<h2></h2>
							</div>

							<div class="col2 left">
								<img src="/images/scanned_ticket.png" />
							</div>

						</div>
					</div>
				</div>
			</main>
		</Layout>
	)
}

export async function getStaticPaths() {
	const draws = await getAllDraws();
	const paths = draws.map(draw => ({
		params: { lotto: draw.LotteryName.replace(' ', '').toLowerCase() }
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
			parseJsonFile('data/lotteries.json'),
			parseJsonFile('data/rules.json'),
			parseJsonFile('data/prices.json')
		]);
		// const result = await Promise.all([getAllDraws(), getLotteryRules(), getPricesAndDiscounts(1, 3)]);
		const draws = result[0];
		const lottery = draws.find(item => item.LotteryName.replace(' ', '').toLowerCase() === lotto);

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

		const groups = result[2];
		const group = groups.find(item => item.LotteryTypeId == lottery.LotteryTypeId);
		return {
			props: {
				data,
				group
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