import Head from 'next/head';
import Link from 'next/link';
import Layout from 'components/layout';
import Banner from 'components/common/banner';
import LotteryList from 'components/common/lottery-list';
import FreeLottoList from 'components/common/freelotto-list';
import RaffleList from 'components/common/raffle-list';
import ExLotteryList from 'components/common/exlottery-list';
import PlayGroup from 'components/home/play-group';
import LottoResult from 'components/home/lotto-result';
import News from 'components/home/news';
import { parseJsonFile } from 'helpers/json';
import { parseStringPromise } from 'xml2js';
import { getAllDraws, getResultsByBrand } from 'service/globalinfo';
import { parseXmlFile } from 'helpers/xml';

export default function Home(props) {

	const { banners, lotteries, news, results, raffles, exlottos, freelottos } = props;

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

				{/* free lotto list */}
				<section className="sliderwrap lotto-owl-slider">
					<FreeLottoList items={freelottos} />
				</section>

				{/* sure win games */}
				<section className='sliderwrap lotto-owl-slider'>
					<RaffleList items={raffles} />
				</section>
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
					{/* <section className="loyalty">
						<Royalty />
					</section> */}
					<section id="middle_about" className="wrap news-section-new" >
						<News items={news} />
					</section>
				</section>
			</main>
		</Layout>
	)
}

export const getStaticProps = async (ctx) => {

	const banners = await parseJsonFile('data/banners.json');
	const freelottos = await parseJsonFile('data/freelotto.json');
	try {

		const res = await Promise.all([
			getAllDraws(),
			getResultsByBrand(),
			parseXmlFile('data/news.xml')
			// fetch('https://news.bitcoin.com/feed/')
		]);
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
			date: draw.DrawDate,
			image: `/images/${draw.LotteryName.toLowerCase()}1.png`,
			unit: draw.LotteryCurrency2,
			amount: draw.Jackpot,
			link: `/lotteries/${draw.LotteryName.replace(/ /g, '').toLowerCase()}`,
			country: draw.CountryName,
			flag: `/images/flag_${draw.CountryName.toLowerCase()}.png`
		}));

		const megaJack = draws.find(draw => draw.LotteryName === 'MegaJackpot');
		const powerPlay = draws.find(draw => draw.LotteryName === 'BTC Power Play');
		const exlottos = [
			{ 
				id: megaJack?.DrawId ?? -1,
				name: 'BTC Jackpot',
				desc: 'Daily Draw 9am CET',
				date: megaJack?.DrawDate ?? '',
				image: `/images/megajackpot1.png`,
				unit: megaJack?.LotteryCurrency2 ?? '$',
				link: '/lotteries/megajackpot',
				country: megaJack?.CountryName ?? 'US',
				amount: 1000000,
				daily: 'Daily'
			},
			{ 
				id: powerPlay?.DrawId ?? -1,
				name: 'BTC Power Play',
				desc: 'Draw every 5 Minutes',
				date: powerPlay?.DrawDate ?? '',
				image: `/images/btcpowerplay1.png`,
				unit: powerPlay?.LotteryCurrency2 ?? '$',
				link: '/lotteries/btcpowerplay',
				country: powerPlay?.CountryName ?? 'US',
				amount: 100,
				daily: ''
			}
		]

		const raffles = draws.filter(draw => (
			draw.LotteryName.includes('Raffle') && draw.Jackpot > 0
		)).map(draw => ({
			id: draw.DrawId,
			type: draw.LotteryTypeId,
			name: draw.LotteryName,
			image: `/images/441_Box${draw.LotteryTypeId - 35}.png`,
			unit: draw.LotteryCurrency2,
			amount: parseInt(draw.Jackpot) === 20000 ? 25000 : draw.Jackpot,
			price: draw.PricePerLine,
			link: `/btcraffles/${draw.LotteryTypeId}`
		})).sort((a, b) => a.amount - b.amount)

		const results = res[1].filter(item => (
			item.LotteryTypeId !== 13 && item.LotteryTypeId !== 24 &&
			!!item.WinningResult && item.LotteryTypeId !== 27 &&
			item.LotteryTypeId !== 34 && item.LotteryTypeId !== 35
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

		const newsData = res[2];
		// const newsData = await parseStringPromise(await res[2].text());
		const news = newsData.rss.channel[0].item.slice(0, 3).map(item => {
			const text = item.description[0].replace(/<img[^>]+>/g, '');
			const images = item.description[0].match(/<img[^>]+>/g);
			const src = images[0] ? images[0].match(/src=\"[^"]+\"/g) ?? [] : [];
			return {
				title: item.title[0],
				date: item.pubDate[0],
				link: item.link[0],
				image: src[0] ? src[0].substr(5, src[0].length - 6) : '',
				desc: (text.length > 128) ? text.substr(0, 128) + '...' : text
			}
		});

		return {
			props: {
				banners: banners.items,
				lotteries,
				freelottos: freelottos.items,
				exlottos,
				raffles,
				results,
				news
			},
			revalidate: 60
		}
	} catch (error) {
		console.log(error);
		return {
			props: {
				banners: banners.items,
				lotteries: [],
				exlottos: [],
				results: [],
				raffles: [],
				news: []
			},
			revalidate: 10
		}
	}
}