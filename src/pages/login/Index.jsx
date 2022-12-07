import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { LoginAPI } from "../../tools/instance";
import { GOOGLE_AUTH_URL, KAKAO_AUTH_URL } from "./OAuth";
import TapBar from "../../components/TapBar";
import useToggle from "../../hooks/useToggle";
import { BsFillPersonFill } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { IoIosLock } from "react-icons/io";
import Swal from "sweetalert2";
import styled from "styled-components";
import { darken, lighten } from "polished";

const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    id: "",
    password: "",
  });
  const [showPw, setShowPw, showPwHandler] = useToggle();

  const idAndPassword = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    LoginAPI.login({ loginId: loginInfo.id, password: loginInfo.password })
      .then((res) => {
        // console.log("로그인성공 response", res);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("nickname", res.data.nickname);
          navigate("/");
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
            <a href={KAKAO_AUTH_URL}>
              <KakaoBtn>
                <img alt="" src="/kakao.png" width={25} />
                카카오 로그인
              </KakaoBtn>
            </a>
            <a href={GOOGLE_AUTH_URL}>
              <GoogleBtn>
                <img alt="" src="/google.png" width={27} />
                구글 로그인
              </GoogleBtn>
            </a>
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

const StWraps = styled.div`
  margin-top: 70px;
  margin-bottom: 60px;
  padding: 30px;
`;
const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
  margin-top: 30px;
`;
const InputWrap = styled.div`
  width: 330px;
  margin: auto;
`;
const Stinput = styled.input`
  background-color: transparent;
  border: none;
  padding: 10px;
  max-width: 330px;
  width: 90%;
  margin: 0px;
  font-family: "MonoplexKR-Regular";
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #c2c2c2;
  }
`;
const InputWrapLower = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f4f4f4;
  border: none;
  border-radius: 10px;
  padding: 3px 10px 3px 18px;
  margin: auto;
  margin-bottom: 10px;
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;
export const KakaoBtn = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  height: 50px;
  /* padding: 11px 0px 10px; */
  background: #fed600;
  width: 90%;
  border: none;
  border-radius: 47px;

  font-weight: bold;
  font-size: 14px;
  line-height: 24px;
  margin-top: 10px;

  &:hover {
    background-color: ${lighten(0.2, "#ffcd2a")};
  }
  img {
    margin-right: 10px;
  }
`;
export const GoogleBtn = styled(KakaoBtn)`
  background-color: white;
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: ${darken(0.2, "white")};
  }
`;
export const SocialLogin = styled.div`
  max-width: 350px;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  a {
    cursor: pointer;
    text-decoration: none;
    color: #3a1d1d;
    width: 100%;
  }
`;
const FindButs = styled.div`
  width: 330px;
  margin: auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  button {
    background-color: transparent;
    border: none;
    font-size: 14px;
  }
`;
const LoginBtn = styled.button`
  height: 50px;
  background: #1746c7;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 330px;
  border: none;
  border-radius: 47px;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  margin: 5px auto 10px auto;
  cursor: pointer;
  &:hover {
    background-color: ${lighten(0.1, "#1746c7")};
  }
`;
