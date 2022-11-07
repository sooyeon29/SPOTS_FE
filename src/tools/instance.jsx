import axios from "axios";

const isLogin = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "https://ws-study.shop",
  // baseURL: "http://localhost:3000/",
  // baseURL: "http://13.125.53.34/",
  // baseURL: "https://sparta4.shop/",

  headers: {
    Authorization: `Bearer ${isLogin}`,
  },
});

// 로그인/ 회원가입 관련 API에 이용
export const LoginAPI = {
  login: (payload) => instance.post(`users/login`, payload),
};

export const SignUpAPI = {
  signUp: (payload) => instance.post("users/signup", payload),
};

// userpage
export const UserpageAPI = {
  getMypage: () => instance.get(`users/me`),
  getMyteam: () => instance.get(`teams/me`),
};

// reservation 페이지 / 메인에서 검색해서 넘어가는 페이지
export const BookApi = {
  getSearch: (payload) => console.log(payload),
  // instance.get(``)
};
