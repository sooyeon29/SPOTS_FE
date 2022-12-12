import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaRegBell } from "react-icons/fa";
import { VscSettingsGear } from "react-icons/vsc";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { __getMyInfo } from "../redux/modules/userSlice";
import Swal from "sweetalert2";

const SideBar = ({ barIsOpen, dropDownRef }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    Swal.fire({
      text: "로그아웃되었습니다",
      width: "300px",
      confirmButtonText: "확인",
      confirmButtonColor: "#40d295",
      showClass: { popup: "animated fadeInDown faster" },
      hideClass: { popup: "animated fadeOutUp faster" },
    });
    navigate(`/`);
  };

  useEffect(() => {
    if (token) {
      dispatch(__getMyInfo());
    }
  }, []);

  const { user } = useSelector((state) => state?.user);

  return (
    <SideMenu>
      {!token ? (
        <Section isOpen={barIsOpen}>
          <Profile>
            <img alt="프로필이미지" src="/myprofile_icon.png" />
            <div>
              <p>로그인 후 이용해주세요.</p>
            </div>
          </Profile>
          <Ul ref={dropDownRef}>
            <Li onClick={() => navigate("/login")}>
              <div>
                <img alt="로그인" src="/userpage/login_icon.png" />
                <p>로그인하기</p>
              </div>
              <IoIosArrowForward className="arrow" />
            </Li>
            <Li onClick={() => navigate("/signup")}>
              <div>
                <img alt="회원가입" src="/userpage/join_icon.png" />
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
            <img alt="프로필이미지" src={user?.profileImg} />
            <div>
              <p>{user.nickname}</p>
            </div>
          </Profile>
          <Ul ref={dropDownRef}>
            <Li onClick={() => navigate("/mypage")}>
              <div>
                <img alt="내 정보" src="/userpage/myprofile_icon.png" />
                <p>내 정보</p>
              </div>
              <IoIosArrowForward className="arrow" />
            </Li>
            <Li onClick={() => navigate("/teampage")}>
              <div>
                <img alt="나의 팀" src="/userpage/myteam_icon.png" />
                <p>나의 팀</p>
              </div>
              <IoIosArrowForward className="arrow" />
            </Li>
            <Li onClick={() => navigate("/reservpage")}>
              <div>
                <img alt="나의 예약" src="/userpage/myreserv_icon.png" />
                <p>나의 예약</p>
              </div>
              <IoIosArrowForward className="arrow" />
            </Li>
            <Li onClick={() => navigate("/hostlist ")}>
              <div>
                <img alt="스팟 등록" src="/userpage/myhost_icon.png" />
                <p>스팟 등록</p>
              </div>
              <IoIosArrowForward className="arrow" />
            </Li>
            {user.nickname === "spotsadmin" ? (
              <Li onClick={() => navigate("/adminhome ")}>
                <div>
                  <img alt="관리자 채팅방" src="/myhost_icon.png" />
                  <p>관리자 채팅방</p>
                </div>
                <IoIosArrowForward className="arrow" />
              </Li>
            ) : null}
          </Ul>
          <Bottom>
            <FaRegBell className="icon" />
            <BiLogOut className="icon" onClick={logout} />
          </Bottom>
        </Section>
      )}
    </SideMenu>
  );
};

export default SideBar;

const SideMenu = styled.div`
  position: relative;
  background-color: #fff;
  z-index: 999999999;
`;

const Section = styled.div`
  background-color: #fff;
  color: #545454;
  width: 280px;
  padding-top: 30px;
  padding-left: 10px;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 99999999;
  visibility: hidden;
  transition: 0.8s ease;
  opacity: 0;

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
  background-color: #fff;

  img {
    /* transform: translate(50, 50); */
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 10px;
  }
`;
const Ul = styled.ul`
  padding-left: 10px;
  background-color: #fff;
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
  background-color: #fff;

  img {
    margin-right: 20px;
    width: 50px;
    height: 50px;
  }
  div {
    display: flex;
    align-items: center;
    background-color: #fff;
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
  background-color: #fff;
  cursor: pointer;
  .icon {
    font-size: 30px;
    color: #cecece;
    margin-top: 12px;
  }
  .icon:first-child {
    margin-right: 13px;
    font-size: 27px;
  }
`;
