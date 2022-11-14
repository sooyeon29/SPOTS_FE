import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getMyMatch } from "../../redux/modules/matchSlice";
import { StWrap, StTag, MyMatch } from "./Styles";

const ReservPage = ({ reservToggle, reservClickToggle }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getMyMatch());
  }, [dispatch]);
  const myMatches = useSelector((state) => state.matcher.matcher);
  console.log("요거거", myMatches);
  return (
    <StWrap>
      <StTag>Reservation</StTag>
      <button reservToggle={reservToggle} onClick={reservClickToggle}>
        +
      </button>
      {myMatches.map((myMatch) => {
        console.log(myMatch);
        return (
          <MyMatch key={myMatch.reservationId}>
            <p>장소: {myMatch.place}</p>
            <p>날짜: {myMatch.date}</p>
            <p>시간: {myMatch.matchId.substring(0, 13)}</p>
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
