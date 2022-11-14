import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __exitMyMatch, __getMyMatch } from "../../redux/modules/matchSlice";
import { StWrap, StTag, MyMatch } from "./Styles";

const ReservPage = ({ reservToggle, reservClickToggle }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getMyMatch());
  }, [dispatch]);
  const myMatches = useSelector((state) => state.matcher);
  console.log("요거거", myMatches);
  const cancleMatchHandler = (id, place, team) => {
    dispatch(
      __exitMyMatch({
        matchId: id,
        place: place,
        teamName: team,
      })
    );
  };

  return (
    <StWrap>
      <StTag>Reservation</StTag>
      <button reservToggle={reservToggle} onClick={reservClickToggle}>
        +
      </button>
      {myMatches.matcher?.map((myMatch) => {
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
            <button
              onClick={() =>
                cancleMatchHandler(
                  myMatch.matchId,
                  myMatch.place,
                  myMatch.teamName
                )
              }
            >
              예약취소하기
            </button>
          </MyMatch>
        );
      })}
    </StWrap>
  );
};

export default ReservPage;
