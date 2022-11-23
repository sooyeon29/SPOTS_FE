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
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import TapBar from "../../components/TapBar";
import FlexibleHeader from "../../components/FlexibleHeader";
import { Title } from "../spotsDetail/Styles";
import { useNavigate } from "react-router-dom";

const ReservPage = () => {
  const title = "My Booking";
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const spotReserve = myMatches?.filter(
    (myMatch) => myMatch.matchData.matchId.substring(13, 20) === "nomatch"
  );
  console.log("구장예약:", spotReserve);

  const matchWaiting = myMatches?.filter(
    (myMatch) =>
      myMatch.matchData.result === "매칭 전" &&
      myMatch.matchData.matchId.substring(13, 20) === "ismatch"
  );
  console.log("매칭대기중:", matchWaiting);

  const matchComplete = myMatches?.filter(
    (myMatch) => myMatch.matchData.result === "매칭 완료"
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
              <MyMatch key={matchCom.matchData.reservationId}>
                <MoreInfo>
                  <DayTime>
                    <div>
                      {matchCom.matchData.date.substring(0, 4)}년{" "}
                      {matchCom.matchData.date.substring(6, 8)}월{" "}
                      {matchCom.matchData.date.substring(10, 12)}일
                    </div>
                    <div>{matchCom.matchData.matchId.substring(0, 13)}</div>
                  </DayTime>
                </MoreInfo>
                <SpotInfo>
                  <img alt="구장이미지준비중" src={matchCom.placeData.image} />
                  <div>
                    <button
                      onClick={() =>
                        // navigate(`/spotsdetail/${matchCom.placeData.placesId}`)
                        window.location.replace(
                          `/spotsdetail/${matchCom.placeData.placesId}`
                        )
                      }
                    >
                      {matchCom.matchData.place}
                    </button>
                    <br />
                    <p>{matchCom.placeData.address}</p>
                    <span>{matchCom.placeData.price}</span>
                    <span>p</span>
                  </div>
                </SpotInfo>
                <ForMatch>
                  <div>
                    <div>{matchCom.matchData.teamName}</div>
                  </div>

                  <button
                    onClick={() =>
                      cancleMatchHandler(
                        matchCom.matchData.matchId,
                        matchCom.matchData.place,
                        matchCom.matchData.teamName
                      )
                    }
                  >
                    예약 취소
                  </button>
                </ForMatch>
              </MyMatch>
            );
          })}
        </ReservedSpot>
        <CompletedMath>
          <AboutMatch>매칭 완료</AboutMatch>
          {matchComplete?.map((matchCom) => {
            return (
              <MyMatch key={matchCom.matchData.reservationId}>
                <MoreInfo>
                  <DayTime>
                    <div>
                      {matchCom.matchData.date.substring(0, 4)}년{" "}
                      {matchCom.matchData.date.substring(6, 8)}월{" "}
                      {matchCom.matchData.date.substring(10, 12)}일
                    </div>
                    <div>{matchCom.matchData.matchId.substring(0, 13)}</div>
                  </DayTime>
                </MoreInfo>
                <SpotInfo>
                  <img alt="구장이미지준비중" src={matchCom.placeData?.image} />
                  <div>
                    <button
                      onClick={() =>
                        navigate(`/spotsdetail/${matchCom.placeData.placesId}`)
                      }
                    >
                      {matchCom.matchData.place}
                    </button>
                    <br />
                    <p>{matchCom.placeData?.address}</p>
                    <span>{matchCom.placeData?.price}</span>
                    <span>p</span>
                  </div>
                </SpotInfo>
                <ForMatch>
                  <div>
                    <div>{matchCom.matchData.teamName}</div>
                    <div>
                      {matchCom.matchData.member} : {matchCom.matchData.member}{" "}
                      경기
                    </div>
                    {matchCom.teamData.sports !== "풋살장" && (
                      <div>
                        {!matchCom.matchData.isDouble ? "복식" : "단식"}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      cancleMatchHandler(
                        matchCom.matchData.matchId,
                        matchCom.matchData.place,
                        matchCom.matchData.teamName
                      )
                    }
                  >
                    예약 취소
                  </button>
                </ForMatch>
              </MyMatch>
            );
          })}
        </CompletedMath>
        <WaitedMatch>
          <AboutMatch>매칭 대기</AboutMatch>
          {matchWaiting?.map((matchWait) => {
            return (
              <MyMatch key={matchWait.matchData.reservationId}>
                <MoreInfo>
                  <DayTime>
                    <div>
                      {matchWait.matchData.date.substring(0, 4)}년{" "}
                      {matchWait.matchData.date.substring(6, 8)}월{" "}
                      {matchWait.matchData.date.substring(10, 12)}일
                    </div>
                    <div>{matchWait.matchData.matchId.substring(0, 13)}</div>
                  </DayTime>
                </MoreInfo>
                <SpotInfo>
                  <img alt="구장이미지준비중" src={matchWait.placeData.image} />
                  <div>
                    <button
                      onClick={() =>
                        navigate(`/spotsdetail/${matchWait.placeData.placesId}`)
                      }
                    >
                      {matchWait.matchData.place}
                    </button>
                    <br />
                    <p>{matchWait.placeData.address}</p>
                    <span>{matchWait.placeData.price}</span>
                    <span>p</span>
                  </div>
                </SpotInfo>

                <ForMatch>
                  <div>
                    <div>{matchWait.matchData.teamName}</div>
                    <div>
                      {matchWait.matchData.member} :{" "}
                      {matchWait.matchData.member} 경기
                    </div>
                    {matchWait.teamData.sports !== "풋살장" && (
                      <div>
                        {!matchWait.matchData.isDouble ? "복식" : "단식"}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      cancleMatchHandler(
                        matchWait.matchData.matchId,
                        matchWait.matchData.place,
                        matchWait.matchData.teamName
                      )
                    }
                  >
                    예약 취소
                  </button>
                </ForMatch>
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
