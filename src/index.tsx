import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { keyring } from '@polkadot/ui-keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';

cryptoWaitReady().then(() => {
  // load all available addresses and accounts
  keyring.loadAll({ type: 'sr25519' });

  // mount React and render
  const container = document.getElementById('root');
  const root = createRoot(container!);
  root.render(<App />);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
