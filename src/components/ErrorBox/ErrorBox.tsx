import styles from './ErrorBox.module.css';

export function ErrorBox() {
  return (
    <div className={`${styles.container} box`}>
      An error has occurred. Please try refreshing the page.
    </div>
  )
}