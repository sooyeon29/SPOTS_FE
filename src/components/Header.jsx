import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import useDetectClose from "../hooks/useDetectClose";
import { GoSearch } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearchLocation } from "react-icons/fa";
import SearchBar from "./SearchBar";
import useToggle from "../hooks/useToggle";

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const [toggle, setToggle, ClickToggle] = useToggle(false);
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
            <Img src="/logo.png" alt="logo" />
          </StLogo>
          <StButtons>
            {!toggle ? (
              <StSearch>
                <FaSearchLocation
                  color="white"
                  size="20"
                  onClick={ClickToggle}
                />
              </StSearch>
            ) : (
              <SearchBar />
            )}

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
                    <GiHamburgerMenu size="25" />
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
                        <Linkdiv onClick={() => navigate("/reservpage")}>
                          Reservation
                        </Linkdiv>
                        <Linkdiv onClick={() => navigate("/hosting ")}>
                          Hosting
                        </Linkdiv>
                        <Linkdiv onClick={() => navigate("/hostlist ")}>
                          HostList
                        </Linkdiv>
                        <Linkdiv onClick={logout}>Log Out</Linkdiv>
                      </Li>
                    </Ul>
                  </Menu>
                </DropdownContainer>
              </>
            )}
          </StButtons>
        </StWrap>
      </StHeader>
    </>
  );
};

export default Header;

const StHeader = styled.div`
  width: 100%;
  padding: 0;
  background-color: #000000;
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

const StSearch = styled.div`
  margin: 3px 15px 0 0;
  cursor: pointer;
`;
const StButtonsWrap = styled.nav`
  /* flex-direction: row; */
`;

const StButtons = styled.ul`
  display: flex;
`;

const Sta = styled.a`
  margin: 0px 30px 0px 30px;
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
  /* width: 120px; */
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
  left: 40%;
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
      left: 40%;
    `};
`;

const Linkdiv = styled.div`
  cursor: pointer;
`;

const Img = styled.img`
  width: 100px;
`;
