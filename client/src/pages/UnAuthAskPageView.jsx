import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import BottomNavBar from '../components/BottomNavBar';
import ConnectWalletButton from '../components/ConnectWalletButton';
import ConnectWalletIcon from '../components/ConnectWalletIcon';
import UnAuthBottomNavBar from '../components/UnAuthBottomNavBar';
import Banner from '../components/Banner';

const Container = styled.div`
  height:100vh;
  width:100vw;
`

const Wrapper = styled.div`
//   padding: 5%;
height:100vh;
// background:green;
  display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    margin-top:5px;
    margin-left:auto;
    margin-right:auto;
    max-width:800px;
    
`;

const ProfilePicture = styled.div`
  // background:pink;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1.5px solid black;
  margin: 20px;
`;
const Heading  = styled.p`
font-size: 2em;
`

const BoardDesc = styled.div`display:flex;align-items:center;`

const Name = styled.div``

const SubHeading = styled.p``

const Pic = styled.div``

const QuestionEntry = styled.textarea`
width:85%;
min-height:300px;
font-size:16px;
background:transparent;
border:1.5px solid black;
border-radius:10px;
margin-top:20px;
padding:10px;`

const PriorityBonusSect = styled.div`display:flex;align-items:center;`

const TotalSect = styled.div`display:flex;align-items:center;margin-top:-30px;`

const Label = styled.p`
padding:20px;`

const Entry = styled.input`
width:100px;
font-size:16px;
padding:8px;
border: 1.5px solid black;
border-radius:10px;
`

const Headline = styled.p`
margin-top:-35px;
margin-bottom:40px;
`

const Button = styled.button`
padding:15px;
border:1.5px solid black;
background:transparent;
border-radius:10px;
margin-bottom:150px;
`

const Url = styled.div`
font-size:20px;
padding:10px;
font-weight:600;`

const Bannera = styled.div`
color:teal;
text-transform:uppercase;
margin-top:-100px;
margin-bottom:55px;
font-weight:800;
background: lightgrey;
padding:20px;
border-radius:20px;
`

const UnAuthAskPageView = () => {
  return (
    <Container>
      {/* <Banner/> */}
    <Wrapper>
        <Link to="/askpage">
        <ConnectWalletButton/></Link>
        
        <Bannera>
            Connect your Ethereum Wallet to ask a question to @johndoe
        </Bannera>
        <Url>BUYANANSWER.COM/JOHNDOE</Url>
        <BoardDesc>
            <Pic>
        <ProfilePicture></ProfilePicture></Pic><Name>
        <Heading>ASK JOHN DOE</Heading>
        <Headline><i>
Lorem ipsum dolor sit amet, consectetur adipiscing elit.</i>
        </Headline>
        <SubHeading>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.  
        </SubHeading></Name></BoardDesc>
        {/* <QuestionEntry placeholder="Enter your question here..."></QuestionEntry>
        <PriorityBonusSect>
            <Label>PRIORITY BONUS:</Label>
            <Entry placeholder="$"></Entry>
        </PriorityBonusSect>
        <TotalSect>
            <Label>TOTAL:</Label>
            <Label>$5.00 (0.0040 ETH)</Label>
        </TotalSect>
        <Link to="/successqorder">
        <Button>BUY ANSWER</Button></Link> */}
        <UnAuthBottomNavBar/>
    </Wrapper></Container>
  )
}

export default UnAuthAskPageView;