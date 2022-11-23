import axios from "axios";
const isLogin = localStorage.getItem("token");

const instance = axios.create({
  baseURL: "https://ws-study.shop/",
  // baseURL: "https://sparta4.shop/",
  // baseURL: "http://localhost:3000/",
  // baseURL: "http://13.125.53.34/",
  headers: {
    Authorization: `${isLogin}`,
  },
});

instance.interceptors.request.use(
  (config) => {
    console.log("인스턴스인터셉터리스판스:", config);
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    console.log("인스턴스인터셉터에러", error);
    Promise.reject(error);
  }
);

// 로그인
export const LoginAPI = {
  login: (payload) => instance.post(`users/login`, payload),
  // 소셜로그인(카카오)
  kakaoLogin: (payload) => instance.get(`auth/kakao/code?code=${payload}`),
  kakaoId: (payload) => instance.post(`auth/login`, { loginId: payload }),

  // 인증번호
  postforFindIdPw: (payload) => instance.post(`users/sendSms`, payload), //-> 아이디비밀번호찾기시
  postforVCode: (payload) => instance.post(`users/signupSms`, payload), //-> 회원가입시
  postforCheckVCode: (payload) => instance.post(`users/checkSms`, payload),
  // 아이디 찾기
  findId: (payload) =>
    // console.log(payload),
    instance.post(`users/findId`, {
      phone: payload.phone.phone,
      code: payload.code.code,
    }),
  findPw: (payload) =>
    // console.log(payload),
    instance.post(`users/findPw`, {
      loginId: payload.loginId.id,
      phone: payload.phone.phone,
      code: payload.code.vericode,
    }),
};

// 회원가입
export const SignUpAPI = {
  signUp: (payload) => instance.post(`users/signup`, payload),
  checkId: (payload) => instance.post(`users/checkId`, payload),
  checkNickname: (payload) => instance.post(`/users/checkNick`, payload),
  // checkPhoneNum: (payload) => instance.post(`/users/checkPhone`, payload),
  kakaoSingUp: (payload) => instance.post(`auth/signup`, payload),
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
  patchMyPhoto: (payload) => instance.patch(`users/profileImg`, payload),
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
  getOkMatch: (payload) =>
    instance.get(
      `reservations/register/result/${payload.place}/${payload.date}`,
      {
        place: payload.place,
        date: payload.date,
      }
    ),

  getMyMatch: () => instance.get(`/reservations/me`),
  exitMyMatch: (payload) =>
    instance.put(`/reservations/register/delete`, payload),
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
    // console.log(payload),
    instance.patch(`/places/${payload.placesId}`, {
      spotName: payload.spotName,
      desc: payload.desc,
      price: payload.price,
    }),
  getNewSpot: () => instance.get(`places/new`),
};

export const PublicApi = {
  getPublicSpot: () => instance.get(`places/open`),
};

// 검색 API
export const SearchApi = {
  // 스팟 검색(필터) Api

  getSearchedSpot: (payload) => instance.get(`places/keyword/${payload}`),
  // 스팟 검색(노 필터-전체 조회) Api
  getAllSpot: () => instance.get(`places/all`),
};
