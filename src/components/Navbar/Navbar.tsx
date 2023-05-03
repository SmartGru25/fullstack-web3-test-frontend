import { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IUser } from '../../interfaces';
import { logOut } from '../../requests';
import styles from './Navbar.module.css';

interface NavbarProps {
  currentUser: IUser|null;
  onLogOut: () => void;
}

export function Navbar(props: NavbarProps) {
  const history = useHistory();

  async function logOutAndRedirect() {
    await logOut();
    props.onLogOut();
    history.push('/');
  }

  return (
    <div className={styles.navbar}>
      <div></div>
      {
        props.currentUser ?
        (
          <Fragment>
            <Link to="/" className="btn btnPrimary">Feed</Link>
            <Link to="/profile" className="btn btnPrimary">Profile</Link>
            <button onClick={logOutAndRedirect} className="btn">Log out</button>
          </Fragment>
        ) : (
          <Fragment>
            <Link to="/login" className="btn btnPrimary">Log in</Link>
            <Link to="/signup" className="btn btnPrimary">Sign up</Link>
          </Fragment>
        )
      }
    </div>
  );
}