import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Layout from 'components/layout';
import styles from './[lotto].module.scss';
import Selections from 'components/common/selections';
import { getLottoLastResults, getAllLotteries, getLottoLastResultsPrizes } from 'service/globalinfo';
import { parseJsonFile } from 'helpers/json';
import { formatDate } from 'helpers/dateformat';

const LottoResult = ({ data }) => {

	const [date, setDate] = useState('');
	const [selection, setSelection] = useState('');
	const [selPrizes, setSelPrizes] = useState([]);

	const dateChanged = useCallback(e => {
		setDate(e.target.value);
	}, []);

	useEffect(() => {
		if (!data) return;

		setDate(data.results[0].DrawDate)
	}, []);

	useEffect(() => {
		if (!data) return;

		const result = data.results.find(res => res.DrawDate === date);
		if (result) {
			setSelection(result.WinningResult + result.BonusNumber);
			const prizes = data.prizes.filter(item => item.DrawId === result.DrawId);
			prizes.sort((a, b) => parseFloat(b.LastDraw - a.LastDraw))
			setSelPrizes(prizes);
		}
	}, [date]);

	if (!data) return null;
	const { title, header, footer, name, results } = data;

	return (
		<Layout>
			<main id="main" className="clearfix">
				<div className='wrap'>
					<div className={styles.result}>
						<section className={styles.head}>
							<div>
								<img src={`/images/${title}1.png`} className={styles.image} alt={title} />
							</div>
							<div className={styles.desc} dangerouslySetInnerHTML={{ __html: header }} />
						</section>

						<section className={styles.content}>
							<div className={styles.contentHeader}>
								<h2>{`${name} Results & Winning Numbers`}</h2>
								<select value={date} onChange={dateChanged} className={styles.dateList}>
									{results && results.map(res => (
										<option key={res.DrawDate} value={res.DrawDate}>
											{formatDate(new Date(res.DrawDate))}
										</option>
									))}
								</select>
							</div>
							<hr />
							<div className={styles.description}>
								<h5>{`${name} Results for ${new Date(date).toDateString()}`}</h5>
								<div className={styles.slection}>
									<Selections selection={selection} />
								</div>
							</div>
							<div className={styles.prizes}>
								<table>
									<thead>
										<tr>
											<th>Division</th>
											<th>Match</th>
											<th>Payout Per Winner</th>
										</tr>
									</thead>
									<tbody>
										{selPrizes.map((item, idx) => (
											<tr key={idx}>
												<td>{`Prize ${idx + 1}`}</td>
												<td>{item.Match}</td>
												<td>{item.LastDraw}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</section>

						<section className={styles.foot}>
							<div dangerouslySetInnerHTML={{ __html: footer }} />
						</section>
					</div>
				</div>
			</main>
		</Layout>
	)
}

export async function getStaticPaths() {
	const results = await getLottoLastResults();
	const lotteries = await getAllLotteries();
	const lottos = results.map(res => res.LotteryTypeId);
	const uniqueIds = [...new Set(lottos)];
	const names = lotteries.filter(lotto => uniqueIds.includes(lotto.LotteryTypeId))
		.map(lotto => lotto.LotteryName.replace(/ /g, '').toLowerCase())
		.filter(name => !!name);

	const paths = names.map(lottery => ({
		params: { lotto: lottery }
	}));

	return {
		paths, fallback: true
	};
}

export async function getStaticProps(context) {
	const { params: { lotto } } = context;

	try {
		const result = await Promise.all([
			getAllLotteries(),
			getLottoLastResults(),
			getLottoLastResultsPrizes(),
			parseJsonFile('data/results.json')
		]);
		const lotteries = result[0];
		const lottery = lotteries.find(item => item.LotteryName.replace(/ /g, '').toLowerCase() === lotto);
		if (!lottery) {
			throw "Invalid lottery";
		}

		const allResults = result[1];
		const results = allResults.filter(res => res.LotteryTypeId === lottery.LotteryTypeId);
		const prizes = result[2].filter(prize => prize.LotteryTypeId === lottery.LotteryTypeId);
		const descriptions = result[3];
		const description = descriptions.find(value => value.title === lotto);
		if (!description) {
			return {
				props: {
					data: {
						results, prizes,
						title: lotto,
						name: lottery?.LotteryName ?? '',
						header: '',
						footer: ''
					}
				},
				revalidate: 60
			}
		}

		return {
			props: { data: { ...description, results, prizes, name: lottery?.LotteryName ?? '' } },
			revalidate: 60
		}
	} catch (error) {
		return {
			props: { data: { title: lotto, name: '', header: '', footer: '' } },
			revalidate: 10
		}
	}
}

export default LottoResult;