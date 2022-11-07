import React from "react";
import { StWrapToggle, StBox, StWrap } from "./Styles";

const ReservToggle = ({ reservToggle, reservClickToggle }) => {
  return (
    <StWrapToggle>
      <StWrap>
        <StBox>Reservation</StBox>
        <button reservToggle={reservToggle} onClick={reservClickToggle}>
          +
        </button>
      </StWrap>
    </StWrapToggle>
  );
};

export default ReservToggle;
