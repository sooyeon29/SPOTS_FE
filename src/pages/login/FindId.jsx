import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import TapBar from '../../components/TapBar';
import useInput from '../../hooks/useInput';
import useToggle from '../../hooks/useToggle';
import { LoginAPI } from '../../tools/instance';
import { Stinput, StWraps, PageTitle, InputWrap } from './Styles';

const FindId = () => {
  const navigate = useNavigate();
  const [isCode, setIsCode] = useToggle();
  const [phoneNum, setPhoneNum, enterPhoneNum] = useInput();
  const [veriCode, setVeriCode, enterVeriCode] = useInput();
  const sendPhoneForCode = () => {
    setIsCode(true);
    LoginAPI.postforVCode(phoneNum)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const findIdHandler = () => {
    LoginAPI.findId({ phoneNum, veriCode })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Layout>
        <Header />
        <StWraps>
          <PageTitle>아이디찾기</PageTitle>
          <form onSubmit={findIdHandler}>
            <InputWrap>
              <Stinput
                placeholder='휴대폰 번호를 입력해주세요'
                type='text'
                required
                name='phone'
                onChange={enterPhoneNum}
              />
              <button type='button' onClick={sendPhoneForCode}>
                인증번호받기
              </button>
              {isCode && (
                <Stinput
                  placeholder='인증번호를 입력하세요'
                  type='text'
                  required
                  name='vericode'
                  onChange={enterVeriCode}
                />
              )}
              <button>아이디 찾기</button>
              <button onClick={() => navigate(`/findpw`)}>비밀번호 찾기</button>
            </InputWrap>
          </form>
        </StWraps>
        <TapBar />
      </Layout>
    </>
  );
};
export default FindId;
