import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LoginAPI } from "../../tools/instance";

const Kakao = () => {
  console.log(window.location.href);

  // 인가코드
  const PARAMS = new URL(document.location).searchParams;
  const KAKAO_CODE = PARAMS.get("code");
  console.log(KAKAO_CODE);
  useEffect(() => {
    LoginAPI.kakaoLogin(KAKAO_CODE)
      .then((res) => {
        console.log(res);
        // localStorage.setItem("kakaocode", KAKAO_CODE);
      })
      .catch((err) => console.log(err));
  }, []);
};

export default Kakao;
