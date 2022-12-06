import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { LoginAPI } from "../tools/instance";
import Header from "./Header";
import Layout from "./Layout";
import TapBar from "./TapBar";

const Welcome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginId = location.loginId;
  const password = location.password;

  const kakaocode = localStorage.getItem("kakaocode");
  const googlecode = localStorage.getItem("googlecode");
  const kakaoHandler = () => {
    if (kakaocode) {
      LoginAPI.kakaoLogin(kakaocode)
        .then((res) => {
          console.log(res);
          if (res.data.nickname) {
            localStorage.setItem("token", res.data.accessToken);
            navigate(`/`);
          }
        })
        .catch((err) => console.log(err));
    }
    return;
  };
  const googleHandler = () => {
    if (googlecode) {
      LoginAPI.kakaoLogin(googlecode)
        .then((res) => {
          console.log(res);
          if (res.data.nickname) {
            localStorage.setItem("token", res.data.accessToken);
            navigate(`/`);
          }
        })
        .catch((err) => console.log(err));
    }
    return;
  };
  const loginHandler = () => {
    if (loginId && password) {
      LoginAPI.login({ loginId: loginId, password: password }).then((res) => {
        console.log("로그인성공 response", res);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("nickname", res.data.nickname);
          navigate("/");
        }
      });
    }
  };

  return (
    <Layout>
      <Header />
      <Wrap>
        <Img src="/welcome_image.jpeg" />{" "}
        <Button
          onClick={
            () => {
              kakaoHandler();
              googleHandler();
              loginHandler();
            }
            // navigate('/login')
          }
        >
          SPOTS 시작하기
        </Button>
      </Wrap>
      <TapBar />
    </Layout>
  );
};

export default Welcome;

export const Wrap = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
`;
export const Img = styled.img`
  margin-top: 62px;
  height: 100%;
  width: 100%;
  position: relative;
`;

export const Button = styled.button`
  margin: auto;
  position: absolute;
  top: 70%;
  background-color: transparent;
  color: black;
  margin-top: 100px;
  margin-bottom: 100px;
  z-index: 3;
  padding: 10px;
  border-radius: 20px;
  border-color: #1746c7;
  color: #ff00b4;
  width: 200px;
  font-weight: 700;
  cursor: pointer;
`;
