import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __exitMyMatch, __getMyMatch } from "../../redux/modules/matchSlice";
import { StWrap, StTag, MyMatch } from "./Styles";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import TapBar from "../../components/TapBar";

const ReservPage = () => {
  const dispatch = useDispatch();
  const myMatches = useSelector((state) => state.matcher.matcher);
  console.log("요거거", myMatches);

  useEffect(() => {
    dispatch(__getMyMatch());
  }, [dispatch]);

  const cancleMatchHandler = (id, place, team) => {
    dispatch(
      __exitMyMatch({
        matchId: id,
        place: place,
        teamName: team,
      })
    );
  };

  const matchWaiting = myMatches.filter(
    (myMatch) => myMatch.result === "매칭 전"
  );
  console.log("매칭대기중:", matchWaiting);
  const matchComplete = myMatches.filter(
    (myMatch) => myMatch.result === "매칭 완료"
  );
  console.log("매칭성사", matchComplete);

  return (
    <Layout>
      <Header />
      <StWrap>
        <StTag>Reservation</StTag>
        <h3>매칭 완료</h3>
        {matchComplete?.map((matchCom) => {
          return (
            <MyMatch key={matchCom.reservationId}>
              <p>장소: {matchCom.place}</p>
              <p>날짜: {matchCom.date}</p>
              <p>시간: {matchCom.matchId.substring(0, 13)}</p>
              <p>
                경기인원: {matchCom.member}:{matchCom.member}
              </p>
              <p>내팀이름: {matchCom.teamName}</p>
              <p>{matchCom.result}</p>
              <button
                onClick={() =>
                  cancleMatchHandler(
                    matchCom.matchId,
                    matchCom.place,
                    matchCom.teamName
                  )
                }
              >
                예약취소하기
              </button>
            </MyMatch>
          );
        })}
        <hr />
        <h3>매칭 대기</h3>
        {matchWaiting?.map((matchWait) => {
          return (
            <MyMatch key={matchWait.reservationId}>
              <p>장소: {matchWait.place}</p>
              <p>날짜: {matchWait.date}</p>
              <p>시간: {matchWait.matchId.substring(0, 13)}</p>
              <p>
                경기인원: {matchWait.member}:{matchWait.member}
              </p>
              <p>내팀이름: {matchWait.teamName}</p>
              <p>{matchWait.result}</p>
              <button
                onClick={() =>
                  cancleMatchHandler(
                    matchWait.matchId,
                    matchWait.place,
                    matchWait.teamName
                  )
                }
              >
                예약취소하기
              </button>
            </MyMatch>
          );
        })}
      </StWrap>
      <TapBar />
    </Layout>
  );
};

export default ReservPage;
