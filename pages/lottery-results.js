import React from 'react'
import Link from 'next/link';
import Layout from 'components/layout';
import { formatDate } from 'helpers/dateformat';
import { getResultsByBrand } from 'service/globalinfo';

export default function LotteryResultsPage({ results }) {
	return (
		<Layout>
			<main id="main" className="clearfix">
				<div className="wrap">
					<div id="middle" className="innerbg lottery-result">
						<div className='innerpage'>
							<div className="all-lot-res-title">
								<h1>Latest Lottery Results</h1>
							</div>
							<div className="allresult_table">
								<table id="myTable" className="tablesorter tablesorter-result" border="0" cellPadding="0" cellSpacing="1">
									<thead>
										<tr>
											<th className="header">Country</th>
											<th className="header">Lottery</th>
											<th className="header">Last draw</th>
											<th className="header">Payout</th>
											<th style={{ backgroundImage: 'none' }}>Winning Numbers</th>
										</tr>
									</thead>
									<tbody className="allresult">
										{results && results.map((item, idx) => (
											<React.Fragment key={idx}>
												<tr>
													<td><img src={item.flag ?? '/images/logo-icon.svg'} />&nbsp;&nbsp;{item.country}</td>
													<td><a href={`/${item.name.toLowerCase()}-results`}>{item.name}</a></td>
													<td>{formatDate(new Date(item.date))}</td>
													<td>{item.earned.unit}&nbsp;{item.earned.amount}</td>
													<td>
														<div className="result_number">
															<ul>
																{item.scores && Array.isArray(item.scores) && item.scores.map((score, idx) => (
																	<li
																		className={score.special ? `result_ellipse_${score.color} special` : `result_ellipse_${score.color}`}
																		key={idx}>{score.value}
																	</li>
																))}
																{item.scores && typeof item.scores === 'number' && (
																	<li>{item.scores}</li>
																)}
															</ul>
														</div>
													</td>
												</tr>
												<tr className="spacer"></tr>
											</React.Fragment>
										))}
									</tbody>
								</table>
							</div>
							<div className="clear_inner">&nbsp;</div>
							<div className="results-page">
								<h1>Real-Time Results !</h1>
								<p>
									BitcoinLotterys.com provides players with a variety of lotteries from the US, Canada and Europe.
                                </p>
								<p>With BitcoinLotterys.com, your lottery results online are just a click away, at any time and any place. As long as you have internet access alongside a computing device, checking lottery results is now as easy as one click of your mouse.</p>
								<h1></h1>
							</div>
						</div>
					</div>
				</div>
			</main>
		</Layout>
	)
}

export const getStaticProps = async (ctx) => {
	try {
		const res = await getResultsByBrand();
		const results = res.filter(item => (
			item.LotteryTypeId !== 13 && item.LotteryTypeId !== 24 &&
			item.LotteryTypeId !== 27 && item.LotteryTypeId !== 36
		)).map(item => {
			let scores = null;
			if (item.WinningResult) {
				const arr = item.WinningResult.split(/,|#/g);
				if (arr.length <= 1) scores = + item.WinningResult;
				else {
					let arr = item.WinningResult.split('#');
					scores = arr[0].split(',').map(item => ({
						color: 'blue', value: parseInt(item)
					}));
					arr[1].length > 0 && arr[1].split(',').forEach(item => {
						scores.push({ color: 'green', value: parseInt(item) });
					});
				}
			}

			let flag = `/images/flag_${item.CountryName.toLowerCase()}.png`;
			if (item.LotteryName.includes('BTC Power Play') ||
				item.LotteryName.includes('MegaJackpot') ||
				item.LotteryName.includes('Raffle')) flag = null;

			return {
				name: item.LotteryName,
				image: `/images/${item.LotteryName.toLowerCase()}1.png`,
				country: item.CountryName,
				code: item.CountryCode,
				date: item.DrawDate,
				earned: { unit: item.LotteryCurrency, amount: item.RollOver },
				scores, flag
			}
		});

		return {
			props: {
				results
			},
			revalidate: 10
		}
	} catch (error) {
		console.log(error);
		return {
			props: {
				results: []
			},
			revalidate: 10
		}
	}
}