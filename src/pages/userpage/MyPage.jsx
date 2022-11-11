import React, { useEffect, useState } from "react";
import { StWrap, StTag } from "./Styles";
import useToggle from "../../hooks/useToggle";
import { useDispatch, useSelector } from "react-redux";
import { __getMyInfo } from "../../redux/modules/userSlice";

const MyPage = ({ mytoggle, myClickToggle }) => {
  const [isEdit, setIsEdit, clickEditMode] = useToggle();
  const [myInfo, setMyInfo] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getMyInfo());
  }, []);
  const { user } = useSelector((state) => state.user);

  return (
    <StWrap>
      <StTag>my</StTag>
      <button mytoggle={mytoggle} onClick={myClickToggle}>
        +
      </button>
      {!isEdit ? (
        <div>
          <div>{user.nickname}</div>
          <div>{user.gender}</div>
          <div>핸드폰번호 : {user.phone}</div>
          <div>나의종목 : {user.sports}</div>
          <div>관심종목 : {user.favSports}</div>
          <div>point : {user.point}</div>
          <div>score : {user.score}</div>
        </div>
      ) : (
        <div>
          <input type="text"></input>
          <div>{user.gender}</div>
          <input></input>
          <input></input>
          <input></input>
        </div>
      )}
      <button onClick={clickEditMode}>수정하기</button>
    </StWrap>
  );
};

export default MyPage;
