import React from "react";
import { StWrapToggle, StBox, StWrap } from "./Styles";

const MyToggle = ({ myToggle, myClickToggle }) => {
  return (
    <StWrapToggle>
      <StWrap>
        <StBox>my</StBox>
        <button myToggle={myToggle} onClick={myClickToggle}>
          +
        </button>
      </StWrap>
    </StWrapToggle>
  );
};

export default MyToggle;
