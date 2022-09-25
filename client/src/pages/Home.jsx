import React from 'react'
import styled from 'styled-components'
import BottomNavBar from '../components/BottomNavBar';
import ConnectWalletButton from '../components/ConnectWalletButton';

const Wrapper = styled.div`
//   padding: 5%;
height:90vh;
// background:green;
  display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`;

const headPlaceholder = "Enter username...";

const Middle = styled.div`
    
`;


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
  width:50%;
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
`

const Home = () => {
  return (
    <Wrapper>
      {/* <Top>
        <ConnectWalletButton/>
      </Top> */}
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
    </Wrapper>
  )
}

export default Home