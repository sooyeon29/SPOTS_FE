import axios from "axios";

const isLogin = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    Authorization: `Bearer ${isLogin}`,
  },
});

// 로그인/ 회원가입 관련 API에 이용
export const LoginAPI = {
  login: (payload) => instance.post(`http://localhost:3000/`, payload),
};
