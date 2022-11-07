import React from "react";
import { useDispatch } from "react-redux";

const Kakao = (props) => {
  const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  return <></>;
};

export default Kakao;
