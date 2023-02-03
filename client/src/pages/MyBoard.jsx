import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import AnswerQuestionPlayground from '../components/AnswerQuestionsPlayground';
import BottomNavBar from '../components/BottomNavBar';
import ConnectWalletIcon from '../components/ConnectWalletIcon';
import DeclinedQuestionPlayground from '../components/DeclinedQuestionsPlayground';
import ReceivedQuestionPlayground from '../components/ReceivedQuestionPlayground';

const Wrapper = styled.div`
//   padding: 5%;
margin-top:60px;
// background:green;
  display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`;

const Head = styled.p``

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

const MyBoard = () => {

  const [selectedWindow, setSelectedWindow] = useState(<ReceivedQuestionPlayground/>)

  const handleReceiveClick = () => {
    setSelectedWindow(<ReceivedQuestionPlayground/>)
  }

  const handleAnswerClick = () => {
    setSelectedWindow(<AnswerQuestionPlayground/>)
  }

  const handleDeclineClick = () => {
    setSelectedWindow(<DeclinedQuestionPlayground/>)
  }
    
  return (

    <Wrapper>
        <ConnectWalletIcon/>
        <Playground>
            <Head>ASK JOHN DOE</Head>
            <Buttons>
                <Button onClick={handleReceiveClick}>RECEIVED</Button>
                <Button onClick={handleAnswerClick}>ANSWERED</Button>
                <Button onClick={handleDeclineClick}>DECLINED</Button>
            </Buttons>
            <QuestionWrapper>
            {selectedWindow}
            {/* <ReceivedQuestionPlayground/> */}
            {/* <AnswerQuestionPlayground/> */}
            
            {/* <DeclinedQuestionPlayground/> */}
            </QuestionWrapper>
        </Playground>
        <BottomNavBar/>
    </Wrapper>
  )
}

export default MyBoard