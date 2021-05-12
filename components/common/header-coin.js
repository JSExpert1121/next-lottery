import React from 'react'

const HeaderCoin = ({ title, image, url, desc, cls, value }) => {
    const [rate, setRate] = React.useState(value);
    React.useEffect(() => {
        // get current rate
        if (url) {

        }
    }, []);

    return (
        <div className="header-bitcoin-values-item">
            <div>
                <img src={image} alt={desc} />
            </div>
            <div>
                <div className="title">{title}</div>
                <div className={cls ? `value ${cls}_value` : 'value'}>
                &#36;{rate}
                </div>
            </div>
        </div>
    )
}

export default HeaderCoin;
