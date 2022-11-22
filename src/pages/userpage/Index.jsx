import React from "react";
import Layout from "../../components/Layout";
import FlexibleHeader from "../../components/FlexibleHeader";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TapBar from "../../components/TapBar";

const UserPage = () => {
  const title = "MyPage";
  const navigate = useNavigate();
  const nickname = localStorage.getItem("nickname");
  const userPoint = localStorage.getItem("point");

  return (
    <Layout>
      <FlexibleHeader title={title} />
      <Container>
        <Profile>
          <img alt="프로필이미지" src="/SidebarProfile.png"></img>
          <div>{nickname}</div>
        </Profile>
        <PointBox>
          <h2>point</h2>
          <h1>{Number(userPoint).toLocaleString("ko-KR")}</h1>
        </PointBox>
      </Container>
      <TapBar />
    </Layout>
  );
};

export default UserPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Profile = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  padding-top: 120px;
  padding-left: 100px;
  background-color: skyblue;
  img {
    width: 88px;
    height: 88px;
  }
  div {
    margin: 30px 0 0 30px;
    font-size: 20px;
    font-weight: 700;
  }
`;

const PointBox = styled.div`
  width: 80%;
  height: 80px;
  border-radius: 8px;
  background-color: lightgreen;
  h2 {
    margin: 5px 0 0 10px;
  }
  h1 {
    position: absolute;
    right: 60px;
    top: 250px;
  }
`;
