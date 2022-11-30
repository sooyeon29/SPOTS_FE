import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import TapBar from '../../components/TapBar';
import useToggle from '../../hooks/useToggle';
import { IoFootball } from 'react-icons/io5';
import { IoIosLock, IoMdTennisball } from 'react-icons/io';
import { GiShuttlecock } from 'react-icons/gi';
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
  MySports,
  FavSports,
  SportsBlock,
  RecommendId,
  SportLabel,
  Logo,
  GrayBorder,
  FootballInput,
  TennisInput,
  BadmintonInput,
  RunningInput,
  SwimmingInput,
  BaseballInput,
  BasketballInput,
  GolfInput,
  HealthInput,
  FootballDiv,
  BadmintonDiv,
  TennisDiv,
  SwimmingDiv,
  BasketballDiv,
  RunningDiv,
  GolfDiv,
  HealthDiv,
  BaseballDiv,
  RecommendTitle,
} from './Styles';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BsFillPersonFill } from 'react-icons/bs';

const SignUp = () => {
  const [idAndPwPage, setIdAndPwPage] = useState(true);
  const [phoneCertify, setPhoneCertify] = useState(false);
  const [addInfoPage, setAddInfoPage] = useState(false);
  const [addSportsPage, setAddSportsPage] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [idConfirm, setIdConfirm] = useState(false);
  const [nnConfirm, setNnConfirm] = useState(false);
  const [code, setCode] = useState('');

  const {
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'all' });
  const password = useRef();
  password.current = watch('password');
  const navigate = useNavigate();

  const onIdPwPageHandler = (e) => {
    e.preventDefault();
    const loginId = getValues('loginId');
    if (loginId.trim() === '') {
      Swal.fire({
        text: '아이디를 입력해주세요',
        width: '300px',
        confirmButtonText: '확인',
        confirmButtonColor: '#40d295',
        showClass: { popup: 'animated fadeInDown faster' },
        hideClass: { popup: 'animated fadeOutUp faster' },
      });
      return;
      // return alert('아이디를 입력해주세요');
    }
    const pw = getValues('password');
    const pwRex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,20}$/;
    if (pw.trim() === '') {
      Swal.fire({
        text: '비밀번호를 입력해주세요',
        width: '300px',
        confirmButtonText: '확인',
        confirmButtonColor: '#40d295',
        showClass: { popup: 'animated fadeInDown faster' },
        hideClass: { popup: 'animated fadeOutUp faster' },
      });
      return;
    }
    if (!pwRex.test(pw)) {
      Swal.fire({
        text: '비밀번호를 형식에 맞게 입력해주세요',
        width: '300px',
        confirmButtonText: '확인',
        confirmButtonColor: '#40d295',
        showClass: { popup: 'animated fadeInDown faster' },
        hideClass: { popup: 'animated fadeOutUp faster' },
      });
      return;
    }
    const pwConfirm = getValues('confirmPassword');
    if (pwConfirm.trim() === '') {
      Swal.fire({
        text: '비밀번호를 다시 한번 확인해주세요',
        width: '300px',
        confirmButtonText: '확인',
        confirmButtonColor: '#40d295',
        showClass: { popup: 'animated fadeInDown faster' },
        hideClass: { popup: 'animated fadeOutUp faster' },
      });
      return;
    }
    if (!idConfirm) {
      Swal.fire({
        text: 'ID 중복 확인을 해주세요',
        width: '300px',
        confirmButtonText: '확인',
        confirmButtonColor: '#40d295',
        showClass: { popup: 'animated fadeInDown faster' },
        hideClass: { popup: 'animated fadeOutUp faster' },
      });
      return;
    }
    setIdAndPwPage(false);
    setPhoneCertify(true);
    setAddInfoPage(false);
    setAddSportsPage(false);
  };

  const onNumberCertifiHandler = (e) => {
    e.preventDefault();
    if (!codeSent) {
      Swal.fire({
        text: '휴대폰 인증을 해주세요',
        width: '300px',
        confirmButtonText: '확인',
        confirmButtonColor: '#40d295',
        showClass: { popup: 'animated fadeInDown faster' },
        hideClass: { popup: 'animated fadeOutUp faster' },
      });
      return;
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
      Swal.fire({
        text: '닉네임을 입력해주세요',
        width: '300px',
        confirmButtonText: '확인',
        confirmButtonColor: '#40d295',
        showClass: { popup: 'animated fadeInDown faster' },
        hideClass: { popup: 'animated fadeOutUp faster' },
      });
      return;
    }
    if (!nnConfirm) {
      Swal.fire({
        text: '닉네임을 중복확인을 해주세요',
        width: '300px',
        confirmButtonText: '확인',
        confirmButtonColor: '#40d295',
        showClass: { popup: 'animated fadeInDown faster' },
        hideClass: { popup: 'animated fadeOutUp faster' },
      });
      return;
    }
    setIdAndPwPage(false);
    setPhoneCertify(false);
    setAddInfoPage(false);
    setAddSportsPage(true);
  };

  const onSubmit = async (data) => {
    SignUpAPI.signUp(data)
      .then((res) => {
        // console.log(res);
        if (res.status === 201) {
          navigate('/welcome');
        }
      })
      .catch((error) => {
        const errorMsg = error.response.data.code;
        console.log(errorMsg);
        if (errorMsg === -1) {
          Swal.fire({
            text: '사용 중인 아이디입니다',
            width: '300px',
            confirmButtonText: '확인',
            confirmButtonColor: '#40d295',
            showClass: { popup: 'animated fadeInDown faster' },
            hideClass: { popup: 'animated fadeOutUp faster' },
          });
        }
        if (errorMsg === -2) {
          Swal.fire({
            text: '사용 중인 닉네임입니다',
            width: '300px',
            confirmButtonText: '확인',
            confirmButtonColor: '#40d295',
            showClass: { popup: 'animated fadeInDown faster' },
            hideClass: { popup: 'animated fadeOutUp faster' },
          });
        }
        if (errorMsg === -3) {
          Swal.fire({
            text: '사용 중인 휴대폰 번호입니다',
            width: '300px',
            confirmButtonText: '확인',
            confirmButtonColor: '#40d295',
            showClass: { popup: 'animated fadeInDown faster' },
            hideClass: { popup: 'animated fadeOutUp faster' },
          });
        }
        if (errorMsg === -4) {
          Swal.fire({
            text: '해당 추천인 아이디가 없습니다',
            width: '300px',
            confirmButtonText: '확인',
            confirmButtonColor: '#40d295',
            showClass: { popup: 'animated fadeInDown faster' },
            hideClass: { popup: 'animated fadeOutUp faster' },
          });
        }
        if (errorMsg === -5) {
          Swal.fire({
            text: '비밀번호를 확인해주세요',
            width: '300px',
            confirmButtonText: '확인',
            confirmButtonColor: '#40d295',
            showClass: { popup: 'animated fadeInDown faster' },
            hideClass: { popup: 'animated fadeOutUp faster' },
          });
        }
      });
  };

  // ID 중복 확인
  const checkId = () => {
    const loginId = getValues('loginId');
    if (loginId.trim() === '') {
      Swal.fire({
        text: '아이디를 입력해주세요',
        width: '300px',
        confirmButtonText: '확인',
        confirmButtonColor: '#40d295',
        showClass: { popup: 'animated fadeInDown faster' },
        hideClass: { popup: 'animated fadeOutUp faster' },
      });
      return {};
    }
    if (loginId.length <= 5) {
      Swal.fire({
        text: '여섯 글자 이상 입력해주세요',
        width: '300px',
        confirmButtonText: '확인',
        confirmButtonColor: '#40d295',
        showClass: { popup: 'animated fadeInDown faster' },
        hideClass: { popup: 'animated fadeOutUp faster' },
      });
      return {};
    }
    SignUpAPI.checkId({ loginId })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            text: '사용 가능한 아이디입니다',
            width: '300px',
            confirmButtonText: '확인',
            confirmButtonColor: '#40d295',
            showClass: { popup: 'animated fadeInDown faster' },
            hideClass: { popup: 'animated fadeOutUp faster' },
          });
          setIdConfirm(true);
        }
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 412) {
          Swal.fire({
            text: '이미 사용 중인 아이디입니다',
            width: '300px',
            confirmButtonText: '확인',
            confirmButtonColor: '#40d295',
            showClass: { popup: 'animated fadeInDown faster' },
            hideClass: { popup: 'animated fadeOutUp faster' },
          });
        }
      });
  };

  // 핸드폰 인증코드 받기
  const sendPhoneForCode = () => {
    const phone = getValues('phone');
    LoginAPI.postforVCode({ phone })
      .then((res) => {
        console.log(res);
        Swal.fire({
          text: '인증번호가 전송되었습니다',
          width: '300px',
          confirmButtonText: '확인',
          confirmButtonColor: '#40d295',
          showClass: { popup: 'animated fadeInDown faster' },
          hideClass: { popup: 'animated fadeOutUp faster' },
        });
        setCodeSent(true);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 412) {
          Swal.fire({
            text: '이미 가입된 휴대폰 번호입니다',
            width: '300px',
            confirmButtonText: '확인',
            confirmButtonColor: '#40d295',
            showClass: { popup: 'animated fadeInDown faster' },
            hideClass: { popup: 'animated fadeOutUp faster' },
          });
          return;
        } else {
          Swal.fire({
            text: '유효하지 않은 휴대폰 번호입니다',
            width: '300px',
            confirmButtonText: '확인',
            confirmButtonColor: '#40d295',
            showClass: { popup: 'animated fadeInDown faster' },
            hideClass: { popup: 'animated fadeOutUp faster' },
          });
          return;
        }
      });
  };

  const checkVCode = () => {
    const phone = getValues('phone');
    LoginAPI.postforCheckVCode({ code, phone })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            text: '인증이 완료되었습니다',
            width: '300px',
            confirmButtonText: '확인',
            confirmButtonColor: '#40d295',
            showClass: { popup: 'animated fadeInDown faster' },
            hideClass: { popup: 'animated fadeOutUp faster' },
          });
        }
        // setCodeSent(true);
      })
      .catch((err) => {
        console.log(err);
        // if(err.response.data === 401)
        Swal.fire({
          text: '인증 번호를 다시 확인해주세요',
          width: '300px',
          confirmButtonText: '확인',
          confirmButtonColor: '#40d295',
          showClass: { popup: 'animated fadeInDown faster' },
          hideClass: { popup: 'animated fadeOutUp faster' },
        });
      });
  };

  // 닉네임 중복 확인
  const checkNn = () => {
    const nickname = getValues('nickname');
    if (nickname.trim() === '') {
      Swal.fire({
        text: '닉네임을 입력해주세요',
        width: '300px',
        confirmButtonText: '확인',
        confirmButtonColor: '#40d295',
        showClass: { popup: 'animated fadeInDown faster' },
        hideClass: { popup: 'animated fadeOutUp faster' },
      });
      return;
    }
    SignUpAPI.checkNickname({ nickname })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            text: '사용 가능한 닉네임입니다',
            width: '300px',
            confirmButtonText: '확인',
            confirmButtonColor: '#40d295',
            showClass: { popup: 'animated fadeInDown faster' },
            hideClass: { popup: 'animated fadeOutUp faster' },
          });
          setNnConfirm(true);
        }
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 412) {
          Swal.fire({
            text: '이미 사용 중인 닉네임입니다',
            width: '300px',
            confirmButtonText: '확인',
            confirmButtonColor: '#40d295',
            showClass: { popup: 'animated fadeInDown faster' },
            hideClass: { popup: 'animated fadeOutUp faster' },
          });
          return;
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
                <Logo>
                  <img src='/spotslogo.png' />
                </Logo>
                {/* <PageTitle>회원가입</PageTitle> */}
                <ContentWrap>
                  <GrayBorder>
                    <BsFillPersonFill size={24} color={'#949494'} />
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
                  </GrayBorder>
                  {errors.loginId && errors.loginId.type === 'required' && (
                    <p>✓ 아이디를 입력해주세요</p>
                  )}
                  {errors.loginId && errors.loginId.type === 'pattern' && (
                    <p> ✓ 6~12글자 사이의 영문 또는 숫자만 입력 가능합니다</p>
                  )}
                  <GrayBorder>
                    <IoIosLock size={24} color={'#949494'} />
                    <PwInput
                      type='password'
                      {...register('password', {
                        required: true,
                        pattern: /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,20}$/,
                      })}
                      placeholder='비밀번호'
                    />
                  </GrayBorder>
                  {errors.password && errors.password.type === 'required' && (
                    <p>✓ 비밀번호를 입력해주세요</p>
                  )}
                  {errors.password && errors.password.type === 'pattern' && (
                    <p>✓ 영문과 숫자 조합으로 6글자 이상을 입력해주세요</p>
                  )}
                  <GrayBorder>
                    <IoIosLock size={24} color={'#949494'} />
                    <PwInput
                      type='password'
                      {...register('confirmPassword', {
                        required: true,
                        validate: (value) => value === password.current,
                      })}
                      placeholder='비밀번호 확인'
                    />
                  </GrayBorder>
                  {errors.confirmPassword &&
                    errors.confirmPassword.type === 'required' && (
                      <p>✓ 다시 한번 비밀번호를 입력해주세요</p>
                    )}
                  {errors.confirmPassword &&
                    errors.confirmPassword.type === 'validate' && (
                      <p>✓ 비밀번호가 일치하지 않습니다</p>
                    )}
                  <NextBtn onClick={onIdPwPageHandler}>다음</NextBtn>
                </ContentWrap>
              </FirstPage>
            ) : null}

            {phoneCertify ? (
              <SecondPage>
                <Logo>
                  <img src='/spotslogo.png' />
                </Logo>
                {/* <PageTitle>휴대폰 인증</PageTitle> */}
                <ContentWrap>
                  <GrayBorder>
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
                          border: 'none',
                          color: '#ff00b3',
                          fontWeight: '600',
                          cursor: 'pointer',
                        }}
                        type='button'
                        onClick={sendPhoneForCode}>
                        인증하기
                      </button>
                    ) : (
                      <button
                        style={{
                          // background: 'white',
                          border: 'none',
                          // height: '39.5px',
                          color: '#ff00b3',
                          fontWeight: '600',
                          cursor: 'pointer',
                        }}
                        type='button'
                        onClick={sendPhoneForCode}>
                        다시받기
                      </button>
                    )}
                  </GrayBorder>
                  {errors.phone && errors.phone.type === 'required' && (
                    <p>휴대폰 번호를 입력해주세요</p>
                  )}
                  {errors.phone && errors.phone.type === 'pattern' && (
                    <p>10~11자리의 번호를 입력해주세요</p>
                  )}
                  <GrayBorder>
                    <input
                      placeholder='인증번호를 입력하세요'
                      type='text'
                      required
                      name='code'
                      autoComplete='off'
                      onChange={(e) => setCode(e.target.value)}
                    />
                    <button
                      style={{
                        // background: 'white',
                        border: 'none',
                        // height: '39.5px',
                        color: '#ff00b3',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                      type='button'
                      onClick={checkVCode}>
                      인증확인
                    </button>
                  </GrayBorder>
                  <NextBtn onClick={onNumberCertifiHandler}>다음</NextBtn>
                </ContentWrap>
              </SecondPage>
            ) : null}

            {addInfoPage ? (
              <ThirdPage>
                <Logo>
                  <img src='/spotslogo.png' />
                </Logo>
                {/* <PageTitle>추가 정보 입력</PageTitle> */}
                <ContentWrap>
                  <GrayBorder>
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
                        border: 'none',
                        color: '#ff00b3',
                        fontWeight: '600',
                      }}
                      type='button'
                      onClick={checkNn}>
                      중복확인
                    </button>
                  </GrayBorder>
                  {errors.nickname && errors.nickname.type === 'required' && (
                    <p>닉네임을 입력해주세요</p>
                  )}
                  {errors.nickname && errors.nickname.type === 'minLegnth' && (
                    <p>닉네임을 한 글자 이상 입력해주세요</p>
                  )}
                  <div>
                    <input
                      style={{
                        width: '30px',
                      }}
                      checked='checked'
                      type='radio'
                      value='여성'
                      {...register('gender', { required: true })}
                    />
                    여성
                    <input
                      style={{
                        width: '30px',
                      }}
                      type='radio'
                      value='남성'
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
                <PageTitle>어떤 스팟을 찾으세요?</PageTitle>
                <SportsBlock>
                  <MySports>
                    <SportLabel>
                      <FootballInput
                        type='checkbox'
                        id='football'
                        value='football'
                        {...register('sports')}
                      />
                      <FootballDiv></FootballDiv>
                    </SportLabel>
                    <SportLabel>
                      <TennisInput
                        type='checkbox'
                        value='tennis'
                        {...register('sports')}
                      />
                      <TennisDiv />
                    </SportLabel>
                    <SportLabel>
                      <BadmintonInput
                        type='checkbox'
                        value='badminton'
                        {...register('sports')}
                      />
                      <BadmintonDiv></BadmintonDiv>
                    </SportLabel>
                  </MySports>
                  <PageTitle>어떤 운동을 좋아하시나요?</PageTitle>
                  <FavSports>
                    <SportLabel>
                      <SwimmingInput
                        type='checkbox'
                        value='swim'
                        {...register('favSports')}
                      />
                      <SwimmingDiv />
                    </SportLabel>
                    <SportLabel>
                      <BaseballInput
                        type='checkbox'
                        value='baseball'
                        {...register('favSports')}
                      />
                      <BaseballDiv />
                    </SportLabel>
                    <SportLabel>
                      <BasketballInput
                        type='checkbox'
                        value='basketball'
                        {...register('favSports')}
                      />
                      <BasketballDiv />
                    </SportLabel>
                  </FavSports>{' '}
                  <FavSports>
                    <SportLabel>
                      <RunningInput
                        type='checkbox'
                        value='running'
                        {...register('favSports')}
                      />
                      <RunningDiv />
                    </SportLabel>
                    <SportLabel>
                      <GolfInput
                        type='checkbox'
                        value='golf'
                        {...register('favSports')}
                      />
                      <GolfDiv />
                    </SportLabel>
                    <SportLabel>
                      <HealthInput
                        type='checkbox'
                        value='health'
                        {...register('favSports')}
                      />
                      <HealthDiv />
                    </SportLabel>
                  </FavSports>
                  <RecommendTitle>추천인 ID를 입력해주세요</RecommendTitle>
                  <GrayBorder>
                    <RecommendId
                      type='text'
                      {...register('recommendId', {})}
                      placeholder='5,000포인트 추가 지급'
                      autoComplete='off'
                    />
                  </GrayBorder>
                  <NextBtn type='submit'>회원가입</NextBtn>
                </SportsBlock>
              </ForthPage>
            ) : null}
          </form>
        </StWrap>
        <TapBar />
      </Layout>
    </>
  );
};

export default SignUp;
