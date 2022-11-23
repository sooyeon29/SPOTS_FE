import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __exitMyMatch, __getMyMatch } from "../../redux/modules/matchSlice";
import {
  WaitedMatch,
  CompletedMath,
  ReservedSpot,
  MyMatch,
  MyReserve,
  SpotName,
  MatchDate,
  MatchTime,
  MatchMember,
  MatchTeam,
  underLine,
  ReservTitle,
  AboutMatch,
  MoreInfo,
  DayTime,
  ForMatch,
  TeamPhoto,
  SpotInfo,
} from "./Styles";
import Layout from "../../components/Layout";
import TapBar from "../../components/TapBar";
import FlexibleHeader from "../../components/FlexibleHeader";

const ReservPage = () => {
  const title = "나의 예약";
  const dispatch = useDispatch();
  const myMatches = useSelector((state) => state.matcher.matcher);
  // console.log("요거거", myMatches);

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

  const spotReserve = myMatches.filter(
    (myMatch) => myMatch.matchId.substring(13, 20) === "nomatch"
  );
  console.log("구장예약:", spotReserve);

  const matchWaiting = myMatches.filter(
    (myMatch) =>
      myMatch.result === "매칭 전" &&
      myMatch.matchId.substring(13, 20) === "ismatch"
  );
  console.log("매칭대기중:", matchWaiting);

  const matchComplete = myMatches.filter(
    (myMatch) => myMatch.result === "매칭 완료"
  );
  console.log("매칭성사", matchComplete);

  return (
    <Layout>
      <FlexibleHeader title={title} />
      <MyReserve>
        <ReservTitle>나의 예약리스트</ReservTitle>
        <ReservedSpot>
          <AboutMatch>구장 예약</AboutMatch>
          {spotReserve?.map((matchCom) => {
            return (
              <MyMatch key={matchCom.reservationId}>
                <div>장소: {matchCom.place}</div>
                <div>날짜: {matchCom.date}</div>
                <div>시간: {matchCom.matchId.substring(0, 13)}</div>
                <div>
                  경기 인원: {matchCom.member}:{matchCom.member}
                </div>
                <div>나의 팀: {matchCom.teamName}</div>
                <div>{matchCom.result}</div>
                <button
                  onClick={() =>
                    cancleMatchHandler(
                      matchCom.matchId,
                      matchCom.place,
                      matchCom.teamName
                    )
                  }
                >
                  매치 취소
                </button>
              </MyMatch>
            );
          })}
        </ReservedSpot>
        <CompletedMath>
          <AboutMatch>매칭 완료</AboutMatch>
          {matchComplete?.map((matchCom) => {
            return (
              <MyMatch key={matchCom.reservationId}>
                <SpotInfo>
                  <img alt="구장이미지준비중" src="/blackball.png" />
                  <div>{matchCom.place}</div>
                </SpotInfo>

                <MoreInfo>
                  <DayTime>
                    <div>
                      {matchCom.date.substring(0, 4)}년{" "}
                      {matchCom.date.substring(6, 8)}월{" "}
                      {matchCom.date.substring(10, 12)}일
                    </div>
                    <div>{matchCom.matchId.substring(0, 13)}</div>
                  </DayTime>
                  <ForMatch>
                    <div>
                      <div>{matchCom.teamName}</div>
                      <div>
                        {matchCom.member} : {matchCom.member} 경기
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        cancleMatchHandler(
                          matchCom.matchId,
                          matchCom.place,
                          matchCom.teamName
                        )
                      }
                    >
                      예약 취소
                    </button>
                  </ForMatch>
                </MoreInfo>
              </MyMatch>
            );
          })}
        </CompletedMath>
        <WaitedMatch>
          <AboutMatch>매칭 대기</AboutMatch>
          {matchWaiting?.map((matchWait) => {
            return (
              <MyMatch key={matchWait.reservationId}>
                <SpotName>{matchWait.place}</SpotName>
                <MatchDate>{matchWait.date}</MatchDate>
                <MatchTime>{matchWait.matchId.substring(0, 13)}</MatchTime>
                <MatchMember>
                  경기 인원 {matchWait.member}:{matchWait.member}
                </MatchMember>
                <MatchTeam>{matchWait.teamName}</MatchTeam>
                {/* <div>{matchWait.result}</div> */}
                <button
                  onClick={() =>
                    cancleMatchHandler(
                      matchWait.matchId,
                      matchWait.place,
                      matchWait.teamName
                    )
                  }
                >
                  매치 취소
                </button>
              </MyMatch>
            );
          })}
        </WaitedMatch>
      </MyReserve>
      <TapBar />
    </Layout>
  );
};

export default ReservPage;
