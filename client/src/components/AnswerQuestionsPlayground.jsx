import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AnsweredQuestionTicket from "./AnsweredQuestionTicket";
import { db } from "../services/Firebase";

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
  flex: 8;
  padding: 25px;
`;

const QPrice = styled.p`
  flex: 2;
`;

const DeclineButton = styled.button`
  margin: 5px;
  padding: 5px;
  background: transparent;
  border: 1.5px solid red;
  border-radius: 10px;
  width: 100px;
  color: red;
`;

const QuestionsPlayground = styled.div`
  margin-bottom: 150px;
  // max-width: 800px;
  // padding: 5px;
`;

const ANSButton = styled.button`
  margin: 5px;
  padding: 5px;
  background: transparent;
  border: 1.5px solid green;
  border-radius: 10px;
  width: 100px;
  color: green;
`;

const Answer = styled.div``;

const AnsText = styled.div`
  padding: 20px;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 25px;
  margin-bottom: -10px;
`;

const YourAns = styled.p``;

const Date = styled.p`
  margin-right: 25px;
`;

const PublicCheck = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  padding: 25px;
`;

const Label = styled.p``;

const AnswerQuestionPlayground = ({ walletAddress }) => {
  // const answeredQuestions = [
  //   {
  //     question:
  //       "Hey Justin. I’m a student in UNC studying CS and Econ and I’m trying to start a company. What is the typical attitude toward college founders in the valley? Also do investors prefer a demo or a pitch?",
  //     price: "$12",
  //     answer:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     date: "March 22nd, 2021",
  //     askUser: "justin",
  //     answerUser: "joe",
  //   },
  //   {
  //     question:
  //       "Hey Justin. I’m a student in UNC studying CS and Econ and I’m trying to start a company. What is the typical attitude toward college founders in the valley? Also do investors prefer a demo or a pitch?",
  //     price: "$12",
  //     answer:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     date: "March 22nd, 2021",
  //     askUser: "ronnie",
  //     answerUser: "joe",
  //   },
  //   {
  //     question:
  //       "Hey Justin. I’m a student in UNC studying CS and Econ and I’m trying to start a company. What is the typical attitude toward college founders in the valley? Also do investors prefer a demo or a pitch?",
  //     price: "$12",
  //     answer:
  //       "KARAR KARALorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //     date: "March 22nd, 2021",
  //     askUser: "don",
  //     answerUser: "joe",
  //   },
  // ];

  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const getAnsweredQuestions = async () => {
    const questionsRef = db
      .collection("users")
      .doc(walletAddress)
      .collection("receivedQuestions");
    const snapshot = await questionsRef.where("answered", "==", true).get();
    if (!snapshot.empty) {
      const questions = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        questions.push({ ...data, id: doc.id });
      });
      console.log("answered questions fetched:", questions);
      setAnsweredQuestions(questions);
    } else {
      console.log("No documents found!");
    }
  };

  useEffect(() => {
    getAnsweredQuestions();
  }, []);

  return (
    <QuestionsPlayground>
      {answeredQuestions.map((answer) => (
        <AnsweredQuestionTicket
          question={answer.question}
          price={answer.total}
          answer={answer.answer}
          date={answer.timestamp?.toDate().toLocaleString()}
          askUser={answer.asker}
          answerUser={answer.username}
        />
      ))}
      {/* <AnsweredQuestionTicket
      /> */}
      {/* <AnsweredQuestionTicket/> */}
      {/* <AnsweredQuestionTicket/> */}
      {/* <ReceivedQuestion> */}
      {/* <Sect>
          <QText>
            Hey Justin. I’m a student in UNC studying CS and Econ and I’m trying
            to start a company. What is the typical attitude toward college
            founders in the valley? Also do investors prefer a demo or a pitch?
          </QText>
          <QPrice>$12</QPrice>
        </Sect> */}
      {/* <Answer>
            <Info>
                <YourAns>Your Answer:</YourAns>
                <Date>March 22nd, 2021</Date>
            </Info>
            <AnsText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </AnsText>
        </Answer> */}
      {/* <PublicCheck>
            <Label>PUBLIC:</Label>
            <input type="checkbox"></input>
        </PublicCheck> */}
      {/* </ReceivedQuestion> */}
    </QuestionsPlayground>
  );
};

export default AnswerQuestionPlayground;
