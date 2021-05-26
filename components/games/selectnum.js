import React, { useCallback, useEffect, useState } from 'react'
import { generateArray, randomArray } from 'helpers/array';

const lotteriesNames = {
	'PowerBall': ' 1 Power Ball',
	'MegaMillions': ' 1 Mega Ball',
	'EuroMillions': ' 2 Lucky Numbers',
	'EuroJackpot': ' 2 EuroStars'
};

const SelectNumbers = ({ data, numTickets, onSelected, selE, selM }) => {

	// const [selectedM, setSelectedM] = useState([]);
	// const [selectedE, setSelectedE] = useState([]);

	const handleMain = useCallback(e => {
		const val = parseInt(e.target.outerText);
		const idx = selM.indexOf(val);
		let newSel;
		if (idx >= 0) {
			newSel = selM.filter(v => v !== val);
			onSelected(numTickets, newSel, selE);
		} else {
			if (selM.length < data.AmountOfMainNumbersToMatch) {
				newSel = [...selM, val];
				onSelected(numTickets, newSel, selE);
			}
		}
	}, [selM, onSelected]);

	const handleExtra = useCallback(e => {
		const val = parseInt(e.target.outerText);
		const idx = selE.indexOf(val);
		let newSel;
		if (idx >= 0) {
			newSel = selE.filter(v => v !== val);
			onSelected(numTickets, selM, newSel);
		} else {
			if (selE.length < data.AmountOfExtraNumbersToMatch) {
				newSel = [...selE, val];
				onSelected(numTickets, selM, newSel);
			}
		}
	}, [selE, onSelected]);

	const quickPick = useCallback(e => {
		const ms = randomArray(1, data.NumberOfMainNumbers, data.AmountOfMainNumbersToMatch);
		const es = randomArray(1, data.NumberOfExtraNumbers, data.AmountOfExtraNumbersToMatch);
		onSelected(numTickets, ms, es);
	}, [onSelected]);

	const deletePick = useCallback(e => {
		onSelected(numTickets, [], []);
	}, [onSelected]);


	return (
		<div className="select_num_col">
			<div className="select_num_col_part">
				<div className="select_num_col_part-blue"></div>
				<div className="quickpic">
					<div className="quickpic_text on_ticket" onClick={quickPick}>&nbsp;</div>
					<h6 className="pick_num_title">{`Pick ${data.AmountOfMainNumbersToMatch} Numbers`}</h6>
					<a className="quickpic_delete" onClick={deletePick}>
					</a>
					<a className="quickpic_close hidden">
						<img src="/images/close-icon.png" />
					</a>
				</div>
				<div className="all_num_part">
					<div className="watermarktry">
						<p className="watermarkdigit">{numTickets}</p>
					</div>
					<div className="lt_numbers_wrapper">
						{generateArray(1, data.NumberOfMainNumbers).map(i => (
							<span key={i} className={selM.includes(i) ? 'main_active' : ''} onClick={handleMain}>{i}</span>
						))}
					</div>
				</div>
				{data.NumberOfExtraNumbers > 0 && (
					<div className="select_num_part">
						<h5 className="slide-trigger">{`Pick ${lotteriesNames[data.LotteryName]}`}</h5>
						<div className="select_num_part_wrapper">
							{generateArray(data.MinExtraNumber, data.NumberOfExtraNumbers).map(i => (
								<span className={selE.includes(i) ? 'extra_active line' : 'line'} key={i} onClick={handleExtra}>{i}</span>
							))}
						</div>
					</div>
				)}
			</div >
		</div >
	)
}

export default SelectNumbers
