import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import TapBar from "../../components/TapBar";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
import { LoginAPI } from "../../tools/instance";
import {
  Stinput,
  StWraps,
  PageTitle,
  InputWrap,
  LoginBtn,
  CodeBtn,
  Logo,
  InputWrapLower,
} from "./Styles";
import { useState } from "react";
import { ContentWrap, NextBtn } from "../signUp/Styles";

const FindId = () => {
  const navigate = useNavigate();
  const [isCode, setIsCode] = useToggle();
  const [phoneNum, setPhoneNum, enterPhoneNum] = useInput();
  const [veriCode, setVeriCode, enterVeriCode] = useInput();

  const sendPhoneForCode = () => {
    setIsCode(true);
    LoginAPI.postforFindIdPw(phoneNum)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const findIdHandler = () => {
    LoginAPI.findId({ phone: phoneNum, code: veriCode })
      .then((res) => {
        if (res.status === 200) {
          alert(res.data.ID);
          navigate(`/login`);
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          alert("인증번호를 확인해주세요");
        }
      });
  };
  return (
    <Layout>
      <Header />
      <StWraps>
        <ContentWrap>
          <Logo>
            <img alt="" src="/spotslogo.png" />
          </Logo>

          <InputWrapLower>
            + 82 |
            <Stinput
              placeholder="01012345678"
              type="text"
              required
              name="phone"
              onChange={enterPhoneNum}
            />
          </InputWrapLower>

          {isCode && (
            <InputWrapLower>
              <Stinput
                placeholder="인증번호 입력 (제한시간3분)"
                type="text"
                required
                name="code"
                onChange={enterVeriCode}
              />
            </InputWrapLower>
          )}
          <CodeBtn type="button" onClick={sendPhoneForCode}>
            인증번호받기
          </CodeBtn>
        </ContentWrap>
        <LoginBtn onClick={findIdHandler}>아이디 찾기</LoginBtn>

        <LoginBtn onClick={() => navigate(`/findpw`)}>비밀번호 찾기</LoginBtn>
      </StWraps>
      <TapBar />
    </Layout>
  );
};
export default FindId;
