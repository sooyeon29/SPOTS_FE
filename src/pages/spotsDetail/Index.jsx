import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
import { __getMyInfo, __getMyteamList } from "../../redux/modules/userSlice";
import {
  BookMatch,
  CalTime,
  Team,
  Title,
  TimeDate,
  Times,
  Time,
  SelectTeam,
  YourSelect,
  NoMatchBook,
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
} from "./Styles";
import {
  __getAllMatch,
  __postSpotsMatch,
} from "../../redux/modules/matchSlice";
import { useNavigate, useParams } from "react-router-dom";
import { __getPrivateSpot } from "../../redux/modules/spotsSlice";
import ReservHeader from "../../components/ReservHeader";
import { Calendar } from "react-calendar";

const SpotsDetail = () => {
  const myTime = new Array(
    "06:00 - 08:00",
    "08:00 - 10:00",
    "10:00 - 12:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "18:00 - 20:00",
    "20:00 - 22:00"
  );
  const [toggle, setToggel, clickedToggle] = useToggle();
  const [toggleTwo, setToggelTwo, clickedToggleTwo] = useToggle();
  const [count, setCount] = useState(0);
  // 리스트 중에서 선택한 place를 가져온다 파람값으로 비교해 필터해준다
  const { id } = useParams();
  const placeList = useSelector((state) => state?.spots.privateSpot);
  // console.log("리스트중에고르자궁", placeList);

  const selectSpot = placeList?.filter((place) => {
    // console.log("각구장쓰", place);
    return place.placesId === parseInt(id);
  });
  console.log("골라진스팟", selectSpot);

  // 1. 예약을 원하는 날짜를 선택한다
  // --> 달력에 선택하는 날짜가 선택됨
  const [startDate, setStartDate] = useState(null);
  console.log("startDate", startDate);
  console.log(Date());
  const todayMatchList = useSelector((state) => state?.matcher.matcher);
  // console.log("-----------오늘의매치----------", state.matcher)
  // console.log("======오늘의매치=========", todayMatchList);

  // 2. 시간과 팀을 선택한다(팀1-a, 팀2-b) => 이것으로 matchId를 만들어줄 예정이다
  const [pickedTime, setPickedTime] = useState("");
  // 예약 시간,팀 선택시 해당 포인트 확인됨
  const [payAPrice, setPayAPrice] = useState(0);
  const [payBPrice, setPayBPrice] = useState(0);
  // 클릭한 버튼 색변경
  const [colorChange, setColorChange] = useToggle();
  // ---> 호스트 페이지에 업로드하고 보여주는 것을 완료하면 이 포스트아이디값을 하나 더 받아서 아이디를 만드는데 더해준다
  //=> a팀을 선택한 경우
  const teamPick = (time, price) => {
    setPickedTime(myTime[time]);
    setPayAPrice(price);
    setColorChange(!colorChange);
    setToggelTwo(true);
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
  // console.log(myTeams);

  // 5. 경기에 참가할 인원수를 작성해준다.
  const [myMember, setMember, memberHandler] = useInput();

  // @@++나의 포인트를 가져와 주었다 이것으로 계산할꺼다 ++@@
  // 아래 예약하기 핸들러를 눌러 patch도 위의 post들과 함께 보내줄꺼다
  const { user } = useSelector((state) => state.user);
  // console.log(user);
  const myPoint = user.point;

  // console.log(typeof startDate);
  // 모든것을 선택하고 예약하기 버튼을 드디어 눌렀다!!! 서버로 post 해주자!
  // 계산을 위해 포인트를 차감하여 patch 도 실행해주자!
  // const bookDate = JSON.stringify(startDate).substring(1, 11);
  const bookDate = startDate?.toLocaleDateString().substring(0, 12);
  console.log(bookDate);
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
        member: parseInt(myMember?.member),
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
        matchId: pickedTime + "ismatch" + startDate + name,
        isDouble: isTwo,
        teamName: myTeam?.myteam,
        member: parseInt(myMember?.member),
        price: payAPrice + payBPrice,
      })
    );
    navigate(`/reservpage`);
  };

  const pickDateHandler = (date, name) => {
    // console.log("이 날짜는??????????????", date);
    setStartDate(date);
    // const bookDate = JSON.stringify(date).substring(1, 11);
    const bookDate = date?.toLocaleDateString().substring(0, 12);
    dispatch(
      __getAllMatch({
        place: name,
        date: bookDate,
      })
    );
    setToggel(true);
  };

  // 해당구장 해당일에 신청된 매치 불러오기
  const allMatchToday = useSelector((state) => state?.matcher.matcher);
  // console.log("=============오늘 신청된매치", allMatchToday);
  // allMatchToday.map((matchToday) =>
  //   console.log("시간만잘잘라줘", matchToday.matchId.substring(0, 13))
  // );
  // console.log(allMatchToday);

  // const timeSlot = allMatchToday.map((matchToday, index) => (
  //   <li key={index}>
  //     {matchToday.matchId.substring(0, 13)}
  //   </li>
  // ));
  // console.log(timeSlot);

  const timeSlots = allMatchToday.map((match) =>
    match.matchId.substring(0, 13)
  );
  console.log(timeSlots);
  const isMatch = allMatchToday.map((match) => match.matchId.substring(13, 20));
  console.log(isMatch);

  return (
    <>
      <Layout>
        <ReservHeader />
        {selectSpot?.map((spot) => {
          return (
            <>
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
                  <span>시설 현황</span>
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
              {!toggle ? (
                <Calen>
                  <ReactDatePicker
                    locale={ko}
                    selected={startDate}
                    onChange={(date) => pickDateHandler(date, spot.spotName)}
                    inline
                    required
                  />
                </Calen>
              ) : (
                <SelectDone>
                  {bookDate}
                  <button onClick={clickedToggle}>변경</button>
                </SelectDone>
              )}

              {!toggleTwo && !forMatch && (
                <CalTime>
                  <Pick>
                    <One>구장 예약하기</One>
                    <Two onClick={matchHandler}>팀매칭 예약하기</Two>
                  </Pick>
                  <Times>
                    <button
                      disabled={timeSlots.includes(myTime[0])}
                      onClick={() => teamPick(0, spot.price)}
                    >
                      {myTime[0]}
                    </button>
                    <button
                      disabled={timeSlots.includes(myTime[1])}
                      onClick={() => teamPick(1, spot.price)}
                    >
                      {myTime[1]}
                    </button>
                    <button
                      disabled={timeSlots.includes(myTime[2])}
                      onClick={() => teamPick(2, spot.price)}
                    >
                      {myTime[2]}
                    </button>
                    <button
                      disabled={timeSlots.includes(myTime[3])}
                      onClick={() => teamPick(3, spot.price)}
                    >
                      {myTime[3]}
                    </button>
                    <button
                      disabled={timeSlots.includes(myTime[4])}
                      onClick={() => teamPick(4, spot.price)}
                    >
                      {myTime[4]}
                    </button>
                    <button
                      disabled={timeSlots.includes(myTime[5])}
                      onClick={() => teamPick(5, spot.price)}
                    >
                      {myTime[5]}
                    </button>
                    <button
                      disabled={timeSlots.includes(myTime[6])}
                      onClick={() => teamPick(6, spot.price)}
                    >
                      {myTime[6]}
                    </button>
                    <button
                      disabled={timeSlots.includes(myTime[7])}
                      onClick={() => teamPick(7, spot.price)}
                    >
                      {myTime[7]}
                    </button>
                  </Times>
                </CalTime>
              )}
              {!toggleTwo && forMatch && (
                <CalTime>
                  <Pick>
                    <Two onClick={matchHandler}>구장 예약하기</Two>
                    <One>팀매칭 예약하기</One>
                  </Pick>

                  <SelectTeam>
                    <BookMatch>
                      <Time>{myTime[0]}</Time>
                      <Team
                        disabled={timeSlots.includes(myTime[0])}
                        onClick={() => teamPick(0, spot.price / 2)}
                      >
                        팀1
                      </Team>
                      vs
                      <Team onClick={() => teamPick(0, spot.price / 2)}>
                        팀2
                      </Team>
                    </BookMatch>
                    <BookMatch>
                      <Time>{myTime[1]}</Time>
                      <Team
                        disabled={timeSlots.includes(myTime[1])}
                        onClick={() => teamPick(1, spot.price / 2)}
                      >
                        팀1
                      </Team>
                      vs
                      <Team onClick={() => teamPick(1, spot.price / 2)}>
                        팀2
                      </Team>
                    </BookMatch>
                    <BookMatch>
                      <Time>{myTime[2]}</Time>
                      <Team
                        disabled={timeSlots.includes(myTime[2])}
                        onClick={() => teamPick(2, spot.price / 2)}
                      >
                        팀1
                      </Team>
                      vs
                      <Team onClick={() => teamPick(2, spot.price / 2)}>
                        팀2
                      </Team>
                    </BookMatch>
                    <BookMatch>
                      <Time>{myTime[3]}</Time>
                      <Team
                        disabled={timeSlots.includes(myTime[3])}
                        onClick={() => teamPick(3, spot.price / 2)}
                      >
                        팀1
                      </Team>
                      vs
                      <Team onClick={() => teamPick(3, spot.price / 2)}>
                        팀2
                      </Team>
                    </BookMatch>
                    <BookMatch>
                      <Time>{myTime[4]}</Time>
                      <Team
                        disabled={timeSlots.includes(myTime[4])}
                        onClick={() => teamPick(4, spot.price / 2)}
                      >
                        팀1
                      </Team>
                      vs
                      <Team onClick={() => teamPick(4, spot.price / 2)}>
                        팀2
                      </Team>
                    </BookMatch>
                    <BookMatch>
                      <Time>{myTime[5]}</Time>
                      <Team
                        disabled={timeSlots.includes(myTime[5])}
                        onClick={() => teamPick(5, spot.price / 2)}
                      >
                        팀1
                      </Team>
                      vs
                      <Team onClick={() => teamPick(5, spot.price / 2)}>
                        팀2
                      </Team>
                    </BookMatch>
                    <BookMatch>
                      <Time>{myTime[6]}</Time>
                      <Team
                        disabled={timeSlots.includes(myTime[6])}
                        onClick={() => teamPick(6, spot.price / 2)}
                      >
                        팀1
                      </Team>
                      vs
                      <Team onClick={() => teamPick(6, spot.price / 2)}>
                        팀2
                      </Team>
                    </BookMatch>
                    <BookMatch>
                      <Time>{myTime[7]}</Time>
                      <Team
                        disabled={timeSlots.includes(myTime[7])}
                        onClick={() => teamPick(7, spot.price / 2)}
                      >
                        팀1
                      </Team>
                      vs
                      <Team onClick={() => teamPick(7, spot.price / 2)}>
                        팀2
                      </Team>
                    </BookMatch>
                  </SelectTeam>
                </CalTime>
              )}

              {toggleTwo && (
                <SelectDone>
                  {forMatch ? "팀매칭 예약하기" : "구장 예약하기"}
                  {pickedTime}
                  <button onClick={clickedToggleTwo}>변경</button>
                </SelectDone>
              )}
              <SelectChoice>
                <TeamSelect
                  name="myteam"
                  required
                  value={myTeam}
                  onChange={pickMyTeam}
                >
                  <option value="">---선택하기---</option>
                  {myTeams?.map((myTeam) => {
                    return (
                      <>
                        <option key={myTeam.teamId} value={myTeam.teamName}>
                          {myTeam.teamName}
                        </option>
                      </>
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
              <CalTime>
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
              </CalTime>
              <CalTime>
                <p>잔여포인트: {myPoint} point</p>
                <div>예약포인트: {payAPrice + payBPrice} point</div>

                {myPoint > payAPrice + payBPrice ? (
                  <p>결제후포인트: {myPoint - payAPrice + payBPrice} point</p>
                ) : (
                  <p>
                    충전이 필요한 포인트: {payAPrice + payBPrice - myPoint}
                    point
                  </p>
                )}
              </CalTime>

              {!forMatch ? (
                <FinalBooking onClick={() => bookWithNoMatch(spot.spotName)}>
                  구장 예약하기
                </FinalBooking>
              ) : (
                <FinalBooking onClick={() => bookMyMatch(spot.spotName)}>
                  팀매칭 예약하기
                </FinalBooking>
              )}
            </>
          );
        })}
      </Layout>
    </>
  );
};

export default SpotsDetail;
