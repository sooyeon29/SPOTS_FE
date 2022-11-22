import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
import { LoginAPI } from "../../tools/instance";
import { Stinput, StWraps } from "./Styles";

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
    <>
      <div>
        <h2>아이디찾기</h2>

        <div>
          <div>
            <Stinput
              placeholder=" '-' 제외한 핸드폰번호를 입력하세요"
              type="text"
              required
              name="phone"
              onChange={enterPhoneNum}
            />
          </div>
          <button type="button" onClick={sendPhoneForCode}>
            인증번호받기
          </button>
          {isCode && (
            <div>
              <Stinput
                placeholder="인증번호를 입력하세요"
                type="text"
                required
                name="code"
                onChange={enterVeriCode}
              />
            </div>
          )}
        </div>
        <button onClick={findIdHandler}>아이디 찾기</button>

        <button onClick={() => navigate(`/findpw`)}>
          비밀번호 찾으러🐾🐾🐾
        </button>
      </div>
    </>
  );
};
export default FindId;
