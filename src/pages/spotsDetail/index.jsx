import { useSelector } from "react-redux";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import useToggle from "../../hooks/useToggle";
import Match from "../../tools/BookMatch";
import PickDate from "../../tools/DatePicker";
import {
  BookingBut,
  // BookMatch,
  Croll,
  // Team,
  Title,
  Wrap,
  MainInfo,
  // Time,
  SelectTeam,
  Select,
  YourSelect,
  Pick,
  One,
  Two,
} from "./Styles";

const SpotsDetail = () => {
  const getMyteam = useSelector((state) =>
    console.log("나의팀", state.user.team)
  );

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

  // 선택한 날짜를 세션스토리지에서 가져옴
  const pickedDate = JSON.parse(window.sessionStorage.getItem("date"));
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
          <PickDate />
          <br />
          <Select>
            <SelectTeam>
              <Match />
            </SelectTeam>
            <YourSelect>
              <div>
                {/* <span>{newDate.toLocaleDateString()} </span> */}
                <button
                // onClick={noMatchHandler}
                >
                  매칭없이구장예약
                </button>
              </div>
              <span>선택시간: 10:00-12:00</span>
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
              <select>
                <option>선택하기</option>
                <option>최강풋살⚽</option>
                <option>테니스가제일좋아🥎</option>
                <option>배드민턴팀입니닿🏸</option>
              </select>
              <p>잔여포인트:10,000 point</p>
              <p>예약포인트:10,000 point</p>
              <hr />
              <p>결제후포인트: 0point</p>
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
