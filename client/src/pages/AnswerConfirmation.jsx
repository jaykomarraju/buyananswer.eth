import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BottomNavBar from "../components/BottomNavBar";
import instance from "../contract";
import { useLocation } from "react-router-dom";
import { db } from "../services/Firebase";
import web3 from "../web3";

const Cont = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrap = styled.div`
  margin-top: 50px;
  max-width: 800px;
`;

const Heading = styled.p`
  font-size: 18px;
  text-transform: uppercase;
  text-align: left;
  margin: auto;
  //   padding: 45px;
  padding: 45px 45px 15px 45px;
`;

const QuestionObjectView = styled.div`
  border: 1.5px solid black;

  border-radius: 10px;
  width: 85%;
  // max-width:800px;
  margin: auto;
  padding: 15px;
`;

const AnswerObjectView = styled.div`
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

const DateText = styled.p`
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
  margin-top: 30px;
  margin-bottom: 135px;

  &:hover {
    background: black;
    color: white;
  }
`;

const Notes = styled.div`
  text-align: left;
  margin: 30px;
`;

const Head = styled.p`
  padding-left: 25px;
`;

const List = styled.ul``;

const ThingInList = styled.li``;

// const answerObject = {
//   question: {
//     questionText: "Hey Justin. I’m a student in UNC studying CS and Econ and I’m trying to start a company. What is the typical attitude toward college founders in the valley? Also do investors prefer a demo or a pitch?",
//     questionPrice: 12,
//     questionDate: "MAR 20, 2022",
//     askUser: "sammycursner",
//     answerUser: "justin",
//   },
//   answerText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

// };

const AnswerConfirmation = () => {
  const location = useLocation();
  const [question, setQuestion] = useState(null);
  const answerText = location.state?.answerText || "";
  const questionId = location.state?.questionId || "";
  const walletAddress = location.state?.walletAddress || "";
  const [loading, setLoading] = useState(true);

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

  if (!question) {
    return <div>Loading...</div>; // or any other 'loading' component you want to display
  }

  const submitAnswer = async () => {
    try {
      // we are calling the answerQuestion function from the smart contract
      await instance.methods.answerQuestion(questionId).send({from: walletAddress});
  
      // get new balance
      const balanceWei = await web3.eth.getBalance(walletAddress);
      const balanceEther = web3.utils.fromWei(balanceWei, 'ether');
  
      console.log('New balance:', balanceEther);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <Cont>
        <Wrap>
          <QuestionObjectView>
            {" "}
            <ItemSpace>
              <AskerDetails>
                <Item>
                  <ProfilePicture></ProfilePicture>

                  <Label>Username : </Label>
                  <Value>@{question.asker}</Value>
                </Item>
              </AskerDetails>
            </ItemSpace>
            <ItemSpace>
              <QuestionText>{question.question}</QuestionText>
              <Flexer>
                <QuestionPrice>${question.total}</QuestionPrice>
                <DateText>
                  {new Date(
                    question.timestamp.seconds * 1000
                  ).toLocaleDateString()}
                </DateText>
              </Flexer>
            </ItemSpace>
          </QuestionObjectView>
          <Heading>Your Answer :</Heading>
          <AnswerObjectView>
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. 
            
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. <br></br><br></br>Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. */}
            {answerText}
          </AnswerObjectView>
          <Notes>
            <Head>Please Note:</Head>
            <List>
              <ThingInList>
                A transaction for your payment amount will be generated
                immediately after submitting the answer.
              </ThingInList>
              <ThingInList>
                It is very important that you believe you have answered the
                question in good faith.
              </ThingInList>
              <ThingInList>
                {" "}
                Participants will be allowed to rate answers (like/dislike) to
                the questions they ask.
              </ThingInList>
              <ThingInList>
                All assets during the transaction are available for withdrawal
                immediately through any exchange.
              </ThingInList>
            </List>
          </Notes>
          <ReviewButton
            onClick={() => {
              submitAnswer();
            }}
          >
            SUBMIT AND COLLECT PAYMENT
          </ReviewButton>
          <BottomNavBar />
        </Wrap>
      </Cont>
    </div>
  );
};

export default AnswerConfirmation;
