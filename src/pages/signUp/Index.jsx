import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import TapBar from "../../components/TapBar";
import Swal from "sweetalert2";
import useToggle from "../../hooks/useToggle";
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { IoIosLock } from "react-icons/io";
import { LoginAPI, SignUpAPI } from "../../tools/instance";
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
  Agreement,
  AgreementTerm,
  AgreementWrap,
  AgreementBtn,
} from "./Styles";

const SignUp = () => {
  const [idAndPwPage, setIdAndPwPage] = useState(true);
  const [phoneCertify, setPhoneCertify] = useState(false);
  const [addInfoPage, setAddInfoPage] = useState(false);
  const [addSportsPage, setAddSportsPage] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [codeConfirm, setCodeConfirm] = useState(false);
  const [idConfirm, setIdConfirm] = useState(false);
  const [nnConfirm, setNnConfirm] = useState(false);
  const [code, setCode] = useState("");
  const [agree, setAgree, agreeHandler] = useToggle();
  const [agreementTerm, setAgreementTerm] = useState(false);

  const {
    handleSubmit,
    register,
    watch,
    getValues,
    formState: { errors },
  } = useForm({ mode: "all" });
  const password = useRef();
  password.current = watch("password");
  const navigate = useNavigate();

  const onIdPwPageHandler = (e) => {
    e.preventDefault();
    const loginId = getValues("loginId");
    const idRex = /^[a-zA-z0-9]{6,20}$/;
    if (loginId.trim() === "") {
      Swal.fire({
        text: "아이디를 입력해주세요",
        width: "300px",
        confirmButtonText: "확인",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      });
      return;
    }
    if (!idRex.test(loginId)) {
      Swal.fire({
        text: "아이디를 형식에 맞게 입력해주세요",
        width: "300px",
        confirmButtonText: "확인",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      });
      return;
    }
    const pw = getValues("password");
    const pwRex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,25}$/;
    if (pw.trim() === "") {
      Swal.fire({
        text: "비밀번호를 입력해주세요",
        width: "300px",
        confirmButtonText: "확인",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      });
      return;
    }
    if (!pwRex.test(pw)) {
      Swal.fire({
        text: "비밀번호를 형식에 맞게 입력해주세요",
        width: "300px",
        confirmButtonText: "확인",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      });
      return;
    }
    const pwConfirm = getValues("confirmPassword");
    if (pwConfirm.trim() === "") {
      Swal.fire({
        text: "비밀번호를 다시 한번 확인해주세요",
        width: "300px",
        confirmButtonText: "확인",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      });
      return;
    }
    if (!idConfirm) {
      Swal.fire({
        text: "ID 중복 확인을 해주세요",
        width: "300px",
        confirmButtonText: "확인",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
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
    if (!codeConfirm) {
      Swal.fire({
        text: "휴대폰 인증을 해주세요",
        width: "300px",
        confirmButtonText: "확인",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
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
    const nickname = getValues("nickname");
    if (!nickname) {
      Swal.fire({
        text: "닉네임을 입력해주세요",
        width: "300px",
        confirmButtonText: "확인",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      });
      return;
    }
    if (!nnConfirm) {
      Swal.fire({
        text: "닉네임을 중복확인을 해주세요",
        width: "300px",
        confirmButtonText: "확인",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      });
      return;
    }
    setIdAndPwPage(false);
    setPhoneCertify(false);
    setAddInfoPage(false);
    setAddSportsPage(true);
  };

  const onSubmit = async (data) => {
    const loginId = getValues("loginId");
    if (!agree) {
      Swal.fire({
        text: "회원가입을 위해서는 개인정보 수집·이용에 동의가 필요합니다",
        width: "300px",
        confirmButtonText: "확인",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      });
      return;
    }
    SignUpAPI.signUp(data)
      .then((res) => {
        if (res.status === 201) {
          navigate("/welcome", {
            state: { loginId: loginId, password: password },
          });
        }
      })
      .catch((error) => {
        const errorMsg = error.response.data.code;
        if (errorMsg === -1) {
          Swal.fire({
            text: "사용 중인 아이디입니다",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
        }
        if (errorMsg === -2) {
          Swal.fire({
            text: "사용 중인 닉네임입니다",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
        }
        if (errorMsg === -3) {
          Swal.fire({
            text: "사용 중인 휴대폰 번호입니다",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
        }
        if (errorMsg === -4) {
          Swal.fire({
            text: "해당 추천인 아이디가 없습니다",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
        }
        if (errorMsg === -5) {
          Swal.fire({
            text: "비밀번호를 확인해주세요",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
        }
      });
  };

  // ID 중복 확인
  const checkId = () => {
    const loginId = getValues("loginId");
    const idRex = /^[a-zA-z0-9]{6,20}$/;
    if (loginId.trim() === "") {
      Swal.fire({
        text: "아이디를 입력해주세요",
        width: "300px",
        confirmButtonText: "확인",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      });
      return {};
    }
    if (!idRex.test(loginId)) {
      Swal.fire({
        text: "아이디를 형식에 맞게 입력해주세요",
        width: "300px",
        confirmButtonText: "확인",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      });
      return;
    }
    if (loginId.length <= 5) {
      Swal.fire({
        text: "아이디는 여섯 글자 이상 입력해주세요",
        width: "300px",
        confirmButtonText: "확인",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      });
      return {};
    }
    SignUpAPI.checkId({ loginId })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            text: "사용 가능한 아이디입니다",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
          setIdConfirm(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 412) {
          Swal.fire({
            text: "이미 사용 중인 아이디입니다",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
        }
      });
  };

  // 핸드폰 인증코드 받기
  const sendPhoneForCode = () => {
    const phone = getValues("phone");
    if (phone.length < 10 || phone.length > 11) {
      Swal.fire({
        text: "10-11자리의 번호를 입력해주세요",
        width: "300px",
        confirmButtonText: "확인",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      });
    } else {
      LoginAPI.postforVCode({ phone })
        .then((res) => {
          Swal.fire({
            text: "인증번호가 전송되었습니다",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
          setCodeSent(true);
        })
        .catch((err) => {
          if (err.response.status === 412) {
            Swal.fire({
              text: "이미 가입된 휴대폰 번호입니다",
              width: "300px",
              confirmButtonText: "확인",
              confirmButtonColor: "#40d295",
              showClass: { popup: "animated fadeInDown faster" },
              hideClass: { popup: "animated fadeOutUp faster" },
            });
            return;
          } else {
            Swal.fire({
              text: "유효하지 않은 휴대폰 번호입니다",
              width: "300px",
              confirmButtonText: "확인",
              confirmButtonColor: "#40d295",
              showClass: { popup: "animated fadeInDown faster" },
              hideClass: { popup: "animated fadeOutUp faster" },
            });
            return;
          }
        });
    }
  };

  const checkVCode = () => {
    const phone = getValues("phone");
    LoginAPI.postforCheckVCode({ code, phone })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            text: "인증이 완료되었습니다",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
        }
        setCodeConfirm(true);
      })
      .catch((err) => {
        Swal.fire({
          text: "인증 번호를 다시 확인해주세요",
          width: "300px",
          confirmButtonText: "확인",
          confirmButtonColor: "#40d295",
          showClass: { popup: "animated fadeInDown faster" },
          hideClass: { popup: "animated fadeOutUp faster" },
        });
      });
  };

  // 닉네임 중복 확인
  const checkNn = () => {
    const nickname = getValues("nickname");
    if (nickname.trim() === "") {
      Swal.fire({
        text: "닉네임을 입력해주세요",
        width: "300px",
        confirmButtonText: "확인",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      });
      return;
    }
    SignUpAPI.checkNickname({ nickname })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            text: "사용 가능한 닉네임입니다",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
          setNnConfirm(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 412) {
          Swal.fire({
            text: "이미 사용 중인 닉네임입니다",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
          return;
        }
      });
  };

  const agreementTermHandler = () => {
    setAgreementTerm(!agreementTerm);
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
                  <img alt="" src="/spotslogo.png" />
                </Logo>
                <ContentWrap>
                  <GrayBorder>
                    <BsFillPersonFill size={24} color={"#949494"} />
                    <IdInput
                      type="text"
                      {...register("loginId", {
                        required: true,
                        pattern: /^[A-za-z0-9]{6,20}$/,
                      })}
                      placeholder="아이디"
                      autoComplete="off"
                    />
                    <IdConfirmBtn type="button" onClick={checkId}>
                      중복확인
                    </IdConfirmBtn>
                  </GrayBorder>
                  {errors.loginId && errors.loginId.type === "required" && (
                    <p>✓ 아이디를 입력해주세요</p>
                  )}
                  {errors.loginId && errors.loginId.type === "pattern" && (
                    <p> ✓ 6~20글자 사이의 영문 또는 숫자만 입력 가능합니다</p>
                  )}
                  <GrayBorder>
                    <IoIosLock size={24} color={"#949494"} />
                    <PwInput
                      type="password"
                      {...register("password", {
                        required: true,
                        pattern:
                          /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,25}$/,
                      })}
                      placeholder="비밀번호"
                    />
                  </GrayBorder>
                  {errors.password && errors.password.type === "required" && (
                    <p>✓ 비밀번호를 입력해주세요</p>
                  )}
                  {errors.password && errors.password.type === "pattern" && (
                    <p>
                      ✓ 영문과 숫자, 특수문자를 조합하여 6글자 이상 입력해주세요
                    </p>
                  )}
                  <GrayBorder>
                    <IoIosLock size={24} color={"#949494"} />
                    <PwInput
                      type="password"
                      {...register("confirmPassword", {
                        required: true,
                        validate: (value) => value === password.current,
                      })}
                      placeholder="비밀번호 확인"
                    />
                  </GrayBorder>
                  {errors.confirmPassword &&
                    errors.confirmPassword.type === "required" && (
                      <p>✓ 다시 한번 비밀번호를 입력해주세요</p>
                    )}
                  {errors.confirmPassword &&
                    errors.confirmPassword.type === "validate" && (
                      <p>✓ 비밀번호가 일치하지 않습니다</p>
                    )}
                  <NextBtn onClick={onIdPwPageHandler}>다음</NextBtn>
                </ContentWrap>
              </FirstPage>
            ) : null}

            {phoneCertify ? (
              <SecondPage>
                <Logo>
                  <img alt="" src="/spotslogo.png" />
                </Logo>
                <ContentWrap>
                  <GrayBorder>
                    <input
                      type="text"
                      {...register("phone", {
                        required: true,
                        minLegnth: 10,
                        pattern: /^[0-9]{3}[0-9]{3,4}[0-9]{4}/,
                      })}
                      placeholder="01012345678"
                      autoComplete="off"
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
                  {errors.phone && errors.phone.type === "required" && (
                    <p>휴대폰 번호를 입력해주세요</p>
                  )}
                  {errors.phone && errors.phone.type === "pattern" && (
                    <p>10~11자리의 번호를 입력해주세요</p>
                  )}
                  <GrayBorder>
                    <input
                      placeholder="인증번호를 입력하세요"
                      type="text"
                      required
                      name="code"
                      autoComplete="off"
                      onChange={(e) => setCode(e.target.value)}
                    />
                    <button
                      style={{
                        border: "none",
                        color: "#ff00b3",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                      type="button"
                      onClick={checkVCode}
                    >
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
                  <img alt="" src="/spotslogo.png" />
                </Logo>
                <ContentWrap>
                  <GrayBorder>
                    <input
                      type="text"
                      {...register("nickname", {
                        required: true,
                        minLegnth: 1,
                      })}
                      placeholder="닉네임을 입력해주세요"
                      autoComplete="off"
                    />
                    <button
                      style={{
                        border: "none",
                        color: "#ff00b3",
                        fontWeight: "600",
                      }}
                      type="button"
                      onClick={checkNn}
                    >
                      중복확인
                    </button>
                  </GrayBorder>
                  {errors.nickname && errors.nickname.type === "required" && (
                    <p>닉네임을 입력해주세요</p>
                  )}
                  {errors.nickname && errors.nickname.type === "minLegnth" && (
                    <p>닉네임을 한 글자 이상 입력해주세요</p>
                  )}
                  <div>
                    <input
                      style={{
                        width: "30px",
                      }}
                      checked="checked"
                      type="radio"
                      value="여성"
                      {...register("gender", { required: true })}
                    />
                    여성
                    <input
                      style={{
                        width: "30px",
                      }}
                      type="radio"
                      value="남성"
                      {...register("gender", { required: true })}
                    />
                    남성
                    {errors.gender && errors.gender.type === "required" && (
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
                        type="checkbox"
                        id="football"
                        value="football"
                        {...register("sports")}
                      />
                      <FootballDiv></FootballDiv>
                    </SportLabel>
                    <SportLabel>
                      <TennisInput
                        type="checkbox"
                        value="tennis"
                        {...register("sports")}
                      />
                      <TennisDiv />
                    </SportLabel>
                    <SportLabel>
                      <BadmintonInput
                        type="checkbox"
                        value="badminton"
                        {...register("sports")}
                      />
                      <BadmintonDiv></BadmintonDiv>
                    </SportLabel>
                  </MySports>
                  <PageTitle>어떤 운동을 좋아하시나요?</PageTitle>
                  <FavSports>
                    <SportLabel>
                      <SwimmingInput
                        type="checkbox"
                        value="swim"
                        {...register("favSports")}
                      />
                      <SwimmingDiv />
                    </SportLabel>
                    <SportLabel>
                      <BaseballInput
                        type="checkbox"
                        value="baseball"
                        {...register("favSports")}
                      />
                      <BaseballDiv />
                    </SportLabel>
                    <SportLabel>
                      <BasketballInput
                        type="checkbox"
                        value="basketball"
                        {...register("favSports")}
                      />
                      <BasketballDiv />
                    </SportLabel>
                  </FavSports>{" "}
                  <FavSports>
                    <SportLabel>
                      <RunningInput
                        type="checkbox"
                        value="running"
                        {...register("favSports")}
                      />
                      <RunningDiv />
                    </SportLabel>
                    <SportLabel>
                      <GolfInput
                        type="checkbox"
                        value="golf"
                        {...register("favSports")}
                      />
                      <GolfDiv />
                    </SportLabel>
                    <SportLabel>
                      <HealthInput
                        type="checkbox"
                        value="health"
                        {...register("favSports")}
                      />
                      <HealthDiv />
                    </SportLabel>
                  </FavSports>
                  <RecommendTitle>추천인 ID를 입력해주세요</RecommendTitle>
                  <GrayBorder>
                    <RecommendId
                      type="text"
                      {...register("recommendId", {})}
                      placeholder="5,000포인트 추가 지급"
                      autoComplete="off"
                    />
                  </GrayBorder>
                  <Agreement>
                    <AgreementWrap>
                      <input
                        type="checkbox"
                        name="agreement"
                        value={agree}
                        onChange={agreeHandler}
                        // required
                        onInvalid="alert('회원가입을 위해서는 개인정보 동의를 해주세요')"
                        style={{ width: "10px" }}
                      />
                      <div>개인정보 수집·이용 동의</div>
                      <AgreementBtn onClick={agreementTermHandler}>
                        상세보기
                      </AgreementBtn>
                    </AgreementWrap>
                  </Agreement>
                  {agreementTerm ? (
                    <AgreementTerm>
                      SPOTS는 「개인정보보호법」에 의거하여 아래와 같은 내용으로
                      개인정보를 수집하고 있습니다. 이용자가 제공한 모든 정보는
                      다음의 목적을 위해 활용하며, 하기 목적 이외의 용도로는
                      사용되지 않습니다.
                      <br />
                      <br />
                      <b>① 개인정보 수집 항목 및 수집·이용 목적</b>
                      <br />
                      가) 수집 항목
                      <br />- 전화번호(휴대전화) 및 이메일
                      <br />
                      나) 수집 및 이용 목적
                      <br />- 본인 확인 용도(휴대전화) 및 예약 정보 전달(이메일)
                      <br />
                      <b>② 개인정보 보유 및 이용기간</b>
                      <br />- 수집·이용 동의일로부터 개인정보의 수집·이용목적을
                      달성할 때까지
                      <br />
                      <b> ③ 동의거부관리 </b>
                      <br />- 귀하께서는 본 안내에 따른 개인정보 수집, 이용에
                      대하여 동의를 거부하실 권리가 있습니다.
                    </AgreementTerm>
                  ) : null}
                  <NextBtn type="submit">회원가입</NextBtn>
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
