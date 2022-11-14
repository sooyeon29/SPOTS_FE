import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Search from './Search';

const Header = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <StHeader>
        <StWrap>
          <StLogo
            onClick={() => {
              navigate(`/`);
            }}>
            <span>SPOTS</span>
          </StLogo>
          <Search />
          <StButtonsWrap>
            <StButtons>
              <Sta
                onClick={() => {
                  navigate(`/`);
                }}>
                Home
              </Sta>

              <Sta
                onClick={() => {
                  navigate(`/book`);
                }}>
                Reservation
              </Sta>

              {!token ? (
                <Sta
                  onClick={() => {
                    navigate(`/login`);
                  }}>
                  Login
                </Sta>
              ) : (
                <Sta
                  onClick={() => {
                    navigate(`/userpage`);
                  }}>
                  My Page
                </Sta>
              )}

              <Sta onClick={logout}>Logout</Sta>
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
