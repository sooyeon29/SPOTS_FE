import React from "react";
import Header from "../../components/Header";
import { StContainer, StWrap } from "./Styles";

const TeamDetail = () => {
  return (
    <>
      <Header />
      <StContainer>
        <StWrap>
          <div>team img</div>
          <div>team name</div>
          <div>team sports</div>
          <div>team member</div>
          <div>team admin</div>
          <div>team rank</div>
          <div>team wins/loses</div>
          <button>수정하기</button>
          <button>삭제하기</button>
        </StWrap>
      </StContainer>
    </>
  );
};

export default TeamDetail;
