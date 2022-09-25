import React from "react";
import styled from "styled-components";
import profile from "../assets/profile.png";
import myboard from "../assets/myboard.png";
import home from "../assets/home.png";

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
  background: lightblue;
  padding: 3px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
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
const BottomNavBar = () => {
  return (
    <Centerer>
      <MenuWrapper>
        <MenuItem>
          <MenuImage>
            <Icon src={profile} alt="profile"></Icon>
          </MenuImage>
        </MenuItem>
        <MenuItem>
          <MenuImage>
            <Icon src={home} alt="home"></Icon>
          </MenuImage>
        </MenuItem>
        <MenuItem>
          <MenuImage>
            <Icon src={myboard} alt="myboard"></Icon>
          </MenuImage>
        </MenuItem>
      </MenuWrapper>
    </Centerer>
  );
};

export default BottomNavBar;
