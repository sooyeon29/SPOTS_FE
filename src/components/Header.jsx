import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import useDetectClose from "../hooks/useDetectClose";
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
              localStorage.clear();
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
              <DropdownContainer>
                <DropdownButton onClick={myPageHandler} ref={myPageRef}>
                  <GiHamburgerMenu size="25" />
                </DropdownButton>
                <Menu isDropped={myPageIsOpen}>
                  <Ul ref={dropDownRef}>
                    <Li>
                      <Linkdiv onClick={() => navigate("/login")}>
                        Log In
                      </Linkdiv>
                      <Linkdiv onClick={() => navigate("/signup")}>
                        Sign Up
                      </Linkdiv>
                    </Li>
                  </Ul>
                </Menu>
              </DropdownContainer>
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
                          My Profile
                        </Linkdiv>
                        <Linkdiv onClick={() => navigate("/teampage")}>
                          Team Profile
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

const StButtons = styled.ul`
  display: flex;
`;

const DropdownContainer = styled.div`
  position: relative;
  height: auto;
  color: #fff;
  padding: 0;
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
  text-decoration: none;
`;

const Menu = styled.div`
  position: absolute;
  top: 40px;
  width: 200px;
  transform: translate(-45%, 20px);
  background-color: #242526;
  border: 1px solid #474a4d;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  opacity: 0;
  visibility: hidden;
  z-index: 2;

  &:after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    left: 90%;
    transform: translate(-50%, -50%);
    border: 12px solid transparent;
    border-top-width: 0;
  }

  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-45%, 0);
      left: -340%;
    `};
`;

const Linkdiv = styled.div`
  cursor: pointer;
  height: 40px;
  font-size: 20px;
  width: 200px;
  border-radius: 8px;
  line-height: 40px;
  :hover {
    background-color: #525357;
  }
`;

const Img = styled.img`
  width: 100px;
`;
