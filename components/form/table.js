import React from 'react';

const Table = ({ headers, values, keys, style }) => {
	return (
		<table cellSpacing="1" cellPadding="0" style={style}>
			<thead className="btn_dark-blue">
				<tr>
					{headers.map((item, index) => (
						<th height="30" align="center" valign="middle" key={index}>{item}</th>
					))}
				</tr>

			</thead>
			<tbody>
				{values && values.map((value, index) => (
					<tr key={`th-${index}`}>
						{keys.map((key, idx) => (
							<td key={idx}>{value[key]}</td>
						))}
					</tr>
				))}
			</tbody>
			<tbody id="mytransaction"></tbody>
		</table>
	)
}

export default Table


