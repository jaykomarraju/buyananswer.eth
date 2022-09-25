import React from "react";
import styled from 'styled-components';

const Sect = styled.div`
display:flex;
align-items:center;`

const Sect2 = styled.div`
display:flex;
align-items:center;
justify-content:right;`

const ReceivedQuestion = styled.div`
padding:5px;
border:1.5px solid black;
border-radius:10px;
margin:25px;
max-width:800px;`

const QText = styled.p`
flex:8;`

const QPrice = styled.p`flex:2;`

const DeclineButton = styled.button`
margin:5px;
padding:5px;
background:transparent;
border:1.5px solid red;
border-radius:10px;
width:100px;
color:red;`

const QuestionsPlayground = styled.div``

const ANSButton = styled.button`
margin:5px;
padding:5px;
background:transparent;
border:1.5px solid green;
border-radius:10px;
width:100px;
color:green;`


const ReceivedQuestionPlayground = () => {
  return (
    <QuestionsPlayground>
      <ReceivedQuestion>
        <Sect>
          <QText>
            Hey Justin. I’m a student in UNC studying CS and Econ and I’m trying
            to start a company. What is the typical attitude toward college
            founders in the valley? Also do investors prefer a demo or a pitch?
          </QText>
          <QPrice>$12</QPrice>
        </Sect>
        <Sect2>
          <DeclineButton>X</DeclineButton>
          <ANSButton>ANSWER</ANSButton>
        </Sect2>
      </ReceivedQuestion>

      <ReceivedQuestion>
        <Sect>
          <QText>
            Hey Justin. I’m a student in UNC studying CS and Econ and I’m trying
            to start a company. What is the typical attitude toward college
            founders in the valley? Also do investors prefer a demo or a pitch?
          </QText>
          <QPrice>$12</QPrice>
        </Sect>
        <Sect2>
          <DeclineButton>X</DeclineButton>
          <ANSButton>ANSWER</ANSButton>
        </Sect2>
      </ReceivedQuestion>
    </QuestionsPlayground>
  );
};

export default ReceivedQuestionPlayground;
