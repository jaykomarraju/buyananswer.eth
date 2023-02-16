import react from "react";
import styled from "styled-components";
import image from "../assets/HomeImage.png";
import background from "../assets/background5.jpg";

const Container = styled.div`
  height: 100vh;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);

  background-image: url(${background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;

  @media (max-width: 768px) {
    flex-direction: column;
    background-attachment: scroll;
    padding-bottom: 75px;
  }

`;

// one image on left and text on right

const Wrapper = styled.div`
  padding: 5 0px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 50px;
  }
`;

const Left = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 150px;

  @media (max-width: 768px) {
    margin-left: 10%;
    margin-top: 85px;
    width: 80%;
    // margin-bottom: 150px;
  }


`;

const Title = styled.h1`
  font-size: 4em;
//   margin-right: 30px;
  font-weight: 700;
  // color:;#034782;
  color: #2b2b2b;

  line-height: 1;
  opacity: 0.85;
  width: 95%;
  // mix-blend-mode: color-burn;
  // mix-blend-mode: overlay;
  // box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);

  // have to add a shadow only to the text
  // box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  // border-bottom: 3px solid #000;
  // position: fixed; 
  // width:100vw;

  @media (max-width: 768px) {
    font-size: 2.5em;
    width: 100%;


  }


`;

const Desc = styled.p`
font-size: 3em;
//   margin-right: 30px;
  font-weight: 500;
  margin-top: -30px;
  width: 60%;
  // text-align: right;
  // margin-right: 0px;
  justify-content: right;
  // color: #034782;
  color: #2b2b2b;
  line-height: 1.4;
  opacity: 0.85;
  // mix-blend-mode: color-burn;

  // box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  // border-bottom: 3px solid #000;
  // position: fixed;
  // width:100vw;

  @media (max-width: 768px) {
    font-size: 1.5em;
    width: 100%;
    margin-top: -10px;
  }




`;

const Image = styled.img`
  width: 100%;
  // mix-blend-mode: lighten;

  @media (max-width: 768px) {
    width: 70%;
    margin-left:16%;
    margin-bottom: 100px;
    // margin-top: -50px;
  }

`;

const Right = styled.div`
  width: 40%;
  margin-right: 100px;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0px;
    // margin-top: -250px;

  }

`;

const Landing = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Answer questions online</Title>
          <Desc>
          and get paid from your fans!
          </Desc>
        </Left>
        <Right>
          <Image src={image} />
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Landing;
