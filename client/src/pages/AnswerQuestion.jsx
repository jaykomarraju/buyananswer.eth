import React from "react";
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
  font-size:12px;
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
`;
const AnswerQuestion = () => {
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
                  <Value>@sammycursner</Value>
                </Item>
              </AskerDetails>
            </ItemSpace>
            <ItemSpace>
              <QuestionText>
                Hey Justin. I’m a student in UNC studying CS and Econ and I’m
                trying to start a company. What is the typical attitude toward
                college founders in the valley? Also do investors prefer a demo
                or a pitch?
              </QuestionText>
              <Flexer>
                <QuestionPrice>$12.00</QuestionPrice>
                <Date>MAR 20, 2022</Date>
              </Flexer>
            </ItemSpace>
          </QuestionObjectView>
          <Heading>Answer Question.</Heading>

          <AnswerEntry placeholder="Enter your answer here..."></AnswerEntry>
          <Link to="/anscnfrm">
            <ReviewButton>REVIEW BEFORE SUBMIT</ReviewButton>
          </Link>
          <BottomNavBar />
        </Wrap>
      </Cont>
    </div>
  );
};

export default AnswerQuestion;
