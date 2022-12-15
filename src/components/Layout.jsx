import React from "react";
import styled from "styled-components";
import GlobalStyle from "../style/globalStyle";

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Wrap>{children}</Wrap>
    </>
  );
};

export default Layout;

const Wrap = styled.div`
  @media screen and (max-width: 420px) {
    margin: auto;
  }
  position: relative;
  -webkit-box-align: center;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  max-width: 420px;
  margin-left: 45%;
  overflow-x: hidden;
  background-color: white;
  box-shadow: 0px 6px 16px 4px rgba(0, 0, 0, 0.25);
`;
