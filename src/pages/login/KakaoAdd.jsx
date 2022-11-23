import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GiShuttlecock } from "react-icons/gi";
import { IoMdTennisball } from "react-icons/io";
import { IoFootball } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
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
} from "../signUp/Styles";

const KakaoAdd = () => {
  const [isCode, setIsCode] = useToggle();
  const [welcome, setwelcome, welcomeHandler] = useToggle();
  const [nickname, setNickname, nicknameHandler] = useToggle();
  const [phoneCode, setPhoneCode, phoneCodeHandler] = useToggle();
  const [codeSent, setCodeSent] = useToggle();
  const [addSport, setAddSport, addSportHandler] = useToggle();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const isMember = localStorage.getItem("loginId");
  console.log(isMember);

  const onSubmit = async (data) => {
    SignUpAPI.kakaoSingUp({ ...data, loginId: isMember })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          alert("회원가입을 환영합니다!");
          navigate(`/welcome`);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.status === 412 && error.response.data.code === -4) {
          alert("잘못된 추천인아이디입니다");
        }
      });
  };

  // 닉네임 중복 확인
  const checkNn = () => {
    const nickname = getValues("nickname");
    if (!nickname) {
      return alert("닉네임을 입력해주세요");
    }
    SignUpAPI.checkNickname({ nickname })
      .then((res) => {
        console.log(res);
        // if (res.status === 200) {
        alert("사용 가능한 닉네임입니다");
        // }
      })
      .catch((error) => {
        console.log(error.response.status);
        // if (error.response.status === 412) {
        alert("이미 사용 중인 닉네임입니다");
        // }
      });
  };
  // 핸드폰 인증코드 받기

  const sendPhoneForCode = () => {
    setIsCode(true);
    const phone = getValues("phone");
    LoginAPI.postforVCode({ phone })
      .then((res) => {
        console.log(res);
        alert("인증번호가 전송되었습니다.");
      })
      .catch((err) => {
        console.log(err);
        alert("유효하지 않은 번호입니다.");
      });
  };
  const checkVCode = () => {
    const code = getValues("code");
    LoginAPI.postforCheckVCode(code)
      .then((res) => {
        console.log(res);
        alert("인증이 완료되었습니다.");
      })
      .catch((err) => {
        console.log(err);
        alert("인증번호를 재확인 해주세요");
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
              </ContentWrap>
            ) : null}
            {nickname ? (
              <ThirdPage>
                <PageTitle>닉네임 입력하기</PageTitle>
                <ContentWrap>
                  <div>
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
                        background: "white",
                        border: "none",
                        height: "39.5px",
                        color: "#ff00b3",
                        fontWeight: "600",
                      }}
                      type="button"
                      onClick={checkNn}
                    >
                      중복확인
                    </button>
                    {errors.nickname && errors.nickname.type === "required" && (
                      <p>닉네임을 입력해주세요</p>
                    )}
                    {errors.nickname &&
                      errors.nickname.type === "minLegnth" && (
                        <p>닉네임을 한 글자 이상 입력해주세요</p>
                      )}
                  </div>
                  <div>
                    <input
                      style={{
                        width: "30px",
                      }}
                      checked="checked"
                      type="radio"
                      value="female"
                      {...register("gender", { required: true })}
                    />
                    여성
                    <input
                      style={{
                        width: "30px",
                      }}
                      type="radio"
                      value="male"
                      {...register("gender", { required: true })}
                    />
                    남성
                    {errors.gender && errors.gender.type === "required" && (
                      <p>성별을 선택해주세요</p>
                    )}
                  </div>
                  <NextBtn
                    onClick={() => {
                      nicknameHandler();
                      setPhoneCode(true);
                    }}
                  >
                    계속하기
                  </NextBtn>
                </ContentWrap>
              </ThirdPage>
            ) : null}
            {phoneCode ? (
              <SecondPage>
                <PageTitle>휴대폰 인증</PageTitle>
                <ContentWrap>
                  <div>
                    <input
                      type="text"
                      {...register("phone", {
                        required: true,
                        maxLegnth: 10,
                        pattern: /^[0-9]{3}[0-9]{3,4}[0-9]{4}/,
                      })}
                      placeholder="휴대폰 번호를 입력해주세요"
                      autoComplete="off"
                    />
                    {errors.phone && errors.phone.type === "required" && (
                      <p>휴대폰 번호를 입력해주세요</p>
                    )}
                    {errors.phone && errors.phone.type === "pattern" && (
                      <p>올바른 번호 형식이 아닙니다.</p>
                    )}
                    {!codeSent ? (
                      <button
                        style={{
                          background: "white",
                          border: "none",
                          height: "39.5px",
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
                          background: "white",
                          border: "none",
                          height: "39.5px",
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

                    {isCode && (
                      <div>
                        <div>
                          인증번호
                          <Red>*</Red>
                        </div>
                        <input
                          placeholder="인증번호를 입력하세요"
                          type="text"
                          required
                          name="code"
                          autoComplete="off"
                        />
                        <button type="button" onClick={checkVCode}>
                          확인
                        </button>
                      </div>
                    )}
                  </div>
                  <NextBtn
                    onClick={() => {
                      phoneCodeHandler();
                      setAddSport(true);
                    }}
                  >
                    계속하기
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
                      <SportInput
                        type="checkbox"
                        id="football"
                        value="football"
                        {...register("sports")}
                      />
                      <SportDiv>
                        <IoFootball style={{ fontSize: "30px" }} />
                        풋살
                      </SportDiv>
                    </SportLabel>
                    <SportLabel>
                      <SportInput
                        type="checkbox"
                        value="tennis"
                        {...register("sports")}
                      />
                      <SportDiv>
                        <IoMdTennisball style={{ fontSize: "30px" }} />
                        테니스
                      </SportDiv>
                    </SportLabel>
                    <SportLabel>
                      <SportInput
                        type="checkbox"
                        value="badminton"
                        {...register("sports")}
                      />
                      <SportDiv>
                        <GiShuttlecock style={{ fontSize: "30px" }} />
                        배드민턴
                      </SportDiv>
                    </SportLabel>
                  </MySports>
                  <FavSports>
                    관심 스팟
                    <hr />
                    <input
                      type="checkbox"
                      value="swim"
                      {...register("favSports")}
                    />
                    수영
                    <input
                      type="checkbox"
                      value="baseball"
                      {...register("favSports")}
                    />
                    야구
                    <input
                      type="checkbox"
                      value="basketball"
                      {...register("favSports")}
                    />
                    농구
                    <input
                      type="checkbox"
                      value="running"
                      {...register("favSports")}
                    />
                    러닝
                    <input
                      type="checkbox"
                      value="pingpong"
                      {...register("favSports")}
                    />
                    탁구
                  </FavSports>
                  <div>
                    <RecommendId
                      type="text"
                      {...register("recommendId", {})}
                      placeholder="추천인ID를 입력해주세요"
                      autoComplete="off"
                    />
                  </div>
                  <NextBtn type="submit">SPOTS 시작하기</NextBtn>
                </SportsBlock>
              </ForthPage>
            ) : null}
            {/* <div>
              나의 운동
              <input type="checkbox" value="football" {...register("sports")} />
              풋볼
              <input type="checkbox" value="tennis" {...register("sports")} />
              테니스
              <input
                type="checkbox"
                value="badminton"
                {...register("sports")}
              />
              배드민턴
            </div>
            <div>
              관심 운동
              <input type="checkbox" value="swim" {...register("favSports")} />
              수영
              <input
                type="checkbox"
                value="baseball"
                {...register("favSports")}
              />
              야구
              <input
                type="checkbox"
                value="health"
                {...register("favSports")}
              />
              헬스
              <input
                type="checkbox"
                value="running"
                {...register("favSports")}
              />
              러닝
              <input type="checkbox" value="judo" {...register("favSports")} />
              유도
              <input
                type="checkbox"
                value="pingpong"
                {...register("favSports")}
              />
              탁구
            </div>
            <div>
              추천인ID
              <input
                type="text"
                {...register("recommendId", {})}
                placeholder="추천인ID를 입력해주세요"
                autoComplete="off"
              />
            </div>
            <input type="submit" /> */}
          </form>
        </StWrap>
        <TapBar />
      </Layout>
    </>
  );
};

export default KakaoAdd;
