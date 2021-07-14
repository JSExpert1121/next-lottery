import React from 'react'

export const HowtoPlay = () => {
	return (
		<div className="how-to-play">
			<div className="label">Only 3 easy steps</div>
			<div className="step">
				<img className="icon" src="/images/step1-icon.png" />
				<div className="text" id="how-to-play-label-step1">Choose your numbers or QuickPick</div>
				<div className="step-arrow fa fa-angle-right"></div>
			</div>
			<div className="step">
				<img className="icon" src="/images/step2-icon.png" />
				<div className="text">Select your draws</div>
				<div className="step-arrow fa fa-angle-right"></div>
			</div>
			<div className="step">
				<img className="icon" src="/images/step3-icon.png" />
				<div className="text">Click continue</div>
			</div>
		</div>
	)
}
