import logo from "./logo.svg";
import Web3 from "web3";
// import BuyAnAnswer from './solidity/'
import "./App.css";
import styled from "styled-components";
import React from "react";
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

// const ConnectWalletButton = styled.div``

const BottomWrap = styled.div`
  // position:fixed;
  // bottom:25px;
`;
// const Bottom = styled.div`
//   // display:flex;
//   // justify-content:center;
//   // width:100%;
//   width:200px;
//   background:blue;
//   height:100%;
// `

const headPlaceholder = "Enter username...";

const getWeb3 = () => {
  return new Web3('HTTP://127.0.0.1:7545');
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route index element={<BottomNavBar />} /> */}
        <Route path="profile" element={<ProfHistPage />} />
        <Route path="createprofile" element={<Profile />} />
        <Route path="myboard" element={<MyBoard />} />
        <Route path="answered" element={<AnswerQuestionPlayground />} />
        <Route path="declined" element={<DeclinedQuestionPlayground />} />
        <Route path="naboard" element={<UserBoardDoesNotExist />} />
        <Route path="askpage" element={<AskPage />} />
        <Route path="profhist" element={<ProfHistPage />} />
        <Route path="successqorder" element={<SuccessQuestionOrder />} />
        <Route path="ansques" element={<AnswerQuestion />} />
        <Route path="anscnfrm" element={<AnswerConfirmation/>}/>  
      </Routes>
      {/* <Container> */}
      {/* <ConnectWalletIcon /> */}
      {/* <MyBoard /> */}
      {/* <BottomNavBar /> */}
      {/* </Container> */}
    </div>
  );
}

export default App;
