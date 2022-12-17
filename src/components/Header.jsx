import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useDetectClose from "../hooks/useDetectClose";
import { GiHamburgerMenu } from "react-icons/gi";
import SideBar from "./SideBar";

const Header = () => {
  const navigate = useNavigate();
  const [barIsOpen, barRef, barHandler] = useDetectClose(false);
  const dropDownRef = useRef(null);

  return (
    <>
      <StHeader>
        <StWrap>
          <StLogo
            onClick={() => {
              navigate(`/`);
            }}
          >
            <Img src="/logo.png" alt="logo" />
          </StLogo>
          <StButtons>
            <Container>
              <HamburgButton onClick={barHandler} ref={barRef}>
                <GiHamburgerMenu size="25" />
              </HamburgButton>
              <SideBar barIsOpen={barIsOpen} dropDownRef={dropDownRef} />
            </Container>
          </StButtons>
        </StWrap>
      </StHeader>
    </>
  );
};

export default Header;

const StHeader = styled.div`
  max-width: 420px;
  width: 100%;
  padding: 0;
  background-color: #000000;
  min-width: 50px;
  position: fixed;
  z-index: 9999;
`;

const StWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 90%;
  align-items: center;
`;

const StLogo = styled.div`
  display: flex;
  cursor: pointer;
`;

const StButtons = styled.ul`
  display: flex;
`;

const Container = styled.div`
  position: relative;
  height: auto;
  color: #fff;
  padding: 0;
  z-index: 99;
`;

const HamburgButton = styled.div`
  cursor: pointer;
`;

const Img = styled.img`
  width: 100px;
`;
