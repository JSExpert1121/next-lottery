import React from 'react';
import Link from 'next/link';
import Layout from 'components/layout';
import { getAllDraws } from 'service/globalinfo';
import { formatNumber } from 'helpers/number';
import { parseJsonFile } from 'helpers/json';

const GroupPage = ({ draws }) => {
  return (
    <Layout>
      <main id="main" className="clearfix">
        <div className="wrap">
          <div id="middle" className="innerbg">
            <div className='groups-page'>
              <h1>Lottery Groups • Get more numbers • Better odds of winning</h1>
              <div className='clear_inner'>&nbsp;</div>
              <div className='all-groups'>
                {draws && draws.map(draw => (
                  <article className={`group-item ${draw.name.toLowerCase()}`} key={`${draw.type}-${draw.id}`}>
                    <Link href={draw.link}>
                      <div style={{ cursor: 'pointer' }}>
                        <div className="group-box">
                          <div className="group-image"><img src={draw.image} /></div>
                          <div className="group-name">{draw.name}</div>
                          <div className="group-jackpot">
                            {draw.amount < 0 ? 'PENDING' : `${draw.unit} ${formatNumber(draw.amount)}`}
                          </div>
                        </div>
                        <div className="group-middle"><strong>50</strong> Lines <strong>150</strong> Shares</div>
                      </div>
                    </Link>
                    <div className="group-boxfooter">
                      <Link href={draw.link}>
                        <a className="group-play-button">
                          {`1 share € ${(draw.priceShare / 8).toFixed(2)}`}
                        </a>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
              <div className="resultschecker">
                <p>&nbsp;</p>
                <h1 className="item-title">Boost Your Chances With A Group Acquisition</h1>
                <p>
                  We now have the offer that enables you to join and play in traditional lottery groups. Each member started a group for their own lottery with up to 150 vacant seats for each draw. As long as there are vacant seats, anyone can join anytime and play with 50 lines per draw. You can instantly boost your winning chances to any lotto game you choose. The group owners selected themselves the lucky numbers for each lottery, taking into consideration that some lotteries have extra bonus numbers. For those special lotteries, all potential combinations of the extra bonus numbers are picked so there is a guaranteed win on each draw.</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <h1 className="item-title">Purchasing lottery tickets online</h1>
                <p>
                  Ever thought of getting lottery tickets in a more convenient way? Did you know that there are no limits for you to have a substantial chance of winning the lottery when using internet? Anyone around the globe can play the lottery online at any time with no trouble by using any online device like a desktop, laptop, phone, or smartphone. Purchasing lottery tickets online gives you a more comfortable, accurate, and secured way to win your lucky lottery numbers. This online lottery service guarantees that. There are a few simple steps to help you enter the world of online lotteries. Beginners have to register their online account before they can submit their ticket and join the lottery. A team of professional managers will supervise the game. Winners are immediately notified through email alerts, free SMS, and by the customer support team when the lotto results are announced online. Fair and simple guidance is provided on how to claim the prizes.</p>
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
    const res = await Promise.all([
      getAllDraws(),
			parseJsonFile('data/grouplines.json')
    ]);
    const groupLines = res[1];
    const draws = res[0].filter(draw => !(
      draw.LotteryName == 'BTC Power Play' || draw.LotteryName == 'MegaJackpot' || draw.LotteryName == 'BTC Raffle 50'
      || draw.LotteryName == 'BTC Raffle 100' || draw.LotteryName == 'BTC Raffle 200' || draw.LotteryName == 'BTC Raffle 500'
      || draw.LotteryName == 'BTC Raffle 1000' || draw.LotteryName == 'BTC Raffle 2500' || draw.LotteryName == 'BTC Raffle 5000'
      || draw.LotteryName == 'BTC Raffle 10000' || draw.LotteryName == 'BTC Raffle 20000' || draw.LotteryName == 'BTC Raffle 25'
      || draw.LotteryName == 'BTC Raffle' || draw.Jackpot < 0
    )).filter(draw => (
      draw.LotteryTypeId !== 45 && draw.LotteryTypeId !== 46 &&
      !!groupLines[draw.LotteryName.replace(/ /g, '').toLowerCase()]
    )).map(draw => ({
      id: draw.DrawId,
      type: draw.LotteryTypeId,
      name: draw.LotteryName,
      date: draw.DrawDate,
      image: `/images/${draw.LotteryName.toLowerCase()}1.png`,
      unit: draw.LotteryCurrency2,
      amount: draw.Jackpot,
      link: `/groups/${draw.LotteryName.replace(/ /g, '').toLowerCase()}`,
      country: draw.CountryName,
      priceShare: draw.PricePerShare,
    }));

    return {
      props: {
        draws
      },
      revalidate: 60
    }
  } catch (error) {
    console.log(error);
    return {
      props: {
        draws: []
      },
      revalidate: 10
    }
  }
}

export default GroupPage
