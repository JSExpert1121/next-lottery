import React from 'react';
import Link from 'next/link';

const BannerItem = (props) => {
    const {
        type, subject1, subject2, descHtml, background, position, link
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
                <Link href={link}>
                    <a className="slogan_btn">Start Playing Now</a>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default BannerItem;