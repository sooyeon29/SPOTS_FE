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
  -webkit-box-align: center;
  box-sizing: border-box;
  width: 100%;
  max-width: 600px;
  margin: auto;
  /* position: absolute;
  left: 0px;
  top: 0px; */
  overflow-x: hidden;
`;
