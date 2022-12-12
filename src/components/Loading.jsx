import React from "react";
import styled from "styled-components";

export const Loading = () => {
  return (
    <Background>
      <LoadingText>SPOTS가 여러분과 함께합니다!</LoadingText>
      <img alt="로딩" src="/loading.gif" />
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

export const LoadingText = styled.div`
  font: 1rem "Noto Sans KR";
  text-align: center;
`;
