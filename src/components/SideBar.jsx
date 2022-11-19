import React from "react";
import styled, { css } from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaRegBell } from "react-icons/fa";
import { VscSettingsGear } from "react-icons/vsc";
import { RiLogoutBoxRLine } from "react-icons/ri";

const SideBar = ({ barIsOpen, dropDownRef }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const nickname = localStorage.getItem("nickname");
  const logout = () => {
    localStorage.clear();
    navigate(`/`);
  };
  return (
    <SideMenu>
      {!token ? (
        <Section isOpen={barIsOpen}>
          <Profile>
            <img alt="프로필이미지" src="/SidebarProfile.png"></img>
            <div>
              <p>로그인 후 이용해주세요.</p>
            </div>
          </Profile>
          <Ul ref={dropDownRef}>
            <Li onClick={() => navigate("/login")}>
              <div>
                <img alt="로그인" src="/Ellipse 69.png" />
                <p>로그인하기</p>
              </div>
              <IoIosArrowForward className="arrow" />
            </Li>
            <Li onClick={() => navigate("/signup")}>
              <div>
                <img alt="회원가입" src="/Ellipse 69.png" />
                <p>회원가입</p>
              </div>
              <IoIosArrowForward className="arrow" />
            </Li>
          </Ul>
          <Bottom>
            <FaRegBell className="icon" />
            <VscSettingsGear className="icon" />
          </Bottom>
        </Section>
      ) : (
        <Section isOpen={barIsOpen}>
          <Profile>
            <img alt="프로필이미지" src="/SidebarProfile.png"></img>
            <div>
              <p>{nickname}</p>
            </div>
          </Profile>
          <Ul ref={dropDownRef}>
            <Li onClick={() => navigate("/mypage")}>
              <div>
                <img alt="내정보수정" src="/Ellipse 69.png" />
                <p>내정보수정</p>
              </div>
              <IoIosArrowForward className="arrow" />
            </Li>
            <Li onClick={() => navigate("/teampage")}>
              <div>
                <img alt="팀관리" src="/Ellipse 69.png" />
                <p>팀관리</p>
              </div>
              <IoIosArrowForward className="arrow" />
            </Li>
            <Li onClick={() => navigate("/reservpage")}>
              <div>
                <img alt="나의 예약리스트" src="/Ellipse 69.png" />
                <p>나의 예약리스트</p>
              </div>
              <IoIosArrowForward className="arrow" />
            </Li>
            <Li onClick={() => navigate("/hostlist ")}>
              <div>
                <img alt="나의 구장 등록하기" src="/Ellipse 69.png" />
                <p>나의 구장 등록하기</p>
              </div>
              <IoIosArrowForward className="arrow" />
            </Li>
          </Ul>
          <Bottom>
            <FaRegBell className="icon" />
            <RiLogoutBoxRLine className="icon" onClick={logout} />
          </Bottom>
        </Section>
      )}
    </SideMenu>
  );
};

export default SideBar;

const SideMenu = styled.div``;
const Section = styled.div`
  background-color: #ffffff;
  color: #545454;
  width: 280px;
  padding-top: 30px;
  padding-left: 10px;
  position: fixed;
  top: 0;
  bottom: 0;
  right: -300px;
  visibility: hidden;
  transition: 1s ease;
  opacity: 0;
  z-index: 99999;

  ${({ isOpen }) =>
    isOpen &&
    css`
      opacity: 1;
      visibility: visible;
      right: 0;
    `};
`;
const Profile = styled.div`
  height: 130px;
  display: flex;
  align-items: center;
  font-weight: 900;
  margin-left: 10px;
  border-bottom: 1px solid #eaeffc;
  img {
    width: 77px;
    height: 77px;
    margin-right: 20px;
  }
`;
const Ul = styled.ul`
  padding-left: 10px;
`;
const Li = styled.li`
  margin: 13px 0;
  padding-bottom: 13px;
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eaeffc;
  cursor: pointer;
  font-weight: 600;

  img {
    margin-right: 20px;
  }
  div {
    display: flex;
    align-items: center;
  }
  .arrow {
    color: #1746c7;
    margin-right: 8px;
    font-size: 23px;
  }
`;

const Bottom = styled.div`
  position: fixed;
  display: flex;
  justify-content: end;
  bottom: 0;
  width: 270px;
  height: 65px;
  border-top: 1px solid #cecece;
  .icon {
    font-size: 28px;
    color: #cecece;
    margin-top: 12px;
  }
  .icon:first-child {
    margin-right: 20px;
  }
`;
