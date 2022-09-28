import React from "react";
import styled from "styled-components";

import ReactCardFlip from "react-card-flip";
import AnsweredQuestionTicket from "./AnsweredQuestionTicket";

const Spread2 = styled.div`
  // display: flex;

  justify-content: space-between;
  // width: 70%;
  padding: 12px;
  border: 1.5px solid black;
  border-radius: 10px;
  margin-top: 30px;
`;
const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const First = styled.p``;

const Second2 = styled.button`
  background: transparent;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 1.5px solid black;
`;

const QuestionHistory = styled.div`
  display: flex;
  flex-direction: column;
`;
const Ticket = styled.div`
  cursor: pointer;
  display: flex;
  padding: 10px;
  margin-left: 10px;

  margin-right: 10px;
  border: 1.5px solid black;
  border-radius: 15px;
  margin-top: 20px;
  align-items: center;
`;

const Question = styled.p`
  flex: 7;
  text-align: left;
  padding-left: 10px;
`;

const Fin = styled.p`
  font-size: 20px;
  color: #07ad4f;
  margin: 0;
`;

const FinR = styled.p`
  flex: 1;
  font-size: 20px;
  color: #870d01;
  margin: 0;
`;

const Right = styled.div`
  flex: 2;
`;

const DateAnswered = styled.p`
  font-size: 12px;
  margin: 0;
`;

const OpenHistory = () => {
  return (
    <Spread2>
      <Section>
        <First>VIEW HISTORY</First>
        <Second2>V</Second2>
      </Section>
      <QuestionHistory>

        <AnsweredQuestionTicket/>

        <Ticket>
          <Question>
            Hey Justin. I’m a student in UNC studying CS and Econ and I’m trying
            to start a company. What is the typical attitude toward college
            founders in the valley? Also do investors prefer a demo or a pitch?
          </Question>
          <Right>
            <FinR>- $4.83</FinR>
            <DateAnswered>MAR 20, 2021</DateAnswered>
          </Right>
        </Ticket>
      </QuestionHistory>
    </Spread2>
  );
};

export default OpenHistory;
