import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  padding: 10px;
  font-size: 0.75em;
  background: transparent;
  border: 1.5px solid black;
  border-radius: 7px;
  position: fixed;
  top:30px;
  right:30px;
`;

const ConnectWalletButton = () => {
  return (
    <Button>CONNECT YOUR WALLET</Button>
  )
}

export default ConnectWalletButton