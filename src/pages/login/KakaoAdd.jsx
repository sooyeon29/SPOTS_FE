import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GiShuttlecock } from "react-icons/gi";
import { IoMdTennisball } from "react-icons/io";
import { IoFootball } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import TapBar from "../../components/TapBar";
import useToggle from "../../hooks/useToggle";
import { LoginAPI, SignUpAPI } from "../../tools/instance";
import {
  ContentWrap,
  FavSports,
  ForthPage,
  MySports,
  NextBtn,
  PageTitle,
  RecommendId,
  Red,
  SecondPage,
  SportDiv,
  SportInput,
  SportLabel,
  SportsBlock,
  StWrap,
  ThirdPage,
  GrayBorder,
  Logo,
  FootballInput,
  FootballDiv,
  TennisInput,
  TennisDiv,
  BadmintonInput,
  BadmintonDiv,
  SwimmingInput,
  SwimmingDiv,
  BaseballInput,
  BaseballDiv,
  BasketballInput,
  BasketballDiv,
  RunningInput,
  RunningDiv,
  GolfInput,
  GolfDiv,
  HealthInput,
  HealthDiv,
  RecommendTitle,
} from "../signUp/Styles";
import { LoginBtn } from "./Styles";

const KakaoAdd = () => {
  const [isCode, setIsCode] = useToggle();
  const [welcome, setwelcome, welcomeHandler] = useToggle();
  const [nickname, setNickname, nicknameHandler] = useToggle();
  const [phoneCode, setPhoneCode, phoneCodeHandler] = useToggle();
  const [codeSent, setCodeSent] = useToggle();
  const [addSport, setAddSport, addSportHandler] = useToggle();
  const [nnConfirm, setNnConfirm] = useToggle();
  const [code, setCode] = useState("");
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm({ mode: "all" });
  // window.localStorage.setItem("loginId", 2526933634);
  const navigate = useNavigate();

  const isMember = localStorage.getItem("loginId");
  console.log(isMember);

  const onSubmit = async (data) => {
    SignUpAPI.kakaoSingUp({ ...data, loginId: isMember })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          navigate(`/welcome`);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.status === 412 && error.response.data.code === -4) {
          Swal.fire({
            text: "잘못된 추천인아이디입니다",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
        }
      });
  };

  // 닉네임 중복 확인
  const checkNn = () => {
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
    SignUpAPI.checkNickname({ nickname })
      .then((res) => {
        console.log(res);
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
        console.log(error.response.status);
        if (error.response.status === 412) {
          Swal.fire({
            text: "이미 사용 중인 닉네임입니다",
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
    if (phone.length < 10) {
      Swal.fire({
        text: "10~11자리의 번호를 입력해주세요",
        width: "300px",
        confirmButtonText: "확인",
        confirmButtonColor: "#40d295",
        showClass: { popup: "animated fadeInDown faster" },
        hideClass: { popup: "animated fadeOutUp faster" },
      });
    } else {
      LoginAPI.postforVCode({ phone })
        .then((res) => {
          console.log(res);
          Swal.fire({
            text: "인증번호가 전송되었습니다",
            width: "300px",
            confirmButtonText: "확인",
            confirmButtonColor: "#40d295",
            showClass: { popup: "animated fadeInDown faster" },
            hideClass: { popup: "animated fadeOutUp faster" },
          });
          setIsCode(true);
        })
        .catch((err) => {
          console.log(err);
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
        console.log(res);
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
        setCodeSent(true);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          text: "인증 번호를 다시 확인주세요",
          width: "300px",
          confirmButtonText: "확인",
          confirmButtonColor: "#40d295",
          showClass: { popup: "animated fadeInDown faster" },
          hideClass: { popup: "animated fadeOutUp faster" },
        });
      });
  };
  return (
    <>
      <Layout>
        <Header />
        <StWrap>
          <form onSubmit={handleSubmit(onSubmit)}>
            {!welcome ? (
              <ContentWrap>
                <div>
                  <img alt="" src="/spotslogo.png" />
                </div>
                <br />
                <div>
                  SPOTS 방문을 환영합니다.
                  <br />
                  서비스 이용을 위해 추가 가입이 필요합니다.
                </div>
                <NextBtn
                  onClick={() => {
                    welcomeHandler();
                    setNickname(true);
                  }}
                >
                  계속하기
                </NextBtn>
                <LoginBtn
                  onClick={() => {
                    navigate(`/`);
                    window.localStorage.removeItem("loginId");
                  }}
                >
                  다음에 가입하기
                </LoginBtn>
              </ContentWrap>
            ) : null}
            {nickname ? (
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
                  <NextBtn
                    onClick={(e) => {
                      e.preventDefault();
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
                      nicknameHandler();
                      setPhoneCode(true);
                    }}
                  >
                    다음
                  </NextBtn>
                </ContentWrap>
              </ThirdPage>
            ) : null}
            {phoneCode ? (
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
                  {isCode && (
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
                  )}

                  <NextBtn
                    onClick={(e) => {
                      if (!isCode) {
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
                      if (code === "") {
                        Swal.fire({
                          text: "인증번호를 입력 해주세요",
                          width: "300px",
                          confirmButtonText: "확인",
                          confirmButtonColor: "#40d295",
                          showClass: { popup: "animated fadeInDown faster" },
                          hideClass: { popup: "animated fadeOutUp faster" },
                        });
                        return;
                      }
                      phoneCodeHandler();
                      setAddSport(true);
                    }}
                  >
                    다음
                  </NextBtn>
                </ContentWrap>
              </SecondPage>
            ) : null}
            {addSport ? (
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

export default KakaoAdd;
