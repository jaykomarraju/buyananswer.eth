import react, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { db } from "../services/Firebase";
import background from "../assets/background3.jpg";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  //   background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-image: url(${background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;

  @media (max-width: 768px) {
    flex-direction: column;
    background-attachment: scroll;
  }
`;

const Title = styled.h1`
  font-size: 60px;
  width: 60%;
  font-weight: 400;
  color: #000;

  @media (max-width: 768px) {
    font-size: 40px;
    width: 80%;
    margin-top: 85px;
    margin-left: 10%;
  }
`;

const Para = styled.p`
  font-size: 20px;
  width: 60%;
  font-weight: 400;
  color: #000;
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
    width: 80%;
    margin-top: 85px;
    margin-left: 10%;
  }
`;

const Input = styled.input`
  width: 60%;
  height: 40px;
  border: none;
  border-bottom: 1px solid #000;
  margin-top: 20px;
  color: #000;
  background: transparent;
  padding:10px;
  font-size: 20px;
  outline: none;
  // width: 70%;
  flex: 8;

  ::placeholder {
    color: #fff;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    width: 100%;
    border:1.5px solid #000;
    border-radius: 10px 10px 10px 10px;
    // width: 80%;
    // margin-top: 85px;
    // margin-left: 10%;
  }
`;

const Button = styled.button`
  // width: 30%;
  // height: 40px;
  flex: 2;
  border: none;
  border-radius: 0px 20px 0px 0px;
  padding: 10px;
  // font-size: 20px;
  background-color: #000;
  color: #fff;
  font-size: 14px;
  margin-top: 12px;
  outline: none;

  &:hover {
    background-color: #fff;
    color: #000;
    // border: 1px solid #000;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    width: 100%;
    padding: 10px;
    // width: 80%;
    // margin-top: 85px;
    // margin-left: 10%;
  }
`;

const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 60vw;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 80vw;
  }
`;

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // check if email is valid: must contain @ and . and not be empty
    if (!email.includes("@") || !email.includes(".") || email === "") {
      alert("Please enter a valid email address");
      return;
    }

    db.collection("alphaEmails").add({
      email: email,
    });

    setEmail("");

    alert("Thank you for joining our alpha program!");
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Container>
      {/* <Navbar /> */}
      {/* <Title>Footer Page</Title> */}
      <Title>Interested?</Title>
      <Para>
        <b>Join our mailing list</b> to stay up to date with our progress and
        get notified when we launch. Learn more about our
        <Link
          to="/alpha"
          style={{ textDecoration: "none", color: "#000", fontWeight: "bold" }}
          // to top of page
          onClick={() => window.scrollTo(0, 0)}
        >
          {" "}
          alpha program.
        </Link>
      </Para>
      <Form>
        <Input
          placeholder="Enter your email address"
          value={email}
          onChange={handleChange}
          type="email"
          required
        />
        <Button onClick={handleSubmit}>JOIN OUR ALPHA PROGRAM</Button>
      </Form>
    </Container>
  );
};

export default Footer;
