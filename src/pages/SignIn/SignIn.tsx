import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICredentials } from '../../interfaces';
import { signIn } from '../../requests';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { isFunction, u8aToHex, u8aWrapBytes } from '@polkadot/util';
import { getToken, setToken } from '../../token';
import styles from './SignIn.module.css';
import { setCookie } from 'typescript-cookie';
import Select from 'react-select';
import Identicon from '@polkadot/react-identicon';

export function SignIn() {
  const token = getToken();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [currentAccount, setCurrentAccount] = useState<InjectedAccountWithMeta | null>(null);
  const options = useMemo(() => accounts.map(acc => ({ label: acc.meta.name || '', value: acc.address })), [accounts]);

  useEffect(() => {
    // if token is in cookie (user logs in), then redirect to homepage
    if (token) {
      navigate('/');
      return;
    }
    // enable extension and connect wallet
    extensionSetup();
  }, [token, navigate]);

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

  const _onSignIn = useCallback(
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

      const message = `Sign-in request for address ${currentAccount?.address}.`;
      const wrapped = u8aWrapBytes(message);
      const signedData = await signer.signRaw({
          address: currentAccount.address,
          data: u8aToHex(wrapped),
          type: 'bytes'
        });

      if (signedData === null) {
        setError('Sign message error');
        return;
      }

      const reqBody: ICredentials = {
        address: currentAccount.address,
        message,
        signature: signedData.signature
      };
      try {
        const res = await signIn(reqBody);
        setToken(res);
        setCookie('wallet', JSON.stringify(currentAccount));
        navigate('/');
      } catch (error: any) {
        console.log(error);
        setError('Sign in failed');
      }
    },
    [currentAccount, navigate]
  );

  const formatOptionLabel = (props: { value: string, label: string }) => (
    <div className={styles.optionLabel}>
      <Identicon
        value={props.value}
        size={32}
        theme="polkadot"
      />
      <span className={styles.accountName}>{ props.label }</span>
      <span className={styles.accontAddress}>{ props.value.slice(0, 4) + '...' + props.value.slice(-4) }</span>
    </div>
  );

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
      <div className={styles.selectBox}>
        <h3>Select Wallet</h3>
        <Select
          name="address"
          noOptionsMessage={() => "Not found wallet account"}
          formatOptionLabel={formatOptionLabel}
          value={options[0]}
          isSearchable={false}
          onChange={(selectedOption) => _onChangeAccount(selectedOption?.value || null)}
          options={options}
        />
      </div>
      <div>
        <button onClick={_onSignIn} className={`${styles.btn} btn btnPrimary`}>Sign in with wallet</button>
      </div>
      <div className={styles.separator}>
      </div>
      <div className={styles.hintBox}>
        <p className={styles.hint}>You need to have&nbsp;
          <a href="https://polkadot.js.org/extension/" target="_blank" rel="noreferrer">Polkadot.js Extension</a>
          &nbsp;installed in your Browser and&nbsp;
          <a href="https://support.polkadot.network/support/solutions/articles/65000098878-how-to-create-a-dot-account" target="_blank" rel="noreferrer">create an account</a> first.
        </p>
      </div>
    </div>
  );
}