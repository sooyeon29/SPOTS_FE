import React from "react";
import { useNavigate } from "react-router-dom";
import { StWrap, StTag, StTeam } from "./Styles";

const TeamPage = ({ teamToggle, teamClickToggle }) => {
  const navigate = useNavigate();
  return (
    <StWrap>
      <StTag>Team</StTag>
      <button teamToggle={teamToggle} onClick={teamClickToggle}>
        +
      </button>
      <StTeam onClick={() => navigate("/teamdetail")}>Team name</StTeam>
    </StWrap>
  );
};

export default TeamPage;
