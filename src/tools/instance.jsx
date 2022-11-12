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

// 로그인
export const LoginAPI = {
  login: (payload) => instance.post(`users/login`, payload),
  kakaoLogin: (payload) =>
    // console.log(payload),
    instance.get(`auth/kakao/callback?code=${payload}`),
};

// 회원가입
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
  getMyteamDetail: (payload) => instance.get(`teams/info/${payload}`),
  postMyteam: (payload) =>
    instance.post(`teams/register`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  deleteTeam: (payload) => instance.put(`teams/drop`, payload),
};

// spotsdetail 실제 예약 서비스
export const SpotsMatchApi = {
  postSpotsMatch: (payload) => instance.post(`reservations/register`, payload),
  getMyMatch: () => instance.get(`/reservations/me`),
  getAllMatch: (payload) =>
    instance.get(`reservations/register/${payload.place}/${payload.date}`, {
      place: payload.place,
      date: payload.date,
    }),
};

export const PrivateApi = {
  registerSpot: (payload) =>
    // console.log(payload)
    instance.post(`places`, payload),
  getPrivateSpot: () => instance.get(`places`),
};

export const PublicApi = {
  getPublicSpot: () => instance.get(`places/open`)
}