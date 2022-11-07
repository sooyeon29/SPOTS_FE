import React, { useEffect, useState } from "react";
import { StWrap, StTag } from "./Styles";
import useToggle from "../../hooks/useToggle";
import { UserpageAPI } from "../../tools/instance";

const MyPage = ({ myToggle, myClickToggle }) => {
  //const [isEdit, setIsEdit, clickEditMode] = useToggle();
  const [myInfo, setMyInfo] = useState([]);

  useEffect(() => {
    UserpageAPI.getMypage()
      .then((response) => {
        setMyInfo(response);
      })
      .catch((error) => alert(error));
  }, []);

  return (
    <StWrap>
      <StTag>my</StTag>
      <button myToggle={myToggle} onClick={myClickToggle}>
        +
      </button>
      <div>필수 닉네임</div>
      <div>필수 남/여</div>
      <div>필수 핸드폰</div>
      <div>나의 종목</div>
      <div>관심 종목</div>
      <div>나의 포인트</div>
      <div>즐겨찾기</div>
    </StWrap>
  );
};

export default MyPage;
