import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import useDetectClose from "../hooks/useDetectClose";
import Search from "./Search";
import { BsPersonCircle } from "react-icons/bs";

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const dropDownRef = useRef(null);
  const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);

  return (
    <>
      <StHeader>
        <StWrap>
          <StLogo
            onClick={() => {
              navigate(`/`);
            }}
          >
            <span>SPOTS</span>
          </StLogo>
          <Search />
          <StButtonsWrap>
            <StButtons>
              <DropdownContainer>
                <DropdownButton
                  onClick={() => {
                    navigate(`/book`);
                  }}
                >
                  Reservation
                </DropdownButton>
              </DropdownContainer>
              {!token ? (
                <Sta
                  onClick={() => {
                    navigate(`/login`);
                  }}
                >
                  Login
                </Sta>
              ) : (
                <>
                  <DropdownContainer>
                    <DropdownButton onClick={myPageHandler} ref={myPageRef}>
                      My Page
                    </DropdownButton>
                    <Menu isDropped={myPageIsOpen}>
                      <Ul ref={dropDownRef}>
                        <Li>
                          <Linkdiv onClick={() => navigate("/mypage")}>
                            My page
                          </Linkdiv>
                          <Linkdiv onClick={() => navigate("/teampage")}>
                            Team Page
                          </Linkdiv>
                          <Linkdiv onClick={() => navigate("/reservpage ")}>
                            Reservation
                          </Linkdiv>
                          <Linkdiv onClick={() => navigate("/hosting ")}>
                            Hosting
                          </Linkdiv>
                          <Linkdiv onClick={logout}>Log Out</Linkdiv>
                        </Li>
                      </Ul>
                    </Menu>
                  </DropdownContainer>
                </>
              )}
            </StButtons>
          </StButtonsWrap>
        </StWrap>
      </StHeader>
    </>
  );
};

export default Header;

const StHeader = styled.div`
  background-color: #666666;
  width: 100%;
`;

const StWrap = styled.div`
  margin: auto;
  width: 80%;
  display: flex;
  /* height: 72px; */
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
`;

const StLogo = styled.div`
  cursor: pointer;
  /* margin-right: 10px; */
  display: flex;

  span {
    cursor: pointer;
    font-size: large;
    font-weight: 600;
    color: #fff;
  }
`;

const StButtonsWrap = styled.nav`
  /* flex-direction: row; */
`;

const StButtons = styled.ul`
  /* display: flex; */
  /* flex-direction: row; */
  /* list-style: none; */
  /* margin: 0px; */
  padding: 0px;
  /* margin-block-start: 1em; */
  /* margin-block-end: 1em; */
  /* margin-inline-start: 0px; */
  /* margin-inline-end: 0px; */
  /* padding-inline-start: 40px; */
`;

const Sta = styled.a`
  width: 120px;
  height: auto;
  margin-left: 22px;
  font-size: 18px;
  /* line-height: 24px; */
  font-weight: normal;
  color: #fff;
  /* var(--gray-700); */
  cursor: pointer;
  text-decoration: none;
  position: relative;

  &:focus {
    font-weight: bold;
  }
  &:active {
    font-weight: bold;
  }
  &:hover {
    text-decoration: underline;
    /* background-color: var(--gray-100); */
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  /* text-align: center; */
  width: 120px;
  height: auto;
  color: #fff;
`;

const DropdownButton = styled.div`
  cursor: pointer;
`;

const Li = styled.li``;

const Ul = styled.ul`
  & > li {
    margin-bottom: 10px;
  }

  & > li:first-of-type {
    margin-top: 10px;
  }

  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
`;

// const LinkWrapper = styled.a`
//   font-size: 16px;
//   text-decoration: none;
//   color: white;
// `;

const Menu = styled.div`
  background: gray;
  position: absolute;
  top: 52px;
  left: 30%;
  width: 100px;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;

  &:after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    top: -3px;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 12px solid transparent;
    border-top-width: 0;
    border-bottom-color: gray;
  }

  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 30%;
    `};
`;

const Linkdiv = styled.div`
  cursor: pointer;
`;
