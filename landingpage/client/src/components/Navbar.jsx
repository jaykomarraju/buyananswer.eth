import react from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Container = styled.div`
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  // box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  // border-bottom: 2px solid #000;
  position: fixed;
  width: 100vw;
  z-index: 1;
  opacity: 0.75;
`;

// only one logo image in the center of navbar

const Logo = styled.img`
  width: 200px;
  cursor: pointer;
`;

const Button = styled.button`
  border: 2px solid #000;
  padding: 10px 15px;
  border-radius: 10px;
  background-color: transparent;
  color: #000;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.5s ease;
  margin-left: 20px;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 25px;
`;

const Middle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  // margin-left: 25px;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 25px;
`;

const Navbar = () => {
  return (
    <Container>
      <Left></Left>
      <Middle>
        <Link to="/">
          <Logo src={logo} />
        </Link>
      </Middle>
      <Right>
        {/* <Link to="/enterapp"> */}
        <a href="http://localhost:3001/">
          <Button>Enter App</Button>
          {/* app */}
        </a>
        {/* </Link> */}
      </Right>
    </Container>
  );
};

export default Navbar;
