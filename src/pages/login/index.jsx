import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { LoginAPI } from "../../tools/instance";
import { KAKAO_AUTH_URL } from "./OAuth";
import { StWraps, Stinput, KakaoBtn } from "./Styles";

const Login = () => {
  const [loginid, onChangeId] = useInput("");
  const [loginpwd, onChangePwd] = useInput("");
  const navigate = useNavigate();
  const formRef = useRef();

  const login = () => {
    LoginAPI.login({
      nameid: formRef.current.nameid.value,
      password: formRef.current.password.value,
    })
      .then((res) => {
        console.log("로그인 성공시 res", res);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          navigate("/");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log("로그인 실패시 err", err);
        // 이미 로그인 된 회원입니다 ---> status 400
        // 잘못된 아이디 혹은 비밀번호 입니다. ---> status?
        // 알수없는 오류가 발생했습니다. ---> status?
        // alert(err.response);
      });
  };

  return (
    <>
      <StWraps>
        <h1>로그인</h1>
        <form ref={formRef} onSubmit={login}>
          <div>
            <div>
              <Stinput
                placeholder="아이디를 입력하세요."
                id="nameid"
                type="text"
                value={loginid}
                onChange={onChangeId}
              />
            </div>
            <div>
              <Stinput
                placeholder="비밀번호를 입력하세요."
                id="password"
                type="password"
                value={loginpwd}
                onChange={onChangePwd}
              />
            </div>
          </div>
          <button>로그인</button>
        </form>{" "}
        {/* 소셜로그인 - 카카오로그인 */}
        <KakaoBtn href={KAKAO_AUTH_URL}>
          <img alt="" src="/kakao.png" width={30} />
          <span>카카오계정 로그인</span>
        </KakaoBtn>
      </StWraps>
    </>
  );
};

export default Login;
