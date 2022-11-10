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
import Match from "../../tools/BookMatch";

import {
  BookingBut,
  BookMatch,
  Croll,
  Team,
  Title,
  Wrap,
  MainInfo,
  Time,
  SelectTeam,
  Select,
  YourSelect,
  Pick,
  One,
  Two,
} from "./styles";

const SpotsDetail = () => {
  const dispatch = useDispatch();
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
  const [pickedTime, setPickedTime] = useState("시간을 선택해주세요");
  const [pickedTimeTwo, setPickedTimeTwo] = useState("시간을 선택해주세요");
  useEffect(() => {
    dispatch(__getMyteamList());
    dispatch(__getMyInfo());
  }, []);

  const myTeams = useSelector((state) => state.user.team);
  // console.log(myTeams);
  const [myTeamPicked, setMyTeamPicked, pickMyTeam] = useInput();
  // console.log("내가선택한나의팀", myTeamPicked);
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const myPoint = user.point;
  const [isOne, setIsOne, pickOneHandler] = useToggle();
  // const myPick = JSON.parse(window.sessionStorage.getItem("matchId"));
  // console.log(myPick.matchId);
  // const noMatchHandler = () => {
  //   if (myPick === null) {
  //     alert("팀1, 팀2기 모두 빈시간 중 팀 하나를 선택해 주세요");
  //   } else {
  //     const noMatch = { matchId: myPick.matchId + "nomatch" };
  //     console.log(noMatch);
  //     window.sessionStorage.setItem("matchId", JSON.stringify(noMatch));
  //   }
  // };
  const [startDate, setStartDate] = useState(new Date());
  console.log(startDate);
  const pickDateHandler = (date) => {
    setStartDate(date);
    const pickDate = { date: startDate };
    console.log(pickDate);
    window.sessionStorage.setItem("date", JSON.stringify(pickDate));
  };

  const teamPick = (time) => {
    setPickedTime(myTime[time]);
    // 세션스토리지에 클릭한 팀 저장
    const pickTimeTeam = { matchId: pickedTime + "a" };
    console.log(pickTimeTeam);
    window.sessionStorage.setItem("matchId", JSON.stringify(pickTimeTeam));
  };
  const teamPickTwo = (time) => {
    setPickedTimeTwo(myTime[time]);
    // 세션스토리지에 클릭한 팀 저장
    const pickTimeTeamTwo = { matchId: pickedTimeTwo + "b" };
    console.log(pickTimeTeamTwo);
    window.sessionStorage.setItem("matchId", JSON.stringify(pickTimeTeamTwo));
  };

  // 선택한 날짜를 세션스토리지에서 가져옴
  // const pickedDate = JSON.parse(window.sessionStorage.getItem("date"));
  // console.log(pickedDate.date.substring(0, 19));

  // const newDate = new Date(pickedDate.date.substring(0, 19));
  // console.log(newDate.toLocaleDateString());
  // 단식 복식 선택하여 세션스토리지에 저장
  const isDouble = { isDouble: isOne };
  console.log(isDouble);
  window.sessionStorage.setItem("isDouble", JSON.stringify(isDouble));
  return (
    <>
      <Layout>
        <Header />
        <Wrap>
          <Title>스팟츠테니스장 </Title>
          <MainInfo>
            <Croll>
              <img alt="" src="logo512.png" />
              <div>
                정보
                <li>주소</li>
                <li>02-398-6640</li>
              </div>
            </Croll>
          </MainInfo>
          {/* <PickDate /> */}
          <ReactDatePicker
            selected={startDate}
            onChange={(date) => pickDateHandler(date)}
            // setStartDate(date)}
            //   withPortal
            isClearable
            //   portalId="root-portal"
            dateFormat="MM월 dd일 EE요일"
          />
          <br />

          <Select>
            <SelectTeam>
              {/* 매칭따로만들었음 */}
              {/* <Match /> */}

              <BookMatch>
                <Time>{myTime[0]}</Time>
                <Team onClick={() => teamPick(0)}>팀1</Team>
                vs
                <Team onClick={() => teamPickTwo(0)}>팀2</Team>
              </BookMatch>
              <BookMatch>
                <Time>{myTime[1]}</Time>
                <Team onClick={() => teamPick(1)}>팀1</Team>
                vs
                <Team onClick={() => teamPickTwo(1)}>팀2</Team>
              </BookMatch>
              <BookMatch>
                <Time>{myTime[2]}</Time>
                <Team onClick={() => teamPick(2)}>팀1</Team>
                vs
                <Team onClick={() => teamPickTwo(2)}>팀2</Team>
              </BookMatch>
              <BookMatch>
                <Time>{myTime[3]}</Time>
                <Team onClick={() => teamPick(3)}>팀1</Team>
                vs
                <Team onClick={() => teamPickTwo(3)}>팀2</Team>
              </BookMatch>
              <BookMatch>
                <Time>{myTime[4]}</Time>
                <Team onClick={() => teamPick(4)}>팀1</Team>
                vs
                <Team onClick={() => teamPickTwo(4)}>팀2</Team>
              </BookMatch>
              <BookMatch>
                <Time>{myTime[5]}</Time>
                <Team onClick={() => teamPick(5)}>팀1</Team>
                vs
                <Team onClick={() => teamPickTwo(5)}>팀2</Team>
              </BookMatch>
              <BookMatch>
                <Time>{myTime[6]}</Time>
                <Team onClick={() => teamPick(6)}>팀1</Team>
                vs
                <Team onClick={() => teamPickTwo(6)}>팀2</Team>
              </BookMatch>
              <BookMatch>
                <Time>{myTime[7]}</Time>
                <Team onClick={() => teamPick(7)}>팀1</Team>
                vs
                <Team onClick={() => teamPickTwo(7)}>팀2</Team>
              </BookMatch>
            </SelectTeam>
            <YourSelect>
              <div>
                {/* <span>{newDate.toLocaleDateString()} </span> */}
                {/* {startDate} */}
                <button
                // onClick={noMatchHandler}
                >
                  매칭없이구장예약
                </button>
                {/* {startDate} */}
              </div>
              <span>팀1 선택시간: {pickedTime}</span>
              <br />
              <span>팀2 선택시간: {pickedTimeTwo}</span>
              {!isOne && (
                <Pick>
                  <One onClick={pickOneHandler}>단식</One>
                  <Two onClick={pickOneHandler}>복식</Two>
                </Pick>
              )}
              {isOne && (
                <Pick>
                  <Two onClick={pickOneHandler}>단식</Two>
                  <One onClick={pickOneHandler}>복식</One>
                </Pick>
              )}
              <select name="myteam" value={myTeamPicked} onChange={pickMyTeam}>
                <option>선택하기</option>
                {myTeams?.map((myTeam) => {
                  return (
                    <option key={myTeam.teamId}>
                      {myTeam.teamName}-{myTeam.member}명
                    </option>
                  );
                })}
              </select>
              <br />
              {myTeamPicked?.myteam}
              <p>잔여포인트: {myPoint} point</p>
              <p>예약포인트: 10000 point</p>
              <hr />
              {myPoint > 10000 ? (
                <p>결제후포인트: {myPoint - 10000} point</p>
              ) : (
                <p>충전이 필요한 포인트: {10000 - myPoint} point</p>
              )}

              <button>예약하기</button>
            </YourSelect>
          </Select>

          <br />
          {/* <BookingBut>예약하기</BookingBut> */}
        </Wrap>
      </Layout>
    </>
  );
};

export default SpotsDetail;
