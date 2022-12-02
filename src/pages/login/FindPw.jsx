import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
import { LoginAPI } from "../../tools/instance";
import {
  Stinput,
  PageTitle,
  StWraps,
  InputWrap,
  LoginBtn,
  CodeBtn,
  Logo,
  InputWrapLower,
  GrayBorder,
} from "./Styles";

import Swal from "sweetalert2";
import { ContentWrap } from "../signUp/Styles";
import TapBar from "../../components/TapBar";

const FindPw = () => {
  const navigate = useNavigate();
  const [isCode, setIsCode] = useToggle();
  const [id, setId, enterId] = useInput();
  const [phoneNum, setPhoneNum, enterPhoneNum] = useInput();
  const [veriCode, setVeriCode, enterVeriCode] = useInput();
  const [codeSent, setCodeSent] = useToggle();

  const sendPhoneForCode = () => {
    if (phoneNum.phone.length < 10) {
      Swal.fire({
        text: "10~11자리의 번호를 입력해주세요",
        width: "300px",
        confirmButtonText: "확인",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      });
    } else {
      setIsCode(true);
      setCodeSent(true);
      LoginAPI.postforFindIdPw(phoneNum)
        .then((res) => {
          console.log("인증번호알럿이...", res);
          Swal.fire({
            text: "인증번호가 전송되었습니다",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            text: "예상하지 못한 오류가 발생하였습니다",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
        });
    }
  };
  console.log(id);
  console.log(phoneNum);
  console.log(veriCode);
  const findPwHandler = () => {
    if (id.id.length < 1) {
      Swal.fire({
        text: "아이디를 확인해주세요",
        width: "300px",
        confirmButtonText: "확인",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      });
    }
    if (phoneNum.phone.length < 10 || veriCode.code.length < 6) {
      Swal.fire({
        text: "전화번호와 인증번호 형식을 확인해주세요",
        width: "300px",
        confirmButtonText: "확인",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      });
    } else {
      LoginAPI.findPw({ loginId: id, phone: phoneNum, code: veriCode })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              text: "임시 비밀번호: " + res.data.password,
              width: "300px",
              confirmButtonText: "확인",
              confirmButtonColor: "#40d295",
              showClass: { popup: "animated fadeInDown faster" },
              hideClass: { popup: "animated fadeOutUp faster" },
            });
          }
          console.log(res);
        })
        .catch(
          (err) => {
            if (err.status === 401) {
              Swal.fire({
                text: "인증번호를 확인해주세요",
                width: "300px",
                confirmButtonText: "확인",
                confirmButtonColor: "#40d295",
                showClass: { popup: "animated fadeInDown faster" },
                hideClass: { popup: "animated fadeOutUp faster" },
              });
            }
            if (err.status === 412) {
              Swal.fire({
                text: "아이디 혹은 핸드폰 번호를 확인해주세요",
                width: "300px",
                confirmButtonText: "확인",
                confirmButtonColor: "#40d295",
                showClass: { popup: "animated fadeInDown faster" },
                hideClass: { popup: "animated fadeOutUp faster" },
              });
            }
            if (err.status === 400) {
              Swal.fire({
                text: "알 수 없는 오류가 발생했습니다",
                width: "300px",
                confirmButtonText: "확인",
                confirmButtonColor: "#40d295",
                showClass: { popup: "animated fadeInDown faster" },
                hideClass: { popup: "animated fadeOutUp faster" },
              });
            }
          }
          // console.log(err)
        );
    }
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
            <Stinput
              placeholder="아이디를 입력해주세요"
              type="text"
              required
              name="id"
              onChange={enterId}
            />
          </InputWrapLower>
          <GrayBorder>
            +82 |
            <input
              placeholder="01012345678"
              type="text"
              required
              name="phone"
              maxLength={11}
              onChange={enterPhoneNum}
            />
            {!codeSent ? (
              <button
                style={{
                  border: "none",
                  color: "#ff00b3",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                type="button"
                onClick={sendPhoneForCode}
              >
                인증하기
              </button>
            ) : (
              <button
                style={{
                  border: "none",
                  color: "#ff00b3",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                type="button"
                onClick={sendPhoneForCode}
              >
                다시받기
              </button>
            )}
          </GrayBorder>

          {isCode && (
            <GrayBorder>
              <input
                placeholder="인증번호를 입력하세요(제한 시간 3분)"
                type="text"
                required
                name="code"
                onChange={enterVeriCode}
              />
              {/* <button
                style={{
                  border: "none",
                  color: "#ff00b3",
                  fontWeight: "600",
                  cursor: "pointer",
                  marginLeft: "30px",
                }}
                type="button"
                onClick={sendPhoneForCode}
              >
                인증확인
              </button> */}
            </GrayBorder>
          )}

          {/* <InputWrapLower>
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
                placeholder="인증번호 입력(제한시간 3분)"
                type="text"
                required
                name="vericode"
                onChange={enterVeriCode}
              />
            </InputWrapLower>
          )} */}
          {/* <CodeBtn type="button" onClick={sendPhoneForCode}>
            인증번호받기
          </CodeBtn> */}
        </ContentWrap>
        <LoginBtn onClick={findPwHandler}>인증확인</LoginBtn>

        {/* <LoginBtn onClick={() => navigate(`/findid`)}>아이디 찾기</LoginBtn> */}
      </StWraps>
      <TapBar />
    </Layout>
  );
};
export default FindPw;
