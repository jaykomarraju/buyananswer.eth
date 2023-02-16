import Web3 from "web3";


export async function connect() {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      //  window.web3 = new Web3(window.ethereum);
      //  window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
      window.web3 = new Web3(window.ethereum);
  
      const web3 = await window.web3;
      const accounts = web3.eth.getAccounts();
  
      web3.eth.requestAccounts().then(console.log);
  
      //  const walletAddress = account.givenProvider.selectedAddress;
      const account = accounts[0];
      // const walletAddress = account.givenProvider.selectedAddress;
    //   console.log(account);
    return account;
      // return account;
    } else {
      console.log("No wallet");
    }
  }
