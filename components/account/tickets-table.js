import React, { useEffect } from 'react';
import { formatDate } from 'helpers/dateformat';
import { selected_row_load } from 'helpers/pickio';

const TicketsTable = ({ headers, values, style }) => {
	const [shows, setShows] = React.useState([]);

	useEffect(() => {
		setShows(values.map(() => false));
	}, [values])

	const selectedRow = React.useCallback(numbers => {
		const rows = selected_row_load(numbers);
		return (
			<ul style={{ display: 'flex', justifyContent: 'center' }}>
				{rows[0].map((num, idx) => (
					<li key={idx} className="result_ellipse_blue">{num}</li>
				))}
				{rows[1].map((num, idx) => (
					<li key={`green-${idx}`} className="result_ellipse_green">{num}</li>
				))}
			</ul>
		)
	}, []);

	const selectedNumbers = React.useCallback(sels => {
		return (
			<div>
				{Object.values(sels).map((numbers, index) => (
					<React.Fragment key={index}>
						{selectedRow(numbers)}
					</React.Fragment>
				))}
			</div>
		)
	}, []);

	const toggleShow = React.useCallback(idx => {
		shows[idx] = !shows[idx];
		setShows([...shows]);
	}, []);

	return (
		<div className='w-100' className='tickets-table'>
			<table cellSpacing="1" cellPadding="0" style={style}>
				<thead className="btn_dark-blue">
					<tr>
						{headers.map((item, index) => (
							<th
								height="30"
								align="center"
								valign="middle"
								key={index}
							>
								{item}
							</th>
						))}
					</tr>
				</thead>
			</table>
			{values.map((value, index) => (
				<div className='collapsable-table-row' key={`th-${index}`}>
					<table className='header' onClick={() => toggleShow(index)}>
						<tbody>
							<tr>
								<td align="center" valign="middle" className='center'>
									<span><img src={`/images/flag_${value.CountryName.toLowerCase()}.png`} /></span>&nbsp;{value.CountryName}
								</td>
								<td align="center" valign="middle" style={{ color: '#00C38A' }}>{value.LotteryName}</td>
								<td align="center" valign="middle">{'Personal'}</td>
								<td align="center" valign="middle">{formatDate(new Date(value.DrawDate))}</td>
								<td align="center" valign="middle">{value.WinningResult ? value.Winning === 0 ? 'No Win' : 'Win' : 'Yet to Draw'}</td>
								<td align="center" valign="middle">{value.Winning}</td>
								<td align="center" valign="middle"><div className="drawer-header-icon"></div></td>
							</tr>
						</tbody>
					</table>
					<table className={shows[index] ? 'contents' : 'hidden'}>
						<thead>
							<tr>
								<th>Personal</th>
								<th>Selected Numbers</th>
								<th>Draw Results</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td align="center" valign="middle">
									{!!value.ScanImageUrls.length && (
										<a href={value.ScanImageUrls[1]} target='_blank'>
											<img src='/images/ticket_scan.png' />
										</a>
									)}
								</td>
								<td className='selected-numbers'>
									{selectedNumbers(value.SingleLines.SelectedNumbers)}
								</td>
								<td className='selected-numbers'>
									{value.WinningResult ? selectedRow(value.WinningResult + value.BonusNumber) : ""}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			))}
		</div>
	)
}

export default TicketsTable
