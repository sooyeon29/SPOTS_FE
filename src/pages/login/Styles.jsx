import styled from "styled-components";
import { lighten, darken } from "polished";

// findId&pw / index 스타일
export const StWraps = styled.div`
  margin-top: 70px;
  margin-bottom: 60px;
  padding: 30px;
`;
export const ContentWrap = styled.div`
  text-align: center;
  p {
    margin-top: 0;
    font-size: 13px;
    text-align: left;
    text-align: center;
    color: #ff00b3;
  }
`;
export const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
  margin-top: 30px;
`;
export const GrayBorder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f4f4f4;
  border: none;
  border-radius: 10px;
  padding: 3px 5px 3px 15px;
  max-width: 330px;
  width: 90%;
  height: 40px;
  margin: auto;
  margin-bottom: 10px;
  font-size: 14px;
  input {
    background-color: transparent;
    border: none;
    margin: 0px 5px 0px 10px;
    width: 60%;
    height: 70%;
    :focus {
      outline: none;
      background-color: #f4f4f4;
    }
    ::placeholder {
      color: #c2c2c2;
    }
  }
`;
export const LoginBtn = styled.button`
  height: 50px;
  background: #1746c7;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 320px;
  width: 100%;
  border: none;
  border-radius: 47px;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  margin: 20px auto 10px auto;
  cursor: pointer;
  &:hover {
    background-color: ${lighten(0.1, "#1746c7")};
  }
`;
export const InputWrap = styled.div`
  width: 330px;
  margin: auto;
`;
export const Stinput = styled.input`
  background-color: transparent;
  border: none;
  padding: 10px;
  max-width: 330px;
  width: 90%;
  margin: 0px;
  font-family: "MonoplexKR-Regular";
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #c2c2c2;
  }
`;
export const InputWrapLower = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f4f4f4;
  border: none;
  border-radius: 10px;
  padding: 3px 10px 3px 18px;
  margin: auto;
  margin-bottom: 10px;
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;
export const KakaoBtn = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  height: 50px;
  background: #fed600;
  width: 90%;
  border: none;
  border-radius: 47px;
  font-weight: bold;
  font-size: 14px;
  line-height: 24px;
  margin-top: 10px;
  &:hover {
    background-color: ${lighten(0.1, "#ffcd2a")};
  }
  img {
    margin-right: 10px;
  }
`;
export const GoogleBtn = styled(KakaoBtn)`
  background-color: white;
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: ${darken(0.2, "white")};
  }
`;
export const SocialLogin = styled.div`
  max-width: 350px;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  a {
    cursor: pointer;
    text-decoration: none;
    color: #3a1d1d;
    width: 100%;
  }
`;
export const FindButs = styled.div`
  width: 330px;
  margin: auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  button {
    background-color: transparent;
    border: none;
    font-size: 14px;
    cursor: pointer;
  }
`;
