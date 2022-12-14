import React from "react";
import styled from "styled-components";
import GlobalStyle from "../style/globalStyle";

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <BackGround>
        <Wrap>{children}</Wrap>
      </BackGround>
    </>
  );
};

export default Layout;

const BackGround = styled.div`
  background-image: url("/background.png");
  background-size: contain;
  background-repeat: no-repeat;
  overflow: hidden;
`;
const Wrap = styled.div`
  @media screen and (max-width: 420px) {
    margin: auto;
  }
  position: relative;
  -webkit-box-align: center;
  box-sizing: border-box;
  width: 100%;
  max-width: 420px;
  margin-left: 45%;
  overflow-x: hidden;
  background-color: white;
`;
