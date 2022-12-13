import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexibleHeader from "../../../components/FlexibleHeader";
import Layout from "../../../components/Layout";
import {
  __getMyteamDetail,
  __getMyteamList,
} from "../../../redux/modules/userSlice";
import TapBar from "../../../components/TapBar";
import {
  Container,
  TeamBox,
  TeamCardFootball,
  TeamCardTennis,
  TeamCardBadminton,
  TeamName,
  TeamMember,
  BtnTeamPage,
} from "./Styles";

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
                  {team.image === null || team.image === "" ? (
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
        <BtnTeamPage onClick={() => navigate("/teamregister")}>
          {" "}
          팀 등록하기
        </BtnTeamPage>
      </Container>
      <TapBar />
    </Layout>
  );
};

export default TeamPage;
