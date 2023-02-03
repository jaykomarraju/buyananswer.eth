import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BottomNavBar from "../components/BottomNavBar";

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

const AnswerQuestion = () => {
  const Question = {
    questionText:
      "Hey Justin. I’m a student in UNC studying CS and Econ and I’m trying to start a company. What is the typical attitude toward college founders in the valley? Also do investors prefer a demo or a pitch?",
    price: "$12.00",
    date: "MAR 20, 2022",
    askUser: "@sammycursner",
    answerUser: "@justin",
  };

  const [answerText, setAnswerText] = useState("");

  const handleAnswer = (e) => {
    setAnswerText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const answer = {
      question: Question,
      answer: answerText,
    };

    console.log(answer);
    // returns
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

                  <Label>Username : </Label>
                  <Value>{Question.askUser}</Value>
                </Item>
              </AskerDetails>
            </ItemSpace>
            <ItemSpace>
              <QuestionText>{Question.questionText}</QuestionText>
              <Flexer>
                <QuestionPrice>{Question.price}</QuestionPrice>
                <Date>{Question.date}</Date>
              </Flexer>
            </ItemSpace>
          </QuestionObjectView>
          <Heading>Answer Question.</Heading>

          <AnswerEntry
            placeholder="Enter your answer here..."
            onChange={handleAnswer}
          ></AnswerEntry>
         
            <ReviewButton onClick={handleSubmit}>
              REVIEW BEFORE SUBMIT
            </ReviewButton>
            <Link to="/anscnfrm">
              next
          </Link>

          <BottomNavBar />
        </Wrap>
      </Cont>
    </div>
  );
};

export default AnswerQuestion;
