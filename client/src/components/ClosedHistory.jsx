import React from 'react'

import styled from 'styled-components'

const Spread2 = styled.div`
margin-top:30px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 12px;
  border: 1.5px solid black;
  border-radius: 10px;
`;

const First = styled.p``;

const Second2 = styled.button`
background:transparent;
border-radius:50%;
width:50px;
height:50px;
border:1.5px solid black;`;

const ClosedHistory = () => {
  return (
    <Spread2>
            <First>VIEW HISTORY</First>
            <Second2>V</Second2>
          </Spread2>
  )
}

export default ClosedHistory