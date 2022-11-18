import React from "react";
import Layout from "../../components/Layout";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Red } from "./Styles";
import { LoginAPI, SignUpAPI } from "../../tools/instance";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";
import TapBar from "../../components/TapBar";

const SignUp = () => {
  const [isCode, setIsCode] = useToggle();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();
  const password = useRef();
  password.current = watch("password");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    SignUpAPI.signUp(data)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          alert("회원가입을 환영합니다!");
          navigate("/login");
        }
      })
      .catch((error) => {
        const errorMsg = error.response.data.code;
        if (errorMsg === -1) {
          alert("사용 중인 아이디입니다");
        }
        if (errorMsg === -2) {
          alert("사용 중인 닉네임입니다");
        }
        if (errorMsg === -3) {
          alert("사용 중인 번호입니다");
        }
        if (errorMsg === -4) {
          alert("해당 추천인 ID가 없습니다");
        }
        if (errorMsg === -5) {
          alert("비밀번호를 확인해주세요");
        }
      });
  };

  // ID 중복 확인
  const checkId = () => {
    const loginId = getValues("loginId");
    SignUpAPI.checkId({ loginId })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("사용 가능한 ID입니다");
        }
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 412) {
          alert("이미 사용 중인 ID입니다");
        }
      });
  };

  // 닉네임 중복 확인
  const checkNn = () => {
    const nickname = getValues("nickname");
    SignUpAPI.checkNickname({ nickname })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("사용 가능한 닉네임입니다");
        }
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 412) {
          alert("이미 사용 중인 닉네임입니다");
        }
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

  // // 휴대폰 번호 중복 확인
  // const checkPhoneNum = () => {
  //   const phone = getValues("phone");
  //   SignUpAPI.checkPhoneNum({ phone })
  //     .then((res) => {
  //       console.log(res);
  //       if (res.status === 200) {
  //         alert("사용 가능한 전화번호입니다");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error.response.status);
  //       if (error.response.status === 412) {
  //         alert("이미 가입된 전화번호입니다");
  //       }
  //     });
  // };

  return (
    <>
      <Layout>
        <Header />
        <div>회원가입</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            필수입력사항<Red>*</Red>
          </div>
          <div>
            아이디<Red>*</Red>
            <input
              type="text"
              {...register("loginId", {
                required: true,
                pattern: /^[A-za-z0-9]{6,12}$/,
              })}
              placeholder="아이디를 입력해주세요"
              autoComplete="off"
            />
            {errors.loginId && errors.loginId.type === "required" && (
              <p>아이디를 입력해주세요.</p>
            )}
            {errors.loginId && errors.loginId.type === "pattern" && (
              <p> 6~12글자 사이의 영문 또는 숫자만 입력 가능합니다</p>
            )}
          </div>
          <button type="button" onClick={checkId}>
            중복확인
          </button>
          <div>
            비밀번호<Red>*</Red>
            <input
              type="password"
              {...register("password", {
                required: true,
                pattern: /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,20}$/,
              })}
              placeholder="비밀번호를 입력해주세요"
            />
            {errors.password && errors.password.type === "required" && (
              <p>비밀번호를 입력해주세요</p>
            )}
            {errors.password && errors.password.type === "pattern" && (
              <p>영문과 숫자 조합으로 6글자 이상을 입력해주세요</p>
            )}
          </div>
          <div>
            비밀번호 확인<Red>*</Red>
            <input
              type="password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) => value === password.current,
              })}
              placeholder="비밀번호를 한번 더 입력해주세요"
            />
            {errors.confirmPassword &&
              errors.confirmPassword.type === "required" && (
                <p>다시 한번 비밀번호를 입력해주세요</p>
              )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === "validate" && (
                <p>비밀번호가 일치하지 않습니다</p>
              )}
          </div>
          <div>
            닉네임<Red>*</Red>
            <input
              type="text"
              {...register("nickname", {
                required: true,
                minLegnth: 1,
              })}
              placeholder="닉네임을 입력해주세요"
              autoComplete="off"
            />
            {errors.nickname && errors.nickname.type === "required" && (
              <p>닉네임을 입력해주세요</p>
            )}
            {errors.nickname && errors.nickname.type === "minLegnth" && (
              <p>닉네임을 한 글자 이상 입력해주세요</p>
            )}
            <button type="button" onClick={checkNn}>
              중복확인
            </button>
          </div>
          <div>
            성별<Red>*</Red>
            <input
              type="radio"
              value="female"
              {...register("gender", { required: true })}
            />
            여성
            <input
              type="radio"
              value="male"
              {...register("gender", { required: true })}
            />
            남성
            {errors.gender && errors.gender.type === "required" && (
              <p>성별을 선택해주세요</p>
            )}
          </div>
          <div>
            휴대폰 번호
            <Red>*</Red>
            <div>
              <input
                type="text"
                {...register("phone", {
                  required: true,
                  minLegnth: 10,
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

              <button type="button" onClick={sendPhoneForCode}>
                인증번호받기
              </button>
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
            {/* <input
              type="text"
              {...register("phone", {
                required: true,
                minLegnth: 10,
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
            <button type="button" onClick={checkPhoneNum}>
              중복확인
            </button> */}
          </div>
          <div>
            나의 운동
            <input type="checkbox" value="football" {...register("sports")} />
            풋볼
            <input type="checkbox" value="tennis" {...register("sports")} />
            테니스
            <input type="checkbox" value="badminton" {...register("sports")} />
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
            <input type="checkbox" value="health" {...register("favSports")} />
            헬스
            <input type="checkbox" value="running" {...register("favSports")} />
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
          <input type="submit" />
        </form>
        <TapBar/>
      </Layout>
    </>
  );
};

export default SignUp;
