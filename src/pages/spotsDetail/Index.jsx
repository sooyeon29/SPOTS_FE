import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../components/Layout";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
import { __getMyInfo, __getMyteamList } from "../../redux/modules/userSlice";
import {
  BookMatch,
  CalTime,
  Team,
  Title,
  Times,
  Time,
  SelectTeam,
  Pick,
  One,
  Two,
  SpotPhoto,
  MoreInfo,
  Sports,
  PlaceInfo,
  Calen,
  TeamSelect,
  SelectDone,
  Counter,
  SelectChoice,
  FinalBooking,
  WrapAll,
  SelectDone2,
} from "./Styles";
import {
  __getAllMatch,
  __postSpotsMatch,
} from "../../redux/modules/matchSlice";
import { useNavigate, useParams } from "react-router-dom";
import { __getPrivateSpot } from "../../redux/modules/spotsSlice";
import TapBar from "../../components/TapBar";
import FlexibleHeader from "../../components/FlexibleHeader";

const SpotsDetail = () => {
  const title = "예약";
  const myTime = [
    "06:00 - 08:00",
    "08:00 - 10:00",
    "10:00 - 12:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "18:00 - 20:00",
    "20:00 - 22:00",
  ];
  const [toggle, setToggel, clickedToggle] = useToggle();
  const [toggleTwo, setToggleTwo, clickedToggleTwo] = useToggle();
  const [toggleThree, setToggleThree, clickedToggleThree] = useToggle();

  // 리스트 중에서 선택한 place를 가져온다 파람값으로 비교해 필터해준다
  const { id } = useParams();
  const placeList = useSelector((state) => state?.spots.privateSpot);

  const selectSpot = placeList?.filter((place) => {
    return place.placesId === parseInt(id);
  });

  // 1. 예약을 원하는 날짜를 선택한다
  // --> 달력에 선택하는 날짜가 선택됨
  const [startDate, setStartDate] = useState(null);

  const todayMatchList = useSelector((state) => state?.matcher.matcher);
  console.log(todayMatchList);
  // 2. 시간과 팀을 선택한다(팀1-a, 팀2-b) => 이것으로 matchId를 만들어줄 예정이다
  const [pickedTime, setPickedTime] = useState("");
  const [pickedTime2, setPickedTime2] = useState("");
  // 예약 시간,팀 선택시 해당 포인트 확인됨
  const [payAPrice, setPayAPrice] = useState(0);
  const [payBPrice, setPayBPrice] = useState(0);

  // ---> 호스트 페이지에 업로드하고 보여주는 것을 완료하면 이 포스트아이디값을 하나 더 받아서 아이디를 만드는데 더해준다
  //=> a팀을 선택한 경우
  const teamPick = (time, price) => {
    console.log(myTime[time], "*********************");
    setPickedTime(myTime[time]);
    setPayAPrice(price);
    setToggleTwo(false);
  };
  const exitNoMatch = () => {
    setPickedTime("");
    setToggleTwo(false);
  };

  const teamPick2 = (time, price) => {
    console.log(myTime[time], "*********************");
    setPickedTime2(myTime[time]);
    setPayAPrice(price);
    setToggleThree(false);
  };
  const exitNoMatch2 = () => {
    setPickedTime2("");
    setToggleThree(false);
  };

  // 3.단식경기를할지 복식경기를 할지 선택하기
  const [isTwo, setIsTwo, pickTwoHandler] = useToggle();
  // 단식 복식 선택하여 세션스토리지에 저장

  // 4. 나의 팀중에서 하나를 선택한다 ( 나의 정보에서 가져온다)
  // 내 포인트도 가져와주었다(결제를 위해 밑에서 사용할예정이다 -> patch이용할것)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getMyteamList());
    dispatch(__getMyInfo());
    dispatch(__getPrivateSpot());
  }, []);

  const [myTeam, setMyTeam, pickMyTeam] = useInput();
  // 팀이 없더라도 오류가 나지 않도록 옵셔널 체이닝을 사용한다. 세션스토리지에 저장해준다
  const myTeams = useSelector((state) => state.user.team);

  // 5. 경기에 참가할 인원수를 작성해준다.
  const [count, setCount] = useState(0);

  // @@++나의 포인트를 가져와 주었다 이것으로 계산할꺼다 ++@@
  // 아래 예약하기 핸들러를 눌러 patch도 위의 post들과 함께 보내줄꺼다
  const { user } = useSelector((state) => state.user);
  const myPoint = user.point;

  // 모든것을 선택하고 예약하기 버튼을 드디어 눌렀다!!! 서버로 post 해주자!
  // const bookDate = JSON.stringify(startDate).substring(1, 11);
  const bookDate = startDate?.toLocaleDateString().substring(0, 12);
  console.log(pickedTime);
  const navigate = useNavigate();
  // 매칭없이 예약하기
  const bookWithNoMatch = (name) => {
    // console.log('고른시간', pickedTime + 'nomatch' + startDate + name);
    // return;
    dispatch(
      __postSpotsMatch({
        place: name,
        date: bookDate,
        matchId: pickedTime + "nomatch" + startDate + name,
        isDouble: isTwo,
        teamName: myTeam?.myteam,
        member: count,
        price: payAPrice + payBPrice,
      })
    );
  };
  const [forMatch, setForMatch, matchHandler] = useToggle();

  // 팀 매칭
  const bookMyMatch = (name) => {
    dispatch(
      __postSpotsMatch({
        place: name,
        date: bookDate,
        matchId: pickedTime2 + "ismatch" + startDate + name,
        isDouble: isTwo,
        teamName: myTeam?.myteam,
        member: count,
        price: payAPrice + payBPrice,
      })
    );
  };

  const pickDateHandler = (date, name) => {
    setStartDate(date);
    // const bookDate = JSON.stringify(date).substring(1, 11);
    const bookDate = date?.toLocaleDateString().substring(0, 12);
    dispatch(
      __getAllMatch({
        place: name,
        date: bookDate,
      })
    );
    setToggel(false);
  };

  // 해당구장 해당일에 신청된 매치 불러오기
  const allMatchToday = useSelector((state) => state?.matcher.matcher);
  console.log("allMatch", allMatchToday);

  // 구장 예약이 된경우
  const reservedSpotTimeSlots = allMatchToday
    .filter((match) => match.matchId.substring(13, 20) === "nomatch")
    .map((match) => match.matchId.substring(0, 13))
    .reduce((a, c) => {
      const newObj = { ...a };
      newObj[c] = true;
      return newObj;
    }, {});

  let completeTimeSlots = [];
  let inCompleteTimeSlots = [];
  let allMatchingSlots = allMatchToday
    .filter((match) => match.matchId.substring(13, 20) === "ismatch")
    .map((match) => match.matchId.substring(0, 13))
    .reduce((prevObj, c) => {
      if (c in prevObj) {
        prevObj[c] += 1;
      }
      const newObj = { ...prevObj };
      newObj[c] = 1;
      return newObj;
    }, {});

  console.log("------", allMatchingSlots);

  for (let [key, value] of Object.entries(allMatchingSlots)) {
    if (value === 1) {
      inCompleteTimeSlots.push(key);
    } else {
      completeTimeSlots.push(key);
    }
  }

  console.log("done", completeTimeSlots);
  console.log("not done", inCompleteTimeSlots);
  console.log("all", reservedSpotTimeSlots);

  return (
    <>
      <Layout>
        <FlexibleHeader title={title} />
        {selectSpot?.map((spot, idx) => {
          return (
            <WrapAll key={idx}>
              <Sports>
                {spot.sports === "풋살장" && <>⚽</>}
                {spot.sports === "테니스장" && <>🥎</>}
                {spot.sports === "배드민턴장" && <>🏸</>}
                {spot.sports}
              </Sports>
              <SpotPhoto>
                <img alt="" src={spot.image} />
              </SpotPhoto>
              <PlaceInfo>
                <Title>{spot.spotName}</Title>
                <div>{spot.address}</div>
                <div>{spot.desc}</div>

                <MoreInfo>
                  <li>시설 현황</li>
                  <div>
                    <div>
                      {spot.spotKind === "실내 스팟" && <>🪴</>}
                      {spot.spotKind === "실외 스팟" && <>🌳</>}
                      {spot.spotKind}
                    </div>
                    <div>👍 {spot.comforts}</div>
                  </div>
                  <div>💰이용료 {spot.price}포인트</div>
                </MoreInfo>
              </PlaceInfo>
              {toggle && (
                <Calen>
                  <ReactDatePicker
                    locale={ko}
                    selected={startDate}
                    onChange={(date) => pickDateHandler(date, spot.spotName)}
                    inline
                    required
                  />
                </Calen>
              )}
              {!toggle && (
                <SelectDone>
                  <button onClick={clickedToggle}>
                    <div>날짜를 선택해 주세요</div>
                    <div>[ 선택 날짜 {bookDate}]</div>
                  </button>
                </SelectDone>
              )}

              {toggleTwo && (
                <CalTime>
                  <Times>
                    <button
                      disabled={
                        myTime[0] in reservedSpotTimeSlots ||
                        inCompleteTimeSlots.includes(myTime[0])
                      }
                      onClick={() => teamPick(0, spot.price)}
                    >
                      {myTime[0]}
                    </button>
                    <button
                      disabled={
                        myTime[1] in reservedSpotTimeSlots ||
                        inCompleteTimeSlots.includes(myTime[1])
                      }
                      onClick={() => teamPick(1, spot.price)}
                    >
                      {myTime[1]}
                    </button>
                    <button
                      disabled={
                        myTime[2] in reservedSpotTimeSlots ||
                        inCompleteTimeSlots.includes(myTime[2])
                      }
                      onClick={() => teamPick(2, spot.price)}
                    >
                      {myTime[2]}
                    </button>
                    <button
                      disabled={
                        myTime[3] in reservedSpotTimeSlots ||
                        inCompleteTimeSlots.includes(myTime[3])
                      }
                      onClick={() => teamPick(3, spot.price)}
                    >
                      {myTime[3]}
                    </button>
                    <button
                      disabled={
                        myTime[4] in reservedSpotTimeSlots ||
                        inCompleteTimeSlots.includes(myTime[4])
                      }
                      onClick={() => teamPick(4, spot.price)}
                    >
                      {myTime[4]}
                    </button>
                    <button
                      disabled={
                        myTime[5] in reservedSpotTimeSlots ||
                        inCompleteTimeSlots.includes(myTime[5])
                      }
                      onClick={() => teamPick(5, spot.price)}
                    >
                      {myTime[5]}
                    </button>
                    <button
                      disabled={
                        myTime[6] in reservedSpotTimeSlots ||
                        inCompleteTimeSlots.includes(myTime[6])
                      }
                      onClick={() => teamPick(6, spot.price)}
                    >
                      {myTime[6]}
                    </button>
                    <button
                      disabled={
                        myTime[7] in reservedSpotTimeSlots ||
                        inCompleteTimeSlots.includes(myTime[7])
                      }
                      onClick={() => teamPick(7, spot.price)}
                    >
                      {myTime[7]}
                    </button>
                  </Times>
                  <Pick>
                    <One onClick={clickedToggleTwo}>닫기</One>
                    <One onClick={exitNoMatch}>취소하기</One>
                  </Pick>
                </CalTime>
              )}
              {!toggleTwo && (
                <SelectDone2>
                  <button
                    disabled={bookDate === undefined || pickedTime2 !== ""}
                    onClick={() => {
                      clickedToggleTwo();
                      setToggleThree(false);
                    }}
                  >
                    <div>구장 예약하기</div>
                    <div>[ 선택 시간 {pickedTime} ]</div>
                  </button>
                </SelectDone2>
              )}

              {toggleThree && (
                <CalTime>
                  <SelectTeam>
                    <BookMatch>
                      <Time>{myTime[0]}</Time>
                      <Team
                        disabled={
                          inCompleteTimeSlots.includes(myTime[0]) ||
                          completeTimeSlots.includes(myTime[0]) ||
                          myTime[0] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(0, spot.price / 2)}
                      >
                        팀1
                      </Team>
                      vs
                      <Team
                        disabled={
                          completeTimeSlots.includes(myTime[0]) ||
                          myTime[0] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(0, spot.price / 2)}
                      >
                        팀2
                      </Team>
                    </BookMatch>
                    <BookMatch>
                      <Time>{myTime[1]}</Time>
                      <Team
                        disabled={
                          inCompleteTimeSlots.includes(myTime[1]) ||
                          completeTimeSlots.includes(myTime[1]) ||
                          myTime[1] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(1, spot.price / 2)}
                      >
                        팀1
                      </Team>
                      vs
                      <Team
                        disabled={
                          completeTimeSlots.includes(myTime[1]) ||
                          myTime[1] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(1, spot.price / 2)}
                      >
                        팀2
                      </Team>
                    </BookMatch>
                    <BookMatch>
                      <Time>{myTime[2]}</Time>
                      <Team
                        disabled={
                          inCompleteTimeSlots.includes(myTime[2]) ||
                          completeTimeSlots.includes(myTime[2]) ||
                          myTime[2] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(2, spot.price / 2)}
                      >
                        팀1
                      </Team>
                      vs
                      <Team
                        disabled={
                          completeTimeSlots.includes(myTime[2]) ||
                          myTime[2] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(2, spot.price / 2)}
                      >
                        팀2
                      </Team>
                    </BookMatch>
                    <BookMatch>
                      <Time>{myTime[3]}</Time>
                      <Team
                        disabled={
                          inCompleteTimeSlots.includes(myTime[3]) ||
                          completeTimeSlots.includes(myTime[3]) ||
                          myTime[3] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(3, spot.price / 2)}
                      >
                        팀1
                      </Team>
                      vs
                      <Team
                        disabled={
                          completeTimeSlots.includes(myTime[3]) ||
                          myTime[3] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(3, spot.price / 2)}
                      >
                        팀2
                      </Team>
                    </BookMatch>
                    <BookMatch>
                      <Time>{myTime[4]}</Time>
                      <Team
                        disabled={
                          inCompleteTimeSlots.includes(myTime[4]) ||
                          completeTimeSlots.includes(myTime[4]) ||
                          myTime[4] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(4, spot.price / 2)}
                      >
                        팀1
                      </Team>
                      vs
                      <Team
                        disabled={
                          completeTimeSlots.includes(myTime[4]) ||
                          myTime[4] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(4, spot.price / 2)}
                      >
                        팀2
                      </Team>
                    </BookMatch>
                    <BookMatch>
                      <Time>{myTime[5]}</Time>
                      <Team
                        disabled={
                          inCompleteTimeSlots.includes(myTime[5]) ||
                          completeTimeSlots.includes(myTime[5]) ||
                          myTime[5] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(5, spot.price / 2)}
                      >
                        팀1
                      </Team>
                      vs
                      <Team
                        disabled={
                          completeTimeSlots.includes(myTime[5]) ||
                          myTime[5] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(5, spot.price / 2)}
                      >
                        팀2
                      </Team>
                    </BookMatch>
                    <BookMatch>
                      <Time>{myTime[6]}</Time>
                      <Team
                        disabled={
                          inCompleteTimeSlots.includes(myTime[6]) ||
                          completeTimeSlots.includes(myTime[6]) ||
                          myTime[6] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(6, spot.price / 2)}
                      >
                        팀1
                      </Team>
                      vs
                      <Team
                        disabled={
                          completeTimeSlots.includes(myTime[6]) ||
                          myTime[6] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(6, spot.price / 2)}
                      >
                        팀2
                      </Team>
                    </BookMatch>
                    <BookMatch>
                      <Time>{myTime[7]}</Time>
                      <Team
                        disabled={
                          inCompleteTimeSlots.includes(myTime[7]) ||
                          completeTimeSlots.includes(myTime[7]) ||
                          myTime[7] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(7, spot.price / 2)}
                      >
                        팀1
                      </Team>
                      vs
                      <Team
                        disabled={
                          completeTimeSlots.includes(myTime[7]) ||
                          myTime[7] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(7, spot.price / 2)}
                      >
                        팀2
                      </Team>
                    </BookMatch>
                  </SelectTeam>
                  <Pick>
                    <One onClick={clickedToggleThree}>닫기</One>
                    <One onClick={exitNoMatch2}>취소하기</One>
                  </Pick>
                </CalTime>
              )}

              {!toggleThree && (
                <SelectDone2>
                  <button
                    disabled={bookDate === undefined || pickedTime !== ""}
                    onClick={() => {
                      clickedToggleThree();
                      setToggleTwo(false);
                    }}
                  >
                    <div>팀매칭 예약하기</div>
                    <div>[ 선택 시간 {pickedTime2} ]</div>
                  </button>
                </SelectDone2>
              )}

              <SelectChoice>
                <TeamSelect
                  name="myteam"
                  required
                  value={myTeam?.teamName}
                  onChange={pickMyTeam}
                >
                  <option>---선택하기---</option>
                  {myTeams?.map((myTeam) => {
                    return (
                      <option key={myTeam.teamId} value={myTeam.teamName}>
                        {myTeam.teamName}
                      </option>
                    );
                  })}
                </TeamSelect>
                <Counter>
                  {count === 0 ? (
                    <button disabled onClick={() => setCount(count - 1)}>
                      -
                    </button>
                  ) : (
                    <button onClick={() => setCount(count - 1)}>-</button>
                  )}
                  <span>{count}</span>
                  <button onClick={() => setCount(count + 1)}>+</button>
                </Counter>
              </SelectChoice>

              {forMatch && !isTwo && spot.sports !== "풋살장" && (
                <Pick>
                  <One onClick={pickTwoHandler}>단식</One>
                  <Two onClick={pickTwoHandler}>복식</Two>
                </Pick>
              )}
              {forMatch && isTwo && spot.sports !== "풋살장" && (
                <Pick>
                  <Two onClick={pickTwoHandler}>단식</Two>
                  <One onClick={pickTwoHandler}>복식</One>
                </Pick>
              )}

              <CalTime>
                <p>잔여포인트: {myPoint} point</p>
                <span>예약포인트: {payAPrice + payBPrice} point</span>

                {myPoint > payAPrice + payBPrice ? (
                  <p>결제후포인트: {myPoint - payAPrice + payBPrice} point</p>
                ) : (
                  <p>
                    충전이 필요한 포인트: {payAPrice + payBPrice - myPoint}
                    point
                  </p>
                )}
              </CalTime>
              {pickedTime !== "" ? (
                <FinalBooking onClick={() => bookWithNoMatch(spot.spotName)}>
                  구장 예약하기
                </FinalBooking>
              ) : null}
              {pickedTime2 !== "" ? (
                <FinalBooking onClick={() => bookMyMatch(spot.spotName)}>
                  매칭 예약하기
                </FinalBooking>
              ) : null}
            </WrapAll>
          );
        })}
        <TapBar />
      </Layout>
    </>
  );
};

export default SpotsDetail;
