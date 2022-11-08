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

  return (
    <StWrap>
      <StTag>Team</StTag>
      <button teamToggle={teamtoggle} onClick={teamClickToggle}>
        +
      </button>
      <>
        {team.team?.map((teamlist) => (
          <StTeam
            onClick={() => {
              dispatch(__getMyteamDatil({ teamName: teamlist }));
              console.log({ teamName: teamlist });
              navigate("/teamdetail");
            }}
          >
            teamname : {teamlist}
          </StTeam>
        ))}
      </>
      <button onClick={() => navigate("/teamregister")}>등록하기</button>
    </StWrap>
  );
};

export default TeamPage;
