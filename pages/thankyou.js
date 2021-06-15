import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from 'components/layout';
import Link from 'next/link';
import * as UserActions from 'store/actions/user';

const Thankyou = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  useEffect(() => {
    if (profile?.MemberId) {
      dispatch(UserActions.getBalance(profile?.MemberId));
    }
  }, [profile?.MemberId]);

  return (
    <Layout>
      <main id="main" className="clearfix">
        <div className="wrap">
          <div className="thankyoupage">
            <center>
              <h1 className="thankyoutitle">Thank you and good luck</h1>
            </center>
            <div className="clear_inner">
              &nbsp;
            </div>
            <div className="comman">
              <div className="thankyoupage1">
                <p className="thanktxt1">
                  Congratulation, your payment was successful. We wish you luck on your next draw. Thank you for playing with Bitcoin the online lottery.
                </p>

                <div className="thankurl right">
                  <Link href="/">
                    <span style={{ color: '#06a153', cursor: 'pointer' }}>CONTINUE &gt;&gt;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Thankyou
