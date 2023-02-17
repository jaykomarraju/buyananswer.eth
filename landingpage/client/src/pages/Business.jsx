import react from "react";
import styled from "styled-components";
import background from "../assets/background10.jpg";
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
        width: 100vw;
        height: 100vh;
        overflow: scroll;
        
        background-attachment: scroll;

    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    // align-items: center;
    // justify-content: center;
    width: 60%;
    height: 100%;
    margin-top: 100px;
    
    // margin-bottom: 00px;

    @media (max-width: 768px) {

        width: 95%;
        margin: auto;
        margin-bottom: 76px;

    }

`;



const Title = styled.h1`
    font-size: 60px;
    width: 80%;
    font-weight: 700;
    color: #159a1f;
    // line-height: 0.1;

    @media (max-width: 768px) {
        font-size: 40px;
        // width: 80%;
        margin-top: 150px;
        margin-left: 10%;
    }

`;

const Para = styled.p`
    font-size: 20px;
    width: 80%;
    font-weight: 400;
    color: #fff;
    // line-height: 0.1;

    @media (max-width: 768px) {
        font-size: 20px;
        // width: 80%;
        // margin-top: 85px;
        // margin-left: 10%;
        margin-bottom: 20px;
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

const Text = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 150px;

    @media (max-width: 768px) {

        width: 80%;
        margin: auto;
        padding-bottom:50px;

    }

`;


const Business = () => {
  return (<div>
    <Container>
        <Wrapper>
      <Title>Make money through referrals!</Title>


<Text>

      <Para>
      The referral system on Buy An Answer is designed to incentivize users to refer new users to the platform. When a user refers a new user to Buy An Answer by sharing a unique referral link, the new user is considered a referred user. The referring user receives a commission on all transactions made by the referred user on the platform.
</Para><Para>
The referral system offers two different commission rates depending on whether the user was referred or not. If a user is referred by another user, the platform charges a lower commission rate of 5% for both the company and the referring user for all transactions made by the referred user. If a user is not referred by another user, the platform charges a higher commission rate of 10% for all transactions made by the user.
</Para><Para>
To refer a new user to Buy An Answer, the referring user must share their unique referral link with the new user. When the new user clicks on the referral link and signs up for the platform, they are automatically associated with the referring user. The referring user will then receive a commission on all transactions made by the referred user on the platform.
</Para><Para>
The referral system is designed to help grow the user base of the platform by incentivizing users to share the platform with others. It also offers a way for referring users to earn additional income by sharing the platform with their network. The exact commission rates and terms of the referral system may be subject to change over time based on feedback from users and changes in the market.
      </Para></Text>
      {/* <Form>
        <EmailInput type="email" placeholder="Email" />
        <Button>Apply</Button>
      </Form> */}
        </Wrapper>
        {/* <LandingFooter/> */}
    </Container>
      <LandingFooter/>
    </div>
  );
};

export default Business;
