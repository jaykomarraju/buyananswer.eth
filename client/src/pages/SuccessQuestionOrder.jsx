import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BottomNavBar from "../components/BottomNavBar";
import ConnectWalletIcon from "../components/ConnectWalletIcon";

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
  font-size:15px;
  margin-top:20px;

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
display:flex;
justify-content:center;`

const SuccessQuestionOrder = () => {
  return (
    <Wrapper>
      <ConnectWalletIcon />

      <OrderDetails>
        <TopHeading>Confirm your BuyAnAnswer order!</TopHeading>
        <Heading>Your Order : @johndoe</Heading>
        <Box>
          <QuestionText>
            Can you share bullet points about everything I need to include in a
            picth deck? (Obviously I'm looking at tech startups specifically)
          </QuestionText>
          <Right>
            <AmtPaid>$5.00</AmtPaid>
            <DateAsked>MAR 29, 2022</DateAsked>
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
        <Button>Place Order</Button></CenterWrap>
        <BottomNavBar />
      </OrderDetails>
    </Wrapper>
  );
};

export default SuccessQuestionOrder;
