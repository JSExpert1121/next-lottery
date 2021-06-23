import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { TTInput } from 'components/form/form-control';
import TicketLine from 'components/ticket/line';
import { generateArray } from 'helpers/array';
import { setGameStatus } from 'store/actions/game';

const GroupGame = (props) => {

  const { data, groupLine } = props;
  const [option, setOption] = useState(0);
  const [shares, setShares] = useState(1);
  const [draws, setDraws] = useState(1);
  const [showLines, setShowLines] = useState(false);
	const dispatch = useDispatch();
  const router = useRouter();

  const handleLinesChange = e => {
    setShares(parseInt(e.target.value) === NaN ? 1 : parseInt(e.target.value));
  }

  const linesPlus = e => {
    e.preventDefault();
    setShares(shares + 1);
  }

  const linesMinus = e => {
    e.preventDefault();
    setShares((shares - 1) < 1 ? 1 : shares - 1)
  }

  const selectSingle = () => {
    setDraws(1);
    setOption(0);
  }

  const selectMulti = () => {
    setDraws(2);
    setOption(1);
  }

  const toggleShow = e => {
    e.preventDefault();
    setShowLines(!showLines);
  }

  const options = data.Options.filter(opt => opt.NumberOfDraws > 1);
  const total = (shares * draws * data.PricePerShare / 8).toFixed(2);
  const discount = (shares * draws * data.PricePerShare / 8 * data.Options.find(opt => opt.NumberOfDraws === draws)?.Discount ?? 0).toFixed(2);
  const tens = generateArray(0, 9);
  const fours = generateArray(0, 4);

  const storeGame = () => {
    dispatch(setGameStatus({
			name: data.LotteryName,
			lines: shares,
			typeId: data.LotteryTypeId,
      price: total - discount,
			draws,
			productId: 3,
			picks: ''
		}));
  }

  const gotoCart = e => {
    storeGame();
    router.push('/user/cart');
  }

  return (
    <form name='groupdata' id='groupdata'>
      <div className='group-ticket-section active' id='group'>
        <section className='body-section'>
          <div className='body-left'>
            <img className='hidden-xs' src='/images/group.jpg' />
          </div>
          <div className='body-right'>
            <div className='title hidden-xs'>{data.LotteryName} Group</div>
            <p className='hidden-xs'>Increase your winning chances with a Group Subscription. 1 in 4 jackpots is won by a Group Ticket. On this Subscription we cover all the bonus numbers to increase the winning chances of the group. You get: 50 lines and up to 150 shares in the group. Get more shares so you'll have a bigger portion from the winning</p>
            <div className='shars_countre center-block-mobile'>
              How many shares would you like?
              <div className='countre'>
                <table width='100%' border='0'>
                  <tbody>
                    <tr>
                      <td width='35' align='left' valign='middle'>
                        <button className='qtyminus' field='quantity' onClick={linesMinus}>
                          <span className='fa fa-minus-circle fa-2x'></span>
                        </button>
                      </td>
                      <td width='80' align='center' valign='middle'>
                        <input type='text' name='quantity' className='u_share_fill qty' value={shares} onChange={handleLinesChange} />
                      </td>
                      <td width='35' align='right' valign='middle'>
                        <button className='qtyplus' field='quantity' onClick={linesPlus}>
                          <span className='fa fa-plus-circle fa-2x'></span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button className="link-button" onClick={toggleShow}>
              {showLines ? 'Hide' : 'Show'} Group Lines
            </button>
          </div>
        </section>
        <section className={showLines ? 'active group-lines' : 'group-lines'}>
          <div className='lines-box'>
            {fours.map(col => (
              <div className='ten-lines-box' key={col}>
                {tens.map(row => (
                  <TicketLine 
                    numbers={groupLine[col * 10 + row]}
                    key={col * 10 + row}
                  />
                ))}
              </div>
            ))}
          </div>
        </section>
        <section className='group-option-section'>
          <div className='choose-option'>
            <div className='draw-option'>
              <TTInput
                type='checkbox'
                name="single_drawop"
                id="single_drawop"
                className="css-checkbox"
                desc={(
                  <span style={{ fontSize: 16 }}>
                    1 Draw (For the upcoming draw only)
                  </span>
                )}
                checked={option === 0}
                onChange={selectSingle}
                tooltip={(
                  <span style={{ fontSize: 14 }}>
                    <span className="fa fa-info-circle"></span>
                    <span>
                      1 Draw <hr /> <br />
                      Play for the next upcoming Draw only. <br /> Try a Multi-Draw or Subscription and get higher  discounts per draw.
                    </span>
                  </span>
                )}
              />
            </div>
            <div className='draw-option'>
              <TTInput
                type='checkbox'
                name="multi_drawop"
                id="multi_drawop"
                className="css-checkbox"
                desc={(
                  <span style={{ fontSize: 16 }}>
                    Multi-Draw
                  </span>
                )}
                checked={option === 1}
                onChange={selectMulti}
                tooltip={(
                  <span style={{ fontSize: 14 }}>
                    <span className="fa fa-info-circle"></span>
                    <span>Multi-draw <hr /><br />Choose Multi-Draw to play for several draws in  advance. Save up to 20% per draw.</span>
                  </span>
                )}
              />
              {option === 1 && (
                <select className="group_totaldraw" name="group_totaldraw" value={draws} onChange={e => setDraws(parseInt(e.target.value))}>
                  {options.map(opt => (
                    <option value={opt.NumberOfDraws} key={`${data.LotteryName}-${opt.NumberOfDraws}`}>
                      {parseInt(opt.Discount * 100) === 0 ? `${opt.NumberOfDraws} draws` : `${opt.NumberOfDraws} draws ${parseInt(opt.Discount * 100)} % discount`}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <div className='total-sum'>
            <div className='shares-draws'>
              {`${shares} Shares X ${draws} Draws ${total}`}
            </div>
            {discount > 0 && (
              <div className='discount'>
                <span>Discount</span>
                <span>{`- € ${discount}`}</span>
              </div>
            )}
            <div className='total'>
              <span className='total-label'>Total</span>
              <span className='total-price'>{`€ ${(total - discount).toFixed(2)}`}</span>
            </div>
            <button className='oro-single-total_share_conti_btn' onClick={gotoCart}>
              Continue
            </button>
          </div>
        </section>
      </div>
    </form>
  )
}

export default GroupGame
