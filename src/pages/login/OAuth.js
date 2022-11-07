const CLIENT_ID = "비밀키";
const REDIRECT_URI = "http://localhost:3000/users/login/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
