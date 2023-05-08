import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BottomNavBar from "../components/BottomNavBar";
import ClosedHistory from "../components/ClosedHistory";
import ConnectWalletIcon from "../components/ConnectWalletIcon";
import OpenHistory from "../components/OpenHistory";
import SwitchingHistoryComponent from "../components/SwitchingHistoryComponent";
import contract from "../services/web3";

const Cont = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 20px 20px 20px;
  // background:#4B9CD3;
`;

const Wrapper = styled.div`
  // background:lightgreen;
  // padding: 5%;
  margin-top: 30px;
  margin-bottom: 100px;
  height: 80%;
  width: 100%;
  max-width: 800px;
  // margin-left:10px;
  // margin-right:10px;
  // background:lightgreen;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
`;

const Middle = styled.div`
  width: 92%;
  max-width: 800px;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Section4 = styled.div`
  display: flex;
  align-items: center;
  // color:blue;
  margin-left: -20px;
`;

const ProfilePicture = styled.div`
  // background:pink;
  // max-width: 100px;
  // max-height: 100px;
  width: 100px;
  height: 100px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1.5px solid black;
  margin: 20px;
`;

const Label = styled.p`
  margin-right: 4px;
  // text-align: left;
  // background:blue;
`;

const ValueLabel = styled.p`
  margin-right: 4px;
  padding-left: 25px;
  text-align: right;
  // background:blue;
`;

const MinPriceValueLabel = styled.div`
  margin-right: 4px;
  padding-left: 25px;
  text-align: right;
  // background:blue;
  font-weight: 600;
  font-size: 2em;
`;
const LinkValueLabel = styled.div`
  margin-right: 4px;
  padding-left: 0px;
  text-align: left;
  // background:blue;
  // font-weight:600;
  // font-size:2em;
`;

const Entry = styled.input`
  max-width: 500px;
  width: 80%;
  height: 30px;
  background: transparent;
  border: 1.5px solid black;
  border-radius: 10px;
  font-family: "Poppins";
  // width: 100%;
`;

const SmallEntry = styled.input`
  width: 40%;
  height: 30px;
  background: transparent;
  border: 1.5px solid black;
  border-radius: 10px;
  font-family: "Poppins";
`;

const Entries = styled.div`
  // color:blue;

  // background:green;
`;

const Username = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 45px;
  // margin-bottom:10px;
`;

const Desc = styled.textarea`
  width: 100%;
  height: 120px;
  background: transparent;
  border: 1.5px solid black;
  border-radius: 10px;
  margin: 5px;
`;

const Button = styled.button`
  background: transparent;
  padding: 10px;
  font-size: 15px;
  border: 1.5px solid black;
  border-radius: 10px;
`;

const LButton = styled.button`
  background: transparent;
  padding: 10px;
  font-size: 15px;
  border: 1.5px solid black;
  border-radius: 10px;
  margin: 20px;
  margin-bottom: 30px;
`;

const Socials = styled.div`
  // margin-top: 30px;
  // margin-bottom: 60px;
  width: 100%;
`;
const Head = styled.p`
  text-align: left;
  font-weight: 600;
  font-size: 18px;
`;

const Name = styled.p`
  padding: 5px;
`;

const SubHead = styled.p`
  font-size: 17px;
  display: flex;
  justify-content: left;
  width: 85%;
  max-width: 500px;
  margin: 0;
  margin-bottom: 20px;
`;
const Head2 = styled.div`
  margin-top: 30px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 20px;
  display: flex;
  justify-content: left;
  width: 85%;
  max-width: 500px;
`;

const Platform = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: right;
  margin-right: 0;
  // background:purple;
`;

const Spread = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 12px;
  margin-top: 20px;
`;

const Spread2 = styled.div`
  // display: flex;

  justify-content: space-between;
  // width: 70%;
  padding: 12px;
  border: 1.5px solid black;
  border-radius: 10px;
`;

const First = styled.p``;

const Second = styled.button`
  background: transparent;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 10px;
  border: 1.5px solid black;
`;

const Second2 = styled.button`
  background: transparent;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 1.5px solid black;
`;

const QuestionHistory = styled.div`
  display: flex;
  flex-direction: column;
`;

const Ticket = styled.div`
  display: flex;
  padding: 10px;
  margin-left: 10px;

  margin-right: 10px;
  border: 1.5px solid black;
  border-radius: 15px;
  margin-top: 20px;
  align-items: center;
`;

const Question = styled.p`
  flex: 7;
  text-align: left;
  padding-left: 10px;
`;

const Fin = styled.p`
  flex: 1;
  font-size: 25px;
