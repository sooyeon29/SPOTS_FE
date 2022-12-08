import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __exitMyMatch, __getMyMatch } from "../../redux/modules/matchSlice";
import Layout from "../../components/Layout";
import TapBar from "../../components/TapBar";
import FlexibleHeader from "../../components/FlexibleHeader";
import Swal from "sweetalert2";
import styled from "styled-components";

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
        <MyMatchList>나의 예약 리스트</MyMatchList>
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

const WaitedMatch = styled.div`
  margin-top: 20px;
  span {
    font-size: 16px;
    font-weight: 600;
  }
  hr {
    border: none;
    border-top: 1px dashed #1746c7;
    color: #1746c7;
    background-color: transparent;
    height: 1px;
    width: 100%;
  }
`;

const CompletedMath = styled.div`
  span {
    font-size: 16px;
    font-weight: 600;
  }
`;

const ReservedSpot = styled.div``;

const MyReserve = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 72px;
  margin-bottom: 72px;
  align-items: center;
`;

const AboutMatch = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const MoreInfo = styled.div`
  border: none;
  color: white;
  background-color: #1746c7;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
`;

const DayTime = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
`;

const ForMatch = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-weight: bold;
  font-size: 15px;
  margin: 20px 15px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    object-fit: cover;
    border: 2px solid #1746c7;
  }
`;

const SpotInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-right: 10px;
  button {
    color: #000;
  }
  img {
    width: 100px;
    margin: 15px 10px 5px 15px;
    border-radius: 10px;
  }
  div {
    padding: 5px;
    button {
      margin-top: 10px;
      margin-right: 25px;
      font-size: 20px;
      font-weight: bold;
      background-color: transparent;
      border: none;
    }
    p {
      margin: 5px;
    }
    span {
      margin-left: 6px;
    }

    span:last-child {
      margin-left: 0px;
      color: #49e7a5;
      padding: 1px 6px;
      text-align: center;
      border-radius: 50px;
      font-size: 14px;
      font-weight: 700;
      background-color: black;
      position: relative;
      z-index: 2;
      top: 1px;
      left: 8px;
    }
  }
`;

const CancleBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  text-align: center;
  margin: 0px 15px 15px auto;
  font-size: 14px;
  padding: 1px 12px;
  height: 38px;
  font-weight: bold;
  color: white;
  background-color: #ff00b4;
  border: none;
  border-radius: 20px;
`;

const MatchVS = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 5px auto 15px auto;
  div {
    width: 33%;
    text-align: center;
    font-weight: bold;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50px;
      object-fit: cover;
      border: 2px solid #1746c7;
    }
  }
`;

const MidTitle = styled.div`
  margin: 20px auto 0px 20px;
  font-weight: bold;
  span {
    font-weight: normal;
    margin-left: 5px;
    font-size: 14px;
  }
`;

const MyMatch2 = styled.div`
  background-color: transparent;
  margin-bottom: 10px;
  border: 1px solid #1746c7;
  border-radius: 11px;
`;

const VS = styled(MatchVS)`
  font-size: 30px;
`;

const TeamInfoDetail = styled.div`
  background-color: #f5f5f5;
  width: 50px;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  div {
    width: 100%;
    margin-top: 10px;
  }
  span {
    font-size: 12px;
    font-weight: normal;
  }
`;

const WaitTeam = styled(MatchVS)`
  img:last-child {
    border: none;
    border-radius: 10px;
    width: 80px;
    height: 90px;
  }
`;

const MyMatchList = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  padding-top: 15px;
  padding-bottom: 10px;
`;

const NoBookNow = styled.img`
  width: 100%;
  border-radius: 18px;
`;
