import { useSelector, useDispatch } from "react-redux";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import React, { useState } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import "./SeedView.css";
import {
  disconnect,
  connectAsync,
  connectWalletConnect,
  selectWeb3Status,
  selectWeb3MinStatus,
} from "./features/wallet/web3Slice";
import logo from "./assets/icons/swaraj.png";
// function ProgressBar(props) {
//   const width = props.percent + "%";
//   return (
//     <div style={{ paddingTop: "1px" }} className="sd">
//       <div className="progressBar">
//         <div style={{ width: width }}> </div>
//       </div>
//     </div>
//   );
// }

const APIURL =
  "https://api.thegraph.com/subgraphs/name/cryptomackenzie/preseed";

export function SeedView() {
  const ref = React.useRef(null)
  const [id, setId] = useState(0);
  const [tokens, setTokens] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const web3Status = useSelector(selectWeb3Status);
  const web3MinStatus = useSelector(selectWeb3MinStatus);
  const dispatch = useDispatch();
  const client = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
  });
  
  const fetchHoldings = async () => {
    let address = 0;
    if (web3MinStatus === "Metamask") {
      await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((data) => {
        address = data[0];
      })
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });
    } else if (web3MinStatus === "WalletConnect") {
      const provider = new WalletConnectProvider({
        infuraId: "b9d586efbb3546afbf364a7d840f40c2",
      });
      await provider.enable().then((response) => {
        address=response[0];
      });
    }
    // address = "0xa2e234fef67ef646fe2d6b0529af68008f5599c6";
    const tokensQuery = `
    query {
      holdings(where:{id:"${address}"}) {
        id
        amountDeposited
        tokensOwed
      }
    }
    `;
    setId(address);
    client
    .query({
      query: gql(tokensQuery),
    })
    .then((data) => {
      setDeposit(data.data.holdings[0].amountDeposited / 10 ** 18);
      setTokens(data.data.holdings[0].tokensOwed / 10 ** 18);
      console.log(address)
    })
    .catch((err) => {
      console.log("Error fetching data: ", err);
    });
  };
  const web3MinStatus2 = useSelector(selectWeb3MinStatus =>{
    if(selectWeb3MinStatus.web3.provider==="Metamask"){
      fetchHoldings();
    }
    if(selectWeb3MinStatus.web3.provider==="WalletConnect"){
      fetchHoldings();
    }
  });
  return (
    <div ref={ref} className="viewSeedBody">
      <img className="seedPageLogo" src={logo} alt="Swaraj Coin" />
      <div
        className="web3StatusDisplay"
        style={
          web3MinStatus === "Metamask"|| web3MinStatus === "WalletConnect"
            ? { backgroundColor: "#1daefd" }
            : { backgroundColor: "#a64af766" }
        }
      >
        {web3MinStatus} {web3MinStatus2}
      </div>
      <div
        style={
          web3MinStatus === "Metamask" || web3MinStatus === "WalletConnect"
            ? { display: "none" }
            : { display: "block" }
        }
        className="connectContainer"
      >
        <button
          className="connectButton"
          onClick={() => dispatch(connectAsync())}
        >
          Connect Metamask
        </button>
        <br />
        <button
          className="connectButton"
          onClick={() => dispatch(connectWalletConnect())}
        >
          WalletConnect
        </button>
        <br />
        <span>{web3Status}</span>
      </div>
      <div></div>
      <div
        style={
          web3MinStatus === "Metamask" || web3MinStatus === "WalletConnect"
            ? { display: "block" }
            : { display: "none" }
        }
        className="progressContainer"
      >
        <label>Wallet Address: {id}</label> <button className="disconnectButton" onClick={()=>dispatch(disconnect())}>Disconnect</button>
        <br />
        <br />
        <label>Amount Deposited</label>
        <h3>{deposit}</h3>
        <label>Tokens Owed</label>
        <h3>
          {tokens}
          <small style={{ color: "#a64af7" }}>SWRJ</small>
        </h3>
        {/* <ProgressBar percent={80} /> */}
      </div>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
    </div>
  );
}

export default SeedView;
