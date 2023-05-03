import { useState } from "react";
import { ICredentials } from "../../interfaces";

import styles from './CredentialsForm.module.css';

interface CredentialsFormProps {
  type: 'signup'|'login';
  error: boolean;
  onSubmit: (credentials: ICredentials) => void;
}

export function CredentialsForm(props: CredentialsFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const word = props.type === 'signup' ? 'Sign up' : 'Log in';

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Clear form
    setEmail('');
    setPassword('');

    props.onSubmit({ email, password });
  }

  return (
    <div>
      <h1 className={styles.title}>{word}</h1>
      {
        props.error && (
          <div className={styles.error}>
            {props.type === 'login' ? 'Authentication failed.' : 'Registration failed.'}
          </div>
        )
      }
      <form onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div>
          <input type="submit" value={word} className={`${styles.btn} btn btnPrimary`} />
        </div>
      </form>
      <div className={styles.separator}>
      </div>
      <div>
        <form action="/api/auth/google" method="get">
          <input type="submit" value={`${word} with Google`} className={`${styles.btn} btn`} />
        </form>
      </div>
    </div>
  )
}