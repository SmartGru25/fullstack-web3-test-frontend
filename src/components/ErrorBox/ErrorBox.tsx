import { Link } from 'react-router-dom';
import styles from './ErrorBox.module.css';
import { removeToken } from '../../token';

export function ErrorBox() {
  return (
    <div className={`${styles.container} box`}>
      Invalid token. You need to <Link to="./signin" onClick={removeToken}>Sign In</Link> to see the <b>SECRET</b> message.
    </div>
  )
}