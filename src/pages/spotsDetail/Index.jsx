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
  __getAllMatch,
  __getOkMatch,
  __postSpotsMatch,
} from "../../redux/modules/matchSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { __getPrivateSpot } from "../../redux/modules/spotsSlice";
import TapBar from "../../components/TapBar";
import FlexibleHeader from "../../components/FlexibleHeader";
import { subDays } from "date-fns";
import {
  BookMatch,
  Calen,
  CalTime,
  Counter,
  Email,
  EmailInput,
  FinalBooking,
  MakeTeam,
  MatchList,
  MatchOrNot,
  MoreInfo,
  One,
  Pick,
  PlaceInfo,
  SelectDone,
  SelectDone2,
  SelectDone3,
  SelectTeam,
  Sports,
  SpotPhoto,
  Team,
  TeamSelect,
  Time,
  Times,
  Title,
  Two,
  WaitingMatch,
  WaitingMatch2,
  WrapAll,
} from "./Styles";

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
  const { id } = useParams();
  const [toggle, setToggel, clickedToggle] = useToggle();
  const [toggleTwo, setToggleTwo, clickedToggleTwo] = useToggle();
  const [toggleThree, setToggleThree, clickedToggleThree] = useToggle();
  const [email, setEmail] = useState("");
  // 리스트 중에서 선택한 place를 가져온다 파람값으로 비교해 필터해준다
  console.log("이메일", email);
  const placeList = useSelector((state) => state?.spots.privateSpot);

  const selectSpot = placeList?.filter((place) => {
    return place.placesId === parseInt(id);
  });
  console.log("이구장정보", selectSpot);
  // 1. 예약을 원하는 날짜를 선택한다
  // --> 달력에 선택하는 날짜가 선택됨
  const [startDate, setStartDate] = useState(null);

  // const todayMatchList = useSelector((state) => state?.matcher?.matcher);
  // console.log(todayMatchList);
  // 2. 시간과 팀을 선택한다(TEAM A-a, TEAM B-b) => 이것으로 matchId를 만들어줄 예정이다
  const [pickedTime, setPickedTime] = useState("");
  const [pickedTime2, setPickedTime2] = useState("");
  // 예약 시간,팀 선택시 해당 포인트 확인됨
  const [payAPrice, setPayAPrice] = useState(0);
  const [payBPrice, setPayBPrice] = useState(0);

  // const [color, setColor] = useState("white");
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
    // color === "white" ? setColor("#1B2754") : setColor("white");
    // setToggleThree(false);
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
  const myTeams = useSelector((state) => state?.user.team);
  console.log("내팀들", myTeams);

  // 5. 경기에 참가할 인원수를 작성해준다.
  const [count, setCount] = useState(0);

  // @@++나의 포인트를 가져와 주었다 이것으로 계산할꺼다 ++@@
  // 아래 예약하기 핸들러를 눌러 patch도 위의 post들과 함께 보내줄꺼다
  const { user } = useSelector((state) => state.user);
  let myPoint = user.point;

  // 모든것을 선택하고 예약하기 버튼을 드디어 눌렀다!!! 서버로 post 해주자!
  const bookDate = startDate?.toLocaleDateString().substring(0, 12);
  console.log(pickedTime);
  const navigate = useNavigate();
  // 매칭없이 예약하기
  const bookWithNoMatch = (name) => {
    dispatch(
      __postSpotsMatch({
        place: name,
        date: bookDate,
        matchId: pickedTime + "nomatch" + startDate + name,
        isDouble: isTwo,
        teamName: myTeam?.myteam,
        member: count,
        price: payAPrice + payBPrice,
        email: email,
      })
    );
  };

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
        email: email,
      })
    );
  };

  const pickDateHandler = (date, name) => {
    setStartDate(date);
    const bookDate = date?.toLocaleDateString().substring(0, 12);
    dispatch(
      __getAllMatch({
        place: name,
        date: bookDate,
      })
    );
    dispatch(
      __getOkMatch({
        place: name,
        date: bookDate,
      })
    );

    setToggel(false);
  };

  const exitDate = () => {
    setStartDate(null);
    setToggel(false);
  };
  // 해당구장 해당일에 신청된 매치 불러오기
  const allMatchToday = useSelector((state) => state?.matcher.allmatcher);
  console.log("allMatch", allMatchToday);
  // 매칭이 완료되지 않은 리스트 (구장예약건들도 들어있음)

  const noneMatchToday = useSelector((state) => state?.matcher.newmatcher);
  console.log("매칭전배열(구장&매칭전 모두들어있음)", noneMatchToday);

  const waitMatchToday = noneMatchToday.filter(
    (match) => match.matchId?.substring(13, 20) === "ismatch"
  );
  console.log("매칭대기팀들:", waitMatchToday);

  // 구장 예약이 된경우
  const reservedSpotTimeSlots = allMatchToday
    .filter((match) => match.matchId?.substring(13, 20) === "nomatch")
    .map((match) => match.matchId?.substring(0, 13))
    .reduce((a, c) => {
      const newObj = { ...a };
      newObj[c] = true;
      return newObj;
    }, {});

  let completeTimeSlots = [];
  let inCompleteTimeSlots = [];
  let allMatchingSlots = allMatchToday
    .filter((match) => match.matchId?.substring(13, 20) === "ismatch")
    .map((match) => match.matchId?.substring(0, 13))
    .reduce((prevObj, c) => {
      if (c in prevObj) {
        prevObj[c] += 1;
        return prevObj;
      } else {
        const newObj = { ...prevObj };
        newObj[c] = 1;
        return newObj;
      }
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
  console.log("로그인안했을때포인트", myPoint);

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
                      {spot.spotKind === "실내" && (
                        <img alt="" src="house.png" width="16px" />
                      )}
                      {spot.spotKind === "실외" && (
                        <img alt="" src="/outside.png" width="16px" />
                      )}
                      {spot.spotKind}
                    </div>
                    <div>
                      <img alt="" src="/check.png" width="20px" />
                      {spot.comforts}
                    </div>
                  </div>
                  <div>
                    <img alt="" src="/point.png" width="20px" />
                    {Number(spot.price).toLocaleString("ko-KR")} 포인트
                  </div>
                </MoreInfo>
              </PlaceInfo>
              {toggle && (
                <Calen>
                  <ReactDatePicker
                    locale={ko}
                    selected={startDate}
                    onChange={(date) => pickDateHandler(date, spot.spotName)}
                    excludeDateIntervals={[
                      {
                        start: subDays(new Date(), 100),
                        end: subDays(new Date(), 1),
                      },
                    ]}
                    inline
                    required
                  />
                  <Pick>
                    <One
                      onClick={() => {
                        clickedToggle();
                        setToggleTwo(false);
                        setToggleThree(false);
                      }}
                    >
                      선택완료
                    </One>
                    <One onClick={exitDate}>선택취소</One>
                  </Pick>
                </Calen>
              )}
              {!toggle && (
                <SelectDone>
                  <button onClick={clickedToggle}>
                    <div>날짜를 선택해주세요</div>
                    <div>[ 선택 날짜 {bookDate} ]</div>
                  </button>
                </SelectDone>
              )}
              {toggleTwo && (
                <CalTime>
                  <Times>
                    <img alt="" src="/matching/blackgroup.png" />
                    우리 팀끼리 사용하기
                  </Times>
                  <Times>
                    <button
                      disabled={
                        myTime[0] in reservedSpotTimeSlots ||
                        inCompleteTimeSlots.includes(myTime[0]) ||
                        completeTimeSlots.includes(myTime[0])
                      }
                      onClick={() => teamPick(0, spot.price)}
                    >
                      {myTime[0]}
                    </button>
                    <button
                      disabled={
                        myTime[1] in reservedSpotTimeSlots ||
                        inCompleteTimeSlots.includes(myTime[1]) ||
                        completeTimeSlots.includes(myTime[1])
                      }
                      onClick={() => teamPick(1, spot.price)}
                    >
                      {myTime[1]}
                    </button>
                    <button
                      disabled={
                        myTime[2] in reservedSpotTimeSlots ||
                        inCompleteTimeSlots.includes(myTime[2]) ||
                        completeTimeSlots.includes(myTime[2])
                      }
                      onClick={() => teamPick(2, spot.price)}
                    >
                      {myTime[2]}
                    </button>
                    <button
                      disabled={
                        myTime[3] in reservedSpotTimeSlots ||
                        inCompleteTimeSlots.includes(myTime[3]) ||
                        completeTimeSlots.includes(myTime[3])
                      }
                      onClick={() => teamPick(3, spot.price)}
                    >
                      {myTime[3]}
                    </button>
                    <button
                      disabled={
                        myTime[4] in reservedSpotTimeSlots ||
                        inCompleteTimeSlots.includes(myTime[4]) ||
                        completeTimeSlots.includes(myTime[4])
                      }
                      onClick={() => teamPick(4, spot.price)}
                    >
                      {myTime[4]}
                    </button>
                    <button
                      disabled={
                        myTime[5] in reservedSpotTimeSlots ||
                        inCompleteTimeSlots.includes(myTime[5]) ||
                        completeTimeSlots.includes(myTime[5])
                      }
                      onClick={() => teamPick(5, spot.price)}
                    >
                      {myTime[5]}
                    </button>
                    <button
                      disabled={
                        myTime[6] in reservedSpotTimeSlots ||
                        inCompleteTimeSlots.includes(myTime[6]) ||
                        completeTimeSlots.includes(myTime[6])
                      }
                      onClick={() => teamPick(6, spot.price)}
                    >
                      {myTime[6]}
                    </button>
                    <button
                      disabled={
                        myTime[7] in reservedSpotTimeSlots ||
                        inCompleteTimeSlots.includes(myTime[7]) ||
                        completeTimeSlots.includes(myTime[7])
                      }
                      onClick={() => teamPick(7, spot.price)}
                    >
                      {myTime[7]}
                    </button>
                  </Times>
                  <Pick>
                    <One onClick={clickedToggleTwo}>선택완료</One>
                    <One onClick={exitNoMatch}>선택취소</One>
                  </Pick>
                </CalTime>
              )}
              {toggleThree && (
                <CalTime>
                  <SelectTeam>
                    <BookMatch>
                      <img alt="" src="/matching/blackgroup.png" />
                      vs
                      <img alt="" src="/matching/blackgroup.png" />
                      다른 팀과 경기하기
                    </BookMatch>
                    <BookMatch>
                      <Time>{myTime[0]}</Time>
                      <Team
                        disabled={
                          inCompleteTimeSlots.includes(myTime[0]) ||
                          completeTimeSlots.includes(myTime[0]) ||
                          myTime[0] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(0, spot.price / 2)}
                        // color={color}
                      >
                        TEAM A
                      </Team>
                      <Team
                        disabled={
                          completeTimeSlots.includes(myTime[0]) ||
                          myTime[0] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(0, spot.price / 2)}
                      >
                        TEAM B
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
                        TEAM A
                      </Team>
                      <Team
                        disabled={
                          completeTimeSlots.includes(myTime[1]) ||
                          myTime[1] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(1, spot.price / 2)}
                      >
                        TEAM B
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
                        TEAM A
                      </Team>
                      <Team
                        disabled={
                          completeTimeSlots.includes(myTime[2]) ||
                          myTime[2] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(2, spot.price / 2)}
                      >
                        TEAM B
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
                        TEAM A
                      </Team>
                      <Team
                        disabled={
                          completeTimeSlots.includes(myTime[3]) ||
                          myTime[3] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(3, spot.price / 2)}
                      >
                        TEAM B
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
                        TEAM A
                      </Team>
                      <Team
                        disabled={
                          completeTimeSlots.includes(myTime[4]) ||
                          myTime[4] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(4, spot.price / 2)}
                      >
                        TEAM B
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
                        TEAM A
                      </Team>
                      <Team
                        disabled={
                          completeTimeSlots.includes(myTime[5]) ||
                          myTime[5] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(5, spot.price / 2)}
                      >
                        TEAM B
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
                        TEAM A
                      </Team>
                      <Team
                        disabled={
                          completeTimeSlots.includes(myTime[6]) ||
                          myTime[6] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(6, spot.price / 2)}
                      >
                        TEAM B
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
                        TEAM A
                      </Team>
                      <Team
                        disabled={
                          completeTimeSlots.includes(myTime[7]) ||
                          myTime[7] in reservedSpotTimeSlots
                        }
                        onClick={() => teamPick2(7, spot.price / 2)}
                      >
                        TEAM B
                      </Team>
                    </BookMatch>
                    <MatchList>
                      {waitMatchToday.map((waitMatch) => {
                        return (
                          <>
                            {pickedTime2 !==
                              waitMatch.matchId.substring(0, 13) && (
                              <WaitingMatch key={waitMatch.reservationId}>
                                <div>
                                  <span>
                                    {waitMatch.matchId.substring(0, 13)}
                                  </span>
                                  <span>Team A</span>
                                  <img alt="" src="/graygroup.png" />
                                  <span>
                                    {waitMatch.teamName.substring(0, 6)}
                                  </span>

                                  {spot.sports !== "풋살장" && (
                                    <span>
                                      {!waitMatch.isDoubled ? "복식" : "단식"}{" "}
                                      경기
                                    </span>
                                  )}
                                </div>
                                <div>{waitMatch.member}명</div>
                              </WaitingMatch>
                            )}
                            {pickedTime2 ===
                              waitMatch.matchId.substring(0, 13) && (
                              <WaitingMatch2 key={waitMatch.reservationId}>
                                <div>
                                  <span>
                                    {waitMatch.matchId.substring(0, 13)}
                                  </span>
                                  <span>Team A</span>
                                  <img alt="" src="/whitegroup.png" />
                                  <span>{waitMatch.teamName}</span>

                                  {spot.sports !== "풋살장" && (
                                    <span>
                                      {!waitMatch.isDoubled ? "복식" : "단식"}{" "}
                                      경기
                                    </span>
                                  )}
                                </div>
                                <div>{waitMatch.member}명</div>
                              </WaitingMatch2>
                            )}
                          </>
                        );
                      })}
                    </MatchList>
                  </SelectTeam>
                  <Pick>
                    <One onClick={clickedToggleThree}>선택완료</One>
                    <One onClick={exitNoMatch2}>선택취소</One>
                  </Pick>
                </CalTime>
              )}
              <MatchOrNot>
                {!toggleTwo && (
                  <SelectDone2
                    disabled={bookDate === undefined || pickedTime2 !== ""}
                    onClick={() => {
                      clickedToggleTwo();
                      setToggel(false);
                      setToggleThree(false);
                    }}
                  ></SelectDone2>
                )}
                {!toggleThree && (
                  <SelectDone3
                    // >
                    // <button
                    disabled={bookDate === undefined || pickedTime !== ""}
                    onClick={() => {
                      clickedToggleThree();
                      setToggleTwo(false);
                      setToggel(false);
                    }}
                  ></SelectDone3>
                )}
              </MatchOrNot>
              {pickedTime !== "" && bookDate !== undefined && (
                <>
                  <SelectDone>
                    <div>[ 선택 시간 {pickedTime} ]</div>
                  </SelectDone>
                  <Email>
                    * 구장을 이용하고자 하는 나의 팀과 인원수를 선택해주세요
                  </Email>
                </>
              )}
              {pickedTime2 !== "" && bookDate !== undefined && (
                <>
                  <SelectDone>
                    <div>[ 선택 시간 {pickedTime2} ]</div>
                  </SelectDone>
                  <Email>
                    * 상대팀과 경기 참가 인원 같아야 매칭 예약이 가능합니다.
                  </Email>
                </>
              )}
              <MakeTeam>
                아직 나의
                <span>
                  {spot.sports === "풋살장" && <>풋살</>}
                  {spot.sports === "테니스장" && <>테니스</>}
                  {spot.sports === "배드민턴장" && <>배드민턴</>}팀
                </span>
                이 없다면!
                <Link
                  to="/teamregister"
                  style={{
                    color: "black",
                    fontWeight: "700",
                    // textDecoration: "none",
                    marginLeft: "10px",
                  }}
                >
                  만들러 가기
                </Link>
                👉
              </MakeTeam>
              <TeamSelect
                name="myteam"
                required
                value={myTeam?.teamName}
                onChange={pickMyTeam}
                onClick={() => setToggleThree(false)}
              >
                <option> 예약할 나의 팀 선택 </option>

                {myTeams
                  ?.filter(
                    (thisSpotTeam) => thisSpotTeam.sports === spot.sports
                  )
                  .map((myTeam) => {
                    return (
                      <option key={myTeam.teamId} value={myTeam.teamName}>
                        {myTeam.teamName}
                      </option>
                    );
                  })}
              </TeamSelect>
              {pickedTime2 !== "" && !isTwo && spot.sports !== "풋살장" && (
                <Pick>
                  <One onClick={pickTwoHandler}>단식</One>
                  <Two onClick={pickTwoHandler}>복식</Two>
                </Pick>
              )}
              {pickedTime2 !== "" && isTwo && spot.sports !== "풋살장" && (
                <Pick>
                  <Two onClick={pickTwoHandler}>단식</Two>
                  <One onClick={pickTwoHandler}>복식</One>
                </Pick>
              )}
              <Counter>
                <div>경기 참가 인원</div>
                <div>
                  {count === 0 ? (
                    <button disabled onClick={() => setCount(count - 1)}>
                      -
                    </button>
                  ) : (
                    <button onClick={() => setCount(count - 1)}>-</button>
                  )}
                  <input
                    type="text"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      setCount(count + 1);
                      setToggleThree(false);
                    }}
                  >
                    +
                  </button>
                </div>
              </Counter>
              {count >= 1 && (
                <>
                  <Email>* 이메일을 남겨주시면 예약 내용을 보내드립니다.</Email>
                  <EmailInput
                    type="email"
                    placeholder="spots@naver.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <CalTime>
                    <p>
                      잔여 포인트 :{" "}
                      {myPoint === undefined
                        ? "로그인 후 확인해주세요"
                        : Number(myPoint).toLocaleString("ko-KR")}
                      <img alt="" src="/point.png" width="20px" />
                    </p>
                    <span>
                      예약 포인트:{" "}
                      {Number(payAPrice + payBPrice).toLocaleString("ko-KR")}
                      <img alt="" src="/point.png" width="20px" />
                    </span>

                    {myPoint > payAPrice + payBPrice ? (
                      <p>
                        결제 후 포인트:{" "}
                        {Number(myPoint - payAPrice + payBPrice).toLocaleString(
                          "ko-KR"
                        )}
                        <img alt="" src="/point.png" width="20px" />
                      </p>
                    ) : (
                      <p>
                        충전이 필요한 포인트:{" "}
                        {myPoint === undefined
                          ? "로그인 후 확인해주세요"
                          : payAPrice + payBPrice - myPoint}
                        <img alt="" src="/point.png" width="20px" />
                      </p>
                    )}
                  </CalTime>
                </>
              )}
              {pickedTime !== "" && count > 0 ? (
                <FinalBooking onClick={() => bookWithNoMatch(spot.spotName)}>
                  구장 예약하기
                </FinalBooking>
              ) : null}
              {pickedTime2 !== "" && count > 0 ? (
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
