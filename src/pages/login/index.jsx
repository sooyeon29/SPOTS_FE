import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { LoginAPI } from "../../tools/instance";
import { KAKAO_AUTH_URL } from "./OAuth";
import { StWraps, Stinput, KakaoBtn } from "./Styles";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    id: "",
    password: "",
  });

  const navigate = useNavigate();

  const idAndPassword = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };
  console.log("인풋창 잘 들어오나", loginInfo);

  const loginHandler = (e) => {
    e.preventDefault();
    LoginAPI.login({ loginId: loginInfo.id, password: loginInfo.password })
      .then((res) => {
        console.log("로그인성공 response", res);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.accessToken);
          navigate("/");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log("로그인실패시 err", err);
      });
  };

  return (
    <>
      <Layout>
        <StWraps>
          <h1>로그인</h1>
          <form onSubmit={loginHandler}>
            <div>
              <div>
                <Stinput
                  placeholder="아이디를 입력하세요."
                  type="text"
                  required
                  name="id"
                  // value={loginId}
                  onChange={idAndPassword}
                />
              </div>
              <div>
                <Stinput
                  placeholder="비밀번호를 입력하세요."
                  type="password"
                  required
                  name="password"
                  // value={loginPw}
                  onChange={idAndPassword}
                />
              </div>
            </div>
            <button>로그인</button>
            <div>
              아직 회원이 아니신가요? <a href="/signup"> 회원가입</a>
            </div>
          </form>
          {/* 소셜로그인 - 카카오로그인 */}
          <KakaoBtn href={KAKAO_AUTH_URL}>
            <img alt="" src="/kakao.png" width={30} />
            <span>카카오계정 로그인</span>
          </KakaoBtn>
        </StWraps>
      </Layout>
    </>
  );
};
export default Login;
