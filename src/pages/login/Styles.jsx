import styled from "styled-components";
import { lighten, darken } from "polished";

export const StWraps = styled.div`
  > h1 {
    font-weight: bold;
  }

  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
  form {
    button {
      height: 52px;
      padding: 11px 0px 10px;
      background: #8fc7ff;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      border: 0px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
      margin-top: 32px;
      &:hover {
        background-color: ${darken(0.1, "#8fc7ff")};
      }
    }
  }
`;

export const Stinput = styled.input`
  background-color: #eee;
  border: none;
  padding: 13px 15px;
  margin: 8px 0 30px 0;
  width: 100%;
  min-width: 300px;
  font-family: "MonoplexKR-Regular";
`;
export const KakaoBtn = styled.button`
  height: 52px;
  padding: 11px 0px 10px;
  background: #ffcd2a;
  display: flex;
  align-items: center;

  justify-content: center;
  width: 100%;
  border: 0px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  margin-top: 32px;
  &:hover {
    background-color: ${lighten(0.1, "#ffcd2a")};
  }
  img {
    margin: auto 10px;
  }
`;
