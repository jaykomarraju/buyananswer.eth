import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";

import BottomNavBar from "./components/BottomNavBar";
import Home from "./pages/Home";
import Profile from "./pages/CreateProfile";
import ConnectWalletButton from "./components/ConnectWalletButton";
import ConnectWalletIcon from "./components/ConnectWalletIcon";
import MyBoard from "./pages/MyBoard";

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
`
// const Bottom = styled.div`
//   // display:flex;
//   // justify-content:center;
//   // width:100%;
//   width:200px;
//   background:blue;
//   height:100%;
// `







const headPlaceholder = "Enter username...";

function App() {
  return (
    <div className="App">
      <Container>
        {/* <Wrapper>
          <Top>
            <Button>CONNECT YOUR WALLET</Button>
          </Top>
          <Middle>
            <div class="head">BUY AN ANSWER</div>
            <PushinP>WHO DO YOU WANT TO ASK A QUESTION?</PushinP>
            <UsernameBoxEntry
              type="text"
              placeholder={headPlaceholder}
            ></UsernameBoxEntry>
            <br></br>
            <Button>VISIT BOARD</Button>
          </Middle>
          {/* <BottomWrap> */}

            {/* <BottomNavBar/> */}
         {/* </BottomWrap> */}
        {/* </Wrapper> */} 
        
        {/* <ConnectWalletButton/> */}
        <ConnectWalletIcon/>
        <Home/>
        <Profile/>
        <MyBoard/>
        <BottomNavBar/>
      </Container>
    </div>
  );
}

export default App;
