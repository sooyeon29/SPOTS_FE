import React from "react";
import { StWrapToggle, StBox, StWrap } from "./Styles";

const MyToggle = ({ mytoggle, myClickToggle }) => {
  return (
    <StWrapToggle>
      <StWrap>
        <StBox>my</StBox>
        <button mytoggle={mytoggle} onClick={myClickToggle}>
          +
        </button>
      </StWrap>
    </StWrapToggle>
  );
};

export default MyToggle;
