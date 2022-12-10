import React from 'react';
import styled from 'styled-components';

export const Loading = () => {
  return (
    <Background>
      <img src="/reservation/Spinner.gif"/>
    </Background>
  );
};

export default Loading;

export const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
