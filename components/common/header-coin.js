import React from 'react'

const HeaderCoin = ({ title, image, desc, cls, ratios }) => {

	const rate = ratios[title] ?? 0;
	return (
		<div className="header-bitcoin-values-item">
			<div>
				<img src={image} alt={desc} />
			</div>
			<div>
				<div className="title">{title}</div>
				<div className={cls ? `value ${cls}_value` : 'value'}>
					&#36;{rate.toFixed(2)}
				</div>
			</div>
		</div>
	)
}

export default HeaderCoin;
