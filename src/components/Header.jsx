import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <StWrap>
        <StLogo
          onClick={() => {
            navigate(`/`);
          }}
        >
          <img alt="" src="logo192.png" />
        </StLogo>
        <StButtonsWrap>
          <StButtons>
            <Sta
              onClick={() => {
                navigate(`/`);
              }}
            >
              Home
            </Sta>

            <Sta
              onClick={() => {
                navigate(`/book`);
              }}
            >
              Reservation
            </Sta>

            <Sta
              onClick={() => {
                navigate(`/`);
              }}
            >
              About
            </Sta>

            <Sta
              onClick={() => {
                navigate(`/login`);
              }}
            >
              로그인
            </Sta>
          </StButtons>
        </StButtonsWrap>
      </StWrap>
    </>
  );
};

export default Header;

const StWrap = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 60px;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  background-color: beige;
`;

const StLogo = styled.a`
  display: block;
  cursor: pointer;
  width: 86px;
  height: 28px;
  margin-bottom: 20px;

  > img {
    display: block;
    cursor: pointer;
    width: 106px;
    height: 48px;
  }
`;

const StButtonsWrap = styled.nav`
  display: flex;
  flex-direction: row;
`;

const StButtons = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0px;
  padding: 0px;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
`;

const Sta = styled.a`
  padding: 12px;
  margin-right: 22px;
  font-size: 18px;
  line-height: 24px;
  font-weight: normal;
  color: var(--gray-700);
  cursor: pointer;
  border-radius: 10px;
  text-decoration: none;
  font-family: "SpoqaHanSansNeo-Regular";

  &:focus {
    font-weight: bold;
  }
  &:active {
    font-weight: bold;
  }
  &:hover {
    background-color: var(--gray-100);
  }
`;
