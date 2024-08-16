import React from 'react';
import styled from 'styled-components';
import NeonButton from '@component/atom/button/NeonButton';
import WrongButton from '@component/atom/button/WrongButton';
import RippleButton from '@component/atom/button/RippleButton';

export default function ButtonsPage() {
  
  return (
    <Wrap>
      <NeonButton/>
      <WrongButton/>
      <RippleButton/>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: black;
  
  > * {
    margin-right: 10px;
  }
`;
