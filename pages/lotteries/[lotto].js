import React, { Fragment, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from 'components/layout';
import { getAllDraws, getLotteryRules, getPricesAndDiscounts } from 'service/globalinfo';

const LottoGame = () => {
	const router = useRouter();
	const { lotto } = router.query;
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
		const result = await Promise.all([getAllDraws(), getLotteryRules(), getPricesAndDiscounts(1, 3)]);
		const draws = result[0];
		const lottery = draws.find(item => item.LotteryName.replace(' ', '').toLowerCase() === lotto);

		console.log('lottery: ', lottery);
		const rules = result[1];
		const rule = rules.find(item => item.LotteryTypeId == lottery.LotteryTypeId);
		if (!rule) {
			return { props: {} };
		}
		console.log('rule: ', rule);

		const data = { ...lottery, MinExtraNumber: 1 };
		data.MinExtraNumber = rule.MinExtraNumber;
		data.MinLines = rule.MinLines;
		data.MaxLines = rule.MaxLines;
		data.EvenLinesOnly = rule.EvenLinesOnly;

		const groups = result[2];
		const group = groups.find(item => item.LotteryTypeId == lottery.LotteryTypeId);
		console.log('group: ', group);
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