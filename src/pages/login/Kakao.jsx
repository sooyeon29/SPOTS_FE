import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";
import { LoginAPI } from "../../tools/instance";

const Kakao = () => {
  const navigate = useNavigate();
  // 인가코드
  const PARAMS = new URL(document.location).searchParams;
  const KAKAO_CODE = PARAMS.get("code");
  window.localStorage.setItem("KAKAO_CODE", KAKAO_CODE);
  useEffect(() => {
    LoginAPI.kakaoLogin(KAKAO_CODE)
      .then((res) => {
        if (res.data.code === -1) {
          localStorage.setItem("loginId", JSON.stringify(res.data.loginId));
          localStorage.setItem("profile", res.data.profileImg);
          navigate(`/addlogin`);
        }
        if (res.data.nickname) {
          localStorage.setItem("token", res.data.accessToken);
          navigate(`/`);
        }
        if (res.status === 202) {
          Swal.fire({
            text: "휴면계정입니다. 계정을 활성화하시겠습니까?",
            width: "350px",
            showCancelButton: true,
            confirmButtonColor: "#40d295",
            cancelButtonColor: "#FF00B4",
            confirmButtonText: "계정 활성화하러 가기",
            cancelButtonText: "취소",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.setItem("token", res.data.accessToken);
              navigate("/switchaccount", { state: res.data.loginId });
            }
          });
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
