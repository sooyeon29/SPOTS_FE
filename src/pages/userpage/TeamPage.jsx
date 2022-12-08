import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexibleHeader from "../../components/FlexibleHeader";
import Layout from "../../components/Layout";
import {
  __getMyteamDetail,
  __getMyteamList,
} from "../../redux/modules/userSlice";
import TapBar from "../../components/TapBar";
import styled from "styled-components";

const TeamPage = () => {
  const title = "나의 팀";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getMyteamList());
  }, []);

  const { team } = useSelector((state) => state.user);

  console.log(team);
  return (
    <Layout>
      <FlexibleHeader title={title} />
      <Container>
        {/* <Title>팀 관리</Title> */}

        <TeamBox>
          {team?.map((team) => {
            if (team.sports === "풋살장") {
              return (
                <TeamCardFootball
                  key={team.teamId}
                  onClick={() => {
                    dispatch(__getMyteamDetail(team.teamId));
                    navigate(`/teamdetail/${team.teamId}`);
                  }}
                >
                  {team.image === null ? (
                    <img alt="spots" src="/myprofile_logo.png" />
                  ) : (
                    <img alt="팀프로필" src={team.image} />
                  )}

                  <TeamName>{team.teamName}</TeamName>
                  <TeamMember>
                    {team.member}
                    <p>people</p>
                  </TeamMember>
                </TeamCardFootball>
              );
            } else if (team.sports === "테니스장") {
              return (
                <TeamCardTennis
                  key={team.teamId}
                  onClick={() => {
                    dispatch(__getMyteamDetail(team.teamId));
                    navigate(`/teamdetail/${team.teamId}`);
                  }}
                >
                  {team.image === null ? (
                    <img alt="spots" src="/myprofile_logo.png" />
                  ) : (
                    <img alt="팀프로필" src={team.image} />
                  )}

                  <TeamName>{team.teamName}</TeamName>
                  <TeamMember>
                    {team.member}
                    <p>people</p>
                  </TeamMember>
                </TeamCardTennis>
              );
            } else {
              return (
                <TeamCardBadminton
                  key={team.teamId}
                  onClick={() => {
                    dispatch(__getMyteamDetail(team.teamId));
                    navigate(`/teamdetail/${team.teamId}`);
                  }}
                >
                  {team.image === null ? (
                    <img alt="spots" src="/myprofile_logo.png" />
                  ) : (
                    <img alt="팀프로필" src={team.image} />
                  )}

                  <TeamName>{team.teamName}</TeamName>
                  <TeamMember>
                    {team.member}
                    <p>people</p>
                  </TeamMember>
                </TeamCardBadminton>
              );
            }
          })}
        </TeamBox>
        <Btn onClick={() => navigate("/teamregister")}> 팀 등록하기</Btn>
      </Container>
      <TapBar />
    </Layout>
  );
};

export default TeamPage;

const Container = styled.div`
  margin-top: 70px;
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TeamBox = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const TeamCardFootball = styled.div`
  width: 362px;
  height: 136px;
  margin-bottom: 25px;
  background-image: url(/football.png);
  background-size: cover;
  border-radius: 17px;
  color: #fefefe;
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 60px;
    margin-left: 35px;
  }
`;

const TeamCardTennis = styled.div`
  width: 362px;
  height: 136px;
  margin-bottom: 25px;
  background-image: url(/tennis.png);
  background-size: cover;
  border-radius: 17px;
  color: #fefefe;
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 60px;
    margin-left: 35px;
  }
`;

const TeamCardBadminton = styled.div`
  width: 362px;
  height: 136px;
  margin-bottom: 25px;
  background-image: url(/badminton.png);
  background-size: cover;
  border-radius: 17px;
  color: #fefefe;
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 60px;
    margin-left: 35px;
  }
`;

const TeamName = styled.div`
  font-size: 20px;
  font-weight: 700;
  width: 100px;
  margin-left: 30px;
`;

const TeamMember = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-top: 30px;
  margin-left: 30px;
  font-size: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    padding: 0;
    font-size: 25px;
    margin-top: -10px;
  }
`;

const Btn = styled.button`
  width: 360px;
  height: 50px;
  color: #09225c;
  background-color: #00f78e;
  border-radius: 43px;
  border: none;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
`;
