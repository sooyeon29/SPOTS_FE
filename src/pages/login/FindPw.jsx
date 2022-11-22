import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
import { LoginAPI } from "../../tools/instance";
import { Stinput, PageTitle, StWraps, InputWrap } from "./Styles";

import Swal from "sweetalert2";

const FindPw = () => {
  const navigate = useNavigate();
  const [isCode, setIsCode] = useToggle();
  const [id, setId, enterId] = useInput();
  const [phoneNum, setPhoneNum, enterPhoneNum] = useInput();
  const [veriCode, setVeriCode, enterVeriCode] = useInput();
  const sendPhoneForCode = () => {
    setIsCode(true);
    LoginAPI.postforFindIdPw(phoneNum)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const findPwHandler = () => {
    LoginAPI.findPw({ loginId: id, phone: phoneNum, code: veriCode })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            text: "임시비밀번호 : " + res.data.password,
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
          // alert(res.data.password);
        }
        console.log(res);
      })
      .catch(
        (err) => {
          if (err.status === 401) {
            alert("인증번호를 확인해주세요");
          }
          if (err.status === 412) {
            alert("아이디 혹은 핸드폰번호를 확인해주세요");
          }
          if (err.status === 400) {
            alert("알수없는 오류가 발생했습니다");
          }
        }
        // console.log(err)
      );
  };
  return (
    <>
      <div>
        <h2>비밀번호 찾기</h2>

        <div>
          <div>
            <Stinput
              placeholder="아이디를 입력해주세요"
              type="text"
              required
              name="id"
              onChange={enterId}
            />
          </div>
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
                name="vericode"
                onChange={enterVeriCode}
              />
            </div>
          )}
        </div>
        <button onClick={findPwHandler}>비밀번호 찾기</button>

        <button onClick={() => navigate(`/findid`)}>아이디 찾으러🐾🐾🐾</button>
      </div>
    </>
  );
};
export default FindPw;
