import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BottomNavBar from "../components/BottomNavBar";
import ConnectWalletIcon from "../components/ConnectWalletIcon";
import { db } from "../services/Firebase";
import instance from "../contract";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const OrderDetails = styled.div`
  text-align: left;
  margin-top: 25px;
  max-width: 800px;
  width: 80%;
  margin-bottom: 150px;
`;

const Heading = styled.p`
  font-weight: 600;
  font-size: 18px;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 10px;
  border: 1.5px solid black;
  border-radius: 10px;
`;

const QuestionText = styled.p`
  flex: 6;
  padding-left: 20px;
`;

const AmtPaid = styled.p`
  margin: 0;
  text-align: center;
  font-size: 22px;
`;

const DateAsked = styled.p`
  margin: 0;
  text-align: center;
  font-size: 12px;
`;

const AddInfo = styled.div``;

const Heading2 = styled.div`
  margin: 55px 15px 5px 15px;
`;

const List = styled.ul``;

const Item = styled.li``;

const Right = styled.div`
  flex: 2;
`;

const Button = styled.button`
  background: transparent;
  border: 1.5px solid black;
  border-radius: 10px;
  padding: 12px;
  font-size: 15px;
  margin-top: 20px;

  &:hover {
    background: black;
    color: white;
  }
`;

const TopHeading = styled.p`
  text-transform: uppercase;
  font-size: 35px;
  font-weight: 800;
`;
const CenterWrap = styled.div`
  display: flex;
  justify-content: center;
`;

// const question = {
//   username: username,
//   question: questionText,
//   priorityBonus: parseInt(priorityBonus),
//   total: parseInt(priorityBonus) + parseInt(price),
//   asker: askerUser,
//   timestamp: Date.now(),
// };

const SuccessQuestionOrder = ({ location }) => {
  let state;
  if (location && location.state) {
    state = location.state;
  } else {
    return <div>Loading...</div>;
  }

  const handleClick = async () => {
    try {
      // Store question in firebase and get the document id.
      const docRef = await db.collection("questions").add(state.question);
      console.log("Question written with ID: ", docRef.id);

      // Find the address of the answerer.
      const answererSnapshot = await db
        .collection("users")
        .where("username", "==", state.question.username)
        .get();

      if (!answererSnapshot.empty) {
        // We will just take the first user if there are multiple users with the same username.
        const answererDoc = answererSnapshot.docs[0];

        // Call the contract's askQuestion function
        await instance.methods.askQuestion(docRef.id, answererDoc.id).send({
          from: state.walletAddress, // sender address
          value: state.question.total, // value in wei
        });

        // Then, add the question to the 'askedQuestions' subcollection.
        await db
          .collection("users")
          .doc(state.walletAddress)
          .collection("askedQuestions")
          .doc(docRef.id)
          .set(state.question);
        console.log("Document successfully added to askedQuestions!");

        // Then add the question to the 'receivedQuestions' subcollection for the answerer.
        await db
          .collection("users")
          .doc(answererDoc.id)
          .collection("receivedQuestions")
          .doc(docRef.id)
          .set(state.question);
        console.log("Document successfully added to receivedQuestions!");
      } else {
        console.error("No user found with username: ", state.question.username);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  

  return (
    <Wrapper>
      <ConnectWalletIcon />

      <OrderDetails>
        <TopHeading>Confirm your BuyAnAnswer order!</TopHeading>
        <Heading>Your Order to : @{state.question.username}</Heading>
        <Box>
          <QuestionText>{state.question.question}</QuestionText>
          <Right>
            <AmtPaid>${state.question.total}</AmtPaid>
            <DateAsked>{state.question.timestamp.toString()}</DateAsked>
          </Right>
        </Box>
        <AddInfo>
          <Heading2>Important Information:</Heading2>
          <List>
            <Item>
              Once you place an order and money will be immediately debited from
              your wallet.{" "}
            </Item>
            <Item>
              However, if your question hasn't been answered yet, you can cancel
              it for a small fee (which reduces the longer you wait).{" "}
            </Item>
            <Item>
              If your question is answered, the funds are credited into the
              answerers wallet immediately. You can rate the answer after you
              receive it.
            </Item>
            <Item>
              If your question is declined, the funds are credited back into
              your account fully (excluding ETH gas fees).
            </Item>
          </List>
        </AddInfo>
        <CenterWrap>
          <Button onClick={handleClick}>Place Order</Button>
        </CenterWrap>
        <BottomNavBar />
      </OrderDetails>
      {/* <div>
        <h2>Success!</h2>
        <p>Username: {state.question.username}</p>
        <p>Question: {state.question.question}</p>
        <p>Priority Bonus: {state.question.priorityBonus}</p>
        <p>Total: {state.question.total}</p>
        <p>Asker: {state.question.asker}</p>
        <p>Timestamp: {state.question.timestamp.toString()}</p>
        <p>Wallet Address: {state.walletAddress}</p>
      </div> */}
    </Wrapper>
  );
};

export default SuccessQuestionOrder;
