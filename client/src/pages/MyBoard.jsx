import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import AnswerQuestionPlayground from '../components/AnswerQuestionsPlayground';
import BottomNavBar from '../components/BottomNavBar';
import ConnectWalletIcon from '../components/ConnectWalletIcon';
import DeclinedQuestionPlayground from '../components/DeclinedQuestionsPlayground';
import ReceivedQuestionPlayground from '../components/ReceivedQuestionPlayground';
import AskedQuestionPlayground from '../components/AskedQuestionPlayground';
import {db} from '../services/Firebase'
import Banner from '../components/Banner';

const Wrapper = styled.div`
//   padding: 5%;
margin-top:120px;
// background:green;
  display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`;

const Head = styled.p`
  text-transform: uppercase;
`

const Buttons = styled.div`
display:flex;
margin:25px;


`

const Button= styled.button`
margin:5px;
padding:5px;
background:transparent;
border:1.5px solid black;
border-radius:10px;
width:100px;

&:hover{
    
    background:black;
    color:white;
    }`

const QuestionWrapper = styled.div``

const Playground = styled.div``

const MyBoard = ({ walletAddress }) => {

  const [name, setName] = useState("");

  useEffect(() => {
    const getName = async () => {
      const doc = await db.collection("users").doc(walletAddress).get();
      setName(doc.data().name);
    };
    getName();
  }, []);


  const [selectedWindow, setSelectedWindow] = useState(<ReceivedQuestionPlayground/>)

  const handleReceiveClick = () => {
    setSelectedWindow(<ReceivedQuestionPlayground walletAddress={walletAddress}/>)
  }

  const handleAnswerClick = () => {
    setSelectedWindow(<AnswerQuestionPlayground walletAddress={walletAddress}/>)
  }

  const handleDeclineClick = () => {
    setSelectedWindow(<DeclinedQuestionPlayground walletAddress={walletAddress}/>)
  }

  const handleAskedClick = () => {
    setSelectedWindow(<AskedQuestionPlayground walletAddress={walletAddress}/>)
  }
    
  return (<>
{/* <Banner/> */}
    <Wrapper>
        {/* <ConnectWalletIcon/> */}
        <Playground>
            <Head>{name}</Head>
            <Buttons>
                <Button onClick={handleReceiveClick}>RECEIVED</Button>
                <Button onClick={handleAnswerClick}>ANSWERED</Button>
                <Button onClick={handleDeclineClick}>DECLINED</Button>
                <Button onClick={handleAskedClick}>ASKED</Button>
            </Buttons>
            <QuestionWrapper>
            {selectedWindow}
            {/* <ReceivedQuestionPlayground/> */}
            {/* <AnswerQuestionPlayground/> */}
            
            {/* <DeclinedQuestionPlayground/> */}
            </QuestionWrapper>
        </Playground>
        <BottomNavBar/>
    </Wrapper></>
  )
}

export default MyBoard