import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StWrap, StTag, StTeam } from "./Styles";
import FlexibleHeader from "../../components/FlexibleHeader";
import Layout from "../../components/Layout";
import {
  __getMyteamDetail,
  __getMyteamList,
} from "../../redux/modules/userSlice";

const TeamPage = () => {
  const title = "TeamPage";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getMyteamList());
  }, []);

  const { team } = useSelector((state) => state.user);
  return (
    <Layout>
      <FlexibleHeader title={title} />
      <StWrap>
        <StTag>Team</StTag>
        <>
          {team?.map((team) => (
            <StTeam
              key={team.teamId}
              onClick={() => {
                dispatch(__getMyteamDetail(team.teamId));
                navigate(`/teamdetail/${team.teamId}`);
              }}
            >
              teamname : {team.teamName}
            </StTeam>
          ))}
        </>
        <button onClick={() => navigate("/teamregister")}>등록하기</button>
      </StWrap>
    </Layout>
  );
};

export default TeamPage;
