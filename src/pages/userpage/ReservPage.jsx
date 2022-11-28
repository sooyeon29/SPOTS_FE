import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __exitMyMatch, __getMyMatch } from "../../redux/modules/matchSlice";
import {
  WaitedMatch,
  CompletedMath,
  ReservedSpot,
  MyMatch,
  MyReserve,
  ReservTitle,
  AboutMatch,
  MoreInfo,
  DayTime,
  ForMatch,
  SpotInfo,
  CancleBtn,
  MatchVS,
  MidTitle,
  OneOrTwo,
  MyMatch2,
  MyTeamInfo,
  VS,
  TeamInfoDetail,
} from "./Styles";
import Layout from "../../components/Layout";
import TapBar from "../../components/TapBar";
import FlexibleHeader from "../../components/FlexibleHeader";
import { useNavigate } from "react-router-dom";

const ReservPage = () => {
  const title = "My Booking";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myNoneMatches = useSelector(
    (state) => state.matcher?.mymatcher.noneMatchTotal
  );
  console.log("나의 매칭전 예약리스트", myNoneMatches);

  const myDoneMatches = useSelector(
    (state) => state.matcher?.mymatcher.doneMatchTotal
  );
  console.log("나의 매칭완료 예약리스트", myDoneMatches);
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

  const spotReserve = myNoneMatches?.filter(
    (myMatch) => myMatch.matchData?.matchId.substring(13, 20) === "nomatch"
  );
  console.log("구장예약:", spotReserve);

  const matchWaiting = myNoneMatches?.filter(
    (myMatch) =>
      // myMatch.matchData?.result === "매칭 전" &&
      myMatch.matchData?.matchId.substring(13, 20) === "ismatch"
  );
  console.log("매칭대기중:", matchWaiting);

  // const matchComplete = myDoneMatches?.filter(
  //   (myMatch) => myMatch.matchData?.result === "매칭 완료"
  // );
  // console.log("매칭성사", matchComplete);

  return (
    <Layout>
      <FlexibleHeader title={title} />
      <MyReserve>
        <ReservTitle></ReservTitle>
        <ReservedSpot>
          <AboutMatch>구장 예약</AboutMatch>
          {spotReserve?.map((matchCom) => {
            return (
              <MyMatch2 key={matchCom.matchData?.reservationId}>
                <MoreInfo>
                  <DayTime>
                    <div>
                      {matchCom.matchData?.date.substring(0, 4)}년{" "}
                      {matchCom.matchData?.date.substring(6, 8)}월{" "}
                      {matchCom.matchData?.date.substring(10, 12)}일
                    </div>
                    <div>{matchCom.matchData?.matchId.substring(0, 13)}</div>
                  </DayTime>
                </MoreInfo>
                <SpotInfo>
                  <img alt="구장이미지준비중" src={matchCom.placeData?.image} />
                  <div>
                    <button
                      onClick={() =>
                        navigate(`/spotsdetail/${matchCom.placeData?.placesId}`)
                      }
                    >
                      {matchCom.matchData?.place}
                    </button>
                    <br />
                    <p>{matchCom.placeData?.address}</p>
                    <span>{matchCom.placeData?.price}</span>
                    <span>p</span>
                  </div>
                </SpotInfo>
                <ForMatch>
                  <div>나의 팀</div>
                  <img alt="팀로고" src={matchCom.teamData?.image} />
                  <div>{matchCom.matchData?.teamName}</div>
                  <div>{matchCom.matchData?.member} 명</div>
                </ForMatch>
                <CancleBtn
                  onClick={() =>
                    cancleMatchHandler(
                      matchCom.matchData?.matchId,
                      matchCom.matchData?.place,
                      matchCom.matchData?.teamName
                    )
                  }
                >
                  예약 취소
                </CancleBtn>
              </MyMatch2>
            );
          })}
        </ReservedSpot>

        <WaitedMatch>
          <AboutMatch>매칭 대기/팀매칭 대기</AboutMatch>
          {matchWaiting?.map((matchWait) => {
            return (
              <MyMatch2 key={matchWait.matchData?.reservationId}>
                <MoreInfo>
                  <DayTime>
                    <div>
                      {matchWait.matchData?.date.substring(0, 4)}년{" "}
                      {matchWait.matchData?.date.substring(6, 8)}월{" "}
                      {matchWait.matchData?.date.substring(10, 12)}일
                    </div>
                    <div>{matchWait.matchData?.matchId.substring(0, 13)}</div>
                  </DayTime>
                </MoreInfo>
                <SpotInfo>
                  <img
                    alt="구장이미지준비중"
                    src={matchWait.placeData?.image}
                  />
                  <div>
                    <button
                      onClick={() =>
                        navigate(
                          `/spotsdetail/${matchWait.placeData?.placesId}`
                        )
                      }
                    >
                      {matchWait.matchData?.place}
                    </button>
                    <br />
                    <p>{matchWait.placeData?.address}</p>
                    <span>{matchWait.placeData?.price}</span>
                    <span>p</span>
                  </div>
                </SpotInfo>
                <hr />
                <MidTitle>
                  매칭대기
                  <span>
                    {matchWait.teamData?.sports !== "풋살장" && (
                      <>
                        {!matchWait.matchData?.isDouble ? "단식" : "복식"} 경기
                      </>
                    )}
                  </span>
                </MidTitle>

                <WaitedMatch>
                  <MatchVS>
                    <div>나의 팀</div>
                    <div>vs</div>
                    <div>상대 팀</div>
                  </MatchVS>
                  <MatchVS>
                    <div>
                      <img alt="팀로고" src={matchWait.teamData?.image} />
                      <div>{matchWait.matchData?.teamName}</div>
                      <span>
                        {matchWait.teamData?.wins}승 /{" "}
                        {matchWait.teamData?.lose}패
                      </span>
                    </div>
                    <VS>
                      {matchWait.matchData?.member} :{" "}
                      {matchWait.matchData?.member}
                    </VS>

                    <div>대기중</div>
                  </MatchVS>
                </WaitedMatch>
                <CancleBtn
                  onClick={() =>
                    cancleMatchHandler(
                      matchWait.matchData?.matchId,
                      matchWait.matchData?.place,
                      matchWait.matchData?.teamName
                    )
                  }
                >
                  예약 취소
                </CancleBtn>
              </MyMatch2>
            );
          })}
        </WaitedMatch>
        <CompletedMath>
          <AboutMatch>매칭 완료</AboutMatch>
          {myDoneMatches?.map((matchCom) => {
            return (
              <MyMatch2 key={matchCom.matchData?.reservationId}>
                <MoreInfo>
                  <DayTime>
                    <div>
                      {matchCom.matchData?.date.substring(0, 4)}년{" "}
                      {matchCom.matchData?.date.substring(6, 8)}월{" "}
                      {matchCom.matchData?.date.substring(10, 12)}일
                    </div>
                    <div>{matchCom.matchData?.matchId.substring(0, 13)}</div>
                  </DayTime>
                </MoreInfo>
                <SpotInfo>
                  <img alt="구장이미지준비중" src={matchCom.placeData?.image} />
                  <div>
                    <button
                      onClick={() =>
                        navigate(`/spotsdetail/${matchCom.placeData?.placesId}`)
                      }
                    >
                      {matchCom.matchData?.place}
                    </button>
                    <br />
                    <p>{matchCom.placeData?.address}</p>
                    <span>{matchCom.placeData?.price}</span>
                    <span>p</span>
                  </div>
                </SpotInfo>
                <hr />
                <MidTitle>
                  매칭대기
                  <span>
                    {matchCom.teamData?.sports !== "풋살장" && (
                      <>{matchCom.matchData?.isDouble ? "단식" : "복식"} 경기</>
                    )}
                  </span>
                </MidTitle>

                <WaitedMatch>
                  <MatchVS>
                    <div>나의팀</div>
                    <div>vs</div>
                    <div>상대팀</div>
                  </MatchVS>
                  <MatchVS>
                    <TeamInfoDetail>
                      <img alt="팀로고" src={matchCom.teamData?.image} />
                      <div>{matchCom.matchData?.teamName}</div>
                      <span>
                        {matchCom.teamData?.wins}승 / {matchCom.teamData?.lose}
                        패
                      </span>
                    </TeamInfoDetail>
                    <VS>
                      {matchCom.matchData?.member} :{" "}
                      {matchCom.matchData?.member}
                    </VS>

                    <TeamInfoDetail>
                      <img alt="팀로고" src={matchCom.opponent?.image} />
                      <div>{matchCom.opponent?.teamName}</div>
                      <span>
                        {matchCom.opponent?.wins}승 / {matchCom.opponent?.lose}
                        패
                      </span>
                    </TeamInfoDetail>
                  </MatchVS>
                </WaitedMatch>
                <CancleBtn
                  onClick={() =>
                    cancleMatchHandler(
                      matchCom.matchData?.matchId,
                      matchCom.matchData?.place,
                      matchCom.matchData?.teamName
                    )
                  }
                >
                  예약 취소
                </CancleBtn>
              </MyMatch2>
            );
          })}
        </CompletedMath>
      </MyReserve>
      <TapBar />
    </Layout>
  );
};

export default ReservPage;
