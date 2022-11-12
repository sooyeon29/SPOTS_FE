import React from "react";
import { StWrapToggle, StBox, StWrap } from "./Styles";

const HostToggle = ({ hostToggle, hostClickToggle }) => {
  return (
    <StWrapToggle>
      <StWrap>
        <StBox>HostList</StBox>
        <button hostToggle={hostToggle} onClick={hostClickToggle}>
          +
        </button>
      </StWrap>
    </StWrapToggle>
  );
};

export default HostToggle;
