import React, { useMemo } from 'react';
import { selected_row_load } from 'helpers/pickio'

const Selections = ({ selection }) => {

  const rows = useMemo(() => selected_row_load(selection), [selection]);
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
}

export default Selections
