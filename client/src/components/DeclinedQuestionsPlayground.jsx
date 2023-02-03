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

const Answer = styled.div``

const AnsText = styled.div`
padding:20px;
`

const Info = styled.div`
    display:flex;
    justify-content:right;
    margin-left:25px;
    margin-bottom:-10px;
`

const YourAns = styled.p``

const Date = styled.p`
margin-right:25px;`


const DeclinedQuestionPlayground = () => {

  const declinedQuestions = [
    {
      question: "Hey Justin. I’m a student in UNC studying CS and Econ and I’m trying to start a company. What is the typical attitude toward college founders in the valley? Also do investors prefer a demo or a pitch?",
      price: "$12",
      date: "March 22nd, 2021",
      askUser: "justin",
      answerUser: "joe",
    },
    {
      question: "Hey Justin. I’m a student in UNC studying CS and Econ and I’m trying to start a company. What is the typical attitude toward college founders in the valley? Also do investors prefer a demo or a pitch?",
      price: "$4",
      date: "March 22nd, 2021",
      askUser: "john",
      answerUser: "joe",
    },
    {
      question: "Hey Justin. I’m a student in UNC studying CS and Econ and I’m trying to start a company. What is the typical attitude toward college founders in the valley? Also do investors prefer a demo or a pitch?",
      price: "$3",
      date: "March 22nd, 2021",
      askUser: "mary",
      answerUser: "joe",
    },
  ]

  

  return (
    <QuestionsPlayground>
      {declinedQuestions.map((quest) => (
        <ReceivedQuestion>
          <Answer>
            <Info>
              <Date>
              {/* <YourAns>Your Answer:</YourAns> */}
              ASKED BY: @{quest.askUser}</Date>
            </Info>
          </Answer>
          
          <Sect>
            <QText>{quest.question}</QText>
            <QPrice>{quest.price}</QPrice>
          </Sect>
          <Answer>
            <Info>
              {/* <YourAns>Your Answer:</YourAns> */}
              <Date>{quest.date}</Date>
            </Info>
          </Answer>

        </ReceivedQuestion>
      ))}
      {/* <ReceivedQuestion>
        <Sect>
          <QText>
            Hey Justin. I’m a student in UNC studying CS and Econ and I’m trying
            to start a company. What is the typical attitude toward college
            founders in the valley? Also do investors prefer a demo or a pitch?
          </QText>
          <QPrice>$12</QPrice>
        </Sect>
        <Answer>
            <Info>
                
                <Date>March 22nd, 2021</Date>
            </Info>
        </Answer>
      </ReceivedQuestion> */}

     
    </QuestionsPlayground>
  );
};

export default DeclinedQuestionPlayground;
