import React from 'react'

const Table = ({ headers, values }) => {
	return (
		<table cellspacing="1" cellPadding="0">
			<thead class="btn_dark-blue">
				<tr>
					{headers.map(item => (
						<th height="30" align="center" valign="middle" className="small-arrow">{item}</th>
					))}
				</tr>
				<tbody>
					{values && values.map(value => (
						<tr>
							
						</tr>
					))}
				</tbody>
			</thead>
			<tbody id="mytransaction"></tbody>
		</table>
	)
}

export default Table


