import React, { useEffect, useState } from "react";
import { ErrorBox } from "../../components";
import { ISecret } from "../../interfaces";
import { fetchSecret } from "../../requests";
import styles from './Secrets.module.css';
import { getToken } from "../../token";

const defaultSecret: ISecret = {
  id: 0,
  message: ''
};

export function Secrets() {
  const token = getToken();
  const [secretLoaded, setSecretLoaded] = useState(false);
  const [secret, setSecret] = useState<ISecret>(defaultSecret);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!secretLoaded) {
      fetchSecret()
        .then(data => {
          setSecret(data);
          setSecretLoaded(true);
          setError(false);
        })
        .catch(err => {
          console.log(err);
          setError(true);
        });
    }
  }, [token, secretLoaded])

  return (
    <div className={styles.container}>
      <div className="box">
        <h2>The Secret Message is ...</h2>
        <span className={styles.message}>
          { secret.message }
        </span>
      </div>
      {
        error && <ErrorBox />
      }
    </div>
  )
}