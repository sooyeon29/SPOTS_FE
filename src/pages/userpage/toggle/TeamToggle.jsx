import React from "react";
import { StWrapToggle } from "./Styles";

const TeamToggle = ({ teamToggle, teamClickToggle }) => {
  return (
    <StWrapToggle>
      <button teamToggle={teamToggle} onClick={teamClickToggle}>
        +
      </button>
    </StWrapToggle>
  );
};

export default TeamToggle;
