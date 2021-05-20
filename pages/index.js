import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from 'components/layout';
import Banner from 'components/common/banner';
import LotteryList from 'components/common/lottery-list';
import ExLotteryList from 'components/common/exlottery-list';
// import ProductList from 'components/common/product-list';
// import CartPopup from 'components/home/cart-popup';
import PlayGroup from 'components/home/play-group';
import LottoResult from 'components/home/lotto-result';
import Royalty from 'components/home/loyalty';
import News from 'components/home/news';
import { parseJsonFile } from 'helpers/json';
import { getAllDraws, getResultsByBrand } from 'service/globalinfo';

export default function Home(props) {

	const { banners, lotteries, exlottos, results } = props;
	return (
		<Layout>
			<Head><title>Bitcoin Lottery - Lottery with Bitcoins</title></Head>
			<main id="main" className="clearfix">
				{/* banner */}
				<Banner banners={banners} />
				<div className="clear" />

				{/* lottery list */}
				<section className="sliderwrap lotto-owl-slider">
					<LotteryList items={lotteries} />
				</section>

				{/* desktop content */}
				<Link href="/lottery">
					<a href="/lottery" className="view-all-lotts right">View all lotteries &gt; </a>
				</Link>
				<div className="clear" />

				{/* exclusive lotteries */}
				<section className="wrap">
					<div className="wrap">
						<ExLotteryList items={exlottos} />
					</div>
				</section>
				<div className="clear">&nbsp;</div>

				{/* middle home */}
				<section id="middle_home">
					<div className="wrap">
						{/* <section id="middle_about">
							<ProductList products={products} />
						</section>
						<section className="cart-popup">
							<CartPopup />
						</section> */}
						<section className="wrap">
							<div className="playgroup-result">
								<PlayGroup />
								<LottoResult items={results} />
							</div>
						</section>
					</div>
					<div id="middle_sec" style={{ cursor: 'pointer' }}>
						<div className="bannersignup" />
					</div>
					<section className="loyalty">
						<Royalty />
					</section>
					<section id="middle_about" className="wrap news-section-new" >
						<News />
					</section>
				</section>
			</main>
		</Layout>
	)
}

export const getStaticProps = async (ctx) => {

	const banners = await parseJsonFile('data/banners.json');
	try {
		const res = await Promise.all([getAllDraws(), getResultsByBrand()]);
		const draws = res[0];
		const lotteries = draws.filter(draw => !(
			draw.LotteryName == 'BTC Power Play' || draw.LotteryName == 'MegaJackpot' || draw.LotteryName == 'BTC Raffle 50'
			|| draw.LotteryName == 'BTC Raffle 100' || draw.LotteryName == 'BTC Raffle 200' || draw.LotteryName == 'BTC Raffle 500'
			|| draw.LotteryName == 'BTC Raffle 1000' || draw.LotteryName == 'BTC Raffle 2500' || draw.LotteryName == 'BTC Raffle 5000'
			|| draw.LotteryName == 'BTC Raffle 10000' || draw.LotteryName == 'BTC Raffle 20000' || draw.LotteryName == 'BTC Raffle 25'
			|| draw.LotteryName == 'BTC Raffle' || draw.Jackpot < 0
		)).filter(draw => (
			draw.LotteryTypeId !== 45 && draw.LotteryTypeId !== 46
		)).map(draw => ({
			id: draw.DrawId,
			name: draw.LotteryName,
			date: new Date(draw.DrawDate).getTime(),
			image: `/images/${draw.LotteryName.toLowerCase()}1.png`,
			unit: draw.LotteryCurrency2,
			amount: draw.Jackpot,
			link: `/lotteries/${draw.LotteryName.replace(' ', '').toLowerCase()}`,
			country: draw.CountryName,
			flag: `/images/flag_${draw.CountryName.toLowerCase()}.png`
		}));

		const exlottos = draws.filter(draw => (
			draw.LotteryName === 'MegaJackpot' || draw.LotteryName === 'BTC Power Play'
		)).map(draw => ({
			id: draw.DrawId,
			name: draw.LotteryName === 'MegaJackpot' ? "BTC Jackpot" : "BTC Power Play",
			date: new Date(draw.DrawDate).getTime(),
			image: `/images/${draw.LotteryName.toLowerCase()}1.png`,
			amount: draw.LotteryName === 'MegaJackpot' ? "$1 Million Daily" : "$100",
			desc: draw.LotteryName === 'MegaJackpot' ? "Daily Draw 9am CET" : "Draw every 5 Minutes",
			link: `/lotteries/${draw.LotteryName.replace(' ', '').toLowerCase()}`
		}));

		const results = res[1].filter(item => (
			item.LotteryTypeId !== 13 && item.LotteryTypeId !== 24 &&
			!!item.WinningResult && item.LotteryTypeId !== 27
		)).map(item => {
			let scores = null;
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
			return {
				name: item.LotteryName,
				image: item.LotteryName.includes('Raffle') ? null : `/images/${item.LotteryName.toLowerCase()}1.png`,
				country: item.CountryName,
				date: item.LocalDrawDateTime,
				earned: { unit: item.LotteryCurrency, amount: item.RollOver },
				scores
			}
		});

		return {
			props: {
				banners: banners.items,
				lotteries,
				exlottos,
				results
			},
			revalidate: 10
		}
	} catch (error) {
		console.log(error);
		return {
			props: {
				banners: banners.items,
				lotteries: [],
				exlottos: [],
				results: []
			},
			revalidate: 10
		}
	}
}