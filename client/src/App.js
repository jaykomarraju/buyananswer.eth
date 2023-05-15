import logo from "./logo.svg";
import Web3 from "web3";
// import BuyAnAnswer from './solidity/'
import "./App.css";
import styled from "styled-components";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import BottomNavBar from "./components/BottomNavBar";
import Home from "./pages/Home";
import Profile from "./pages/CreateProfile";
import ConnectWalletButton from "./components/ConnectWalletButton";
import ConnectWalletIcon from "./components/ConnectWalletIcon";
import MyBoard from "./pages/MyBoard";
import AnswerQuestionPlayground from "./components/AnswerQuestionsPlayground";
import DeclinedQuestionPlayground from "./components/DeclinedQuestionsPlayground";
import UserBoardDoesNotExist from "./pages/UserBoardDoesNotExist";
import AskPage from "./pages/AskPage";
import ProfHistPage from "./pages/ProfHistPage";
import SuccessQuestionOrder from "./pages/SuccessQuestionOrder";
import AnswerQuestion from "./pages/AnswerQuestion";
import AnswerConfirmation from "./pages/AnswerConfirmation";
import CreateProfile from "./pages/CreateProfile";
import ProfHistEditPage from "./pages/ProfHistEditPage";
import UnAuthAskPageView from "./pages/UnAuthAskPageView";
import UnConnectedHome from "./pages/UnConnectedHome";
import UnConnectedProfile from "./pages/UnConnectedProfile";
import UnConnectedBoard from "./pages/UnConnectedBoard";
// import {load} from './funcs';
import { useEffect } from "react";
import DarkModeHome from "./pages/DarkModeHome";
import Login from "./utility/Login";
import DisconnectConnect from "./components/DisconnectConnect";
import { useLocation } from "react-router-dom";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  // background: lightblue;
`;

const Wrapper = styled.div`
  padding: 5%;
`;

const Middle = styled.div``;
const Top = styled.div`
  height: 20vh;
  text-align: right;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 0.75em;
  background: transparent;
  border: 1.5px solid black;
  border-radius: 7px;
`;

const UsernameBoxEntry = styled.input`
font-size:2em;
font-family:'Poppins'
width:80%;
background:transparent;
padding:5px;
text-align:right;
border: 2px solid black;
border-radius:7px;
margin-bottom:20px;
`;

const PushinP = styled.p`
  margin-top: 30px;
`;

const BottomWrap = styled.div`
  // position:fixed;
  // bottom:25px;
`;

const headPlaceholder = "Enter username...";

// const getWeb3 = () => {
//   return new Web3('HTTP://127.0.0.1:7545');
// }

// useEffect(()=>{

// })

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);

  const location = useLocation();


  // Update this function to set the connection status and wallet address
  const handleConnection = (status, address) => {
    setIsConnected(status);
    setWalletAddress(address);
    console.log("handleConnection", status, address);
  };

  return (
    <div className="App">
      {/* Pass the connection status and wallet address to the ConnectWalletButton */}

      {isConnected ? (
        <>
          <ConnectWalletIcon walletAddress={walletAddress} />
          <DisconnectConnect onDisconnect={handleConnection} />
        </>
      ) : (
        <ConnectWalletButton onConnect={handleConnection} />
      )}

      <Routes>
        {isConnected ? (
          <>
            {/* Connected routes */}
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={<ProfHistPage walletAddress={walletAddress} />}
            />
            <Route
              path="/createprofile"
              element={<CreateProfile walletAddress={walletAddress} />}
            />
            <Route path="/editprofile" element={<ProfHistEditPage />} />
            <Route path="/myboard" element={<MyBoard walletAddress={walletAddress} />} />
            <Route path="/answered" element={<AnswerQuestionPlayground />} />
            <Route path="/declined" element={<DeclinedQuestionPlayground />} />
            <Route path="/naboard" element={<UserBoardDoesNotExist />} />
            <Route
              path="/:username"
              element={<AskPage walletAddress={walletAddress} />}
            />
            <Route path="/profhist" element={<ProfHistPage />} />
            <Route
              path="/successqorder"
              element={<SuccessQuestionOrder location={location} />}
            />
            <Route path="/ansques" element={<AnswerQuestion />} />
            <Route path="/anscnfrm" element={<AnswerConfirmation />} />
          </>
        ) : (
          <>
            {/* Unconnected routes */}
            <Route path="/" element={<UnConnectedHome />} />
            <Route path="/profile" element={<UnConnectedProfile />} />
            <Route path="/myboard" element={<UnConnectedBoard />} />
            {/* <Route path="/askpage" element={<UnAuthAskPageView />} /> */}
            <Route
              path="/createprofile"
              element={<CreateProfile walletAddress={walletAddress} />}
            />
            <Route path="/:username" element={<AskPage />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
