import React from "react";
import styled from "styled-components";
import Web3 from "web3";
import { Link } from "react-router-dom";
import { db } from "../services/Firebase";
// import {connect} from

const Button = styled.button`
  padding: 10px;
  font-size: 0.75em;
  background: transparent;
  border: 1.5px solid black;
  border-radius: 7px;
  position: fixed;
  top: 30px;
  right: 30px;
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

const ConnectWalletButton = ({ onConnect }) => {
  // function connectWalletButtonOnClick() {
  //   console.log("Homie!");
  // if (typeof window !== "undefined"){
  //   getAccount().then((response)=>{console.log(response)})
  // }
  // };

  // check if account is active
  // then check if account is in database
  // if not, add to database and redirect to create profile page
  // if so, redirect to home page

  async function connect() {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      window.web3 = new Web3(window.ethereum);
      const web3 = await window.web3;
      const accounts = await web3.eth.getAccounts();
  
      await web3.eth.requestAccounts().then(async function (accounts) {
        console.log("The account is: " + accounts);

        // check if account is active
        // then check if account is in database
        // if not, add to database and redirect to create profile page
        // if so, redirect to home page

        // use db from firebase
        

        // check if account is in database
        const docRef = db.collection("users").doc(accounts[0]);

        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("Document data:", doc.data());
              // redirect to home page
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
              // add to database
              db.collection("users").doc(accounts[0]).set({
                username: "username",
                email: "email",
                bio: "bio",
                profilePic: "profilePic",
                walletAddress: accounts[0],
              });
              // redirect to create profile page


            }

            // Call the onConnect prop here
            onConnect(true, accounts[0]);
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      });

      //  const walletAddress = account.givenProvider.selectedAddress;
      const account = accounts[0];
      // const walletAddress = account.givenProvider.selectedAddress;
      console.log(account);
      // console.log(`Wallet: ${walletAddress}`);

      // return account;
    } else {
      console.log("No wallet");
    }
  }

  const handleClick = () => {
    // e.preventDefault();
    console.log("The link was clicked.");
    if (typeof window !== "undefined") {
      // getAccount().then((response) => {
      connect().then((response) => {
        console.log(response);
      });
    }
  };

  return <Button onClick={handleClick}>CONNECT YOUR WALLET</Button>;
};

export default ConnectWalletButton;
