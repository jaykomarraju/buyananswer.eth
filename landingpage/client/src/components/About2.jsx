import react from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import background from "../assets/background9.jpg";

const Container = styled.div`
  height: 100vh;
  //   background-color: #fff;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
//   box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    background-attachment: scroll;
    // padding-bottom: 75px;
  }
`;

const Title = styled.h1`
  font-size: 60px;
  width: 60%;
  font-weight: 600;
  color: #159a1f;

  @media (max-width: 768px) {
    font-size: 40px;
    width: 80%;
    margin: 0 auto;
    // margin-top: 85px;
    // margin-left: 10%;
  }
`;

const TB = styled.p`
  font-size: 60px;
  color: #000;
  font-weight: 800;
  line-height: 0.1;

  @media (max-width: 768px) {
    font-size: 40px;
    width: 80%;
    margin-top: 85px;
    margin-left: 10%;
  }
`;

const CenterOfPageWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // width: 100%;
    // height: 100%;
    
    @media (max-width: 768px) {
        flex-direction: column;
        background-attachment: scroll;
        // padding-bottom: 75px;
        }
`;

const Text = styled.p`
    font-size: 20px;
    width: 60%;
    font-weight: 400;
    color: #FFE1C6;
    text-align: center;
    @media (max-width: 768px) {
        font-size: 16px;
        width: 80%;
        margin: 50px auto;
        // margin-left: 10%;
    }
`;

const LinkStyled = styled(Link)`
    color: #fff;
    font-weight: 900;
    text-decoration: none;
    &:hover {
        color: #159a1f;


    }
`;





const About2 = () => {
  return (
    <Container>
        <CenterOfPageWrap>
      <Title>What is buy an answer?</Title>
      <Text>
        Buy An Answer is a web application that enables users to pay each other
        for answering questions. With a growing number of people building their
        personal brand online, this tool offers a way for content creators to
        monetize their digital credibility and generate revenue from their
        following. Initially launching as text-based, the platform aims to
        expand to voice and video in the future, breaking language barriers. The
        platform uses crypto (ETH) for transactions to protect user sovereignty.
        Buy An Answer is live on the Ethereum blockchain and offers secure and
        transparent transactions.
      </Text>
      <Text>
        Our Voice: <LinkStyled to="/blog">
        <b>Click here to checkout our blog</b>
        </LinkStyled>
      </Text>
      <Text>
        Referral Program: <LinkStyled to="/business">
        Click here to learn more
        </LinkStyled>
      </Text>
      
      </CenterOfPageWrap>
    </Container>
  );
};

export default About2;
