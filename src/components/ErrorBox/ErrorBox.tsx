import { Link } from 'react-router-dom';
import styles from './ErrorBox.module.css';

export function ErrorBox() {
  return (
    <div className={`${styles.container} box`}>
      You need to <Link to="./signin">sign in</Link> to see the secret message.
    </div>
  )
}