const CLIENT_ID =
  // "497bb40725964bac025412acbaf9fc7c";
  // "3da70995df25a93c7655852b81c50a54";
  "d3e20268980676f1708f48a456b8c297"
const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

// export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
// 인가코드: qryr4HiJzu--4WFhzMhO4aD_-KDMsV6Ug9nlMmacpKjZpreeLliMbpy2ErRWf4dLNXuUGAo9dNkAAAGEUkFOeA
