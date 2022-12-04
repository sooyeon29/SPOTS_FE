import React, { useRef } from "react";
import styled from "styled-components";
import useDetectClose from "../hooks/useDetectClose";
import { IoIosArrowBack } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";

const FlexibleHeader = (props) => {
  const navigate = useNavigate();
  const [barIsOpen, barRef, barHandler] = useDetectClose(false);
  const dropDownRef = useRef(null);
  return (
    <>
      <StHeader>
        <StWrap>
          <IoIosArrowBack
            style={{ fontSize: "26", color: "#AEB4BF", cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
          <PageTitle>{props.title}</PageTitle>
          <Container>
            <HamburgButton onClick={barHandler} ref={barRef}>
              <GiHamburgerMenu size="25" />
            </HamburgButton>
            <SideBar barIsOpen={barIsOpen} dropDownRef={dropDownRef} />
          </Container>
        </StWrap>
      </StHeader>
    </>
  );
};

export default FlexibleHeader;

const StHeader = styled.div`
  max-width: 600px;
  width: 100%;
  height: 62px;
  background-color: #000000;
  display: flex;
  position: fixed;
  z-index: 9999;
`;

const StWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 90%;
`;

const PageTitle = styled.div`
  color: white;
  font-size: 23px;
  font-weight: bold;
  margin: auto;
`;

const Container = styled.div`
  position: relative;
  height: auto;
  color: #fff;
  padding: 0;
`;

const HamburgButton = styled.div`
  cursor: pointer;
`;
