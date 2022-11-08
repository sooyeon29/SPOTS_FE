import axios from "axios";

const isLogin = localStorage.getItem("token");
// const isKakaoLogin = localStorage.getItem("kakaocode");

const instance = axios.create({
  baseURL: "https://ws-study.shop",
  // baseURL: "http://localhost:3000/",
  // baseURL: "https://sparta4.shop",
  // baseURL: "http://13.125.53.34/",
  headers: {
    Authorization: `Bearer ${isLogin}`,
  },
});

// 로그인/ 회원가입 관련 API에 이용
export const LoginAPI = {
  login: (payload) => instance.post(`users/login`, payload),
  kakaoLogin: (payload) =>
    // console.log(payload),
    instance.get(`auth/kakao/callback?code=${payload}`),
};

// userpage
export const UserpageAPI = {
  getMypage: () => instance.get(`users/me`),
};

// https://ws-study.shop/auth/kakao?code=인가코드
// req.query => 요거로...받으실수...없으까요오...?
