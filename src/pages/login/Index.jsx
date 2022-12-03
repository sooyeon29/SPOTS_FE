import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { LoginAPI, UserpageAPI } from "../../tools/instance";
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL } from "./OAuth";
import {
  StWraps,
  Stinput,
  KakaoBtn,
  FindButs,
  PageTitle,
  PwInput,
  LoginBtn,
  InputWrap,
  Logo,
  StinputId,
  StinputPw,
  InputWrapLower,
  GoogleBtn,
  SocialLogin,
} from "./Styles";
// import { BsEye } from 'react-icons/bs';
import TapBar from "../../components/TapBar";
import useToggle from "../../hooks/useToggle";
import { AiFillEye } from "react-icons/ai";
import { BsEye, BsFillPersonFill } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { BiLock } from "react-icons/bi";
import { IoIosLock } from "react-icons/io";
import { IdInput } from "../signUp/Styles";
import Swal from "sweetalert2";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    id: "",
    password: "",
  });
  const [showPw, setShowPw, showPwHandler] = useToggle();

  const navigate = useNavigate();

  const idAndPassword = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };
  // console.log("인풋창 잘 들어오나", loginInfo);

  const loginHandler = (e) => {
    e.preventDefault();
    LoginAPI.login({ loginId: loginInfo.id, password: loginInfo.password })
      .then((res) => {
        console.log("로그인성공 response", res);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("nickname", res.data.nickname);
          Swal.fire({
            text: "SPOTS에 오신 것을 환영합니다!",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
          navigate("/");
          // window.location.reload();
        } else if (res.status === 202) {
          if (window.confirm("휴면계정입니다. 계정을 활성화하시겠습니까?")) {
            localStorage.setItem("token", res.data.accessToken);
            navigate("/switchaccount", { state: loginInfo.id });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          Swal.fire({
            text: "이미 로그인된 상태입니다.",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
        } else if (err.response.status === 412) {
          Swal.fire({
            text: "아이디 또는 패스워드를 확인해주세요",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
        }
      });
  };

  return (
    <>
      <Layout>
        <Header />
        <StWraps>
          <form onSubmit={loginHandler}>
            <InputWrap>
              <Logo>
                <img alt="" src="/spotslogo.png" />
              </Logo>
              <InputWrapLower>
                <BsFillPersonFill size={24} color={"#949494"} />
                <Stinput
                  placeholder="아이디를 입력해주세요"
                  type="text"
                  required
                  name="id"
                  onChange={idAndPassword}
                  autoComplete="off"
                />
              </InputWrapLower>
              <InputWrapLower>
                <IoIosLock size={24} color={"#949494"} />
                <Stinput
                  placeholder="비밀번호를 입력해주세요"
                  type={showPw ? "text" : "password"}
                  required
                  name="password"
                  value={loginInfo.password}
                  onChange={idAndPassword}
                />

                <button type="button" onClick={showPwHandler}>
                  <BsEyeSlash size={23} color={"#949494"} />
                </button>
              </InputWrapLower>
            </InputWrap>
            <LoginBtn>로그인</LoginBtn>
          </form>

          <SocialLogin>
            <KakaoBtn>
              <img alt="" src="/kakao.png" width={25} />
              <a href={KAKAO_AUTH_URL}>카카오 로그인</a>
            </KakaoBtn>
            <GoogleBtn>
              <img alt="" src="/google.png" width={27} />
              <a href={GOOGLE_AUTH_URL}>구글 로그인</a>
            </GoogleBtn>
          </SocialLogin>

          <FindButs>
            <button onClick={() => navigate(`/findid`)}>아이디찾기</button>
            <button onClick={() => navigate(`/findpw`)}>비밀번호찾기</button>
            <button onClick={() => navigate(`/signup`)}>회원가입</button>
          </FindButs>
        </StWraps>
        <TapBar />
      </Layout>
    </>
  );
};
export default Login;
