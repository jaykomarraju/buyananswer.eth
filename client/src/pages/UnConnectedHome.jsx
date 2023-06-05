import React, {useState} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BottomNavBar from "../components/BottomNavBar";
import ConnectWalletButton from "../components/ConnectWalletButton";
import ConnectWalletIcon from "../components/ConnectWalletIcon";
import UnAuthBottomNavBar from "../components/UnAuthBottomNavBar";
import { db } from "../services/Firebase";
import Banner from "../components/Banner";

const Wrapper = styled.div`
  //   padding: 5%;
  height: 75vh;
  // background:green;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const headPlaceholder = "Enter username...";

const Middle = styled.div`
// width:95vw;
// margin:5px;
`;

const Top = styled.div`
  height: 20vh;
  text-align: right;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 0.75em;
  background: transparent;
  border: 1.5px solid black;
  border-radius: 7px;
  width: 50%;
`;

const UsernameBoxEntry = styled.input`
font-size:2em;
font-family:'Poppins'
// width:80%;
background:transparent;
padding:5px;
text-align:right;
border: 2px solid black;
border-radius:7px;
margin-bottom:20px;
width:80vw;
max-width:500px;
// margin-left:10%;
`;

const PushinP = styled.p`
  margin-top: 30px;
`;

const BottomWrap = styled.div`
  // position:fixed;
  // bottom:25px;
`;

const TopHeading = styled.p`
  text-transform: uppercase;
  font-size: 50px;
  font-weight: 800;
`;

const Container = styled.div`
  width:100vw;
  height:100vh;
`

const UnConnectedHome = () => {
  const [username, setUsername] = useState("");

  const handleClick = () => {
    console.log("looking for: ", username);

    if (username === "") {
      alert("Please enter a username");
    } else {
      db.collection("users")
        .where("username", "==", username)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            alert("No such user exists");
          } else {
            querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data());
              window.location.href = `/${doc.data().username}`;
            });
          }
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  };

  return (
    <Container>
      {/* <Banner/> */}
    <Wrapper>
      {/* <ConnectWalletIcon /> */}
      <Top>
        {/* <Link to="/connected"> */}
        {/* <ConnectWalletButton/> */}
        {/* </Link> */}
      </Top>
      <Middle>
          <TopHeading>BUY AN ANSWER</TopHeading>
        
        <PushinP>WHOSE THOUGHTS ARE YOU TRYING TO PICK?</PushinP>
        <UsernameBoxEntry
          type="text"
          placeholder={headPlaceholder}
        ></UsernameBoxEntry>
        <br></br>
        {/* <Link to="noauthaskpage"> */}
          <Button onClick={
            handleClick
          }>VISIT BOARD</Button>
        {/* </Link> */}
      </Middle>
      {/* <BottomWrap> */}

      {/* <BottomNavBar/> */}
      {/* </BottomWrap> */}
      <UnAuthBottomNavBar />
    </Wrapper></Container>
  );
};

export default UnConnectedHome;
