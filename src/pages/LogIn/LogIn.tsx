import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../interfaces';
import { logIn } from '../../requests';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { isFunction, u8aToHex, u8aWrapBytes } from '@polkadot/util';

import styles from './LogIn.module.css';

interface LogInProps {
  onLogIn: (user: IUser) => void;
}

export function LogIn(props: LogInProps) {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [currentAccount, setCurrentAccount] = useState<InjectedAccountWithMeta | null>(null);

  useEffect(() => {
    extensionSetup();
  }, []);

  const extensionSetup = async () => {
    const extensions = await web3Enable('Polkadot Test App');
    if (extensions.length === 0) {
        setError('No extension installed!');
        return;
    }
    try {
      const accounts = await web3Accounts();
      setAccounts(accounts);
      setCurrentAccount(accounts[0] || null);
    } catch (error: any) {
      console.log(error);
      setError(error);
    }
  };

  const _onChangeAccount = useCallback((address: string | null) => {
    const account = accounts.find((acc) => acc.address === address);
    setCurrentAccount(account || null);
  }, [accounts]);

  const _onSign = useCallback(
    async (): Promise<void> => {
      if (!currentAccount) {
        setError('No selected wallet account');
        return;
      }
      const injector = await web3FromAddress(currentAccount.address);
      const signer = injector.signer;

      if (injector === null || signer === null || !isFunction(signer.signRaw)) {
        setError('Extension error');
        return;
      }

      const messageToBeSigned = `Sign-in request for address ${currentAccount?.address}.`;
      const wrapped = u8aWrapBytes(messageToBeSigned);

      const signedData = await signer.signRaw({
          address: currentAccount.address,
          data: u8aToHex(wrapped),
          type: 'bytes'
        });
    },
    [currentAccount]
  );

  const logInAndRedirect = async () => {
    _onSign();

    setError("");
    try {
      // const user = await logIn(address);
      // props.onLogIn(user);
      navigate("/");
    } catch (error: any) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <div className={`${styles.container} box`}>
      <h1 className={styles.title}>Sign In</h1>
      {
        error !== '' && (
          <div className={styles.error}>
            { error }
          </div>
        )
      }
      <div className={styles.formGroup}>
        <label htmlFor="address">Wallet Address</label>
        <select
          id="address"
          name="address"
          defaultValue={currentAccount?.address}
          onChange={(e) => _onChangeAccount(e.target.value)}>
          <option value="" disabled>{ accounts.length ? 'Select wallet' : 'No wallet'}</option>
          { accounts.map(account => (
              <option value={account.address} key={account.address}> { account.address } </option>
            ))
          }
        </select>
      </div>
      <div>
        <button onClick={logInAndRedirect} className={`${styles.btn} btn btnPrimary`}>Sign in with wallet</button>
      </div>
    </div>
  );
}