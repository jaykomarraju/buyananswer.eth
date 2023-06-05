import React, {useState} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const Banneri = styled.div`
  background-color: #159a1f;;
  color: #fff;
  // padding: 1rem 2rem;
  text-align: center;
  font-size: 1.25rem;
  text-decoration: none;
  font-weight: 700;
  margin: 0;
  margin-bottom: 1rem;
  font-family: "Major Mono Display", monospace;
`;


const A = styled.a`
  text-decoration: none;
  color: #fff;
  display: inline-block;
  width: 100%;
  position: relative;
  font-size: 0.9rem;
  padding-left: 100%;
  animation: scroll 10s linear infinite;

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  @media (max-width: 768px) {
    // ensure the banner text is on one line
    font-size: 0.8rem;
  }

`;

const Banner = () => {


  const [banner, setBanner] = useState(true);

  const handleBanner = () => {
    setBanner(false);
  };

    return (    
        <>
        {banner && (
            <Banneri onClick={handleBanner}>
              <A href="https://base.org">
                We're currently live on Base Goerli Testnet. Click here to learn
              </A>
            </Banneri>
          )}
          </>
    )
}

export default Banner