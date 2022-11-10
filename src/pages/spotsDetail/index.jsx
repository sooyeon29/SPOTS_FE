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
} from "./Styles";
import { __postSpotsMatch } from "../../redux/modules/matchSlice";

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

  // 1. 예약을 원하는 날짜를 선택한다
  // --> 달력에 선택하는 날짜가 선택됨
  const [startDate, setStartDate] = useState(new Date());
  // console.log(startDate);
  const pickDateHandler = (date) => {
    setStartDate(date);
  };

  // 2. 시간과 팀을 선택한다(팀1-a, 팀2-b) => 이것으로 matchId를 만들어줄 예정이다
  const [pickedTime, setPickedTime] = useState("");
  const [pickedTimeTwo, setPickedTimeTwo] = useState("");
  // ---> 호스트 페이지에 업로드하고 보여주는 것을 완료하면 이 포스트아이디값을 하나 더 받아서 아이디를 만드는데 더해준다
  //=> a팀을 선택한 경우
  const teamPick = (time) => {
    setPickedTime(myTime[time]);
  };
  console.log("이거는오디뭐라나오지", pickedTime);
  // => b팀을 선택한 경우
  const teamPickTwo = (time) => {
    setPickedTimeTwo(myTime[time]);
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
  console.log(user);
  const myPoint = user.point;

  console.log(typeof startDate);
  // 모든것을 선택하고 예약하기 버튼을 드디어 눌렀다!!! 서버로 post 해주자!
  // 계산을 위해 포인트를 차감하여 patch 도 실행해주자!
  const bookMyMatch = () => {
    dispatch(
      __postSpotsMatch({
        place: "test",
        date: startDate,
        matchId: pickedTime + "a",
        // isDouble: isTwo,
        teamName: myTeam?.myteam,
        member: parseInt(myMember?.member),
      })
    );
  };

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
              <div></div>
              <span>팀1 선택시간: {pickedTime}</span>
              <br />
              <span>팀2 선택시간: {pickedTimeTwo}</span>
              {!isTwo && (
                <Pick>
                  <One onClick={pickTwoHandler}>단식</One>
                  <Two onClick={pickTwoHandler}>복식</Two>
                </Pick>
              )}
              {isTwo && (
                <Pick>
                  <Two onClick={pickTwoHandler}>단식</Two>
                  <One onClick={pickTwoHandler}>복식</One>
                </Pick>
              )}
              <select name="myteam" value={myTeam} onChange={pickMyTeam}>
                <option>선택하기</option>
                {myTeams?.map((myTeam) => {
                  return <option key={myTeam.teamId}>{myTeam.teamName}</option>;
                })}
              </select>
              <input
                type="number"
                requiered
                name="member"
                onChange={memberHandler}
                placeholder="경기 참석인원"
              />
              <br />
              {myTeam?.myteam}
              <p>잔여포인트: {myPoint} point</p>
              <p>예약포인트: 10000 point</p>
              <hr />
              {myPoint > 10000 ? (
                <p>결제후포인트: {myPoint - 10000} point</p>
              ) : (
                <p>충전이 필요한 포인트: {10000 - myPoint} point</p>
              )}

              <button onClick={bookMyMatch}>예약하기</button>
            </YourSelect>
          </Select>

          <br />
        </Wrap>
      </Layout>
    </>
  );
};

export default SpotsDetail;
