import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BottomNavBar from "../components/BottomNavBar";
import ConnectWalletButton from "../components/ConnectWalletButton";
import ConnectWalletIcon from "../components/ConnectWalletIcon";
import DarkModeButton from "../components/DarkModeButton";
import LightModeButton from "../components/LightModeButton";

const Wrapper = styled.div`
  //   padding: 5%;
  height: 75vh;
  // background:green;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const headPlaceholder = "Enter username...";

const Middle = styled.div`
// width:95vw;
// margin:5px;
`;

const Top = styled.div`
  height: 20vh;
  text-align: right;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 0.75em;
  background: transparent;
  border: 1.5px solid white;
  color:white;
  border-radius: 7px;
  width: 50%;
`;

const UsernameBoxEntry = styled.input`
font-size:2em;
font-family:'Poppins'
// width:80%;
background:transparent;
padding:5px;
text-align:right;
border: 2px solid white;
border-radius:7px;
margin-bottom:20px;
width:80vw;
max-width:500px;
// margin-left:10%;
background:#121212;
color:white;
`;

const PushinP = styled.p`
  margin-top: 30px;
`;

const BottomWrap = styled.div`
  // position:fixed;
  // bottom:25px;
`;

const TopHeading = styled.p`
  text-transform: uppercase;
  font-size: 50px;
  font-weight: 800;
`;

const Container = styled.div`
  width:100vw;
  height:100vh;
  background:#121212;
  color:white;
`

const Wrap2 = styled.div`
  display:flex;
  
`

const DarkModeHome = () => {
  return (
    <Container>
    <Wrapper>
      <Wrap2>
      <ConnectWalletIcon /><Link to="/connected">
      <LightModeButton /></Link>
      </Wrap2>
      {/* <Top>
        <ConnectWalletButton/>
      </Top> */}
      <Middle>
          <TopHeading>BUY AN ANSWER</TopHeading>
        
        <PushinP>WHOSE THOUGHTS ARE YOU TRYING TO PICK?</PushinP>
        <UsernameBoxEntry
          type="text"
          placeholder={headPlaceholder}
        ></UsernameBoxEntry>
        <br></br>
        <Link to="/askpage">
          <Button>VISIT BOARD</Button>
        </Link>
      </Middle>
      {/* <BottomWrap> */}

      {/* <BottomNavBar/> */}
      {/* </BottomWrap> */}
      <BottomNavBar />
    </Wrapper></Container>
  );
};

export default DarkModeHome;
