import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __exitMyMatch, __getMyMatch } from '../../redux/modules/matchSlice';
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
} from './Styles';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import TapBar from '../../components/TapBar';
import FlexibleHeader from '../../components/FlexibleHeader';

const ReservPage = () => {
  const title = '나의 예약';
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

  const matchWaiting = myMatches.filter(
    (myMatch) => myMatch.result === '매칭 전'
  );
  console.log('매칭대기중:', matchWaiting);
  const matchComplete = myMatches.filter(
    (myMatch) => myMatch.result === '매칭 완료'
  );
  // console.log("매칭성사", matchComplete);

  return (
    <Layout>
      <FlexibleHeader title={title} />
      <MyReserve>
        <ReservedSpot>
          <span>스팟 예약</span>
        </ReservedSpot>
        <CompletedMath>
          <span>매칭 완료</span>
          {matchComplete?.map((matchCom) => {
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
                  }>
                  매치 취소
                </button>
              </MyMatch>
            );
          })}
        </CompletedMath>
        <WaitedMatch>
          <span>매칭 대기</span>
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
                  }>
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
