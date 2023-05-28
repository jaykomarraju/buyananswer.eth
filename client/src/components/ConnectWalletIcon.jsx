import React from 'react'
import styled from 'styled-components'
import greenlight from "../assets/greenlight.png";

const ConnectedWallet = styled.div`
display:flex;
align-items:center;
// padding:5px;
margin-right:55px;
position: absolute;
top:25px;
right:20px;
`

const ConnectedIcon = styled.img`
width:20px;
height:20px;
margin-left:5px;
text-align:right;`

const WalletAddress = styled.div`
font-size:11px;`

const ConnectWalletIcon = ({ walletAddress }) => {
  return (
    <ConnectedWallet>
      <WalletAddress>{walletAddress}</WalletAddress>
      <ConnectedIcon src={greenlight} alt="greenlight"></ConnectedIcon>
    </ConnectedWallet>
  );
};

export default ConnectWalletIcon;