import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getMyteam, __getMyteamDatil } from "../../redux/modules/userSlice";
import { StWrap, StTag, StTeam } from "./Styles";

const TeamPage = ({ teamtoggle, teamClickToggle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getMyteam());
  }, []);

  const { team } = useSelector((state) => state.user);
  console.log(team);
  return (
    <StWrap>
      <StTag>Team</StTag>
      <button teamToggle={teamtoggle} onClick={teamClickToggle}>
        +
      </button>
      <>
        {team?.map((teamlist) => (
          <StTeam
            key={teamlist.teamId}
            onClick={() => {
              dispatch(__getMyteamDatil({ teamName: teamlist.teamName }));
              console.log({ teamName: teamlist });
              navigate("/teamdetail");
            }}
          >
            teamname : {teamlist.teamName}
          </StTeam>
        ))}
      </>
      <button onClick={() => navigate("/teamregister")}>등록하기</button>
    </StWrap>
  );
};

export default TeamPage;
