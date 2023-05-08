import React from "react";
import styled from "styled-components";
import profile from "../assets/profile.png";
import myboard from "../assets/myboard.png";
import home from "../assets/home.png";
import { Outlet, Link } from "react-router-dom";

const MenuWrapper = styled.div`
  position: fixed;
  bottom: 25px;
  display: flex;
  justify-content: center;
  background: #eee;
  width: fit-content;
  border-radius: 50px;
`;
const Centerer = styled.div`
  display: flex;
  justify-content: center;
`;
const MenuItem = styled.div`
background: #159a1f;
opacity: 0.5;
padding: 3px;
border-radius: 50%;
width: 50px;
height: 50px;
display: flex;
align-items: center;
justify-content: center;
margin: 10px;

&:hover {
  opacity: 1;
}
`;

const SelectedMenuItem = styled.div`
background: lightgreen;
  padding: 3px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`

const MenuImage = styled.div``;

const Icon = styled.img`
  width: 30px;
`;
const UnAuthBottomNavBar = () => {
  return (
    <Centerer>
      <MenuWrapper>
      <Link to="/profile">
        <MenuItem>
          <MenuImage>
            <Icon src={profile} alt="profile"></Icon>
          </MenuImage>
        </MenuItem></Link>
        <Link to="/">
        <MenuItem>
          <MenuImage>
            <Icon src={home} alt="home"></Icon>
          </MenuImage>
        </MenuItem></Link>
        <Link to="/myboard">
        <MenuItem>
          <MenuImage>
            <Icon src={myboard} alt="noauthboard"></Icon>
          </MenuImage>
        </MenuItem></Link>
      </MenuWrapper>
    </Centerer>
  );
};

export default UnAuthBottomNavBar;
