import BuyAnAnswerJSON from "../../server/build/contracts/BuyAnAnswer.json";
import Web3 from 'web3';
var contract = require('@truffle/contract');

export const load = async () => {
    await loadWeb3();
    await loadAccount()
};

const loadAccount = async () => {
    const account = web3.eth.getCoinbase();
    console.log(account)
}

const loadWeb3 = async () => {
    // Modern Dapp Browsers

    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Accounts now exposed
            web3.eth.sendTransaction({/*...*/});
        } catch (error) {
            // User denied account access...
        }
    }


    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Accounts always exposed
        web3.eth.sendTransaction({/*...*/})
    }

    else{
        console.log("Non-Ethereum browser detected. Try MetaMask or Coinbase")
    }


};