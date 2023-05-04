import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../../requests';
import styles from './Navbar.module.css';
import { getToken, removeToken } from '../../token';
import { getCookie, removeCookie } from 'typescript-cookie';
import Identicon from '@polkadot/react-identicon';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

export function Navbar() {
  const token = getToken();
  const accountCookie = getCookie('wallet') || '{}';
  const account: InjectedAccountWithMeta = JSON.parse(accountCookie);

  const signOutAndRedirect = async () => {
    removeToken();
    removeCookie('wallet');
    await signOut();
  }

  return (
    <div className={styles.navbar}>
      <div></div>
      {
        token ?
        (
          <Fragment>
            <span className={styles.name}>{ account.meta.name! }</span>
            <Identicon
              value={account.address}
              size={32}
              theme="polkadot"
            />
            {/* <Link to="/" className="btn btnPrimary">Secrets</Link> */}
            <Link to="/signin" onClick={signOutAndRedirect} className="btn">Log out</Link>
          </Fragment>
        ) : (
          <Fragment>
            <Link to="/signin" className="btn btnPrimary">Log in</Link>
          </Fragment>
        )
      }
    </div>
  );
}