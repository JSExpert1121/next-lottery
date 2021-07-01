import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Layout from 'components/layout';
import RaffleTickets from 'components/games/raffle/game';
import RaffleBanner from 'components/games/raffle/banner';
import { getAllDraws } from 'service/globalinfo';
import { getNumbers as getNavNumbers, confirmRaffleOrder } from 'service/client/navidad';

const RaffleGame = ({ draw }) => {

	const [tickets, setTickets] = useState([]);
	const [error, setError] = useState('');
	const [busy, setBusy] = useState(false);
	const profile = useSelector(state => state.user.profile);

	useEffect(() => {
		const getNumbers = async () => {
			try {
				setBusy(true);
				const data = await getNavNumbers(profile.MemberId, 3, draw.type);
				setTickets(data);
			} catch (e) {
				setError(e);
			} finally {
				setBusy(false);
			}
		}

		getNumbers();
	}, []);

	if (!profile) return null;

	return (
		<Layout>
			<main id="main" className="clearfix">
				<section className='raffle-banner'>
					<RaffleBanner />
				</section>
				<div className='wrap'>
					<section className='raffle-main-section'>
            {busy && (
							<div style={{ position: 'relative', zIndex: 100 }}>
								<div className="simple-spinner"></div>
							</div>
						)}
						{error && <div className='error-msg'>{error}</div>}
						{tickets.length > 0 && (
							<RaffleTickets
								tickets={tickets}
								draw={draw}
							/>
						)}
						<p style={{ textAlign: 'center' }}>Tickets are limited in all <span className='text-primary'>Bitcoin</span><span className='text-secondary'>Lotterys.com</span> <span style={{ color: '#13D19C' }}>Sure-Win Games</span>, we guarantee a Jackpot winner in<br /> every single draw</p>
						<p style={{ textAlign: 'center', borderBottom: '1px solid #32434b', padding: '0 0 15px' }}>Stake your claim to take home the Jackpot prize, one raffle ticket holder will win the next Jackpot draw</p>
						<p style={{ textAlign: 'center' }}>
							<strong style={{ fontSize: 30, color: '#fff', lineHeight: '40px', fontFamily: 'Gilroy-bold' }}>Double Your Deposit Now <img style={{ width: 14 }} src="/images/nexticon.png" alt="image" /></strong>
						</p>
						<p style={{ textAlign: 'center' }}>The <span className='text-primary'>Bitcoin</span><span className='text-secondary'>Lotterys.com</span> team will double every BTC deposit you make</p>
						<div className="images-column">
							<img style={{ width: '100%' }} src="/images/exclusive-lottery.jpg" alt="image" />
							<Link href="/user/deposit" id="Raffle-game-btn" target="_blank">
								<a className="raffle-deposit-button">Deposit Now</a>
							</Link>
						</div>
						<div className="lottery-container">
							<div className="row btcraffle-lottery">
								<div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 column">
									<div className="box-column card home-section-item">
										<div className="card-body">
											<div className="image-title">
												<img src="/images/jackpot.png" alt="icon" />
												Sure–Win<br /> Jackpots!
											</div>
											<p>Now you can win big with the official Bitcoin.com Lotteries
												Only 50 tickets will be sold in each Sure-Win Game
												Every draw will have a Jackpot winner.!!</p>
										</div>
									</div>
								</div>
								<div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 column">
									<div className="box-column card home-section-item">
										<div className="card-body">
											<div className="image-title">
												<img src="/images/registration_needed.png" alt="icon" />
												No Registration <br />Needed!
											</div>
											<p>Start playing right away — no account setup needed
												We value your privacy, which is why we never force you to share any personal details
											</p>
										</div>
									</div>
								</div>
								<div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 column">
									<div className="box-column card home-section-item">
										<div className="card-body">
											<div className="image-title">
												<img src="/images/cashout.png" alt="icon" />
												Enjoy Instant <br />Cash Outs!
											</div>
											<p>Cash out whenever you want to and receive your winnings in an instant.!
												Or, if you don’t want to cash out right away, you can leave your winnings in our secure online portal.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</main>
		</Layout>
	)
}

export default RaffleGame

export async function getStaticPaths() {
	const draws = await getAllDraws();
	const raffles = draws.filter(draw => (
		draw.LotteryName.includes('Raffle') && draw.Jackpot > 0
	))

	const paths = raffles.map(raffle => ({
		params: { raffle: `${raffle.LotteryTypeId}` }
	}));

	return {
		paths, fallback: false
	};
}

export async function getStaticProps(context) {
	const { params: { raffle } } = context;

	try {
		const draws = await getAllDraws();
		const raffles = draws.filter(draw => (
			draw.LotteryName.includes('Raffle') && draw.Jackpot > 0
		))

		const draw = raffles.find(raf => raf.LotteryTypeId == raffle)
		return {
			props: {
				draw: {
					id: draw.DrawId,
					type: draw.LotteryTypeId,
					name: draw.LotteryName,
					amount: parseInt(draw.Jackpot) === 20000 ? 25000 : draw.Jackpot,
					price: draw.PricePerLine,
				}
			},
			revalidate: 3600
		}
	} catch (error) {
		return {
			props: {},
			revalidate: 60
		}
	}
}
