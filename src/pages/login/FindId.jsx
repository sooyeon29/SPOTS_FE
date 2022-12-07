import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import TapBar from "../../components/TapBar";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
import { LoginAPI } from "../../tools/instance";
import Swal from "sweetalert2";
import styled from "styled-components";
import { lighten } from "polished";

const FindId = () => {
  const navigate = useNavigate();
  const [isCode, setIsCode] = useToggle();
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
  const findIdHandler = () => {
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
      LoginAPI.findId({ phone: phoneNum, code: veriCode })
        .then((res) => {
          console.log(res);
          if (res.status === 200 && res.data.sns) {
            Swal.fire({
              text: "소셜가입 회원입니다 : " + res.data.sns,
              width: "300px",
              confirmButtonText: "확인",
              confirmButtonColor: "#40d295",
              showClass: { popup: "animated fadeInDown faster" },
              hideClass: { popup: "animated fadeOutUp faster" },
            });
            navigate(`/login`);
          }
          if (res.status === 200 && !res.data.sns) {
            Swal.fire({
              text: "아이디 : " + res.data.ID,
              width: "300px",
              confirmButtonText: "확인",
              confirmButtonColor: "#40d295",
              showClass: { popup: "animated fadeInDown faster" },
              hideClass: { popup: "animated fadeOutUp faster" },
            });
            navigate(`/login`);
          }
        })
        .catch((err) => {
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
              text: "가입되지 않은 번호입니다.",
              width: "300px",
              confirmButtonText: "확인",
              confirmButtonColor: "#40d295",
              showClass: { popup: "animated fadeInDown faster" },
              hideClass: { popup: "animated fadeOutUp faster" },
            });
          }
        });
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
                  background: "transparent",
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
                  background: "transparent",
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
                placeholder="인증번호를 입력하세요"
                type="text"
                required
                name="code"
                onChange={enterVeriCode}
              />
            </GrayBorder>
          )}
        </ContentWrap>
        <LoginBtn onClick={findIdHandler}>인증확인</LoginBtn>
      </StWraps>
      <TapBar />
    </Layout>
  );
};
export default FindId;

const StWraps = styled.div`
  margin-top: 70px;
  margin-bottom: 60px;
  padding: 30px;
`;
const ContentWrap = styled.div`
  text-align: center;
  p {
    margin-top: 0;
    font-size: 13px;
    text-align: left;
    text-align: center;
    color: #ff00b3;
  }
`;
const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
  margin-top: 30px;
`;
const GrayBorder = styled.div`
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

const LoginBtn = styled.button`
  height: 50px;
  background: #1746c7;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 330px;
  border: none;
  border-radius: 47px;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  margin: 5px auto 10px auto;
  cursor: pointer;
  &:hover {
    background-color: ${lighten(0.1, "#1746c7")};
  }
`;
