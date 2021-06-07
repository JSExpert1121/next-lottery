import React, { useEffect } from 'react';
import { formatDate } from 'helpers/dateformat';
import { selected_row_load } from 'helpers/pickio';

const ProductsTable = ({ headers, values, style }) => {
	const [shows, setShows] = React.useState([]);

	useEffect(() => {
		setShows(values.map(() => false));
	}, [values])

	const selectedRow = React.useCallback(numbers => {
		const rows = selected_row_load(numbers);
		return (
			<ul style={{ display: 'flex' }}>
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
						{selectedRow(numbers.SelectedNumbers)}
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
		<div className='w-100' className='products-table'>
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
									{value.Product}
								</td>
								<td align="center" valign="middle" style={{ color: '#00C38A' }}>{value.MainLottery}</td>
								<td align="center" valign="middle">{value.SyndicateShares === 0 ? '-' : value.SyndicateShares}</td>
								<td align="center" valign="middle">{value.UseDraws === 0 ? '-' : value.UseDraws}</td>
								<td align="center" valign="middle">{value.TotalLines}</td>
								<td align="center" valign="middle">{value.PurchasedOn}</td>
								<td align="center" valign="middle">{value.EndDate}</td>
								<td align="center" valign="middle">{value.Status}</td>
							</tr>
						</tbody>
					</table>
					<div className={shows[index] ? 'contents' : 'hidden'}>
						<div>
							{value.MainLottery}
							<div>{selectedNumbers(value.Lotteries)}</div>
						</div>
						<div>Lines Left: {value.LinesLeft}</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default ProductsTable;
