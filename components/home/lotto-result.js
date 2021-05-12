import Link from 'next/link';
import React, { useEffect } from 'react'
import LottoResultItem from './result-item';

const LottoResult = (props) => {
    useEffect(() => {
        jQuery("#scroller").simplyScroll({
            customClass: 'vert',
            orientation: 'vertical',
            auto: true,
            manualMode: 'loop',
            speed: 1,
            pauseOnTouch: true
        });
    }, [])
    const { items } = props;
    return (
        <div className="lotto-results-section">
            <h1>Latest Results</h1>
            <div className="lotteryresultslist-new">
                <ul className="container" id="scroller">
                    {items && items.map((item, idx) => (
                        <LottoResultItem {...item} key={idx} />
                    ))}
                </ul>
            </div>
            <Link href="/lottery-results">
                <a className="more-result-link">More Results</a>
            </Link>
        </div>
    )
}

export default LottoResult;