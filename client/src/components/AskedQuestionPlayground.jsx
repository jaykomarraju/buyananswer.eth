import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {db } from "../services/Firebase";

const Sect = styled.div`
  display: flex;
  align-items: center;
`;

const Sect2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
`;

const ReceivedQuestion = styled.div`
  padding: 5px;
  border: 1.5px solid black;
  border-radius: 10px;
  margin: 25px;
  max-width: 800px;
`;

const QText = styled.p`
  // padding-left: 7px;
  padding: 25px;
`;

const QPrice = styled.p`
  margzin: 0;
  font-size: 23px;
`;

const DeclineButton = styled.button`
  margin: 5px;
  padding: 5px;
  background: transparent;
  border: 1.5px solid #a81707;
  border-radius: 10px;
  width: 100px;
  color: #a81707;

  &:hover {
    background: #a81707;
    color: white;
  }
`;

const Flexer = styled.div`
  flex: 7;
`;
const Flexer2 = styled.div`
  flex: 2;
`;
const QuestionsPlayground = styled.div`
  margin-bottom: 130px;
`;

const ANSButton = styled.button`
  margin: 5px;
  padding: 5px;
  background: transparent;
  border: 1.5px solid #08c26b;
  border-radius: 10px;
  width: 100px;
  color: #08c26b;

  &:hover {
    background: #08c26b;
    color: white;
  }
`;

const AText = styled.p`
  margin-bottom: -5px;
  text-align: left;
  padding-left: 10px;
  // text-transform: uppercase;
`;

const Date = styled.p`
  margin: 0;
  font-size: 12px;
`;

const AskedQuestionPlayground = ({ walletAddress }) => {

  const [questions, setQuestions] = useState([]);

  const getQuestions = async () => {
    const questionsRef = db.collection("users").doc(walletAddress).collection("askedQuestions");
    const snapshot = await questionsRef.get();
    if (!snapshot.empty) {  // check if snapshot is not empty
      const questions = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        questions.push({...data, id: doc.id});
      });
      console.log('questions fetched:', questions); // log the fetched data
      setQuestions(questions);
    } else {
      console.log('No documents found!');
    }
  };
  
  useEffect(() => {
    getQuestions();
  }, []); 

  return (
    <QuestionsPlayground>
      {questions.map((question) => (
        <ReceivedQuestion key={question.id}>
          <AText>QUESTION TO: @{question.username}</AText>
          <Sect>
            <Flexer>
              <QText>{question.question}</QText>
            </Flexer>
            <Flexer2>
              <QPrice>$ {question.total}</QPrice>
              <Date>{question.timestamp?.toDate().toLocaleString()}</Date>
            </Flexer2>
          </Sect>
          <Sect2>
            {/* <DeclineButton>X</DeclineButton>
            <Link to="/ansques">
              <ANSButton>ANSWER</ANSButton>
            </Link> */}
            {/* <Flexer>
                <AText>ANSWERED: {question.answered}</AText>
                <AText>DECLINED: {question.declined}</AText>
            </Flexer> */}
          </Sect2>
        </ReceivedQuestion>
      ))}
    </QuestionsPlayground>
  );
};

export default AskedQuestionPlayground;
