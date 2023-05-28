import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BottomNavBar from "../components/BottomNavBar";
import { db } from "../services/Firebase";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cont = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrap = styled.div`
  margin-top: 50px;
  max-width: 800px;
`;

const Heading = styled.p`
  font-weight: 800;
  font-size: 32px;
  text-align: left;
  margin: auto;
  padding: 45px;
`;

const QuestionObjectView = styled.div`
  border: 1.5px solid black;

  border-radius: 10px;
  width: 85%;
  // max-width:800px;
  margin: auto;
  padding: 15px;
`;

const AskerDetails = styled.div``;

const ProfilePicture = styled.div`
  border: 1.5px solid black;
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

const AnswerEntry = styled.textarea`
  width: 85%;
  height: 300px;
  font-size: 16px;
  background: transparent;
  border: 1.5px solid black;
  border-radius: 10px;
  padding: 10px;
  margin-top: -25px;
`;

const Label = styled.p`
  padding-left: 11px;
`;

const Value = styled.p``;

const Date = styled.p`
  margin: 0;
  font-size: 12px;
`;

const QuestionText = styled.p`
  flex: 7;
`;

const QuestionPrice = styled.p`
  font-size: 26px;
  //   font-weight: 600;
  margin-bottom: 0;
`;

const Item = styled.div`
  display: flex;
`;
const ItemSpace = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Flexer = styled.div`
  flex: 2;
`;

const ReviewButton = styled.button`
  padding: 12px;
  background: transparent;
  border: 1.5px solid black;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 135px;
  // text-decoration: none;
  font-size: 16px;

  &:hover {
    background: black;
    color: white;
  }
`;

const AnswerQuestion = ({ location }) => {
  // let state;
  // if (location && location.state) {
  //   state = location.state;
  // } else {
  //   return <div>Loading...</div>;
  // }

  const navigate = useNavigate();

  const [Question, setQuestion] = useState({});

  const [answerText, setAnswerText] = useState("");
  // check the questionID in recieved question collection within the user collection at the given wallet address
  // get the question object from the questionID
  // setQuestion(questionObject)

  useEffect(() => {
    // We'll handle the fetching logic later
  }, []);

  // if (!location || !location.state) {
  //   return <div>Loading...</div>;
  // }

  // // Now that we know location.state exists, we can use it
  // const { walletAddress, questionID } = location.state;

  const { questionId = "", walletAddress = "" } = location?.state || {};

  useEffect(() => {
    console.log(walletAddress, questionId);

    const getQuestion = async () => {
      const questionRef = db
        .collection("users")
        .doc(walletAddress)
        .collection("receivedQuestions")
        .doc(questionId);
      const questionDoc = await questionRef.get();
      if (!questionDoc.exists) {
        console.log("No such document!");
      } else {
        console.log("Document data:", questionDoc.data());
        setQuestion(questionDoc.data());
      }
    };

    getQuestion();
  });

  const handleAnswer = (e) => {
    setAnswerText(e.target.value);
  };

  //   const handleAnswer = async (e, questionId) => {
  //   e.preventDefault();
  //   navigate("/answer", { state: { questionId, walletAddress } });
  // };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();

    navigate('/anscnfrm', {
      state: { 
        answerText: answerText,
        questionId: questionId,
        walletAddress: walletAddress
      },
    });
  };

  return (
    <div>
      <Link to="/myboard">back</Link>

      <Cont>
        <Wrap>
          <QuestionObjectView>
            {" "}
            <ItemSpace>
              <AskerDetails>
                <Item>
                  <ProfilePicture></ProfilePicture>

                  <Label>Username: </Label>
                  <Value>@{Question.asker}</Value>
                </Item>
              </AskerDetails>
            </ItemSpace>
            <ItemSpace>
              <QuestionText>{Question.question}</QuestionText>
              <Flexer>
                <QuestionPrice>${Question.total}</QuestionPrice>
                <Date>{Question.timestamp?.toDate().toLocaleString()}</Date>
              </Flexer>
            </ItemSpace>
          </QuestionObjectView>
          <Heading>Answer Question.</Heading>

          <AnswerEntry
            placeholder="Enter your answer here..."
            onChange={handleAnswer}
          ></AnswerEntry>

<ReviewButton onClick={handleAnswerSubmit}>
  REVIEW BEFORE SUBMIT
</ReviewButton>

          <BottomNavBar />
        </Wrap>
      </Cont>
    </div>
  );
};

export default AnswerQuestion;
