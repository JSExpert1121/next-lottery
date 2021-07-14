import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import SelectNumbers from './selectnum';
import { TTInput } from 'components/form/form-control';
import { generateArray } from 'helpers/array';
import { get_discounts } from 'helpers/discount';
import { selected_dump } from 'helpers/pickio';
import { setGameStatus } from 'store/actions/game';

const SingleGame = ({ data, selMs, selEs }) => {

	const [selNo, setSelNo] = useState({});
	const [flag1, setFlag1] = useState(true);
	const [flag2, setFlag2] = useState(true);
	const [flags, setFlags] = useState([false, false, false, false]);
	const [selectedM, setSelectedM] = useState(selMs);
	const [selectedE, setSelectedE] = useState(selEs);
	const [option, setOption] = useState(1);
	const dispatch = useDispatch();

	const selectChanged = useCallback((i, selM, selE) => {
		flags[i - 1] = selM.length === data.AmountOfMainNumbersToMatch &&
			selE.length === data.AmountOfExtraNumbersToMatch;
		const lines = flags.filter(f => f).length;
		setFlags([...flags]);

		selectedM[i - 1] = [...selM];
		selectedE[i - 1] = [...selE];
		setSelectedM([...selectedM]);
		setSelectedE([...selectedE]);

		dispatch(setGameStatus({
			name: data.LotteryName,
			lines,
			typeId: data.LotteryTypeId,
			price: lines * data.PricePerLine,
			draws: 1,
			productId: 1,
			picks: selected_dump(selectedM, selectedE, data.AmountOfMainNumbersToMatch, data.AmountOfExtraNumbersToMatch)
		}));

		setSelNo({
			...selNo,
			totalprice: lines * data.PricePerLine
		})
	}, [flags]);

	const optionChanged = useCallback(e => {
		setOption(e.target.value);
	}, []);

	useEffect(() => {
		setSelectedM([...selMs]);
		setSelectedE([...selEs]);

		for (let i = 0; i < 5; i++) {
			flags[i] = selMs[i].length === data.AmountOfMainNumbersToMatch &&
				selEs[i].length === data.AmountOfExtraNumbersToMatch;
		}
		const lines = flags.filter(f => f).length;
		dispatch(setGameStatus({
			name: data.LotteryName,
			lines,
			typeId: data.LotteryTypeId,
			price: lines * data.PricePerLine,
			draws: 1,
			productId: 1,
			picks: selected_dump(selMs, selEs, data.AmountOfMainNumbersToMatch, data.AmountOfExtraNumbersToMatch)
		}));
		setFlags([...flags]);
		setSelNo({
			...selNo,
			totalprice: lines * data.PricePerLine
		})
	}, [selEs, selMs]);

	const lines = flags.filter(f => f).length;
	const enable = lines >= data.MinLines && lines <= data.MaxLines;
	return (
		<form name="singledata" id="singledata">
			<div className="single active" id="single">
				<ul id="main-nav" className="green-nav-buttons mid_buttons2">
					<span className="tooltip" style={{ display: 'none' }}>
						<div className="removelines hide hidden-xs"></div>
						<span className="tip-remove-line">Remove Lines</span>
					</span>
					<span className="tooltip" style={{ display: 'none' }}>
						<div className="addlines hidden-xs"></div>
						<span className="tip-add-line">Add 5 more Lines</span>
					</span>
					<span className="tooltip" style={{ display: 'none' }}>
						<div className="clearall_btn clearall"></div>
					</span>
					<span className="tooltip" style={{ display: 'none' }}>
						<input name="" type="button" className="picall_btn pickall" />
						<span className="tip-pick-line">QuickPick Select Numbers on All Tickets on the Page</span>
					</span>
				</ul>
			</div >

			<p>{`Please pick ${data.MinLines} ~ ${data.MaxLines} lines`}</p>
			<div className={`cardlist ${data.LotteryName}`}>
				<div className="card_row addcardrow cardline" id="row_1">
					<div className="tabin_main">
						<div className="tabin_main_select">
							{generateArray(1, 5).map(i => (
								<SelectNumbers data={data} numTickets={i} key={i} onSelected={selectChanged} selE={selectedE[i - 1]} selM={selectedM[i - 1]} />
							))}
						</div>

						<div className="last-section">
							<div className="buy-now-section-new box_det">
								<div className="one-time-entry space_add col3 option-row selcteddrow" htmlFor="radio1Label">
									<div className="spa">
										<TTInput
											type='checkbox'
											name="single_drawop"
											id="radio1"
											className="css-checkbox"
											desc="1 DRAW"
											checked={flag1}
											onChange={() => setFlag1(!flag1)}
											tooltip={(
												<span style={{ fontSize: 14 }}>
													Play for the next upcoming Draw only. Try a Multi-Draw or Subscription and get higher  discounts per draw.
												</span>
											)}
										/>
										<span className="one-draw-description" style={{ display: 'block' }}>
											For the upcoming draw only
										</span>
									</div>
								</div>

								<div className="subscription space_add col3 option-row" htmlFor="radio3Label">
									<div className="spa">
										<label htmlFor="radio3" className="radio inline radGroup1 oro-option-label" id="radio3Label">
											<input type="radio" name="single_drawop" id="radio3" className="css-checkbox" value="3" checked={flag2} onChange={() => setFlag2(!flag2)} />
											<span className="f">Subscription
												<span className="tooltip">
													<span className="fa fa-info-circle"></span>
													<span>
														Subscription
														<hr /><br />Earn more VIP points, more discounts and never miss a draw! Choose your billing period of 1 week, 2 weeks or 4 weeks.
													</span>
												</span>
											</span>
										</label>

										<div className="comman left dropdown-option">
											<div className="dropdown_new_c oro-single-dropdown_new_c" style={{ marginLeft: 0 }}>
												<select className="single_subs" name="single_subs" value={option} onChange={optionChanged}>
													<option value={1}>
														{get_discounts(data.LotteryName, 'single', 1)}
													</option>
													<option value={2}>
														{get_discounts(data.LotteryName, 'single', 2)}
													</option>
													<option value={4}>
														{get_discounts(data.LotteryName, 'single', 4)}
													</option>
												</select>
											</div>
										</div>
									</div>
								</div>

								<div className="space_add">
									{(data.LotteryName == 'BTC Power Play' || data.LotteryName == 'MegaJackpot') ? (
										<span className="draws" style={{ display: 'none' }}>1 Draws</span>
									) : (
										<div className="spa oro-fill-width">
											<div className="oro-lines-draws">
												<div>
													<div className="lines oro-lines">{flags.filter(f => f).length} lines</div>
													<div className="oro-draws-label">X <span className="draws">1 Draws</span></div>
												</div>
												<div className="oro-lines-draws-price">
													€&nbsp;
													<span className="subtotal">{(selNo?.totalprice ?? 0).toFixed(2)}</span>
												</div>
											</div>
											<div style={{ marginBottom: 10 }}>
												<div id="disc_single" style={{ display: 'none' }}>
													<div>Discount:</div>
													<div>-€<span className="discountprice">0.00</span></div>
												</div>
											</div>
											<div className="oro-ttl_share_lab">
												<div className="oro-bonus-money-block">
													<div className="oro-bonus-money">
														<div className="oro-bonus-label">Bonus Money</div>
													</div>
													<span className="tooltip">
														<span className="fa fa-info-circle"></span>
														<span>Bonus Money
															<hr /><br />
															This is the amount of bonus money you get on this   purchase. Bonus money can be used to purchase more tickets for free.
														</span>
													</span>
													<div>
														<span className="bmcurrency oro-bmcurrency">€</span>&nbsp;
														<span className="bonusmoney oro-bonusmoney">
															{selNo.bonusmoney ?? '0.00'}
														</span>
													</div>
												</div>
											</div>
										</div>
									)}
									<div className="total space_add oro-total-width">
										<div className="spa oro-fill-width">
											<div className="oro-total-price-text">
												<div className="font13 oro-total-price-label">Total</div>
												<div className="font22 oro-total-price-number">
													€&nbsp;<span className="totalprice">{(selNo?.totalprice ?? 0).toFixed(2)}</span>
												</div>
											</div>
											<div className="tpt">
												<Link href='/user/cart'>
													<a className={enable ? "oro-single-total_share_conti_btn" : "oro-single-total_share_conti_btn disabled"} id="single_continue">Continue</a>
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div >
			</div >
			<div className="clear_inner hidden-xs" style={{ height: 5 }}>&nbsp;</div>
		</form >
	)
}

export default SingleGame;
