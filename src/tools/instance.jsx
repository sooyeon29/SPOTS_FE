import axios from "axios";
import Swal from "sweetalert2";
// const isLogin = localStorage.getItem("token");
// let count = 0;
console.log("초기화");
const instance = axios.create({
  baseURL: "https://ws-study.shop/",
  // baseURL: "https://sparta4.shop/",
  // baseURL: "http://localhost:3000/",
  // baseURL: "http://13.125.53.34/",
  // headers: {
  //   Authorization: `${isLogin}`,
  // },
});
// 요청 인터셉터 추가
instance.interceptors.request.use(
  async (config) => {
    // 요청이 전달되기 전 작업 수행
    // console.log("인터셉터리퀘스트:", config);
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
      // console.log("1번째 토큰!", token);
    }
    return config;
  },
  (error) => {
    // 요청 오류가 있는 경우 작업 수행
    // console.log("인터셉터에러", error);
    Promise.reject(error);
  }
);
// // 응답 인터셉터 추가
// instance.interceptors.response.use(
//   async (response) => {
//     // 응답 데이터가 있는 작업 수행
//     console.log("인터셉터리스판스+++++++++++++++++:", response);
//     if (response.status === 200 && response.data.code === 1) {
//       window.localStorage.removeItem("token");
//       window.localStorage.setItem("token", response.data.myNewToken);
//       const newAccessToken = response.data.myNewToken;
//       return axios({
//         ...response.config,
//         headers: {
//           Authorization: `${newAccessToken}`,
//         },
//       }).then((res) => console.log("토큰잘 바뀐건가아아ㅏ아", res));
//     }
//     return response;
//   },
//   (error) => {
//     if (error.status === 401) {
//       Swal.fire({
//         text: "로그인 시간이 만료되었습니다. 다시 로그인해주세요!",
//         width: "300px",
//         confirmButtonText: "확인",
//         confirmButtonColor: "#40d295",
//         showClass: { popup: "animated fadeInDown faster" },
//         hideClass: { popup: "animated fadeOutUp faster" },
//       });
//       window.location.replace("/login");
//     }
//     Promise.reject(error);
//   }
// );

instance.interceptors.response.use(
  (response) => {
    console.log("★Axios interceptors response execute★");
    let firstToken = localStorage.getItem("token");

    if (firstToken) {
      console.log("----------------------------------------------");
      console.log("첫토큰", firstToken);
      response.headers["Authorization"] = response.data.myNewToken;

      if (response.data.myNewToken) {
        console.log("신규토큰", response.data.myNewToken);

        if (firstToken !== response.data.myNewToken) {
          firstToken = response.data.myNewToken;
          window.localStorage.setItem("token", response.data.myNewToken);
          console.log("토큰정보 업데이트!!");
        }
      }
      console.log("----------------------------------------------");
    }
    return response;
  },
  (error) => {
    if (error.status === 401) {
      Swal.fire({
        text: "로그인 시간이 만료되었습니다. 다시 로그인해주세요!",
        width: "300px",
        confirmButtonText: "확인",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      });
      window.location.replace("/login");
    }
    Promise.reject(error);
  }
);

// 로그인
export const LoginAPI = {
  login: (payload) => instance.post(`users/login`, payload),
  // 소셜로그인(카카오)
  kakaoLogin: (payload) => instance.get(`auth/kakao/code?code=${payload}`),
  googleLogin: (payload) => instance.get(`auth/google/code?code=${payload}`),
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
