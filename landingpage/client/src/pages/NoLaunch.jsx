import react, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import background from "../assets/background7.jpg";
import {db} from "../services/Firebase";
import LandingFooter from "../components/LandingFooter";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
//   background-color: #fff;

    background-image: url(${background});
    background-size: cover;
    background-position: center;
    // background-opacity: 0.5;
    background-repeat: no-repeat;
    background-attachment: fixed;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 60px;
  width: 60%;
  font-weight: 400;
  color: #000;
  line-height: 0.1;

  @media (max-width: 768px) {
    font-size: 40px;
    width: 80%;
    margin-top: 85px;
    margin-left: 10%;
  }
`;

const EmailInput = styled.input`
  width: 100%;
  height: 50px;
  border: 2px solid #000;
  border-radius: 10px;
  background-color: #f2f2f2;
  opacity: 0.65;
//   padding-left: 25px;
  padding: 20px 20px 20px 20px;
  font-size: 25px;
  margin-top: 20px;

  @media (max-width: 768px) {
    width: 80%;
    margin: auto;
    margin-top: 20px;
    // margin-left: 10%;
  }
`;

const Button = styled.button`
  width: 100%;
//   height: 50px;
padding: 20px;
  border: none;
  opacity: 0.65;

  border-radius: 0px 20px 0px 0px;
  background-color: #000;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
  border: 3px solid #000;

  @media (max-width: 768px) {
    width: 80%;
    margin: auto;
    margin-top: 20px;
    // margin-left: 10%;
  }

    &:hover {
        background-color: #ededed;
        color: #000;
        border: 3px solid #000;
    }

`;

const Form = styled.form`
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
    width: 80%;
    // margin-left: 10%;
    }
`

const NoLaunch = () => {
  const [email, setEmail] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@") || !email.includes(".") || email === "") {
        alert("Please enter a valid email address");
        return;
      }

    db.collection("alphaEmails").add({
        email: email,
    });

    setEmail("");

    window.alert("Thank you for your interest! We will notify you when we launch.");
  };

  return (
    <div>
    {/* <Navbar /> */}
    <Container>

      <Title>Coming Soon</Title>
      <Form>
        <EmailInput
          placeholder="Email"
          onChange={handleEmail}
          value={email}
          type="email"
        />
        <Button onClick={handleSubmit}>Notify Me</Button>
      </Form>
    </Container>
    <LandingFooter/></div>
  );
};

export default NoLaunch;
