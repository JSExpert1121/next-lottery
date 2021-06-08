import Link from 'next/link';

const ExLotteryItem = (props) => {
    const {
        id, name, date, image, amount, link, desc
    } = props;
    return (
        <div className="track" data-date={date} data-number={`${id}`}>
            <div className="flexRow">
                <h1>{name}</h1>
                <div className="jackpotAmount">{amount}</div>
                <div className="jackpotDesciption">{desc}</div>
                <div className={`countdown caro_clock_${id}`}></div>
                <Link href={`${link}`}>
                    <a className="playNowBtn">Play Now</a>
                </Link>
            </div>
            <div className="flexRow">
                <div className="lotteryImg">
                    <img src={image} alt={name} />
                </div>
            </div>
        </div>
    )
}

export default ExLotteryItem;