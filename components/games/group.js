import React, { useState } from 'react';
import Link from 'next/link';
import { TTInput } from 'components/form/form-control';

const GroupGame = (props) => {

  const { data } = props;
  const [option, setOption] = useState(0);

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
                      <a href='javascript:void(0)' className='qtyminus' field='quantity'>
                        <span className='fa fa-minus-circle fa-2x'></span>
                      </a>
                    </td>
                    <td width='80' align='center' valign='middle'>
                      <input type='text' name='quantity' className='u_share_fill qty' value='' />
                    </td>
                    <td width='35' align='right' valign='middle'>
                      <a href='javascript:void(0)' className='qtyplus' field='quantity'>
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
                onChange={() => setOption(0)}
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
                onChange={() => setOption(1)}
                tooltip={(
                  <span style={{ fontSize: 14 }}>
                    <span className="fa fa-info-circle"></span>
                    <span>Multi-draw <hr /><br />Choose Multi-Draw to play for several draws in  advance. Save up to 20% per draw.</span>
                  </span>
                )}
              />
              {option === 1 && (
                <select className="group_totaldraw" name="group_totaldraw">
                  <option value="2">2 draws</option>
                  <option value="4">4 draws</option>
                  <option value="8">8 draws</option>
                  <option value="26">26 draws 15% discount</option>
                  <option value="52">52 draws 20% discount</option>
                </select>
              )}
            </div>
          </div>
          <div className='total-sum'>
            <div className='shares-draws'>
              1 Shares X 2 Draws € 13.80
            </div>
            <div className='total'>
              <span className='total-label'>Total</span>
              <span className='total-price'>€ 13.80</span>
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
