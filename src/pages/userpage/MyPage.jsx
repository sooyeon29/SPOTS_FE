import React from "react";
import { StWrap, StBox } from "./Styles";
import useToggle from "../../hooks/useToggle";

const MyPage = ({ myToggle, myClickToggle }) => {
  const [isEdit, setIsEdit, clickEditMode] = useToggle();

  return (
    <StWrap>
      <StBox>my</StBox>
      <button myToggle={myToggle} onClick={myClickToggle}>
        +
      </button>
      <>
        {!isEdit ? (
          <>
            <div>닉네임가져오기</div>
            <button onClick={clickEditMode}>수정</button>
          </>
        ) : (
          <>
            <input></input>
            <button onClick={clickEditMode}>등록</button>
          </>
        )}
      </>
      <div>남/여</div>
      <div>나의 종목</div>
      <div>관심 종목</div>
      <div>나의 포인트</div>
      <div>즐겨찾기</div>
    </StWrap>
  );
};

export default MyPage;
