import React from "react";
import { Link } from "react-router-dom";
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
padding-left:7px`

const QPrice = styled.p`margin:0;font-size:23px;`

const DeclineButton = styled.button`
margin:5px;
padding:5px;
background:transparent;
border:1.5px solid red;
border-radius:10px;
width:100px;
color:red;`


const Flexer = styled.div`flex:7;`
const Flexer2 = styled.div`flex:2;`
const QuestionsPlayground = styled.div``

const ANSButton = styled.button`
margin:5px;
padding:5px;
background:transparent;
border:1.5px solid green;
border-radius:10px;
width:100px;
color:green;`

const AText = styled.p`margin-bottom:-5px;text-align:left;padding-left:10px;text-transform:uppercase;`

const Date = styled.p`margin:0;font-size:12px;`

const ReceivedQuestionPlayground = () => {
  return (
    <QuestionsPlayground>
      <ReceivedQuestion>
      <AText>QUESTION FROM: @sammycursner</AText>
        <Sect>
          <Flexer>
          <QText>
            Hey Justin. I’m a student in UNC studying CS and Econ and I’m trying
            to start a company. What is the typical attitude toward college
            founders in the valley? Also do investors prefer a demo or a pitch?
          </QText>
          
          </Flexer>
          <Flexer2>
          <QPrice>$12.00</QPrice>
          <Date>MAR 20, 2022</Date></Flexer2>
        </Sect>
        <Sect2>
          <DeclineButton>X</DeclineButton>
          <Link to="/ansques">
          <ANSButton>ANSWER</ANSButton></Link>
        </Sect2>
      </ReceivedQuestion>

      <ReceivedQuestion>
      <AText>QUESTION FROM: @sammycursner</AText>
        <Sect>
          <Flexer>
          <QText>
            Hey Justin. I’m a student in UNC studying CS and Econ and I’m trying
            to start a company. What is the typical attitude toward college
            founders in the valley? Also do investors prefer a demo or a pitch?
          </QText>
          
          </Flexer>
          <Flexer2>
          <QPrice>$12.00</QPrice>
          <Date>MAR 20, 2022</Date></Flexer2>
        </Sect>
        <Sect2>
          <DeclineButton>X</DeclineButton>
          <Link to="/ansques">
          <ANSButton>ANSWER</ANSButton></Link>
        </Sect2>
      </ReceivedQuestion>
    </QuestionsPlayground>
  );
};

export default ReceivedQuestionPlayground;
