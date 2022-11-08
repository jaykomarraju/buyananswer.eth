import React, { useState } from "react";
import styled from "styled-components";
import ReactCardFlip from "react-card-flip";

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

const Ticket2 = styled.div`
  cursor: pointer;
//   display: flex;
//   background:#262626;
background:#00e390;
// opacity: 0.5;
  color:#1a1a1a;
  padding: 10px;
  margin-left: 10px;

  margin-right: 10px;
  border: 1.5px solid black;
  border-radius: 15px;
  margin-top: 20px;
  align-items: center;
  max-height:300px;
  overflow:scroll;
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

const Heading = styled.p`
  font-size: 16px;
  margin-top: 10px;
  font-weight: 600;
`;

const AnsweredQuestionTicket = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <Ticket onClick={handleClick}>
        <Question>
          Hey Justin. I’m a student in UNC studying CS and Econ and I’m trying
          to start a company. What is the typical attitude toward college
          founders in the valley? Also do investors prefer a demo or a pitch?
        </Question>
        <Right>
          <Fin>+ $9.43</Fin>
          <DateAnswered>MAR 20, 2021</DateAnswered>
        </Right>
      </Ticket>

      <Ticket2 onClick={handleClick}>
        <Heading>ANSWER :</Heading>
        <Question>
          Monetize your digital presence by answering your fans' burning
          questions. We created a platform to capture the value of expertise.If
          you have a digital influence and would like to answer some questions.
          Monetize your digital presence by answering your fans' burning
          questions. We created a platform to capture the value of expertise.If
          you have a digital influence and would like to answer some questions.
          Monetize your digital presence by answering your fans' burning
          questions. We created a platform to capture the value of expertise.If
          you have a digital influence and would lik.
        </Question>
        <Heading>@johndoe</Heading>
        {/* <Right>
          <Fin>+ $10.43</Fin>
          <DateAnswered>MAR 20, 2021</DateAnswered>
        </Right> */}
      </Ticket2>
    </ReactCardFlip>
  );
};

export default AnsweredQuestionTicket;
