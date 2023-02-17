import react from "react";
import styled from "styled-components";
import background from "../assets/background.jpg";

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
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    background-attachment: scroll;
    // padding-bottom: 75px;
  }
`;

const Title = styled.h1`
  font-size: 60px;
  width: 60%;
  font-weight: 400;
  color: #fff;
  line-height: 0.1;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 30px;
    width: 80%;
    margin-top: 85px;
    margin-left: auto;
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
    `

const About = () => {
  return (
    <Container>
      <Title>all you need?</Title>
      <Title>
        a<b> cryptowallet*</b>
      </Title>
    </Container>
  );
};

export default About;
