import React from 'react';
import { selected_row_load } from 'helpers/pickio';

const TicketLine = (props) => {

  const { numbers, ...others } = props;
  const rows = selected_row_load(numbers);
  return (
    <ul {...others}>
      {rows[0].map((num, idx) => (
        <li key={`blue-${idx}`} className="result_ellipse_blue">{num}</li>
      ))}
      {rows[1].map((num, idx) => (
        <li key={`green-${idx}`} className="result_ellipse_green">{num}</li>
      ))}
    </ul>
  )
}

export default TicketLine
