import { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import HeaderCoin from 'components/common/header-coin';
import supported_coins from 'data/coins.json';

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {

  const [nav, setNav] = useState(false);
  const { coins } = supported_coins;

  const toggleNav = useCallback(() => setNav(!nav), [nav]);
  const cls = useMemo(() => nav ? 'show-nav clearfix' : 'clearfix', [nav]);

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
          <div className="login-register">
            <a href='/auth/login' className='signin show-sign-in'><img src="/images/icon-login.png" />Log in</a>
            <a href='/auth/signup' className='register show-sign-up'><img src="/images/icon-register.png" />Register</a>
            {/* <button type="button" className="signin show-sign-in"><img src="/images/icon-login.png" />Log in</button> */}
            {/* <button type="button" className="register show-sign-up"><img src="/images/icon-register.png" />Register</button> */}
          </div>
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
              {/* <Link href='/auth/signup'>
                <a className='register show-sign-up'><img src="/images/icon-register.png" />Register</a>
              </Link>

              <button type="button" className="signin show-sign-in">
                <img src="/images/icon-login.png" />
                Log in
              </button>*/}
            </li>
            <li>
              <a href='/auth/signup' className='button'><img src="/images/icon-register.png" />Register</a>
              {/* <button type="button" className="register show-sign-up">
                <img src="/images/icon-register.png" />
                Register
              </button> */}
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
    </header>
  )
}
