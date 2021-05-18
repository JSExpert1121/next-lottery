import React from 'react'
import { generateArray } from 'helpers/array';

const lotteriesNames = {
	'PowerBall': ' 1 Power Ball',
	'MegaMillions': ' 1 Mega Ball',
	'EuroMillions': ' 2 Lucky Numbers',
	'EuroJackpot': ' 2 EuroStars'
};

const SelectNumbers = ({ data, numTickets }) => {
	return (
		<div className="select_num_col">
			<div className="select_num_col_part">
				<div className="select_num_col_part-blue"></div>
				<div className="quickpic">
					<div className="quickpic_text on_ticket">&nbsp;</div>
					<h6 className="pick_num_title">{`Pick ${data.AmountOfMainNumbersToMatch} Numbers`}</h6>
					<a href="javascript:void(0)" className="quickpic_delete">
					</a>
					<a href="#" className="quickpic_close hidden">
						<img src="<?php echo TEMPLATE_URL; ?>/images/close-icon.png" />
					</a>
				</div>
				<div className="all_num_part">
					<div className="watermarktry">
						<p className="watermarkdigit">{numTickets}</p>
					</div>
					<div className="lt_numbers_wrapper">
						{generateArray(1, data.NumberOfMainNumbers).map(i => (
							<span id={i} key={i}>{i}</span>
						))}
					</div>
				</div>
				{data.NumberOfExtraNumbers > 0 && (
					<div className="select_num_part">
						<h5 className="slide-trigger">{`Pick ${lotteriesNames[data.LotteryName]}`}</h5>
						<div className="select_num_part_wrapper">
							{generateArray(data.MinExtraNumber, data.NumberOfExtraNumbers).map(i => (
								<span className='line' id={i} key={i}>{i}</span>
							))}
						</div>
					</div>
				)}
			</div >
		</div >
	)
}

export default SelectNumbers
