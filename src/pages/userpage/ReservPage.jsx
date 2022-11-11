import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getMyMatch } from "../../redux/modules/matchSlice";
import { StWrap, StTag, MyMatch } from "./Styles";

const ReservPage = ({ reservToggle, reservClickToggle }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getMyMatch());
  }, []);
  const myMatchs = useSelector((state) => state.matcher.matcher);
  console.log("요거거", myMatchs);
  return (
    <StWrap>
      <StTag>Reservation</StTag>
      <button reservToggle={reservToggle} onClick={reservClickToggle}>
        +
      </button>
      {myMatchs.map((myMatch) => {
        const myDate = new Date(myMatch.date.substring(0, 19));
        return (
          <MyMatch key={myMatch.reservationId}>
            <p>장소: {myMatch.place}</p>
            <p>날짜: {myDate.toLocaleDateString()}</p>
            <p>시간: {myMatch.matchId}</p>
            <p>
              경기인원: {myMatch.member}:{myMatch.member}
            </p>
            <p>내팀이름: {myMatch.teamName}</p>
            <p>{myMatch.result}</p>
          </MyMatch>
        );
      })}
    </StWrap>
  );
};

export default ReservPage;
