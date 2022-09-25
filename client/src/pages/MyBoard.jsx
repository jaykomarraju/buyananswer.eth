import React from 'react'
import styled from 'styled-components'
import AnswerQuestionPlayground from '../components/AnswerQuestionsPlayground';
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
margin:25px;`

const Button= styled.button`
margin:5px;
padding:5px;
background:transparent;
border:1.5px solid black;
border-radius:10px;
width:100px;`

const QuestionWrapper = styled.div``

const Playground = styled.div``

const MyBoard = () => {
  return (
    <Wrapper>
        <Playground>
            <Head>ASK JUSTIN KAN</Head>
            <Buttons>
                <Button>RECEIVED</Button>
                <Button>ANSWERED</Button>
                <Button>DECLINED</Button>
            </Buttons>
            <QuestionWrapper>
            <ReceivedQuestionPlayground/>
            {/* <AnswerQuestionPlayground/> */}
            {/* <DeclinedQuestionPlayground/> */}
            </QuestionWrapper>
        </Playground>
    </Wrapper>
  )
}

export default MyBoard