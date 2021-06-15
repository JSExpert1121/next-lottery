import React, { Fragment, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from 'components/layout';
import format from 'format-number';
import { getAllDraws } from 'service/globalinfo';
import { formatDate } from 'helpers/dateformat';

const formatter = format();
export default function LotteryPage({ lotteries }) {

	const router = useRouter();
	return (
		<Layout>
			<main id="main" className="clearfix">
				<div className="wrap">
					<div id="middle" className="innerbg view-all-lottery">
						<div className='innerpage'>
							<div className="all-lot-title">
								<h1>Purchase Your Official Lottery Tickets Using Your BCH and BTC Account</h1>
							</div>
							<div className="allresult_table">
								<table id="myTable" className="tablesorter lotteries-table" border="0" cellPadding="0" cellSpacing="1">
									<thead>
										<tr>
											<th className="header">Country</th>
											<th className="header lottery">Lottery</th>
											<th className="header">Next draw</th>
											<th className="header">Jackpot</th>
										</tr>
									</thead>
									<tbody className="allbrands">
										{lotteries && lotteries.map(item => (
											<Fragment key={item.id}>
												<tr onClick={() => router.push(item.link)}>
													<td><img src={item.flag} />&nbsp;{item.country}</td>
													<td className="lottery">{item.name}</td>
													<td>{formatDate(new Date(parseInt(item.date)), 'dd/mm/yyyy')}</td>
													<td>
														<div>
															{`${item.unit} ${formatter(item.amount)}`}
															<Link href={`${item.link}`}>
																<a className="dd_play_button" style={{ float: 'right' }}>
																	Play Now
																</a>
															</Link>

														</div>
													</td>
												</tr>
												<tr className="spacer"></tr>
											</Fragment>
										))}
									</tbody>
								</table>
							</div>
							<div className="clear_inner">&nbsp;</div>
							<div className="resultschecker">
								<h1>We are the Official <span className='text-primary'>Bitcoin</span><span className='text-secondary'>Lotterys.com</span> Provider</h1>
								<p>
									Choose your preferred lottery from the list above, click 'Play' and select Your Lucky Numbers. <span className='text-primary'>Bitcoin</span><span className='text-secondary'>Lotterys.com</span> offers our customers the option to purchase original lottery tickets in the worlds most recognised lotteries such as the Powerball and the Mega-Millions from the USA and Europe's Major lotteries such as Euro-Millions , Euro jackpot using your crypto currency.
									</p>
								<h1>Buy Secure Lotto Tickets</h1>
								<p>
									At <span className='text-primary'>Bitcoin</span><span className='text-secondary'>Lotterys.com</span>, we use the highest security standards to guarantee that your crypto transactions are safe. You buy lottery ticket digitally only via our secured Blockchain managed e-wallet protocols.
									</p>
								<h1>Electronic Ticket Scan:</h1>
								<p>
									It is a part of our service that every ticket you buy is scanned and uploaded to your account up to 30 minutes before each draw. After the draw, We will announce the results on the <span className='text-primary'>Bitcoin</span><span className='text-secondary'>Lotterys.com</span> website and automatically calculate your winnings consistent with the numbers you have previously chosen. Your winnings will be transferred to your account balance.
									</p>
								<h1>Worldwide Lottery Collection</h1>
								<p>
									At <span className='text-primary'>Bitcoin</span><span className='text-secondary'>Lotterys.com</span>, we have gathered the greatest and most profitable lottery games from around the world. Our customers can now enjoy the option to participate at anytime and from anywhere in these worldwide lotteries by purchasing the Original Ticket in the Original Lottery with their crypto currency.<br />
										Crypto currency wallet holders hosted on the <span className='text-primary'>Bitcoin</span><span className='text-secondary'>Lotterys.com</span> website can now play and win the biggest lotto jackpots in the world.
									</p>
								{/* <h1>Boost Your Chances With A Group Ticket:</h1>
								<p>
									We now have the offer that enables you to join and play in traditional lottery groups. Each member can start a group for their own lottery with up to 150 vacant seats for each draw. As long as there are vacant seats, anyone can join anytime and play with 50 lines per draw. You can instantly boost your winning chances to any lotto game you choose. The group owners select themselves the lucky numbers for each lottery, taking into consideration that some lotteries have extra bonus numbers. For those special lotteries, all potential combinations of the extra bonus numbers are picked so there is a guaranteed win on each draw.
									</p> */}
								<h1>Purchasing lottery tickets online</h1>
								<p>
									Ever thought of getting lottery tickets in a more convenient way? Did you know that there are no limits for you to have a substantial chance of winning the lottery? Anyone around the globe can play the lottery online at any time with no trouble by using any online device like a desktop, laptop, phone, or smartphone. Purchasing lottery tickets online gives you a more comfortable, accurate, and secured way to win your lucky lottery numbers. This online lottery service guarantees that. There are a few simple steps to help you enter the world of online lotteries. Beginners have to register their online account before they can submit their ticket and join the lottery. A team of professional managers will supervise the game. Winners are immediately notified through email alerts, free SMS, and by the customer support team when the lotto results are announced online. Fair and simple guidance is provided on how to claim the prizes.
									</p>
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
		const draws = await getAllDraws();
		const lotteries = draws.filter(draw => !(
			draw.LotteryName == 'BTC Power Play' || draw.LotteryName == 'MegaJackpot' || draw.LotteryName == 'BTC Raffle 50'
			|| draw.LotteryName == 'BTC Raffle 100' || draw.LotteryName == 'BTC Raffle 200' || draw.LotteryName == 'BTC Raffle 500'
			|| draw.LotteryName == 'BTC Raffle 1000' || draw.LotteryName == 'BTC Raffle 2500' || draw.LotteryName == 'BTC Raffle 5000'
			|| draw.LotteryName == 'BTC Raffle 10000' || draw.LotteryName == 'BTC Raffle 20000' || draw.LotteryName == 'BTC Raffle 25'
			|| draw.LotteryName == 'BTC Raffle' || draw.Jackpot < 0 || draw.LotteryName == 'BTC Raffle 25000'
		)).filter(draw => (
			draw.LotteryTypeId !== 45 && draw.LotteryTypeId !== 46
		)).map(draw => ({
			id: draw.DrawId,
			name: draw.LotteryName,
			date: new Date(draw.DrawDate).getTime(),
			image: `/images/${draw.LotteryName.toLowerCase()}1.png`,
			unit: draw.LotteryCurrency2,
			amount: draw.Jackpot,
			link: `/lotteries/${draw.LotteryName.replace(/ /g, '').toLowerCase()}`,
			country: draw.CountryName,
			flag: `/images/flag_${draw.CountryName.toLowerCase()}.png`
		}));
		return {
			props: {
				lotteries
			},
			revalidate: 60
		}
	} catch (error) {
		console.log(error);
		return {
			props: {
				lotteries: [],
			},
			revalidate: 10
		}
	}
}