import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { LoginAPI } from "../../tools/instance";

const Kakao = () => {
  const navigate = useNavigate();
  // 인가코드
  const PARAMS = new URL(document.location).searchParams;
  const KAKAO_CODE = PARAMS.get("code");
  window.localStorage.setItem("KAKAO_CODE", KAKAO_CODE);
  // console.log(KAKAO_CODE);
  useEffect(() => {
    LoginAPI.kakaoLogin(KAKAO_CODE)
      .then((res) => {
        console.log(res);

        if (res.data.code === -1) {
          localStorage.setItem("loginId", JSON.stringify(res.data.loginId));
          localStorage.setItem("profile", res.data.profileImg);
          navigate(`/addlogin`);
        }
        if (res.data.nickname) {
          localStorage.setItem("token", res.data.accessToken);
          navigate(`/`);
        }
      })

      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Loading />
    </>
  );
};

export default Kakao;
