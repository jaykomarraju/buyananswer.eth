import React, {useState} from "react";
import styled from "styled-components";
import Web3 from "web3";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../services/Firebase";
import CreateProfile from "../pages/CreateProfile";

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

  
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);
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

     // Forget the old provider
     window.web3 = null;

    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      window.web3 = new Web3(window.ethereum);
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
    
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
              profilePic: "profilePic",
              walletAddress: accounts[0],
            });
            // return <CreateProfile walletAddress={accounts[0]} />;
            onConnect(true, accounts[0]);
            navigate("/createprofile", { state: { walletAddress:  accounts[0] } });
          }
  
          // Call the onConnect prop here
          onConnect(true, accounts[0]);
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
  
      //  const walletAddress = account.givenProvider.selectedAddress;
      const account = accounts[0];
      console.log(account);
      // return account;
    } else {
      console.log("No wallet");
    }
  }
  

  const handleClick = () => {
    if (!loading) {
      console.log("Link was clicked!");
      setLoading(true);
      connect().then(() => setLoading(false)).catch(() => setLoading(false));
    }
  };
  

  return <Button onClick={handleClick}>CONNECT YOUR WALLET</Button>
  ;
};

export default ConnectWalletButton;
