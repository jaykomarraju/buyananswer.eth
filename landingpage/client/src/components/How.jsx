import react from "react";
import styled from "styled-components";
import background from "../assets/background6.jpg";

const Container = styled.div`
  height: 100vh;
  background-color: #fff;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
    flex-direction: column;
    background-attachment: scroll;
    // padding-bottom: 75px;
    padding: 50px;
    }
`;

const Title = styled.h1`
  font-size: 60px;
  width: 60%;
  font-weight: 400;
  color: #fff;
//   line-height: 0.1;

    @media (max-width: 768px) {
    font-size: 35px;
    width: 80%;
    margin-top: 100px;
    margin-left: 10%;
    }
`;

const Order = styled.ol`
  font-size: 30px;
  color: #fff;
  font-weight: 400;
  line-height: 2;
    margin-top: 50px;
    margin-left: 10%;
    margin-right: 10%;
    margin-bottom: 50px;

    @media (max-width: 768px) {
    font-size: 20px;
    width: 80%;
    margin-bottom: 85px;
    margin-left: 10%;
    }
`;

const OrderItem = styled.li`
  font-size: 22px;
  color: #fff;
//   font-weight: 800;
//   line-height: 0.1;

    // @media (max-width: 768px) {
    // font-size: 20px;
    // width: 80%;
    // l
    // margin-top: 85px;
    // margin-left: 10%;
    // }

`;

const How = () => {
  return (
    <Container>
      <Title>How does it work?</Title>
      <Order>
        <OrderItem>Connect Ethereum Wallet *(Metamask, Coinbase, etc.)</OrderItem>
        <OrderItem>Create your profile</OrderItem>
        <OrderItem>Share a link with your audience</OrderItem>
        <OrderItem>Answer their questions and get paid</OrderItem>
      </Order>
    </Container>
  );
};

export default How;
