import React, { useCallback, useEffect, useState } from 'react'
import { generateArray } from 'helpers/array';

const lotteriesNames = {
	'PowerBall': ' 1 Power Ball',
	'MegaMillions': ' 1 Mega Ball',
	'EuroMillions': ' 2 Lucky Numbers',
	'EuroJackpot': ' 2 EuroStars'
};

const SelectNumbers = ({ data, numTickets, onSelected, selE, selM }) => {

	const [selectedM, setSelectedM] = useState([]);
	const [selectedE, setSelectedE] = useState([]);

	const handleMain = useCallback(e => {
		const idx = selectedM.indexOf(parseInt(e.target.outerText));
		let newSel;
		if (idx >= 0) {
			newSel = selectedM.filter(v => v !== parseInt(e.target.outerText));
			setSelectedM(newSel);
			onSelected(numTickets, newSel.length === data.AmountOfMainNumbersToMatch && selectedE.length === data.AmountOfExtraNumbersToMatch);
		} else {
			if (selectedM.length < data.AmountOfMainNumbersToMatch) {
				newSel = [...selectedM, parseInt(e.target.outerText)];
				setSelectedM(newSel);
				onSelected(numTickets, newSel.length === data.AmountOfMainNumbersToMatch && selectedE.length === data.AmountOfExtraNumbersToMatch);
			}
		}
	}, [selectedM, onSelected]);

	useEffect(() => {
		if (selE.length === 0 || selM.length === 0) return;

		setSelectedM([...selM]);
		setSelectedE([...selE]);
		onSelected(numTickets, selM.length === data.AmountOfMainNumbersToMatch && selE.length === data.AmountOfExtraNumbersToMatch);
	}, [selE, selM, onSelected]);

	const handleExtra = useCallback(e => {
		const idx = selectedE.indexOf(parseInt(e.target.outerText));
		let newSel;
		if (idx >= 0) {
			newSel = selectedE.filter(v => v !== parseInt(e.target.outerText));
			setSelectedE(selectedE.filter(v => v !== parseInt(e.target.outerText)));
			onSelected(numTickets, newSel.length === data.AmountOfExtraNumbersToMatch && selectedM.length === data.AmountOfMainNumbersToMatch);
		} else {
			if (selectedE.length < data.AmountOfExtraNumbersToMatch) {
				newSel = [...selectedE, parseInt(e.target.outerText)];
				setSelectedE([...selectedE, parseInt(e.target.outerText)]);
				onSelected(numTickets, newSel.length === data.AmountOfExtraNumbersToMatch && selectedM.length === data.AmountOfMainNumbersToMatch);
			}
		}
	}, [selectedE, onSelected]);

	return (
		<div className="select_num_col">
			<div className="select_num_col_part">
				<div className="select_num_col_part-blue"></div>
				<div className="quickpic">
					<div className="quickpic_text on_ticket">&nbsp;</div>
					<h6 className="pick_num_title">{`Pick ${data.AmountOfMainNumbersToMatch} Numbers`}</h6>
					<a href="#" className="quickpic_delete">
					</a>
					<a href="#" className="quickpic_close hidden">
						<img src="/images/close-icon.png" />
					</a>
				</div>
				<div className="all_num_part">
					<div className="watermarktry">
						<p className="watermarkdigit">{numTickets}</p>
					</div>
					<div className="lt_numbers_wrapper">
						{generateArray(1, data.NumberOfMainNumbers).map(i => (
							<span key={i} className={selectedM.includes(i) ? 'main_active' : ''} onClick={handleMain}>{i}</span>
						))}
					</div>
				</div>
				{data.NumberOfExtraNumbers > 0 && (
					<div className="select_num_part">
						<h5 className="slide-trigger">{`Pick ${lotteriesNames[data.LotteryName]}`}</h5>
						<div className="select_num_part_wrapper">
							{generateArray(data.MinExtraNumber, data.NumberOfExtraNumbers).map(i => (
								<span className={selectedE.includes(i) ? 'extra_active line' : 'line'} key={i} onClick={handleExtra}>{i}</span>
							))}
						</div>
					</div>
				)}
			</div >
		</div >
	)
}

export default SelectNumbers
