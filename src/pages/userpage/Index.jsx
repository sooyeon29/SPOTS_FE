import React from "react";
import Layout from "../../components/Layout";
import FlexibleHeader from "../../components/FlexibleHeader";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import TapBar from "../../components/TapBar";

const UserPage = () => {
  const title = "MyPage";
  const navigate = useNavigate();
  const nickname = localStorage.getItem("nickname");

  return (
    <Layout>
      <FlexibleHeader title={title} />
      <Container>
        <Profile>
          <img alt="프로필이미지" src="/SidebarProfile.png"></img>
          <div>{nickname}</div>
        </Profile>
        <Ul>
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
      </Container>
      <TapBar />
    </Layout>
  );
};

export default UserPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Profile = styled.div`
  width: 330px;
  height: 180px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-bottom: 1px solid #eaeffc;
  padding-top: 70px;
  img {
    width: 88px;
    height: 88px;
  }
  div {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 700;
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
    margin-right: 25px;
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
