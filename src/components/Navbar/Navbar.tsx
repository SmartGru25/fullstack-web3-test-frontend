import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from '../../requests';
import styles from './Navbar.module.css';
import { getCookie, removeCookie } from 'typescript-cookie';

export function Navbar() {
  const token = getCookie('foaltoken');

  const logOutAndRedirect = async () => {
    removeCookie('foaltoken');
    await signOut();
  }

  return (
    <div className={styles.navbar}>
      <div></div>
      {
        token ?
        (
          <Fragment>
            <Link to="/" className="btn btnPrimary">Secrets</Link>
            <Link to="/login" onClick={logOutAndRedirect} className="btn">Log out</Link>
          </Fragment>
        ) : (
          <Fragment>
            <Link to="/login" className="btn btnPrimary">Log in</Link>
          </Fragment>
        )
      }
    </div>
  );
}