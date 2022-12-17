import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import FlexibleHeader from "../../components/FlexibleHeader";
import { useNavigate } from "react-router-dom";
import TapBar from "../../components/TapBar";
import { useDispatch, useSelector } from "react-redux";
import { __getMyInfo } from "../../redux/modules/userSlice";
import { Container, Profile, PointBox, MenuBox } from "./Styles";

const UserPage = () => {
  const title = "내 계정";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getMyInfo());
  }, []);

  const { user } = useSelector((state) => state.user);

  return (
    <Layout>
      <FlexibleHeader title={title} />
      <Container>
        <Profile>
          <img alt="프로필이미지" src={user.profileImg} />
          <div>
            <p>안녕하세요!</p>
            <p>
              {user.nickname}
              <span>님</span>
            </p>
          </div>
        </Profile>
        <PointBox>
          <div>총 보유 포인트</div>
          <div>
            <h1>{Number(user.point).toLocaleString("ko-KR")}</h1>
            <p>P</p>
          </div>
        </PointBox>
        <MenuBox>
          <img
            alt="내 정보"
            src="/userpage/my.png"
            onClick={() => navigate("/mypage")}
          />
          <img
            alt="나의 팀"
            src="/userpage/Teamsetting.png"
            onClick={() => navigate("/teampage")}
          />
          <img
            alt="나의 예약"
            src="/userpage/myreservationlist.png"
            onClick={() => navigate("/reservpage")}
          />
          <img
            alt="구장 등록"
            src="/userpage/myplace.png"
            onClick={() => navigate("/hostlist")}
          />
        </MenuBox>
      </Container>
      <TapBar />
    </Layout>
  );
};

export default UserPage;
