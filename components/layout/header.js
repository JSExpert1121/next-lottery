import { useCallback, useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import HeaderCoin from 'components/common/header-coin';
import supported_coins from 'data/coins.json';
import { getCoins } from 'service/client/coin';

import * as UserActions from 'store/actions/user';
import * as AuthActions from 'store/actions/auth';

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {

  const [nav, setNav] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coinVals, setCoinVals] = useState({ BTH: 0, BCH: 0 });
  const { coins } = supported_coins;

  const toggleNav = useCallback(() => setNav(!nav), [nav]);
  const cls = useMemo(() => nav ? 'show-nav clearfix' : 'clearfix', [nav]);
  const profile = useSelector(state => state.user.profile);
  const balance = useSelector(state => state.user.balance);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = useCallback(() => {
    dispatch(UserActions.logout());
    dispatch(AuthActions.clearCredentials());
    router.push('/');
  }, []);

  useEffect(() => {
    getCoins().then(data => {
      setCoinVals(data);
    })

    setMounted(true);
    jQuery(".contact-us-modal").on("click", function () {
      jQuery("#contact-us-modal").modal({
        fadeDuration: 300,
      });
    });
    
    jQuery("#contact-us-modal .fa-close").on("click", function () {
      jQuery("#contact-us-modal a.close-modal").click();
    });

    jQuery('.arrow_down_button').on('click', function () {
      if (jQuery(this).closest('li.has-child.mobile-menu').hasClass('active')) {
        jQuery('li.has-child.mobile-menu').removeClass('active');
      } else {
        jQuery('li.has-child.mobile-menu').removeClass('active');
        jQuery(this).closest('li.has-child.mobile-menu').addClass('active');
      }
    })
  
    
    return () => setMounted(false);
  }, []);

  return (
    <header id="header" className={cls}>
      <div className='menu'>
        <div className='left_menu'>
          <Link href="/">
            <a className='logo'>
              <span>Bitcoin</span>
              <span>Lotterys.com</span>
            </a>
          </Link>
          <ul>
            <li className=""><Link href="/lottery">Lottery</Link></li>
            <li className=""><Link href="/lottery-results">Results</Link></li>
            <li className="has-child">
              <Link href="/help/about-us">
                <a>
                  About&nbsp;
                  <svg className="arrowsvg" width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6.92766 7L13 1" strokeWidth="2" />
                  </svg>
                </a>
              </Link>
              <ul className="submenu">
                <li><Link href="/help/affiliate">Affiliate</Link></li>
                <li><Link href="/help/faq">FAQ</Link></li>
                <li><a className="contact-us-modal" href="#">Contact Us</a></li>
                <li><a className="tc-modal" href="/help/terms-conditions">Terms and Conditions</a></li>
              </ul>
            </li>
          </ul>
          <div className="header-bitcoin-values">
            {coins && coins.map(coin => (
              <Link href="/lottery" key={coin.id}>
                <a className='link'>
                  <HeaderCoin {...coin} ratios={coinVals} />
                </a>
              </Link>
            ))}
            <a href="/user/deposit" className="header-bitcoin-values-buy show-sign-in deposit-page-nav-btn">Deposit Now</a>
          </div>
        </div>
        <div className="right_menu">
          {profile && mounted ? (
            <div className="rsm-dropdown" style={{ marginRight: 32 }}>
              <div className='rsm-dropdown-box'>
                <div className='rsm-avatar'>
                  {(profile.FirstName && profile.LastName) ?
                    `${profile.FirstName.charAt(0)}${profile.LastName.charAt(0)}`.toUpperCase() :
                    profile.MemberId
                  }
                </div>
                <div>
                  <div className='rsm-account-username'>
                    {(profile.FirstName && profile.LastName) ?
                      `${profile.FirstName} ${profile.LastName}` :
                      'Player ' + profile.MemberId
                    }
                  </div>
                  <div className='rsm-account-balance'>
                    {balance && (
                      <>
                        <span>{`Balance: € ${balance.AccountBalance.toFixed(2)}`}</span>
                        <span>{`Bonus: € ${balance.BonusAmount.toFixed(2)}`}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="rsm-dropdown-content">
                <Link href="/user/me"><a><i className="fa fa-user"></i>{`My Account (ID: ${profile.MemberId})`}</a></Link>
                <Link href="/user/deposit"><a><i className="fa fa-money"></i>Deposit</a></Link>
                <Link href="/user/withdraw"><a><i className="fa fa-credit-card"></i>Withdraw</a></Link>
                <a href="#" onClick={handleLogout}><i className="fa fa-sign-out-alt"></i>Log out</a>
              </div>
            </div>
          ) : (
            <div className="login-register">
              <Link href='/auth/login'><a className='signin show-sign-in'><img src="/images/icon-login.png" />Log in</a></Link>
              <Link href='/auth/signup'><a className='register show-sign-up'><img src="/images/icon-register.png" />Register</a></Link>
            </div>
          )}
        </div>
      </div>
      <div className="wrap new_header_mobile_menu">
        <Link href="/">
          <a className="new_header_menu_logo">
            <span className='text-primary'>Bitcoin</span>
             <span className='text-secondary'>Lotterys.com</span>
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
            <li className=""><Link href="/lottery">Lottery</Link></li>
            <li className=""><Link href="/lottery-results">Results</Link></li>
            <li className="has-child mobile-menu">
              <div>
                <Link href="/help/about-us">About</Link>
                <div className="arrow_down_button">
                  <svg className="arrowsvg" width="20" height="20" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6.92766 7L13 1" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              <ul className="submenu" style={{ display: "none" }}>
                <li><Link href="/help/affiliate">Affiliate</Link></li>
                <li><Link href="/help/faq">FAQ</Link></li>
                <li><a className="contact-us-modal" href="#">Contact Us</a></li>
                <li>
                  <Link href='/help/terms-conditions'>
                    <a className="tc-modal">Terms and Conditions</a>
                  </Link>
                </li>
                <li>
                  <Link href='/help/privacy'>
                    <a className="privacy-modal">Privacy Policy</a>
                  </Link>
                  </li>
              </ul>
            </li>
            {(profile && mounted) ? (
              <>
                <li className=""><Link href="/user/me">{`My Account (ID: ${profile.MemberId})`}</Link></li>
                <li className=""><a href="#" onClick={handleLogout}>Log out</a></li>
              </>
            ) : (
              <>
                <li className="">
                  <Link href='/auth/login'><a className='button'><img src="/images/icon-login.png" />Log in</a></Link>
                </li>
                <li>
                  <Link href='/auth/signup'><a className='button'><img src="/images/icon-register.png" />Register</a></Link>
                </li>
              </>
            )}
            <li className="header_mobile_menu_bitcoin_values_part">
              <div className="header-bitcoin-values">
                <Link href="/user/deposit"><a className="header-bitcoin-values-buy deposit-page-nav-btn">Deposit</a></Link>
                {coins && coins.map(coin => (
                  <Link key={coin.id} href="/lottery">
                    <a className='link'><HeaderCoin {...coin} ratios={coinVals} /></a>
                  </Link>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header >
  )
}
