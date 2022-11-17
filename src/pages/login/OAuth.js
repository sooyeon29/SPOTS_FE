const CLIENT_ID = process.env.REACT_APP_KAKAO_LOGIN_API_KEY;
// "497bb40725964bac025412acbaf9fc7c";

const REDIRECT_URI = process.env.REACT_APP_KAKAO_LOGIN_REDIRECT_URI;
// "http://localhost:3000/auth/kakao/callback";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
