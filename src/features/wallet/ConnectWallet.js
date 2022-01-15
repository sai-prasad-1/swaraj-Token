import { useSelector, useDispatch } from 'react-redux';
import {
  connect,
  selectWeb3,
  selectWeb3Status,
} from './web3Slice';
import styles from './Web3.module.css';


export function ConnectWallet() {
  const web3 = useSelector(selectWeb3);
  const web3Status = useSelector(selectWeb3Status);
  const dispatch = useDispatch();
  return (
    <div>
      <div className={styles.row}>
        <span className={styles.value}>{web3}</span>
      </div>
      <div className={styles.row}>
        <button
          className={styles.button}
          onClick={() => dispatch(connect("metamask"))}
        >
          Connect Metamask
        </button>
      </div>
      <div className={styles.row}>
        <button
          className={styles.button}
          onClick={() => dispatch(connect("walletconnect"))}
        >
          WalletConnect
        </button>
      </div>
        <span className={styles.web3Status}>{web3Status}</span>
    </div>
  );
}