`;

const ProfHistEditPage = () => {
  const [user, setUser] = useState(null);

  const handleUser = (user) => {
    setUser(user);
  };

  // const Profile = {
  // //   name: "John Doe",
  // //   username: "johndoe",
  // //   email: "john.doe@gmail.com",
  // //   description: "I am a software engineer",
  //   socials: [
  //     {
  //       platform: "Twitter",
  //       link: "https://twitter.com/johndoe",
  //     },
  //     {
  //       platform: "Instagram",
  //       link: "https://instagram.com/johndoe",
  //     },
  //     {
  //       platform: "LinkedIn",
  //       link: "https://linkedin.com/johndoe",
  //     },
  //   ],
  // //   boardDescription:
  // //     "I am a software engineer. I am answering questions on the blockchain. If you have any questions, feel free to ask me.",
  // //   minimumQuestionPrice: 5.0,
  // };

  // const [profile, setProfile] = useState(Profile);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [boardDescription, setBoardDescription] = useState("");
  // const [socials, setSocials] = useState(Profile.socials);
  // const [instagramUsername, setInstagramUsername] = useState("johndoe");
  const [prevDescription, setPrevDescription] = useState("");
  const [prevBoardDescription, setPrevBoardDescription] = useState("");
  // const [twitterUsername, setTwitterUsername] = useState("johndoe");
  const [minimumPrice, setMinimumPrice] = useState("");
  // const [historySelection, setHistorySelection] = useState(<ClosedHistory/>);

  const handleSave = () => {
    console.log("Saving profile");

    const minPriceInt = parseInt(minimumPrice);

    contract.methods.updateUser(description, boardDescription, minPriceInt).send({
      from: "0xA5a062Cc7aA1F44161153E8A1Deb4edB916fbE55",
      gas: 1000000,
    });

    contract.methods
      .getUser("0xA5a062Cc7aA1F44161153E8A1Deb4edB916fbE55")
      .call()
      .then((user) => {
        console.log(user);
      });

    // handleUser(user);

    console.log("Profile saved");
  };

  contract.methods
    .getUser("0xA5a062Cc7aA1F44161153E8A1Deb4edB916fbE55")
    .call()
    .then((user) => {
      // console.log(user);
      // handleUser(user);
      setUsername(user.username);
      setEmail(user.email);
      setName(user.name);
      setPrevDescription(user.headline);
      setPrevBoardDescription(user.bio);
      // setDescription(user.headline);
      // setBoardDescription(user.bio);
      setMinimumPrice(user.minimumPrice);
    });

  const [username, setUsername] = useState("");

  const handleDescriptionChange = (e) => {
    // setDescription("")
    setDescription(e.target.value);
    console.log(description);
  };

  return (
    <Cont>
      <Wrapper>
        {/* <ConnectWalletIcon /> */}
        {/* <Top>
      <ConnectWalletButton/>
    </Top> */}

        <Middle>
          <Head2>Profile</Head2>
          <SubHead>/{username}</SubHead>
          <Section4>
            <ProfilePicture></ProfilePicture>
            <Entries>
              <Username>
                <Label>USERNAME: </Label>
                <Label>{username}</Label>
              </Username>
              <Username>
                <Label>EMAIL: </Label>
                <Label>{email}</Label>
              </Username>
              <Username>
                <Label>NAME: </Label>
                <Label>{name}</Label>
              </Username>
            </Entries>
          </Section4>
          {/* <Section> */}
            {/* <Spread2>
            <First>VIEW HISTORY</First>
            <Second2>V</Second2>
          </Spread2> */}
            {/* <ClosedHistory/> */}
            {/* <OpenHistory/> */}
            {/* {historySelection} */}
            {/* <SwitchingHistoryComponent /> */}
          {/* </Section> */}
          <Section>
            <Spread>
              <First></First>
              <div>
                {/* <Second>EDIT</Second> */}

                <Link to="/profile">
                  <Second onClick={handleSave}>SAVE</Second>
                </Link>
              </div>
            </Spread>
          </Section>
          <br></br>
          <Section>
            <Label>HEADLINE</Label>
            <Entry
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              defaultValue={prevDescription}
            ></Entry>
            {/* <ValueLabel>
          
          </ValueLabel> */}
          </Section>
          <Section>
            <Label>PUBLIC BOARD DESCRIPTION</Label>
            <Desc
              value={boardDescription}
              onChange={(e) => {
                setBoardDescription(e.target.value);
              }}
              defaultValue={prevBoardDescription}
            ></Desc>
            {/* <ValueLabel>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </ValueLabel> */}
          </Section>
          <Section>
            <Label>MINIMUM QUESTION PRICE</Label>
            <SmallEntry
              defaultValue={minimumPrice}
              onChange={(e) => {
                setMinimumPrice(e.target.value);
              }}
            ></SmallEntry>
            {/* <MinPriceValueLabel>
            $5.00
          </MinPriceValueLabel> */}
          </Section>
          {/* <Section>
            <Socials>
              <Head>SOCIALS</Head>

              <Platform>
                <Name>INSTRAGRAM.COM/</Name>
                <Entry
                  value={instagramUsername}
                  onChange={(e) => {
                    setInstagramUsername(e.target.value);
                  }}
                ></Entry>
                {/* <LinkValueLabel>
            johndoe
          </LinkValueLabel> */}
          {/* </Platform> */}
          {/* <Platform>
              <Name>LINKEDIN.COM/</Name>
              <Entry></Entry>
            </Platform>
            <Platform>
              <Name>FACEBOOK.COM/</Name>
              <Entry></Entry>
            </Platform>
            <Platform>
              <Name>TWITTER.COM/</Name>
              <Entry></Entry>
            </Platform> */}
          {/* </Socials> */}
          {/* </Section> */}
        </Middle>
        {/* <BottomWrap> */}

        {/* <BottomNavBar/> */}
        {/* </BottomWrap> */}
        <BottomNavBar />
      </Wrapper>
    </Cont>
  );
};

export default ProfHistEditPage;
