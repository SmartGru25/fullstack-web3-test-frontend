import { Link } from 'react-router-dom';
import styles from './ErrorBox.module.css';

export function ErrorBox() {
  return (
    <div className={`${styles.container} box`}>
      You need to <Link to="./signin">Sign In</Link> to see the <b>SECRET</b> message.
    </div>
  )
}