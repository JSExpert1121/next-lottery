import React, { useState } from 'react';
import Link from 'next/link';
import { TTInput } from 'components/form/form-control';

const GroupGame = (props) => {

  const { data } = props;
  const [option, setOption] = useState(0);
  const [shares, setShares] = useState(1);
  const [draws, setDraws] = useState(1);

  const handleLinesChange = e => {
    setShares(parseInt(e.target.value) === NaN ? 1 : parseInt(e.target.value));
  }

  const linesPlus = () => {
    setShares(shares + 1);
  }

  const linesMinus = () => {
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

  const options = data.Options.filter(opt => opt.NumberOfDraws > 1);
  const total = (shares * draws * data.PricePerShare / 8).toFixed(2);
  const discount = (shares * draws * data.PricePerShare / 8 * data.Options.find(opt => opt.NumberOfDraws === draws)?.Discount ?? 0).toFixed(2);

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
                  <tr>
                    <td width='35' align='left' valign='middle'>
                      <a href='javascript:void(0);' className='qtyminus' field='quantity' onClick={linesMinus}>
                        <span className='fa fa-minus-circle fa-2x'></span>
                      </a>
                    </td>
                    <td width='80' align='center' valign='middle'>
                      <input type='text' name='quantity' className='u_share_fill qty' value={shares} onChange={handleLinesChange} />
                    </td>
                    <td width='35' align='right' valign='middle'>
                      <a href='javascript:void(0);' className='qtyplus' field='quantity' onClick={linesPlus}>
                        <span className='fa fa-plus-circle fa-2x'></span>
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <a className="show-group-lines" id="show-group-lines-btn" data-lottery-name="<?php echo $data['LotteryName']; ?>">Show Group Lines</a>
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
            <Link href='/user/cart'>
              <a className='oro-single-total_share_conti_btn'>
                Continue
              </a>
            </Link>
          </div>
        </section>
      </div>
    </form>
  )
}

export default GroupGame
