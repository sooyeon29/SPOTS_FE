import React from "react";
import { StWrapToggle, StBox, StWrap } from "./Styles";

const TeamToggle = ({ teamToggle, teamClickToggle }) => {
  return (
    <StWrapToggle>
      <StWrap>
        <StBox>Team</StBox>
        <button teamToggle={teamToggle} onClick={teamClickToggle}>
          +
        </button>
      </StWrap>
    </StWrapToggle>
  );
};

export default TeamToggle;
