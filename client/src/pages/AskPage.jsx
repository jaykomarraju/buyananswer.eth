import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BottomNavBar from "../components/BottomNavBar";
import ConnectWalletIcon from "../components/ConnectWalletIcon";
import profile from "../assets/profile.jpg";
import { db } from "../services/Firebase";
import SuccessQuestionOrder from "./SuccessQuestionOrder";
import Banner from "../components/Banner";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;

const Wrapper = styled.div`
  padding: 50px 10px;
  // height: 100vh;
  // background:green;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // margin-top: 15%;
  // margin-top: 250px;
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;

  @media (max-width: 768px) {
    width: 80%;
    margin-top: 80px;
  }
`;

const ProfilePicture = styled.div`
  // background:pink;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 1.5px solid black;
  margin: 20px;
  margin-left: 0;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;
const Heading = styled.p`
  font-size: 2em;
  margin-bottom: 10px;
  text-align: center;
  align-items: center;
  width: 100%;
`;

const BoardDesc = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  align-items: flex-start;
`;

const SubHeading = styled.p`
  padding: 20px;
`;

const Pic = styled.div``;

const QuestionEntry = styled.textarea`
  width: 85%;
  min-height: 300px;
  font-size: 16px;
  background: transparent;
  border: 1.5px solid black;
  border-radius: 10px;
  margin-top: 20px;
  padding: 10px;
`;

const PriorityBonusSect = styled.div`
  display: flex;
  align-items: center;
`;

const TotalSect = styled.div`
  display: flex;
  align-items: center;
  margin-top: -30px;
`;

const Label = styled.p`
  padding: 20px;
`;

const Entry = styled.input`
  width: 100px;
  font-size: 16px;
  padding: 8px;
  border: 1.5px solid black;
  border-radius: 10px;
`;

const Headline = styled.p`
  margin-top: 0px;
  font-size: 1.2em;
  // margin-bottom: 40px;
`;

const Button = styled.button`
  padding: 15px;
  border: 1.5px solid black;
  background: transparent;
  border-radius: 10px;
  margin-bottom: 150px;

  &:hover {
    background: black;
    color: white;
  }
`;

const Url = styled.div`
  font-size: 20px;
  padding: 10px;
  font-weight: 600;
`;

const Board = {
  username: "",
  name: "",
  headline: "",
  bio: "",
};

const AskPage = ({ walletAddress }) => {
  const { username } = useParams();

  // username must be resolved to a address

  // const [username, setUsername] = useState(Board.username);
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");

  const [questionText, setQuestionText] = useState("");
  const [price, setPrice] = useState(5);
  const [priorityBonus, setPriorityBonus] = useState(0);
  const [profilePicture, setProfilePicture] = useState();

  const [total, setTotal] = useState(parseInt(price) + parseInt(priorityBonus));

  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [questionState, setQuestionState] = useState(null);

  // const [total, setTotal] = useState(price + priorityBonus);

  // the create question function is called when the user clicks on the "buy answer" button
  // it essentially creates a question object and sends it to the backend
  // it then request a confirmation from the user to pay for the question
  // if the user confirms, the question is sent to the blockchain
  // if the user cancels, the question is not sent to the blockchain
  // when the button is clicked, the user is redirected to the successqorder which is where the user confirms the payment

  // get this user from the database who is asking the question found as a prop

  // const askUser = () => {
  //   const askerUser = db.collection("users").doc(walletAddress);

  //   if (askerUser) {
  //     return askerUser;
  //   }
  //   else {
  //     return null;
  //     console.log("create a user first!")
  //   }
  // };

  // convert the above function to an async function
  const askUser = async () => {
    const askerUser = await db.collection("users").doc(walletAddress).get();

    if (askerUser) {
      const askUserName = askerUser.data().username;
      return askUserName;
    } else {
      return null;
      console.log("create a user first!");
    }
  };

  const createQuestion = async () => {
    const askerUser = await askUser();
    const question = {
      username: username,
      question: questionText,
      priorityBonus: parseInt(priorityBonus),
      total: parseInt(priorityBonus) + parseInt(price),
      asker: askerUser,
      timestamp: new Date(),
      answered: false,
      declined: false,
      answer: null,
    };
    console.log(question);
    setQuestionState(question);
    setShouldNavigate(true); // set shouldNavigate to true after questionState is updated
  };

  // Add useEffect for questionState
  useEffect(() => {
    if (questionState) {
      console.log(questionState);
      setShouldNavigate(true);
    }
  }, [questionState]);

  useEffect(() => {
    let walletAddress = null;

    // First, find the wallet address for the given username
    db.collection("users")
      .where("username", "==", username)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          walletAddress = doc.id;
        });

        // Then, fetch the user's board using the wallet address
        if (walletAddress !== null) {
          db.collection("users")
            .doc(walletAddress)
            .get()
            .then((doc) => {
              if (doc.exists) {
                console.log("Document data:", doc.data());
                setName(doc.data().name);
                setHeadline(doc.data().headline);
                setBio(doc.data().description);
                setPrice(doc.data().minPrice);
                setProfilePicture(doc.data().profilePicture);
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                setName("No User");
                setHeadline("No Headline");
                setBio("No Bio");
                setPrice(0);
                setProfilePicture(doc.data().profilePicture);
              }
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
        } else {
          console.log("No user with the given username found.");
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  return (
    <Container>

    {/* <Banner/> */}
      <Wrapper>
        <ConnectWalletIcon />
        <Url>app.BUYANANSWER.io/{username}</Url>
        <BoardDesc>
          <Pic>
            <ProfilePicture src={profilePicture}></ProfilePicture>
          </Pic>
          <Name>
            <Heading>Ask {name}</Heading>
            <Headline>{headline}</Headline>
          </Name>
        </BoardDesc>
        <BoardDesc>
          <SubHeading>{bio}</SubHeading>
        </BoardDesc>
        <QuestionEntry
          placeholder="Enter your question here..."
          onChange={(e) => {
            setQuestionText(e.target.value);
          }}
        ></QuestionEntry>
        <PriorityBonusSect>
          <Label>PRIORITY BONUS:</Label>
          <Entry
            placeholder="$"
            onChange={(e) => {
              if (!e.target.value) {
                setPriorityBonus(0);
                setTotal(parseInt(price) + 0);
                return;
              }
              setPriorityBonus(e.target.value);
              setTotal(parseInt(price) + parseInt(e.target.value));
            }}
          ></Entry>
        </PriorityBonusSect>
        <TotalSect>
          <Label>TOTAL:</Label>
          <Label>$ {total}</Label>
        </TotalSect>
        {/* <Link to="/successqorder"> */}
        <Button onClick={createQuestion}>BUY ANSWER</Button>
        {shouldNavigate && (
          <Navigate
            to="/successqorder"
            state={{ question: questionState, walletAddress: walletAddress }}
          />
        )}
        {/* </Link> */}
        <BottomNavBar />
      </Wrapper>
    </Container>
  );
};

export default AskPage;
