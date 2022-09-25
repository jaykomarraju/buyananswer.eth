import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
//   padding: 5%;
margin-top:0%;
height:90%;
// background:lightgreen;
  display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
`;

const Middle = styled.div`
    
`;

const Section = styled.div`
display:flex;
align-items:center;
`

const ProfilePicture = styled.div`
// background:pink;
width:100px;
height:100px;;
border-radius:50%;
border: 1.5px solid black;
margin:20px;
`

const Label = styled.p`
margin-right:5px;`

const Entry = styled.input`
width:200px;
height:30px;
background:transparent;
border: 1.5px solid black;
border-radius:10px;
font-family: 'Poppins';`

const SmallEntry = styled.input`
width:40%;
height:30px;
background:transparent;
border: 1.5px solid black;
border-radius:10px;
font-family: 'Poppins';`

const Entries = styled.div``

const Username = styled.div`
display:flex;
padding:5px;
justify-content:right;
align-items:center;`

const Desc = styled.textarea`
width:100%;
height:120px;
background:transparent;
border:1.5px solid black;
border-radius:10px;
margin:5px;`

const Button = styled.button`
background:transparent;
padding:10px;
font-size:15px;
border:1.5px solid black;
border-radius:10px;`

const CreateProfile = () => {
  return (
    <Wrapper>
    {/* <Top>
      <ConnectWalletButton/>
    </Top> */}
    <Middle>
      <Section>
        <ProfilePicture></ProfilePicture>
        <Entries>
        <Username>
        <Label>USERNAME*</Label><Entry></Entry></Username>
        <Username>
        <Label>NAME*</Label><Entry></Entry></Username>
        <Username>
        <Label>HEADLINE</Label><Entry></Entry></Username></Entries>
      </Section>
      <Section>
      <Label>ENTER PUBLIC DESCRIPTION</Label>
      <Desc></Desc></Section>
      <Section>
      <Label>SET YOUR MINIMUM QUESTION PRICE</Label>
     <SmallEntry></SmallEntry></Section>
     <Button>Create Your Question Page</Button>
    </Middle>
    {/* <BottomWrap> */}

      {/* <BottomNavBar/> */}
   {/* </BottomWrap> */}
  </Wrapper>
  )
}

export default CreateProfile