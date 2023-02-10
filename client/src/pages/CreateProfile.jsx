import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BottomNavBar from "../components/BottomNavBar";
import ConnectWalletIcon from "../components/ConnectWalletIcon";
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
`;

const Section = styled.div`
  display: flex;
  align-items: center;
`;

const ProfilePicture = styled.div`
  // background:pink;
  width: 100px;
  aspect-ratio: 1;
  height: 100px;
  border-radius: 50%;
  border: 1.5px solid black;
  margin: 20px;
`;

const Label = styled.p`
  margin-right: 5px;
`;

const Entry = styled.input`
  // max-width: 200px;
  height: 30px;
  background: transparent;
  border: 1.5px solid black;
  border-radius: 10px;
  font-family: "Poppins";
  width: 100%;
`;

const Entry2 = styled.input`
  // max-width: 200px;
  height: 30px;
  background: transparent;
  border: 1.5px solid black;
  border-radius: 10px;
  font-family: "Poppins";
  // width:100%;
  flex: 7;
`;

const SmallEntry = styled.input`
  width: 40%;
  height: 30px;
  background: transparent;
  border: 1.5px solid black;
  border-radius: 10px;
  font-family: "Poppins";
`;

const Entries = styled.div``;

const Username = styled.div`
  display: flex;
  padding: 5px;
  justify-content: right;
  align-items: center;
  width: 100%;
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
  margin-top: 30px;
  width: 100%;
`;
const Head = styled.p`
  text-align: left;
  font-weight: 600;
  font-size: 18px;
`;

const Name = styled.p`
  padding: 5px;
  flex: 3.5;
`;

const SubHead = styled.p`
  font-size: 17px;
  display: flex;
  justify-content: left;
  width: 100%;
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
  width: 100%;
  max-width: 500px;
`;

const Platform = styled.div`
  display: flex;
  align-items: center;
  // width:100%;
  justify-content: space-between;
  text-align: right;
  margin-right: 0;
  // background:purple;
`;

const CreateProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [description, setDescription] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");
  const [minPrice, setMinPrice] = useState(0);

  const [profilePicture, setProfilePicture] = useState("");

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleHeadlineChange = (e) => {
    setHeadline(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTwitterChange = (e) => {
    setTwitter(e.target.value);
  };

  const handleInstagramChange = (e) => {
    setInstagram(e.target.value);
  };

  const handleLinkedinChange = (e) => {
    setLinkedin(e.target.value);
  };

  const handleGithubChange = (e) => {
    setGithub(e.target.value);
  };

  const handleWebsiteChange = (e) => {
    setWebsite(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const profile = {
      username: username,
      email: email,
      name: name,
      headline: headline,
      description: description,
      twitter: twitter,
      instagram: instagram,
      linkedin: linkedin,
      github: github,
      website: website,
      profilePicture: profilePicture,
    };
    console.log(profile);

    contract.methods
      .createUser(username, name, email, "test", headline, description, 5)
      .send({
        from: "0xA5a062Cc7aA1F44161153E8A1Deb4edB916fbE55",
        gas: 1000000,
      });
  };

  // send profile to backend solidity contract through web3

  return (
    <Cont>
      <Wrapper>
        <ConnectWalletIcon />
        {/* <Top>
      <ConnectWalletButton/>
    </Top> */}
        <Head2>Create Profile</Head2>
        <SubHead>and start answering questions today!</SubHead>
        <Middle>
          <Section>
            <ProfilePicture></ProfilePicture>
            <Entries>
              <Button>Upload Profile Picture</Button>
              {/* <Username>
                <Label>USERNAME*</Label>
                <Entry></Entry>
              </Username>
              <Username>
                <Label>EMAIL*</Label>
                <Entry></Entry>
              </Username> */}
            </Entries>
          </Section>
          <Section>
            <Username>
              <Label

              >USERNAME</Label>
              <Entry
                value={username}
                onChange={handleUsernameChange}


              ></Entry>
            </Username>
          </Section>
          <Section>
            <Username>
              <Label>EMAIL</Label>
              <Entry
                value={email}
                onChange={handleEmailChange}
              ></Entry>
            </Username>
          </Section>
          <Section>
            <Username>
              <Label>NAME</Label>
              <Entry
                value={name}
                onChange={handleNameChange}
              ></Entry>
            </Username>
          </Section>
          <Section>
            <Username>
              <Label


              >HEADLINE</Label>
              <Entry
                value={headline}
                onChange={handleHeadlineChange}
              ></Entry>
            </Username>
          </Section>
          <Section>
            <Label>ENTER PUBLIC DESCRIPTION</Label>
            <Desc
              value={description}
              onChange={handleDescriptionChange}
            ></Desc>
          </Section>
          <Section>
            <Label>SET YOUR MINIMUM QUESTION PRICE</Label>
            <SmallEntry
              value={minPrice}
              onChange={handleMinPriceChange}
            ></SmallEntry>
          </Section>
          <Section>
            <Socials>
              <Head>SOCIALS</Head>

              <Platform>
                <Name>INSTRAGRAM</Name>
                <Entry2
                  value={instagram}
                  onChange={handleInstagramChange}
                ></Entry2>
              </Platform>
              {/* <Platform>
                <Name>LINKEDIN</Name>
                <Entry2></Entry2>
              </Platform>
              <Platform>
                <Name>FACEBOOK</Name>
                <Entry2></Entry2>
              </Platform>
              <Platform>
                <Name>TWITTER</Name>
                <Entry2></Entry2>
              </Platform> */}
            </Socials>
          </Section>
          {/* <Link to="/profhist"> */}
            <LButton
              onClick={handleSubmit}
            >Create Your Question Page</LButton>
          {/* </Link> */}
        </Middle>
        {/* <BottomWrap> */}

        {/* <BottomNavBar/> */}
        {/* </BottomWrap> */}
        <BottomNavBar />
      </Wrapper>
    </Cont>
  );
};

export default CreateProfile;
