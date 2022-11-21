import React from "react";
import styled from "styled-components";
// import Web3 from "web3";

const Button = styled.button`
  padding: 10px;
  font-size: 0.75em;
  background: transparent;
  border: 1.5px solid white;
  border-radius: 7px;
  position: fixed;
  color:white;
  top: 15px;
  right: 30px;
  cursor:pointer;
  width:35px;
//   height:35px;
`;

// async function getAccount() {
//   // const accounts = await window.ethreuem.request({
//   //   method: "eth_requestAccounts",
//   // });
//   // const account = accounts[0];
//   // return account;
//   if (window.ethereum) {
//     await window.ethereum.request({ method: "eth_requestAccounts" });
//     window.web3 = new Web3(window.ethereum);
//     const account = web3.eth.accounts;
//     //Get the current MetaMask selected/active wallet
//     const walletAddress = account.givenProvider.selectedAddress;

//     console.log(`Wallet: ${walletAddress}`);
//   } else {
//     console.log("No wallet");
//   }
// }


const LightModeButton = () => {
  // function connectWalletButtonOnClick() {
  //   console.log("Homie!");
  // if (typeof window !== "undefined"){
  //   getAccount().then((response)=>{console.log(response)})
  // }
  // };


  return <Button> ☀ </Button>;
};

export default LightModeButton;
