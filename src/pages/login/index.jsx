import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { LoginAPI } from "../../tools/instance";
import { StWraps, Stinput } from "./styles";

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
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          navigate("/");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response);
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
        </form>
      </StWraps>
    </>
  );
};

export default Login;
