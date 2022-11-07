import React from "react";
import { StWrap, StTag } from "./Styles";

const ReservPage = ({ reservToggle, reservClickToggle }) => {
  return (
    <StWrap>
      <StTag>Reservation</StTag>
      <button reservToggle={reservToggle} onClick={reservClickToggle}>
        +
      </button>
    </StWrap>
  );
};

export default ReservPage;
