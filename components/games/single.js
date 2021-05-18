import React, { useState } from 'react'
import SelectNumbers from './selectnum';
import { generateArray } from 'helpers/array';
import { get_discounts } from 'helpers/discount';

const SingleGame = ({ data }) => {

	const [selNo, setSelNo] = useState({});
	const [flag1, setFlag1] = useState(true);
	const [flag2, setFlag2] = useState(true);
	const [ssub, setSsub] = useState([false, false, false, false]);
	const [sdraw, setsDraw] = useState(1);

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

			<div className={`cardlist ${data.LotteryName}`}>
				<input type="hidden" id="totallines" value="1" />
				<input type="hidden" id="choosenTab" value="#single" />
				<input type="hidden" id="lotteryId" value={data.LotteryTypeId} name="lotteryId" />
				<input type="hidden" id="m" value={data.NumberOfMainNumbers} />
				<input type="hidden" id="m1" value={data.AmountOfMainNumbersToMatch} />
				<input type="hidden" id="e" value={data.NumberOfExtraNumbers} />
				<input type="hidden" id="e1" value={data.AmountOfExtraNumbersToMatch} />
				<input type="hidden" id="lines" name="lines" value={selNo.lines ?? ""} />
				<input type="hidden" id="selno" name="selno" value={selNo.selno ?? ""} />
				<input type="hidden" id="singtp" name="totalprice" value={selNo.totalprice ?? ""} />
				<input type="hidden" id="singsubtp" name="subtotal" value={selNo.subtotal ?? ""} />
				<input type="hidden" id="singbm" name="bonusmoney" value={selNo.bonusmoney ?? ""} />
				<input type="hidden" id="minl" value="" />
				<input type="hidden" id="maxl" value="" />
				<input type="hidden" id="even" value="" />
				<input type="hidden" id="storeselected" value={selNo.storeselected ?? ""} name="storeselected" />
				<input type="hidden" id="otherdata" name="otherdata" value={`${data.LotteryCurrency2}|${data.LotteryName}|0`} />

				<div className="card_row addcardrow cardline" id="row_1">
					<div className="tabin_main">
						<div className="tabin_main_select">
							{generateArray(1, 4).map(i => (
								<SelectNumbers data={data} numTickets={i} />
							))}
						</div>

						<div class="last-section">
							<div class="buy-now-section-new box_det">
								<div class="one-time-entry space_add col3 option-row selcteddrow" htmlFor="radio1Label">
									<div class="spa">
										<label htmlFor="radio1" class="radio inline radGroup1 oro-option-label" id="radio1Label">
											<input type="radio" name="single_drawop" id="radio1" class="css-checkbox" value="1" checked={flag1} />
											<span class="f">1 Draw
												<span class="tooltip">
													<span class="fa fa-info-circle"></span>
													<span>
														1 DRAW
														<hr /><br />
														Play for the next upcoming Draw only. <br /> Try a Multi-Draw or Subscription and get higher  discounts per draw.
													</span>
												</span>
											</span>
										</label>
										<span class="one-draw-description">
											For the upcoming draw only
										</span>
									</div>
								</div>

								<div class="subscription space_add col3 option-row" htmlFor="radio3Label">
									<div class="spa">
										<label htmlFor="radio3" class="radio inline radGroup1 oro-option-label" id="radio3Label">
											<input type="radio" name="single_drawop" id="radio3" class="css-checkbox" value="3" checked={flag2} />
											<span class="f">Subscription
												<span class="tooltip">
													<span class="fa fa-info-circle"></span>
													<span>
														Subscription
														<hr /><br />Earn more VIP points, more discounts and never miss a draw! Choose your billing period of 1 week, 2 weeks or 4 weeks.
													</span>
												</span>
											</span>
										</label>

										<div class="comman left dropdown-option">
											<div class="dropdown_new_c oro-single-dropdown_new_c" style={{ marginLeft: 0 }}>
												<select class="single_subs" name="single_subs">
													<option value="1" checked={ssub[1]}>
														{get_discounts(data.LotteryName, 'single', 1)}
													</option>
													<option value="2" checked={ssub[2]}>
														{get_discounts(data.LotteryName, 'single', 2)}
													</option>
													<option value="4" checked={ssub[4]}>
														{get_discounts(data.LotteryName, 'single', 4)}
													</option>
												</select>
											</div>
										</div>
									</div>
								</div>

								{(data.LotteryName == 'BTC Power Play' || data.LotteryName == 'MegaJackpot') ? (
									<span class="draws" style={{ display: 'none' }}>{sdraw > 0 ? sdraw : '1'} Draws</span>
								) : (
									<div class="space_add">
										<div class="spa oro-fill-width">
											<div class="oro-lines-draws">
												<div>
													<div class="lines oro-lines">{selNo.lines ?? 0} lines</div>
													<div class="oro-draws-label">X <span class="draws">{sdraw > 0 ? sdraw : '1'} Draws</span></div>
												</div>
												<div class="oro-lines-draws-price">
													€&nbsp;
												<span class="subtotal">{selNo.subtotal ?? '0.00'}</span>
												</div>
											</div>
											<div style={{ marginBottom: 10 }}>
												<div id="disc_single" style={{ display: 'none' }}>
													<div>Discount:</div>
													<div>-€<span class="discountprice">0.00</span></div>
												</div>
											</div>
											<div class="oro-ttl_share_lab">
												<div class="oro-bonus-money-block">
													<div class="oro-bonus-money">
														<div class="oro-bonus-label">Bonus Money</div>
													</div>
													<span class="tooltip">
														<span class="fa fa-info-circle"></span>
														<span>Bonus Money
														<hr /><br />
														This is the amount of bonus money you get on this   purchase. Bonus money can be used to purchase more tickets for free.
													</span>
													</span>
													<div>
														<span class="bmcurrency oro-bmcurrency">€</span>&nbsp;
														<span class="bonusmoney oro-bonusmoney">
															{selNo.bonusmoney ?? '0.00'}
														</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								)}

								<div class="total space_add oro-total-width">
									<div class="spa oro-fill-width">
										<div class="oro-total-price-text">
											<div class="font13 oro-total-price-label">Total</div>
											<div class="font22 oro-total-price-number">
												€&nbsp;
															<span class="totalprice">{selNo.totalprice ?? '0.00'}</span>
											</div>
										</div>
										<input type="hidden" value={data.PricePerLine.toFixed(2)} id="stp" />
										<div class="tpt">
											<a class="oro-single-total_share_conti_btn" id="single_continue">Continue</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="mobile-ticket-buttons">
						<a href="#single" class="person-ticket-button" id="person-ticket-button" style={{ display: 'none' }}>Person ticket</a>
						{(data.LotteryName != 'BTC Power Play' && data.LotteryName != 'MegaJackpot') && (
							<a href="#group" class="group-ticket-button" id="group-ticket-button">Group ticket</a>
						)}
					</div>
				</div >
			</div >
			<div class="clear_inner hidden-xs" style={{ height: 5 }}>&nbsp;</div>
		</form >
	)
}

export default SingleGame;
