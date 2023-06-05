import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import styled from "styled-components";
import BottomNavBar from "../components/BottomNavBar";
import ClosedHistory from "../components/ClosedHistory";
import ConnectWalletIcon from "../components/ConnectWalletIcon";
import OpenHistory from "../components/OpenHistory";
import SwitchingHistoryComponent from "../components/SwitchingHistoryComponent";
import contract from "../services/web3";
import { db } from "../services/Firebase";
import Banner from "../components/Banner";
// import AuthContext from "../contexts/AuthContext";

// This is the page that shows the user's profile and history
// It recieves the user's profile data from the server and displays it.
// It also recieves the user's history data from the server and displays it.
// History data is displayed in the form of a list of questions that the user has asked/answered.
// The user can click on a question to see more details about it.

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

  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;


`;

const Label = styled.p`
  margin-right: 4px;
  // text-align: left;
  // background:blue;
  // flex: 1;

  @media (max-width: 768px) {
    flex: 1;
  }
`;

const Label2 = styled.p`
margin-right: 4px;
  // text-align: left;
  // background:blue;
  // flex: 1;
`;


const ValueLabel = styled.p`
  margin-right: 4px;
  padding-left: 25px;
  text-align: right;
  // background:blue;
  flex: 3;
`;

const MinPriceValueLabel = styled.div`
  margin-right: 4px;
  padding-left: 25px;
  text-align: right;
  // background:blue;
  font-weight: 600;
  font-size: 2em;
  flex: 3;
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

const Social = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const SocialLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: right;
  margin-right: 0;
  // background:purple;
`;

const SocialPlatform = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: right;
  margin-right: 0;
  // background:purple;
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

const ProfHistPage = ({ walletAddress }) => {
  // on load, get the user from the address and contract

  // const [historySelection, setHistorySelection] = useState(<ClosedHistory/>);

  // const Profile = [
  //   {
  //     name: "John Doe",
  //     username: "johndoe",
  //     email: "john.doe@email.com",
  //     description: "I am a software engineer",
  //     socials: [
  //       {
  //         platform: "Twitter",
  //         link: "https://twitter.com/johndoe",
  //       },
  //       {
  //         platform: "Instagram",
  //         link: "https://instagram.com/johndoe",
  //       },
  //       {
  //         platform: "LinkedIn",
  //         link: "https://linkedin.com/johndoe",
  //       },
  //     ],
  //   },
  // ];

  // const Profile = {
  // name: "John Doe",
  // username: "johndoe",
  // email: "john.doe@gmail.com",
  // description: "I am a software engineer",
  // socials: [
  //   {
  //     platform: "Twitter",
  //     link: "https://twitter.com/johndoe",
  //   },
  //   {
  //     platform: "Instagram",
  //     link: "https://instagram.com/johndoe",
  //   },
  //   {
  //     platform: "LinkedIn",
  //     link: "https://linkedin.com/johndoe",
  //   },
  // ],
  // boardDescription: "I am a software engineer. I am answering questions on the blockchain. If you have any questions, feel free to ask me.",
  // minimumQuestionPrice: 5.0,
  // };

  // const [userAddress, setUserAddress] = useState(null);

  // const handleUserAddress = (address) => {
  //   setUserAddress(address);
  // };

  // handleUserAddress(0xa5a062cc7aa1f44161153e8a1deb4edb916fbe55);

  // console.log("TIK");

  const [user, setUser] = useState(null);

  const handleUser = (user) => {
    setUser(user);
  };

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [bio, setBio] = useState("");

  const [minimumPrice, setMinimumPrice] = useState("");

  const [profilePicture, setProfilePicture] = useState("");




  

  // const [socials, setSocials] = useState("");
  // setSocials(Profile.socials);

  // create an on load function that gets the user from the address and contract

  // contract.methods
  //   .getUser("0xA5a062Cc7aA1F44161153E8A1Deb4edB916fbE55")
  //   .call()
  //   .then((user) => {
  //     // console.log(user);
  //     // handleUser(user);
  //     setUsername(user.username);
  //     setEmail(user.email);
  //     setName(user.name);
  //     setDescription(user.headline);
  //     setBio(user.bio);
  //     setMinimumPrice(user.minimumPrice);
  //   });

  // contract.methods
  //   .createUser(username, name, email, "test", headline, description, 5)
  //   .send({
  //     from: "0xA5a062Cc7aA1F44161153E8A1Deb4edB916fbE55",
  //     gas: 1000000,
  //   });

  // console.log(user);

  useEffect(() => {
    db.collection("users")
      .doc(walletAddress)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUsername(doc.data().username);
          setEmail(doc.data().email);
          setName(doc.data().name);
          setDescription(doc.data().headline);
          setBio(doc.data().description);
          setMinimumPrice(doc.data().minPrice);
          setProfilePicture(doc.data().profilePicture);
          console.log(profilePicture);
        } else {
          console.log("No such document!");
        }
      });
  }, [walletAddress]);

  




  return (<>
    <Banner/>
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
            <ProfilePicture src={profilePicture}></ProfilePicture>
            <Entries>
              <Username>
                <Label2>USERNAME: </Label2>
                <Label2>{username}</Label2>
              </Username>
              <Username>
                <Label2>EMAIL: </Label2>
                <Label2>{email}</Label2>
              </Username>
              <Username>
                <Label2>NAME: </Label2>
                <Label2>{name}</Label2>
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
          {/* <SwitchingHistoryComponent />
          </Section> */}
          <Section>
            <Spread>
              <First></First>
              <div>
                <Link to="/editprofile">
                  <Second>EDIT</Second>
                </Link>
                {/* <Second>SAVE</Second> */}
              </div>
            </Spread>
          </Section>
          <br></br>
          <Section>
            <Label>HEADLINE</Label>
            {/* <Entry value=""></Entry> */}
            <ValueLabel>{description}</ValueLabel>
          </Section>
          <Section>
            <Label>PUBLIC BOARD DESCRIPTION</Label>
            {/* <Desc></Desc> */}
            <ValueLabel>
              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. */}
              {bio}
            </ValueLabel>
          </Section>
          <Section>
            <Label>MINIMUM QUESTION PRICE</Label>
            {/* <SmallEntry></SmallEntry> */}
            <MinPriceValueLabel>$ {minimumPrice}</MinPriceValueLabel>
          </Section>
          {/* <Section>
            <Socials>
              <Head>SOCIALS</Head>
              {socials.map((social) => (
                <Social>
                  <SocialPlatform>{social.platform}</SocialPlatform>
                  <SocialLink>{social.link}</SocialLink>
                </Social>
              ))}
            </Socials>
          </Section> */}
        </Middle>
        {/* <BottomWrap> */}

        {/* <BottomNavBar/> */}
        {/* </BottomWrap> */}
        <BottomNavBar />
      </Wrapper>
    </Cont></>
  );
};

export default ProfHistPage;
