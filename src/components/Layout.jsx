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
  position: relative;
  -webkit-box-align: center;
  box-sizing: border-box;
  width: 100%;
  max-width: 600px;
  margin: auto;
  overflow-x: hidden;
`;
