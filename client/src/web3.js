import Web3 from "web3";

let web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  window.ethereum.enable();
} else if (window.web3) {
  web3 = new Web3(window.web3.currentProvider);
} else {
  const confirmed = window.confirm(
    "Non-Ethereum browser detected. You should consider trying Coinbase Wallet, MetaMask, Brave Browser, etc. Click OK to view the site with read-only access."
  );
  if (confirmed) {
    web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://mainnet.infura.io/v3/d24ba263c96d43258d836b114a957042"
      )
    );
  } else {
    // Do something else here (redirect, close the window, etc.)
  }
}
// else {
//     window.alert('Non-Ethereum browser detected. You should consider trying Coinbase, MetaMask, Brave Browser, etc.!');
// }

export default web3;
