// This is called when the connect wallet button is clicked
// the user that is returned from the web 3 provider is the user that is logged in
// This is the user that must be used to sign the transaction
// This user is sent as a prop to all the pages in the react app

import react from "react";
import { useState, useEffect } from "react";

import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

// import { injected } from './connectors';
import { connect } from "../connector";
import { formatEther } from "@ethersproject/units";

const Login = () => {
  const { account, library, chainId, activate, deactivate } = useWeb3React();

  const [user, setUser] = useState(null);

  const connectWallet = async () => {
    try {
      const account = await connect();
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    if (!!account && !!library) {
      let stale = false;

      library
        .getBalance(account)
        .then((balance) => {
          if (!stale) {
            setUser({
              address: account,
              balance: parseFloat(formatEther(balance)).toPrecision(4),
            });
          }
        })
        .catch(() => {
          if (!stale) {
            setUser(null);
          }
        });

      return () => {
        stale = true;
        setUser(undefined);
      };
    }
  }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      {user ? (
        <div>
          <div>Address: {user.address}</div>
          <div>Balance: {user.balance} ETH</div>
        </div>
      ) : null}
    </div>
  );
};

export default Login;
