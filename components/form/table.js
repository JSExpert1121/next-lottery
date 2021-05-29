import React from 'react'

const Table = ({ headers, values }) => {
	return (
		<table cellspacing="1" cellpadding="0">
			<thead class="btn_dark-blue">
				<tr>
					{headers.map(item => (
						<th height="30" align="center" valign="middle" className="small-arrow">{item}</th>
					))}
				</tr>
				<tbody>
					{/* {values.map(value => (

					))} */}
				</tbody>
			</thead>
			<tbody id="mytransaction"></tbody>
		</table>
	)
}

export default Table


