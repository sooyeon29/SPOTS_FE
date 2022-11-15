import axios from "axios";
import { intlFormatDistanceWithOptions } from "date-fns/fp";

const isLogin = localStorage.getItem("token");
// const isKakaoLogin = localStorage.getItem("kakaocode");

const instance = axios.create({
  baseURL: "https://ws-study.shop/",
  // baseURL: "https://sparta4.shop/",
  // baseURL: "http://localhost:3000/",
  // baseURL: "http://13.125.53.34/",
  headers: {
    Authorization: `${isLogin}`,
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
  getMyteamDetail: (payload) => instance.get(`teams/${payload}`),
  postMyteam: (payload) =>
    instance.post(`teams`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  deleteTeam: (payload) => instance.delete(`teams/${payload}`),
  patchMyInfo: (payload) => instance.patch(`users/me`, payload),
  patchMyTeam: (payload) => instance.patch(`teams`, payload),
  dropOutMe: (payload) => instance.patch(`users/drop`, payload),
  switchMe: (payload) => instance.patch(`users/cancelDrop`, payload),
};

// spotsdetail 실제 예약 서비스
export const SpotsMatchApi = {
  postSpotsMatch: (payload) => instance.post(`reservations/register`, payload),

  getAllMatch: (payload) =>
    instance.get(`reservations/register/${payload.place}/${payload.date}`, {
      place: payload.place,
      date: payload.date,
    }), // -> for userpage
  getMyMatch: () => instance.get(`/reservations/me`),
  exitMyMatch: (payload) => instance.put(`/reservations/register`, payload),
};

export const PrivateApi = {
  registerSpot: (payload) => instance.post(`places`, payload),
  // 등록한 사설 구장들 리스트
  getPrivateSpot: () => instance.get(`places`),
  // 내가 등록한 구장
  getMyPrivateSpot: () => instance.get(`places/me`),
  // 내가 등록한 구장 삭제
  deletePrivateSpot: (payload) => instance.delete(`places/${payload}`),
  // 내가 등록한 구장 수정
  editPrivateSpot: (payload) =>
    instance.patch(`/places/${payload.placesId}`, {
      spotName: payload.spotName,
      desc: payload.desc,
      price: payload.price,
    }),
};

export const PublicApi = {
  getPublicSpot: () => instance.get(`places/open`),
};
