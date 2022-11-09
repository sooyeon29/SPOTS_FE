import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LoginAPI } from "../../tools/instance";

const Kakao = () => {
  console.log(window.location.href);
  useEffect(() => {
    // 인가코드
    const PARAMS = new URL(document.location).searchParams;
    const KAKAO_CODE = PARAMS.get("code");
    // console.log(KAKAO_CODE);
    let grant_type = "authorization_code";
    let client_id =
      // "497bb40725964bac025412acbaf9fc7c";
      "3da70995df25a93c7655852b81c50a54";

    axios
      .post(
        `https://kauth.kakao.com/oauth/token?
      grant_type=${grant_type}
      &client_id=${client_id}
      &redirect_uri=http://localhost:3000/auth/kakao/callback
      &code=${KAKAO_CODE}`,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      // LoginAPI.kakaoLogin(KAKAO_CODE)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
};

export default Kakao;
