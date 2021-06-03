import React from 'react'

const News = ({ items }) => {
    return (
        <div className="news">
            <div>
                <h1 style={{ marginTop: '40px' }}>Latest news</h1>
                <div id="box-news" className="clearfix">
                    <div className="news-column">
                        <div className="news-column-thumbnail">
                            <img className="news-thumbnail" src="/images/bitcoin-is-not-a-privacy-coin-says-crypto-evangelist-andreas-antonopoulos-760x428.jpg" alt="" title="" />
                        </div>
                        <div className="news-details">
                            <div className="news-date">9 July 2020, 12:05 am</div>
                            <div className="news-title">"Bitcoin Is Not a Privacy Coin" Says Crypto Evangelist Andreas Antonopoulos</div>
                            <div className="news-excerpt">Andreas Antonopoulos discussed how he desired to see Bitcoin have more &ldquo;privacy features&rdquo; in a recent live stream Q&am...</div>
                            <div className="news-readmore-link">
                                <a href="#" target="_blank">Read More</a>
                            </div>
                        </div>
                    </div>
                    <div className="news-column">
                        <div className="news-column-thumbnail">
                            <img className="news-thumbnail" src="/images/ghost-mcafee-760x428.jpg" alt="" title="" />
                        </div>
                        <div className="news-details">
                            <div className="news-date">8 July 2020, 9:08 pm</div>
                            <div className="news-title">John McAfee Launches Ghost Phone Service to Supplement His Cryptocurrency</div>
                            <div className="news-excerpt">Two-time U.S. presidential candidate John McAfee has launched a privacy-centric cell phone data service. McAfee said that his Ghos...</div>
                            <div className="news-readmore-link">
                                <a href="#" target="_blank">Read More</a>
                            </div>
                        </div>
                    </div>
                    <div className="news-column">
                        <div className="news-column-thumbnail">
                            <img className="news-thumbnail" src="/images/convicted-epstein-confidant-ghislaine-maxwells-last-reddit-post-was-about-bitcoin-760x428.jpg" alt="" title="" />
                        </div>
                        <div className="news-details">
                            <div className="news-date">8 July 2020, 7:15 pm</div>
                            <div className="news-title">Jeffrey Epstein Confidant Ghislaine Maxwell�s Last Reddit Post Was About Bitcoin</div>
                            <div className="news-excerpt">The cryptocurrency community has been discussing the infamous Ghislaine Maxwell, the associate of the financier and convicted sex ...</div>
                            <div className="news-readmore-link">
                                <a href="#" target="_blank">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default News
