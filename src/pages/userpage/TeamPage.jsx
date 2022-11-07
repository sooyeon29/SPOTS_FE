import React from "react";
import { StWrap, StBox } from "./Styles";

const TeamPage = ({ teamToggle, teamClickToggle }) => {
  return (
    <StWrap>
      <StBox>Team</StBox>
      <button teamToggle={teamToggle} onClick={teamClickToggle}>
        +
      </button>
    </StWrap>
  );
};

export default TeamPage;
