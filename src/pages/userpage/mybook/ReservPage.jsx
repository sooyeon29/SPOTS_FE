import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __exitMyMatch, __getMyMatch } from "../../../redux/modules/matchSlice";
import Layout from "../../../components/Layout";
import TapBar from "../../../components/TapBar";
import FlexibleHeader from "../../../components/FlexibleHeader";
import Swal from "sweetalert2";
import {
  WaitedMatch,
  CompletedMath,
  ReservedSpot,
  MyReserve,
  AboutMatch,
  MoreInfo,
  DayTime,
  ForMatch,
  SpotInfo,
  CancleBtn,
  MatchVS,
  MidTitle,
  MyMatch2,
  VS,
  TeamInfoDetail,
  WaitTeam,
  NoBookNow,
} from "./Styles";

const ReservPage = () => {
  const title = "나의 예약";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const myNoneMatches = useSelector(
    (state) => state.matcher?.mymatcher.noneMatchTotal
  );

  const myDoneMatches = useSelector(
    (state) => state.matcher?.mymatcher.doneMatchTotal
  );

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

  const matchWaiting = myNoneMatches?.filter(
    (myMatch) => myMatch.matchData?.matchId.substring(13, 20) === "ismatch"
  );

  if (!token) {
    Swal.fire({
      text: "나의 예약 리스트는 로그인 후 확인 가능합니다.",
      width: "300px",
      confirmButtonText: "로그인하러 가기",
      confirmButtonColor: "#40d295",
      showClass: { popup: "animated fadeInDown faster" },
      hideClass: { popup: "animated fadeOutUp faster" },
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.replace(`/login`);
      }
    });
  }

  return (
    <Layout>
      <FlexibleHeader title={title} />
      <MyReserve>
        <ReservedSpot>
          <AboutMatch>구장예약</AboutMatch>
          {spotReserve?.length === 0 && (
            <div>
              <NoBookNow alt="" src="/nobooknow.png" />
            </div>
          )}
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
                    <span>
                      {Number(matchCom.placeData?.price).toLocaleString(
                        "ko-KR"
                      )}
                    </span>
                    <span>P</span>
                  </div>
                </SpotInfo>
                <ForMatch>
                  <div>나의 팀</div>
                  {matchCom.teamData?.image === null ? (
                    <img alt="spots_logo" src="/myprofile_logo.png" />
                  ) : (
                    <img alt="팀로고" src={matchCom.teamData?.image} />
                  )}

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
          <AboutMatch>구장예약 / 팀 매칭 대기</AboutMatch>
          {matchWaiting?.length === 0 && (
            <div>
              <NoBookNow alt="" src="/nobooknow.png" />
            </div>
          )}
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
                    <span>
                      {Number(matchWait.placeData?.price).toLocaleString(
                        "ko-KR"
                      )}
                    </span>
                    <span>P</span>
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
                  <WaitTeam>
                    <TeamInfoDetail>
                      {matchWait.teamData?.image === null ? (
                        <img alt="spots_logo" src="/myprofile_logo.png" />
                      ) : (
                        <img alt="팀로고" src={matchWait.teamData?.image} />
                      )}

                      <div>{matchWait.matchData?.teamName}</div>
                    </TeamInfoDetail>
                    <VS>
                      {matchWait.matchData?.member} :{" "}
                      {matchWait.matchData?.member}
                    </VS>

                    <div>
                      <img alt="" src="/waitgroup.png" />
                    </div>
                  </WaitTeam>
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
          <AboutMatch>구장예약 / 팀 매칭완료</AboutMatch>
          {myDoneMatches?.length === 0 && (
            <div>
              <NoBookNow alt="" src="/nobooknow.png" />
            </div>
          )}
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
                    <span>
                      {Number(matchCom.placeData?.price).toLocaleString(
                        "ko-KR"
                      )}
                    </span>
                    <span>P</span>
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
                      {matchCom.teamData?.image === null ? (
                        <img alt="spots_logo" src="/myprofile_logo.png" />
                      ) : (
                        <img alt="팀로고" src={matchCom.teamData?.image} />
                      )}
                      <div>{matchCom.matchData?.teamName}</div>
                    </TeamInfoDetail>
                    <VS>
                      {matchCom.matchData?.member} :{" "}
                      {matchCom.matchData?.member}
                    </VS>

                    <TeamInfoDetail>
                      {matchCom.opponent?.image === null ? (
                        <img alt="spots_logo" src="/myprofile_logo.png" />
                      ) : (
                        <img alt="팀로고" src={matchCom.opponent?.image} />
                      )}

                      <div>{matchCom.opponent?.teamName}</div>
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
