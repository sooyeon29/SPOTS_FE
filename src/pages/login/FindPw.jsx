import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import useInput from '../../hooks/useInput';
import useToggle from '../../hooks/useToggle';
import { LoginAPI } from '../../tools/instance';
import { Stinput, PageTitle, StWraps, InputWrap } from './Styles';

const FindPw = () => {
  const navigate = useNavigate();
  const [isCode, setIsCode] = useToggle();
  const [id, setId, enterId] = useInput();
  const [phoneNum, setPhoneNum, enterPhoneNum] = useInput();
  const [veriCode, setVeriCode, enterVeriCode] = useInput();
  const sendPhoneForCode = () => {
    setIsCode(true);
    LoginAPI.postforVCode(phoneNum)
      .then((res) => {
        console.log(res);
        alert('임시비밀번호가 발급되었습니다.');
        navigate(`/login`);
      })
      .catch((err) => console.log(err));
  };

  const findPwHandler = () => {
    LoginAPI.findPw({ id, phoneNum, veriCode })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Layout>
        <Header />
        <StWraps>
          <PageTitle>비밀번호 찾기</PageTitle>
          <form onSubmit={findPwHandler}>
            <InputWrap>
              <div>
                <Stinput
                  placeholder='아이디를 입력해주세요'
                  type='text'
                  required
                  name='id'
                  onChange={enterId}
                />
              </div>
              <div>
                <Stinput
                  placeholder= '휴대폰 번호를 입력해주세요'
                  type='text'
                  required
                  name='phone'
                  onChange={enterPhoneNum}
                />
              </div>
              <button type='button' onClick={sendPhoneForCode}>
                인증번호받기
              </button>
              {isCode && (
                <div>
                  <Stinput
                    placeholder='인증번호를 입력하세요'
                    type='text'
                    required
                    name='vericode'
                    onChange={enterVeriCode}
                  />
                </div>
              )}

              <button>비밀번호 찾기</button>
              <button onClick={() => navigate(`/findid`)}>아이디 찾기</button>
            </InputWrap>
          </form>
        </StWraps>
      </Layout>
    </>
  );
};
export default FindPw;
