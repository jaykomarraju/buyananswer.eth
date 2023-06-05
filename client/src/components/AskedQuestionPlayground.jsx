import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {db } from "../services/Firebase";
import instance from "../contract";
import AnsweredQuestionTicket from "./AnsweredQuestionTicket";

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


  // const handleDecline = async (e, questionId) => {
  //   e.preventDefault();
  //   try{
  //     // contract call
  //     await instance.methods.declineQuestion(questionId).send({ from: walletAddress});

  //     // set the question's declined field to true
  //     const questionRef = db
  //       .collection("users")
  //       .doc(walletAddress)
  //       .collection("receivedQuestions")
  //       .doc(questionId);
  //     await questionRef.update({
  //       declined: true,
  //     });

  //     // set the question's declined field to true in the user asking the question
  //     const questionDoc = await questionRef.get();
  //     const question = questionDoc.data();
  //     const asker = question.asker;
  //     const askerQuestionRef = db
  //       .collection("users")
  //       .doc(asker)
  //       .collection("askedQuestions")
  //       .doc(questionId);
  //     await askerQuestionRef.update({
  //       declined: true,
  //     });

  //     // set the question's declined field to true in the questions collection
  //     const questionsRef = db.collection("questions").doc(questionId);
  //     await questionsRef.update({
  //       declined: true,
  //     });

  //     // remove the question from the questions array
  //     const newQuestions = questions.filter(
  //       (question) => question.id !== questionId
  //     );
  //     setQuestions(newQuestions);
  //   } catch (error) {
  //     console.log(
  //       "An error occurred while declining the question in the contract: ",
  //       error
  //     );
  //     return;

  //   }
  // };
  const handleCancel = async (e, questionId) => {
    e.preventDefault();

    try {
      // contract call
      await instance.methods.cancelQuestion(questionId).send({ from: walletAddress });

      // set the question's cancelled field to true

      // set the question's cancelled field to true in the user asking the question

      // set the question's cancelled field to true in the answerer users questions collection

      // remove the question from the questions array
      const newQuestions = questions.filter(
        (question) => question.id !== questionId
      );
      setQuestions(newQuestions);
    } catch (error) {
      console.log(
        "An error occurred while cancelling the question in the contract: ",
        error
      );
      return;
    }
  };





  return (
    <QuestionsPlayground>
      {/* {questions.map((question) => (
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
          </Sect2>
          <DeclineButton onClick={(e) => handleCancel(e, question.id)}>CANCEL</DeclineButton>
        </ReceivedQuestion>
      ))} */}

{questions.map((question) => {
        if (question.answered) {
          // Render AnsweredQuestionTicket for answered questions.
          return <AnsweredQuestionTicket key={question.id} question={question.question}
          price={question.total}
          answer={question.answer}
          date={question.timestamp?.toDate().toLocaleString()}
          askUser={question.asker}
          answerUser={question.username}  />
        } else if (question.declined) {
          // Render Declined question without any action button
          return (
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
                <AText>Question declined.</AText>
              </Sect2>
            </ReceivedQuestion>
          );
        }

        // For all other questions (neither answered nor declined).
        return (
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
              {/* Show cancel button if question is not cancelled yet. */}
              <DeclineButton onClick={(e) => handleCancel(e, question.id)}>CANCEL</DeclineButton>
            </Sect2>
          </ReceivedQuestion>
        );
      })}
    </QuestionsPlayground>
  );
};

export default AskedQuestionPlayground;
