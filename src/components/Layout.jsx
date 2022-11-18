import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => {
  return (
    <>
      <Wrap>{children}</Wrap>
    </>
  );
};

export default Layout;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  /* height: 100vh; */
  /* margin:auto; */
  /* background-color: var(--gray-200); */
  position: absolute;
  /* z-index: -1; */
  left: 0px;
  top: 0px;
  overflow-x: hidden;
`;
