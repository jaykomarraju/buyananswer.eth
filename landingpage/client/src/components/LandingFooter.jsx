import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { db } from "../services/Firebase";
import background from "../assets/background13.jpg";

import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.png";
import linkedin from "../assets/linkedin.png";
import youtube from "../assets/youtube.png";

const Socials = [
  {
    name: "Facebook",
    link: "https://www.facebook.com/people/buyananswerio/100089856836131/",
    icon: facebook,
  },

  {
    name: "Instagram",
    link: "https://www.instagram.com/buyananswer.io/",
    icon: instagram,
  },
  {
    name: "Twitter",
    link: "https://twitter.com/jaykomarraju",
    icon: twitter,
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/company/ontecha",
    icon: linkedin,
  },
  {
    name: "YouTube",
    link: "https://www.youtube.com/",
    icon: youtube,
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //   height: 100vh;
  width: 100vw;
    background-image: url(${background});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
`;

const SocialMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0px;
  margin-top: 0px;
  width: 100%;
    justify-content: center;
  //   width: 100%;
  margin-bottom: 25px;
  margin-left: auto;
`;

const SocialIcon = styled.img`
  width: 50px;
  height: 50px;
  padding: 15px;
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  //   margin-top: 20px;
  //   margin-bottom: 100px;
`;

const Title = styled.h1`
  font-size: 30px;
  width: 70%;
  font-weight: 700;
  padding: 25px;
  text-align: center;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 40px;
    // width: 80%;
    // margin-top: 85px;

    // margin-left: 10%;
  }
`;

const CompanyFooter = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;

    p {
        font-size: 20px;
        color: #fff;
        font-weight: 700;
        padding: 25px;
        text-align: center;
    }
`;


const LandingFooter = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Follow us on Social Media</Title>
        <SocialMenu>
          {Socials.map((social) => (
            <SocialIcon
              src={social.icon}
              alt={social.name}
              onClick={() => window.open(social.link, "_blank")}
            />
          ))}
        </SocialMenu>
        <CompanyFooter>
            <p>© 2023 Buy An Answer</p>
        </CompanyFooter>
      </Wrapper>
    </Container>
  );
};

//   @media (max-width: 768px)

export default LandingFooter;
