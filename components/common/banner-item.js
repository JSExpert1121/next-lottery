
const BannerItem = (props) => {
    const {
        type, subject1, subject2, descHtml, background, position
    } = props;
    const cls = "slogan_" + type;
    return (
        <div className="item">
            <div className="lotto_banner" style={{height: '450px', width: '100%', background: background, backgroundSize: 'cover', backgroundPosition: position}}>
                <div className={`slogan_block slogan_block_${type}`}>
                <span
                    className={cls}
                    dangerouslySetInnerHTML={{__html: subject1}}
                >
                </span><br/>
                <span
                    className={cls}
                    dangerouslySetInnerHTML={{__html: subject2}}
                >
                </span>
                <span 
                    className="slogan_description"
                    dangerouslySetInnerHTML={{__html: descHtml}}
                /><br/>
                <a href="https://lottery.bitcoin.com/lottery" id="lotto-1-btn">
                    <p className="slogan_btn">Start Playing Now</p>
                </a>
                </div>
            </div>
        </div>
    )
}

export default BannerItem;