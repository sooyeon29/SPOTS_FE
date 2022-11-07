import axios from "axios";

const isLogin = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "https://ws-study.shop",
  // baseURL: "http://localhost:3000/",
  headers: {
    Authorization: `Bearer ${isLogin}`,
  },
});

// 로그인/ 회원가입 관련 API에 이용
export const LoginAPI = {
  login: (payload) =>
    instance.post(`https://ws-study.shop/users/login`, payload),
};

export const SignUpAPI = {
  signUp: (payload) => 
  instance.post('https://ws-study.shop/users/signup', payload),
  }

// userpage
export const UserpageAPI = {
  getMypage: () => instance.get(`https://ws-study.shop/api/users/me`),
};

// reservation 페이지 / 메인에서 검색해서 넘어가는 페이지
export const BookApi = {
  getSearch: (payload) => console.log(payload),
  // instance.get(``)
};
