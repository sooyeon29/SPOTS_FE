import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { LoginAPI, UserpageAPI } from "../../tools/instance";
import { KAKAO_AUTH_URL } from "./OAuth";
import { StWraps, Stinput, KakaoBtn, FindButs } from "./Styles";

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
          localStorage.setItem("nickname", res.data.nickname);
          navigate("/");
          window.location.reload();
        } else if (res.status === 202) {
          if (window.confirm("휴면계정입니다. 계정을 활성화 하시겠습니까?")) {
            localStorage.setItem("token", res.data.accessToken);
            navigate("/switchaccount", { state: loginInfo.id });
          }
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          alert("이미 로그인 상태입니다.");
        } else if (err.response.status === 412) {
          alert("아이디 또는 패스워드를 확인해주세요");
        }
        console.log("로그인실패시 err", err);
      });
  };

  return (
    <>
      <Layout>
        <Header />
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
                  onChange={idAndPassword}
                />
              </div>
              <div>
                <Stinput
                  placeholder="비밀번호를 입력하세요."
                  type="password"
                  required
                  name="password"
                  onChange={idAndPassword}
                />
              </div>
            </div>
            <button>로그인</button>
          </form>
          <FindButs>
            <button onClick={() => navigate(`/signup`)}>회원가입</button>|{" "}
            <button onClick={() => navigate(`/findid`)}>아이디찾기</button>|
            <button onClick={() => navigate(`/findpw`)}>비밀번호찾기</button>
          </FindButs>
          {/* 소셜로그인 - 카카오로그인 */}
          <KakaoBtn>
            {/* // href="https://ws-study.shop/auth/kakao"> */}
            <img alt="" src="/kakao.png" width={30} />
            <a
              href={
                // "/auth/kakao/callback"
                KAKAO_AUTH_URL
              }
            >
              카카오계정 로그인
            </a>
          </KakaoBtn>
        </StWraps>
      </Layout>
    </>
  );
};
export default Login;
