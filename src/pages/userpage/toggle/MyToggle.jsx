import React from "react";
import { StWrapToggle } from "./Styles";

const MyToggle = ({ myToggle, myClickToggle }) => {
  return (
    <StWrapToggle>
      <button myToggle={myToggle} onClick={myClickToggle}>
        +
      </button>
    </StWrapToggle>
  );
};

export default MyToggle;
