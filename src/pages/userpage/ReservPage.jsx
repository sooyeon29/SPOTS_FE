import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getMyMatch } from "../../redux/modules/matchSlice";
import { StWrap, StTag, MyMatch } from "./Styles";
import Header from "../../components/Header";
import Layout from "../../components/Layout";

const ReservPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getMyMatch());
  }, [dispatch]);
  const myMatches = useSelector((state) => state.matcher.matcher);
  console.log("요거거", myMatches);

  return (
    <Layout>
      <Header />
      <StWrap>
        <StTag>Reservation</StTag>
        {myMatches.map((myMatch) => {
          return (
            <MyMatch key={myMatch.reservationId}>
              <p>장소: {myMatch.place}</p>
              <p>날짜: {myMatch.matchId.substring(13, 28)}</p>
              <p>시간: {myMatch.matchId.substring(0, 13)}</p>
              <p>
                경기인원: {myMatch.member}:{myMatch.member}
              </p>
              <p>내팀이름: {myMatch.teamName}</p>
              <p>{myMatch.result}</p>
            </MyMatch>
          );
        })}
      </StWrap>
    </Layout>
  );
};

export default ReservPage;
