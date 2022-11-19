import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import TapBar from '../../components/TapBar';
import useToggle from '../../hooks/useToggle';
import { LoginAPI, SignUpAPI } from '../../tools/instance';
import {
  StWrap,
  PageTitle,
  FirstPage,
  SecondPage,
  ThirdPage,
  ForthPage,
  ContentWrap,
  IdConfirmBtn,
  NextBtn,
  IdInput,
  PwInput,
} from './Styles';

const SignUp2 = () => {
  const [idAndPwPage, setIdAndPwPage] = useState(true);
  const [phoneCertify, setPhoneCertify] = useState(false);
  const [addInfoPage, setAddInfoPage] = useState(false);
  const [addSportsPage, setAddSportsPage] = useState(false);
  const [codeSent, setCodeSent] = useToggle(false);
  const [idConfirm, setIdConfirm] = useState(false);

  const {
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'all' });
  const password = useRef();
  password.current = watch('password');

  const onIdPwPageHandler = (e) => {
    e.preventDefault();
    const loginId = getValues('loginId');
    if (loginId.trim() === '') {
      return alert('아이디가 비어 있습니다');
    }
    const pw = getValues('password');
    if (pw.trim() === '') {
      return alert('비밀번호가 비어 있습니다');
    }
    const pwConfirm = getValues('confirmPassword');
    if (pwConfirm.trim() === '') {
      return alert('비밀번호를 다시 한번 확인해주세요');
    }
    if (!idConfirm) {
      return alert('ID 중복 확인을 해주세요');
    }
    setIdAndPwPage(false);
    setPhoneCertify(true);
    setAddInfoPage(false);
    setAddSportsPage(false);
  };

  const onNumberCertifiHandler = (e) => {
    e.preventDefault();
    if (!codeSent) {
      return alert('휴대번호 인증을 해주세요');
    }
    setIdAndPwPage(false);
    setPhoneCertify(false);
    setAddInfoPage(true);
    setAddSportsPage(false);
  };

  const onAddInfoPageHandler = (e) => {
    e.preventDefault();
    const nickname = getValues('nickname');
    if (!nickname) {
      return alert('닉네임을 입력해주세요');
    }
    setIdAndPwPage(false);
    setPhoneCertify(false);
    setAddInfoPage(false);
    setAddSportsPage(true);
  };

  const onSubmit = async (data) => {
    SignUpAPI.signUp(data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ID 중복 확인
  const checkId = () => {
    setIdConfirm(true);
    const loginId = getValues('loginId');
    SignUpAPI.checkId({ loginId })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert('사용 가능한 ID입니다');
        }
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 412) {
          alert('이미 사용 중인 ID입니다');
        }
      });
  };

  // 핸드폰 인증코드 받기
  const sendPhoneForCode = () => {
    setCodeSent(true);
    const phone = getValues('phone');
    LoginAPI.postforVCode({ phone })
      .then((res) => {
        console.log(res);
        alert('인증번호가 전송되었습니다.');
      })
      .catch((err) => {
        console.log(err);
        alert('유효하지 않은 번호입니다.');
      });
  };
  const checkVCode = () => {
    const code = getValues('code');
    LoginAPI.postforCheckVCode(code)
      .then((res) => {
        console.log(res);
        alert('인증이 완료되었습니다.');
      })
      .catch((err) => {
        console.log(err);
        alert('인증번호를 재확인 해주세요');
      });
  };

  // 닉네임 중복 확인
  const checkNn = () => {
    const nickname = getValues('nickname');
    if (nickname.trim() === '') {
      return alert('닉네임을 입력해주세요');
    }
    SignUpAPI.checkNickname({ nickname })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert('사용 가능한 닉네임입니다');
        }
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 412) {
          alert('이미 사용 중인 닉네임입니다');
        }
      });
  };

  return (
    <>
      <Layout>
        <Header />
        <StWrap>
          <form onSubmit={handleSubmit(onSubmit)}>
            {idAndPwPage ? (
              <FirstPage>
                <PageTitle>회원가입</PageTitle>
                <ContentWrap>
                  <IdInput
                    type='text'
                    {...register('loginId', {
                      required: true,
                      pattern: /^[A-za-z0-9]{6,12}$/,
                    })}
                    placeholder='아이디'
                    autoComplete='off'
                  />
                  <IdConfirmBtn type='button' onClick={checkId}>
                    중복확인
                  </IdConfirmBtn>
                  {errors.loginId && errors.loginId.type === 'required' && (
                    <p>✓ 아이디를 입력해주세요</p>
                  )}
                  {errors.loginId && errors.loginId.type === 'pattern' && (
                    <p> ✓ 6~12글자 사이의 영문 또는 숫자만 입력 가능합니다</p>
                  )}
                  <div>
                    <PwInput
                      type='password'
                      {...register('password', {
                        required: true,
                        pattern: /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,20}$/,
                      })}
                      placeholder='비밀번호'
                    />
                    {errors.password && errors.password.type === 'required' && (
                      <p>✓ 비밀번호를 입력해주세요</p>
                    )}
                    {errors.password && errors.password.type === 'pattern' && (
                      <p>✓ 영문과 숫자 조합으로 6글자 이상을 입력해주세요</p>
                    )}
                  </div>
                  <div>
                    <PwInput
                      type='password'
                      {...register('confirmPassword', {
                        required: true,
                        validate: (value) => value === password.current,
                      })}
                      placeholder='비밀번호 확인'
                    />
                    {errors.confirmPassword &&
                      errors.confirmPassword.type === 'required' && (
                        <p>✓ 다시 한번 비밀번호를 입력해주세요</p>
                      )}
                    {errors.confirmPassword &&
                      errors.confirmPassword.type === 'validate' && (
                        <p>✓ 비밀번호가 일치하지 않습니다</p>
                      )}
                  </div>
                  <NextBtn onClick={onIdPwPageHandler}>다음</NextBtn>
                </ContentWrap>
              </FirstPage>
            ) : null}

            {phoneCertify ? (
              <SecondPage>
                <PageTitle>휴대폰 인증</PageTitle>
                <ContentWrap>
                  <div>
                    <input
                      type='text'
                      {...register('phone', {
                        required: true,
                        minLegnth: 10,
                        pattern: /^[0-9]{3}[0-9]{3,4}[0-9]{4}/,
                      })}
                      placeholder='01012345678'
                      autoComplete='off'
                    />
                    {!codeSent ? (
                      <button
                        style={{
                          background: 'white',
                          border: 'none',
                          height: '39.5px',
                          color: '#ff00b3',
                          fontWeight: '600',
                        }}
                        type='button'
                        onClick={sendPhoneForCode}>
                        인증하기
                      </button>
                    ) : (
                      <button
                        style={{
                          background: 'white',
                          border: 'none',
                          height: '39.5px',
                          color: '#ff00b3',
                          fontWeight: '600',
                        }}
                        type='button'
                        onClick={sendPhoneForCode}>
                        다시받기
                      </button>
                    )}
                    {errors.phone && errors.phone.type === 'required' && (
                      <p>휴대폰 번호를 입력해주세요</p>
                    )}
                    {errors.phone && errors.phone.type === 'pattern' && (
                      <p>10~11자리의 번호를 입력해주세요</p>
                    )}
                  </div>
                  <div>
                    <input
                      placeholder='인증번호를 입력하세요'
                      type='text'
                      required
                      name='code'
                      autoComplete='off'
                    />
                    <button
                      style={{
                        background: 'white',
                        border: 'none',
                        height: '39.5px',
                        color: '#ff00b3',
                        fontWeight: '600',
                      }}
                      type='button'
                      onClick={checkVCode}>
                      인증확인
                    </button>
                  </div>
                  <NextBtn onClick={onNumberCertifiHandler}>다음</NextBtn>
                </ContentWrap>
              </SecondPage>
            ) : null}

            {addInfoPage ? (
              <ThirdPage>
                <PageTitle>추가 정보 입력</PageTitle>
                <ContentWrap>
                  <div>
                    <input
                      type='text'
                      {...register('nickname', {
                        required: true,
                        minLegnth: 1,
                      })}
                      placeholder='닉네임을 입력해주세요'
                      autoComplete='off'
                    />
                    <button
                      style={{
                        background: 'white',
                        border: 'none',
                        height: '39.5px',
                        color: '#ff00b3',
                        fontWeight: '600',
                      }}
                      type='button'
                      onClick={checkNn}>
                      중복확인
                    </button>
                    {errors.nickname && errors.nickname.type === 'required' && (
                      <p>닉네임을 입력해주세요</p>
                    )}
                    {errors.nickname &&
                      errors.nickname.type === 'minLegnth' && (
                        <p>닉네임을 한 글자 이상 입력해주세요</p>
                      )}
                  </div>
                  <div>
                    <input
                      checked='checked'
                      type='radio'
                      value='female'
                      {...register('gender', { required: true })}
                    />
                    여성
                    <input
                      type='radio'
                      value='male'
                      {...register('gender', { required: true })}
                    />
                    남성
                    {errors.gender && errors.gender.type === 'required' && (
                      <p>성별을 선택해주세요</p>
                    )}
                  </div>
                  <NextBtn onClick={onAddInfoPageHandler}>다음</NextBtn>
                </ContentWrap>
              </ThirdPage>
            ) : null}

            {addSportsPage ? (
              <ForthPage>
                <PageTitle>어떤 운동을 좋아하세요?(필수아님) </PageTitle>
                <div>
                  나의 운동
                  <input
                    type='checkbox'
                    value='football'
                    {...register('sports')}
                  />
                  풋볼
                  <input
                    type='checkbox'
                    value='tennis'
                    {...register('sports')}
                  />
                  테니스
                  <input
                    type='checkbox'
                    value='badminton'
                    {...register('sports')}
                  />
                  배드민턴
                </div>
                <div>
                  관심 운동
                  <input
                    type='checkbox'
                    value='swim'
                    {...register('favSports')}
                  />
                  수영
                  <input
                    type='checkbox'
                    value='baseball'
                    {...register('favSports')}
                  />
                  야구
                  <input
                    type='checkbox'
                    value='health'
                    {...register('favSports')}
                  />
                  헬스
                  <input
                    type='checkbox'
                    value='running'
                    {...register('favSports')}
                  />
                  러닝
                  <input
                    type='checkbox'
                    value='judo'
                    {...register('favSports')}
                  />
                  유도
                  <input
                    type='checkbox'
                    value='pingpong'
                    {...register('favSports')}
                  />
                  탁구
                </div>
                <div>
                  <PageTitle>추천인ID </PageTitle>
                  <input
                    type='text'
                    {...register('recommendId', {})}
                    placeholder='추천인ID를 입력해주세요'
                    autoComplete='off'
                  />
                </div>
                <input type='submit' />
              </ForthPage>
            ) : null}
          </form>
        </StWrap>
        <TapBar />
      </Layout>
    </>
  );
};

export default SignUp2;
