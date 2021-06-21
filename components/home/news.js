import React from 'react'

const News = ({ items }) => {
    return (
        <div className="news">
            <div>
                <h1 style={{ marginTop: '40px' }}>Latest news</h1>
                <div id="box-news" className="clearfix">
                    {items && items.map((item, idx) => (
                        <div className="news-column" key={idx}>
                            <div className="news-column-thumbnail">
                                <img className="news-thumbnail" src={item.image} alt="" title="" />
                            </div>
                            <div className="news-details">
                                <div className="news-date">{new Date(item.date).toUTCString()}</div>
                                <div className="news-title">{item.title}</div>
                                <div className="news-excerpt">{item.desc}</div>
                                <div className="news-readmore-link">
                                    <a href={item.link} target="_blank">Read More</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default News
