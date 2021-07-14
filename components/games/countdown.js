import React from 'react'
import { numberWithLength } from 'helpers/number';
import { useCountDown, useAutoCountDown } from 'custom/count-down';

export const AutoCountDown = () => {

	const curTime = useAutoCountDown()

	return (
		<div className="timer-view">
			{curTime.tm < 0 && <div className="item-expired">EXPIRED</div>}
			{curTime.tm >= 0 && (
				<table>
					<tbody>
						<tr>
							<td><div className="timer-value timer-value-days value-days">{curTime.days}</div></td>
							<td><div className="timer-delimiter">:</div></td>
							<td><div className="timer-value timer-value-hours value-hours">{numberWithLength(curTime.hours, 2)}</div></td>
							<td><div className="timer-delimiter">:</div></td>
							<td><div className="timer-value timer-value-minutes value-minutes">{numberWithLength(curTime.minutes, 2)}</div></td>
							<td><div className="timer-delimiter">:</div></td>
							<td><div className="timer-value timer-value-seconds value-seconds">{numberWithLength(curTime.seconds, 2)}</div></td>
						</tr>
						<tr>
							<td><div className="timer-unit unit-0">days</div></td><td></td>
							<td><div className="timer-unit unit-1">hrs</div></td><td></td>
							<td><div className="timer-unit unit-2">min</div></td><td></td>
							<td><div className="timer-unit unit-3">sec</div></td>
						</tr>
					</tbody>
				</table>
			)}
		</div>
	)
}

export const CountDown = (props) => {

	const { drawDate } = props
	const curTime = useCountDown(drawDate)

	return (
		<div className="timer-view">
			{curTime.tm < 0 && <div className="item-expired">EXPIRED</div>}
			{curTime.tm >= 0 && (
				<table>
					<tbody>
						<tr>
							<td><div className="timer-value timer-value-days value-days">{curTime.days}</div></td>
							<td><div className="timer-delimiter">:</div></td>
							<td><div className="timer-value timer-value-hours value-hours">{numberWithLength(curTime.hours, 2)}</div></td>
							<td><div className="timer-delimiter">:</div></td>
							<td><div className="timer-value timer-value-minutes value-minutes">{numberWithLength(curTime.minutes, 2)}</div></td>
							<td><div className="timer-delimiter">:</div></td>
							<td><div className="timer-value timer-value-seconds value-seconds">{numberWithLength(curTime.seconds, 2)}</div></td>
						</tr>
						<tr>
							<td><div className="timer-unit unit-0">days</div></td><td></td>
							<td><div className="timer-unit unit-1">hrs</div></td><td></td>
							<td><div className="timer-unit unit-2">min</div></td><td></td>
							<td><div className="timer-unit unit-3">sec</div></td>
						</tr>
					</tbody>
				</table>
			)}
		</div>
	)
}
