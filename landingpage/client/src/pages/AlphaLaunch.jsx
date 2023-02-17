import react from "react";
import styled from "styled-components";
import background from "../assets/background8.jpg";
import LandingFooter from "../components/LandingFooter";

const Container = styled.div`
    // height: 100vh;
    padding-top: 60px;
    width: 100vw;
    // background-color: #fff;

    background-image: url(${background});
    background-size: cover;
    background-position: center;
    // background-opacity: 0.5;
    background-repeat: no-repeat;
    background-attachment: fixed;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        flex-direction: column;
        background-attachment: scroll;
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60%;
    margin-top: 20px;
    margin-bottom: 150px;

    @media (max-width: 768px) {

        width: 95%;
        margin: auto;

    }

`;



const Title = styled.h1`
    font-size: 60px;
    width: 80%;
    font-weight: 400;
    color: #000;
    // line-height: 0.1;

    @media (max-width: 768px) {
        font-size: 40px;
        // width: 80%;
        margin-top: 85px;
        // margin-left: 10%;
    }

`;

const Para = styled.p`
    font-size: 20px;
    width: 80%;
    font-weight: 400;
    color: #000;
    // line-height: 0.1;

    @media (max-width: 768px) {
        font-size: 20px;
        // width: 80%;
        // margin-top: 85px;
        // margin-left: 10%;
    }

`;

const EmailInput = styled.input`
    width: 100%;    
    height: 50px;
    border: 2px solid #000;
    border-radius: 10px;
    background-color: transparent;
    // padding-left: 25px;
    padding: 17px;
    font-size: 2em;
    margin-top: 20px;

    @media (max-width: 768px) {
        // width: 80%;
        margin: auto;
        margin-top: 20px;
        // margin-left: 10%;
    }

`;

const Button = styled.button`
    width: 100%;
    // height: 50px;
    padding: 20px;
    border: none;
    border-radius: 0px 20px 0px 0px;
    background-color: #000;
    color: #fff;
    font-size: 20px;
    font-weight: 400;
    margin-top: 20px;
    border: 2px solid #000;


    @media (max-width: 768px) {
        // width: 80%;
        margin: auto;
        margin-top: 20px;
        margin-left: 5%;
        margin-bottom: 80px;
    }

    :hover {
        cursor: pointer;
        background-color: transparent;
        color: #000;
        border: 2px solid #000;
    }

`;


const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60%;
    margin-top: 20px;
    margin-bottom: 150px;

    @media (max-width: 768px) {

        width: 80%;
        margin: auto;

    }

`;

const AlphaLaunch = () => {
  return (
    <Container>
        <Wrapper>
      <Title>What is the alpha launch?</Title>




      <Para>
      Join the vanguard of digital transformation with BuyAnAnswer's Alpha Launch. Our program is designed to educate new users about the exciting world of cryptocurrency, with a focus on the transaction of answering questions online.
      </Para>
      <Para>
      We're creating content that empowers individuals to start earning money and make the most of this innovative platform. We're looking for alpha users who can help us make this vision a reality. If you're an influencer or content creator with a significant online presence, this is your chance to be at the forefront of this digital revolution.
      </Para>
      <Para>
      By becoming an Alpha user, you'll have the opportunity to work closely with us to create content, provide valuable feedback, and help us improve the product. This is a unique opportunity to take your first step into the world of cryptocurrency and join us in shaping the future of online transactions.
      </Para>
      <Form>
        <EmailInput type="email" placeholder="Email" />
        <Button>Apply</Button>
      </Form>
        </Wrapper>
       <LandingFooter/>
    </Container>
     
  );
};

export default AlphaLaunch;
