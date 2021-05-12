import React from 'react'

const Royalty = ({ items }) => {
    return (
        <>
            <h2>Our exclusive Loyalty Program</h2>
            <div className="loyalty_section">
                <div className="wrap loyalty_section_flex">
                    <div className="loyalty_col">
                        <div className="icon"><img src="/images/icon_7.png" /></div>
                        <h1>Get Your Personal Manager</h1>
                        <div className="textwidget">As a VIP member you are entitled to Personal VIP service! You will be assigned with your own Personal Account Manager that will update you on winnings, results, special jackpot alerts etc.</div>
                    </div>
                    <div className="loyalty_col">
                        <div className="icon"><img src="/images/icon_6.png" /></div>
                        <h1>Get a discount on every purchase</h1>
                        <div className="textwidget">Our VIP members get a permanent discount on EVERY purchase. On every purchase you make you will see the sum of points you receive for that purchase at your "Purchase-Summary - VIP Plan"</div>
                    </div>
                </div>
                <div className="loyalty_div"><a className="btn-signup">Create an account</a></div>
            </div>
        </>
    )
}

export default Royalty;
