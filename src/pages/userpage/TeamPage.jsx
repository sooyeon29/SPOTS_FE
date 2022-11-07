import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getMyteam } from "../../redux/modules/userSlice";
import { StWrap, StTag, StTeam } from "./Styles";

const TeamPage = ({ teamtoggle, teamClickToggle }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  console.log(user.teamName.team);

  const teamList = user.teamName.team;
  console.log(teamList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getMyteam());
  }, []);

  // const { team } = useSelector((state) => state.user);
  // console.log(team);
  return (
    <StWrap>
      <StTag>Team</StTag>
      <button teamToggle={teamtoggle} onClick={teamClickToggle}>
        +
      </button>
      <>
        {teamList?.map((team, index) => (
          <StTeam onClick={() => navigate("/teamdetail")} key={index}>
            teamname : {team}
          </StTeam>
        ))}
      </>
    </StWrap>
  );
};

export default TeamPage;
