import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LoginAPI } from "../../tools/instance";

const Kakao = () => {
  // const REST_API_KEY = "d3e20268980676f1708f48a456b8c297";
  // const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";
  // const CODE = new URL(document.location).searchParams;
  // const KAKAOCODE = CODE.get("code");
  // console.log(KAKAOCODE);

  // const getKakaoToken = () => {
  //   fetch(`https://kauth.kakao.com/oauth/token`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAOCODE}`,
  //   })
  //     .then((res) =>
  //       // console.log(res))
  //       res.json()
  //     )
  //     .then((data) => {
  //       console.log(data);
  //     });
  // };

  // useEffect(() => {
  //   getKakaoToken();
  // }, []);
  // ===========================================================================위코드 주석풀면 토큰받기까지ok
  // useEffect(() => {
  //   // 인가코드
  //   const PARAMS = new URL(document.location).searchParams;
  //   const KAKAO_CODE = PARAMS.get("code");
  //   // console.log(KAKAO_CODE);
  //   let grant_type = "authorization_code";
  //   let client_id =
  //     // "497bb40725964bac025412acbaf9fc7c";
  //     "3da70995df25a93c7655852b81c50a54";

  //   axios
  //     .post(
  // `https://kauth.kakao.com/oauth/token?
  //     grant_type=${grant_type}
  //     &client_id=${client_id}
  //     &redirect_uri=http://localhost:3000/auth/kakao/callback
  //     &code=${KAKAO_CODE}`,
  //       {
  //         headers: {
  //           "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  //         },
  //       }
  //     )
  //     // LoginAPI.kakaoLogin(KAKAO_CODE)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  // ==================================================================================아래 수연코드
  console.log(window.location.href);

  // 인가코드
  const PARAMS = new URL(document.location).searchParams;
  const KAKAO_CODE = PARAMS.get("code");
  console.log(KAKAO_CODE);
  useEffect(() => {
    LoginAPI.kakaoLogin(KAKAO_CODE)
      .then((res) => {
        console.log(res);
        // localStorage.setItem("token", JSON.stringify(res.data));

        // localStorage.setItem("kakaocode", KAKAO_CODE);
      })
      .catch((err) => console.log(err));
  }, []);
  return <>로그인 성공이라구!!!</>;
};

export default Kakao;
