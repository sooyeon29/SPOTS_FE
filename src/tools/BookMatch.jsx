import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setTimeTeam } from "../redux/modules/matchSlice";

const Match = () => {
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
  const [pickedTime, setPickedTime] = useState("");
  const [pickedTimeTwo, setPickedTimeTwo] = useState("");
  const teamPick = (time) => {
    // 세션스토리지에 클릭한 팀 저장
    // const pickTimeTeam = { matchId: time };
    // console.log(pickTimeTeam);
    // window.sessionStorage.setItem("matchId", JSON.stringify(pickTimeTeam));
    // 리듀서 저장방식
    // dispatch(setTimeTeam(time));
    setPickedTime(myTime[time]);
  };

  const teamPickTwo = (time) => {
    setPickedTimeTwo(myTime[time]);
  };

  return (
    <>
      <BookMatch>
        <Time>06:00 - 08:00</Time>
        <Team onClick={() => teamPick(1)}>팀1</Team>
        vs
        <Team onClick={() => teamPickTwo(1)}>팀2</Team>
      </BookMatch>
      <BookMatch>
        <Time>08:00 - 10:00</Time>
        <Team onClick={() => teamPick(2)}>팀1</Team>
        vs
        <Team onClick={() => teamPickTwo(2)}>팀2</Team>
      </BookMatch>
      <BookMatch>
        <Time>10:00 - 12:00</Time>
        <Team onClick={() => teamPick(3)}>팀1</Team>
        vs
        <Team onClick={() => teamPickTwo(3)}>팀2</Team>
      </BookMatch>
      <BookMatch>
        <Time>12:00 - 14:00</Time>
        <Team onClick={() => teamPick(4)}>팀1</Team>
        vs
        <Team onClick={() => teamPickTwo(4)}>팀2</Team>
      </BookMatch>
      <BookMatch>
        <Time>14:00 - 16:00</Time>
        <Team onClick={() => teamPick(5)}>팀1</Team>
        vs
        <Team onClick={() => teamPickTwo(5)}>팀2</Team>
      </BookMatch>
      <BookMatch>
        <Time>16:00 - 18:00</Time>
        <Team onClick={() => teamPick(6)}>팀1</Team>
        vs
        <Team onClick={() => teamPickTwo(6)}>팀2</Team>
      </BookMatch>
      <BookMatch>
        <Time>18:00 - 20:00</Time>
        <Team onClick={() => teamPick(7)}>팀1</Team>
        vs
        <Team onClick={() => teamPickTwo(7)}>팀2</Team>
      </BookMatch>
      <BookMatch>
        <Time>20:00 - 22:00</Time>
        <Team onClick={() => teamPick(8)}>팀1</Team>
        vs
        <Team onClick={() => teamPickTwo(8)}>팀2</Team>
      </BookMatch>
    </>
  );
};
export default Match;

const BookMatch = styled.div`
  display: flex;
`;
const Time = styled.div`
  width: 50%;
`;
const Team = styled.button`
  width: 80px;
  height: 50px;
  border: 1px solid black;
`;
