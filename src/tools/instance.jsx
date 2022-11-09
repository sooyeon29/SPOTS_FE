import axios from "axios";

const isLogin = localStorage.getItem("token");
// const isKakaoLogin = localStorage.getItem("kakaocode");

const instance = axios.create({
  baseURL: "https://ws-study.shop/",
  // baseURL: "https://sparta4.shop/",
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

export const SignUpAPI = {
  signUp: (payload) => instance.post(`users/signup`, payload),
  checkId: (payload) => instance.post(`users/checkId`, payload),
  checkNickname: (payload) => instance.post(`/users/checkNick`, payload),
  checkPhoneNum: (payload) => instance.post(`/users/checkPhone`, payload),

};

// userpage
export const UserpageAPI = {
  getMypage: () => instance.get(`users/me`),
  getMyteamList: () => instance.get(`teams/me`),
  getMyteamDetail: (payload) => instance.get(`teams/info`, payload),
  postMyteam: (payload) => instance.post(`teams/register`, payload),
};

// reservation 페이지 / 메인에서 검색해서 넘어가는 페이지
export const BookApi = {
  getSearch: (payload) => console.log(payload),
  // instance.get(``)
};

// https://ws-study.shop/auth/kakao?code=인가코드
// req.query => 요거로...받으실수...없으까요오...?
