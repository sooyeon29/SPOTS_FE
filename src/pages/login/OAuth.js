const CLIENT_ID = process.env.REACT_APP_KAKAO_LOGIN_API_KEY;
const REDIRECT_URI = process.env.REACT_APP_KAKAO_LOGIN_REDIRECT_URI;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri="https://spots.co.kr/auth/kakao/callback"&response_type=code&prompts=none`;

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_LOGIN_API_KEY;
const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_LOGIN_REDIRECT_URI;

export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri="https://spots.co.kr/auth/google/callback"&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`;
