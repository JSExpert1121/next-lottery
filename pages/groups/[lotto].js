import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from 'components/layout';
import GroupGame from 'components/games/group';
import { getAllDraws } from 'service/globalinfo';
import { parseJsonFile } from 'helpers/json';
import { numberWithLength } from 'helpers/number';

const GroupLotto = (props) => {
	const router = useRouter();
	const { lotto } = router.query;
	const { data, post, groupLine } = props;

  let jackpot = 'PENDING';
	if (data.Jackpot < 0) {
		jackpot = 'PENDING';
	} else if (data.LotteryName === 'BTC Power Play') {
		jackpot = `${data.LotteryCurrency2}${data.Jackpot}`;
	} else {
		jackpot = `${data.LotteryCurrency2}${data.Jackpot / 1000000}M`;
	}

  const [curTime, setCurTime] = useState({
		days: 0, hours: 0, minutes: 0, seconds: 0, tm: 0
	});

  useEffect(() => {
		const id = setInterval(() => {
			const deadline = new Date(data.DrawDate).getTime();
			const timezoneOffset = new Date().getTimezoneOffset();
			const tm = deadline - 180 * 60 * 1000 - (new Date().getTime() + timezoneOffset * 60000);
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
        <div className="wrap">
          <div id="middle" className="lotterydetail">
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
								<Link href={`/lotteries/${data.LotteryName.replace(/ /g, '').toLowerCase()}`} id="person-ticket-button">
                  <a className="person-ticket-button">Person ticket</a>
                </Link>
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
														<td><div className="timer-value timer-value-hours value-hours">{numberWithLength(curTime.hours, 2)}</div></td>
														<td><div className="timer-delimiter">:</div></td>
														<td><div className="timer-value timer-value-minutes value-minutes">{numberWithLength(curTime.minutes, 2)}</div></td>
														<td><div className="timer-delimiter">:</div></td>
														<td><div className="timer-value timer-value-seconds value-seconds">{numberWithLength(curTime.seconds, 2)}</div></td>
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
							</div>
						</div>
            <GroupGame data={data} groupLine={groupLine} />
						<div className="select_page_det left">
							{post?.content && (
								<div className="col8 left" dangerouslySetInnerHTML={{ __html: post?.content }} />
							)}

							<div className="select_page_det2">
								<div className="del_cup"><img src="/images/del_cup.png" /></div>
								<div className="star"><img src="/images/star.png" /></div>
								<div className="font13"></div>
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
	const groupLines = await parseJsonFile('data/grouplines.json');
	const real = draws.filter(draw => {
		const name = draw.LotteryName.replace(/ /g, '').toLowerCase();
		return !!groupLines[name];
	})
	const paths = real.map(draw => ({
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
			parseJsonFile('data/posts.json'),
			parseJsonFile('data/grouplines.json')
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
		const post = posts.find(item => item.name === lotto);

		const groupLines = result[3];
		const groupLine = groupLines[lotto];
		return {
			props: {
				data, post: post ?? {},
				groupLine
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

export default GroupLotto
