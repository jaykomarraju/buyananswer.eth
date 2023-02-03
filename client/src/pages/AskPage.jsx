import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BottomNavBar from "../components/BottomNavBar";
import ConnectWalletIcon from "../components/ConnectWalletIcon";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;

const Wrapper = styled.div`
    padding: 50px 10px;
  // height: 100vh;
  // background:green;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // margin-top: 15%;
  // margin-top: 250px;
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
`;

const ProfilePicture = styled.div`
  // background:pink;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1.5px solid black;
  margin: 20px;
`;
const Heading = styled.p`
  font-size: 2em;
`;

const BoardDesc = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.div``;

const SubHeading = styled.p``;

const Pic = styled.div``;

const QuestionEntry = styled.textarea`
  width: 85%;
  min-height: 300px;
  font-size: 16px;
  background: transparent;
  border: 1.5px solid black;
  border-radius: 10px;
  margin-top: 20px;
  padding: 10px;
`;

const PriorityBonusSect = styled.div`
  display: flex;
  align-items: center;
`;

const TotalSect = styled.div`
  display: flex;
  align-items: center;
  margin-top: -30px;
`;

const Label = styled.p`
  padding: 20px;
`;

const Entry = styled.input`
  width: 100px;
  font-size: 16px;
  padding: 8px;
  border: 1.5px solid black;
  border-radius: 10px;
`;

const Headline = styled.p`
  margin-top: -35px;
  margin-bottom: 40px;
`;

const Button = styled.button`
  padding: 15px;
  border: 1.5px solid black;
  background: transparent;
  border-radius: 10px;
  margin-bottom: 150px;

  &:hover {
    background: black;
    color: white;
  }

`;

const Url = styled.div`
  font-size: 20px;
  padding: 10px;
  font-weight: 600;
`;

// askpage is the page that the user sees when they click on the "ask" button on the home page
// it essentially is a form that the user fills out to ask a question for the particular user they are asking
// the user can also set a priority bonus and a total amount to pay for the question
// the user can also set a headline for their question

const AskPage = () => {
  // const username = "johndoe";
  // const name = "John Doe";
  // const headline = "I am here to answer any questions you have for me!";
  // const bio = "I am a 20 year old student at the University of Waterloo. I am studying Computer Science and I am a huge fan of the Toronto Raptors.";
  // const price = "$10";

  const [username, setUsername] = useState("sarahparker");
  const [name, setName] = useState("Sarah Parker");
  const [headline, setHeadline] = useState(
    "I am here to answer any questions you have for me!"
  );
  const [bio, setBio] = useState(
    "I am a 20 year old student at the University of Waterloo. I am studying Computer Science and I am a huge fan of the Toronto Raptors. I am also a huge fan of the Toronto Maple Leafs. I am also a huge fan of the Toronto Blue Jays. I am also a huge fan of the Toronto Argonauts. "
  );

  const [questionText, setQuestionText] = useState("");
  const [price, setPrice] = useState(10);
  const [priorityBonus, setPriorityBonus] = useState(0);

  const [total, setTotal] = useState(parseInt(price) + parseInt(priorityBonus));
  
  

  // const [total, setTotal] = useState(price + priorityBonus);

  // the create question function is called when the user clicks on the "buy answer" button
  // it essentially creates a question object and sends it to the backend
  // it then request a confirmation from the user to pay for the question
  // if the user confirms, the question is sent to the blockchain
  // if the user cancels, the question is not sent to the blockchain
  // when the button is clicked, the user is redirected to the successqorder which is where the user confirms the payment

  const createQuestion = () => {
    const question = {
      username: username,
      question: questionText,
      priorityBonus: parseInt(priorityBonus),
      total: parseInt(priorityBonus) + parseInt(price),
      asker: "johndoe",
    };
    console.log(question);

    

    // fetch("http://localhost:5000/createQuestion", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(question),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   }
    // );
  };

  return (
    <Container>
      <Wrapper>
        <ConnectWalletIcon />
        <Url>BUYANANSWER.COM/{username}</Url>
        <BoardDesc>
          <Pic>
            <ProfilePicture></ProfilePicture>
          </Pic>
          <Name>
            <Heading>Ask {name}</Heading>
            <Headline>{headline}</Headline>
            
          </Name>
        </BoardDesc>
        <BoardDesc>
        <SubHeading>{bio}</SubHeading>
        </BoardDesc>
        <QuestionEntry placeholder="Enter your question here..."
          onChange={(e) => {
            setQuestionText(e.target.value);
          }}
        ></QuestionEntry>
        <PriorityBonusSect>
          <Label>PRIORITY BONUS:</Label>
          <Entry
            placeholder="$"
            onChange={(e) => {
              setPriorityBonus(e.target.value);
              setTotal(parseInt(price) + parseInt(e.target.value));

            }}

          ></Entry>
        </PriorityBonusSect>
        <TotalSect>
          <Label>TOTAL:</Label>
          <Label>{total}</Label>
        </TotalSect>
        <Link to="/successqorder">
          <Button onClick={createQuestion}>BUY ANSWER</Button>
        </Link>
        <BottomNavBar />
      </Wrapper>
    </Container>
  );
};

export default AskPage;
