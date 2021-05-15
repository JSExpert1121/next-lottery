import { useCallback, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import HeaderCoin from 'components/common/header-coin';
import supported_coins from 'data/coins.json';
import * as UserActions from 'store/actions/user';


// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {

  const [nav, setNav] = useState(false);
  const { coins } = supported_coins;

  const toggleNav = useCallback(() => setNav(!nav), [nav]);
  const cls = useMemo(() => nav ? 'show-nav clearfix' : 'clearfix', [nav]);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(UserActions.logout());
  }, []);

  return (
    <header id="header" className={cls}>
      <div className='menu'>
        <div className='left_menu'>
          <a className='logo' href="/">
            <img src="/images/bitcoinlottery@2x-1.png" />
          </a>
          <ul>
            <li className=""><a href="/lottery">Lottery</a></li>
            <li className=""><a href="/lottery-results">Results</a></li>
            <li className="has-child">
              <a href="/about-us">
                About&nbsp;
				        <svg className="arrowsvg" width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6.92766 7L13 1" strokeWidth="2" />
                </svg>
              </a>
              <ul className="submenu">
                <li><a href="/faq">FAQ</a></li>
                <li><a className="contact-us-modal" href="#">Contact Us</a></li>
                <li><a className="tc-modal" href="#">Terms and Conditions</a></li>
              </ul>
            </li>
          </ul>
          <div className="header-bitcoin-values">
            {coins && coins.map(coin => (
              <a key={coin.id} href="/lottery" className='link'>
                <HeaderCoin {...coin} />
              </a>
            ))}
            {/* <a href="https://buy.bitcoin.com" className="header-bitcoin-values-buy" target="_blank">Buy Bitcoin</a> */}
            <a href="#" className="header-bitcoin-values-buy show-sign-in deposit-page-nav-btn">Deposit Now</a>
          </div>
        </div>
        <div className="right_menu">
          {user.profile && (
            <div className='rsm-dropdown' style={{ marginRight: 32 }}>
              <div className='rsm-dropdown-box'>
                <div className='rsm-avatar'>
                  {(user.profile.FirstName && user.profile.LastName) ?
                    `${user.profile.FirstName.charAt(0)}${user.profile.LastName.charAt(0)}`.toUpperCase() :
                    user.profile.MemberId
                  }
                </div>
                <div>
                  <div className='rsm-account-username'>
                    {(user.profile.FirstName && user.profile.LastName) ?
                      `${user.profile.FirstName} ${user.profile.LastName}` :
                      'Player ' + user.profile.MemberId
                    }
                  </div>
                  <div className='rsm-account-balance'>
                    {user.balance && (
                      <>
                        <span>{`Balance: € ${user.balance.AccountBalance.toFixed(2)}`}</span>
                        <span>{`Bonus: € ${user.balance.BonusAmount.toFixed(2)}`}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="rsm-dropdown-content">
                <a href="/users/me"><i className="fa fa-user"></i>My Account</a>
                <a href="/users/deposit"><i className="fa fa-money"></i>Deposit</a>
                <a href="/users/withdraw"><i className="fa fa-credit-card"></i>Withdraw</a>
                <a onClick={handleLogout}><i className="fa fa-sign-out-alt"></i>Log out</a>
              </div>
            </div>
          )}
          {!user.profile && (
            <div className="login-register">
              <a href='/auth/login' className='signin show-sign-in'><img src="/images/icon-login.png" />Log in</a>
              <a href='/auth/signup' className='register show-sign-up'><img src="/images/icon-register.png" />Register</a>
            </div>
          )}
        </div>
      </div>
      <div className="wrap new_header_mobile_menu">
        <Link href="/">
          <a className="new_header_menu_logo">
            <img src="/images/bitcoinlottery@2x-1.png" />
          </a>
        </Link>
        <a data-href="nav" className="mobile-trigger trigger-nav" onClick={toggleNav}>
          <i>
            <span className="line-1"></span>
            <span className="line-2"></span>
            <span className="line-3"></span>
          </i>
        </a>
        <div id="menu-container">
          <ul className="wrap-top-menu">
            <li className=""><a href="/lottery">Lottery</a></li>
            <li className=""><a href="/lottery-results">Results</a></li>
            <li className="has-child mobile-menu">
              <div>
                <a href="/about-us">About</a>
                <div className="arrow_down_button">
                  <svg className="arrowsvg" width="20" height="20" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6.92766 7L13 1" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              <ul className="submenu" style={{ display: "none" }}>
                <li><a href="faq.html">FAQ</a></li>
                <li><a className="contact-us-modal" href="#">Contact Us</a></li>
                <li><a className="tc-modal" href="#">Terms and Conditions</a></li>
                <li><a className="privacy-modal" href="#">Privacy Policy</a></li>
              </ul>
            </li>
            <li className="">
              <a href='/auth/login' className='button'><img src="/images/icon-login.png" />Log in</a>
            </li>
            <li>
              <a href='/auth/signup' className='button'><img src="/images/icon-register.png" />Register</a>
            </li>
            <li className="header_mobile_menu_bitcoin_values_part">
              <div className="header-bitcoin-values">
                <a href="deposit" className="header-bitcoin-values-buy deposit-page-nav-btn">Deposit</a>
                {coins && coins.map(coin => (
                  <Link key={coin.id} href="/lottery">
                    <a className='link'><HeaderCoin {...coin} /></a>
                  </Link>
                ))}
                {/* <a href="https://buy.bitcoin.com" className="header-bitcoin-values-buy" target="_blank">Buy Bitcoin</a> */}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header >
  )
}
