import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import useToggle from "../../hooks/useToggle";
import { LoginAPI, SignUpAPI } from "../../tools/instance";
import { Red } from "../signUp/Styles";

const KakaoAdd = () => {
  const [isCode, setIsCode] = useToggle();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const isMember = localStorage.getItem("loginId");
  console.log(isMember);
  useEffect(() => {
    LoginAPI.kakaoId(isMember)
      .then((res) => {
        if (res.data.code === 1) navigate(`/`);
      })

      .catch((err) =>
        console.log("에러ㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓㅓ", err)
      );
  }, []);

  const onSubmit = async (data) => {
    // 소셜로그인용 인스턴스 만들어서 바꿔주어야함!
    SignUpAPI.kakaoSingUp({ ...data, loginId: isMember })
      .then((res) => {
        console.log(res);
        // if (res.status === 201) {

        LoginAPI.kakaoId(isMember)
          .then(
            (res) => {
              console.log(res);
              localStorage.setItem("token", res.data.accessToken);
              console.log(res.data.accessToken);
              alert("회원가입을 환영합니다!");
            }
            // navigate(`/`);
          )
          .catch((err) => console.log(err));

        // }
      })

      .catch((error) => {
        console.log(error);
        // const errorMsg = error.response.data.code;
        // if (errorMsg === -3) {
        //   alert("사용 중인 번호입니다");
        // }
        // if (errorMsg === -4) {
        //   alert("해당 추천인 ID가 없습니다");
        // }
        // if (errorMsg === -5) {
        //   alert("비밀번호를 확인해주세요");
        // }
      });
  };

  // 닉네임 중복 확인
  const checkNn = () => {
    const nickname = getValues("nickname");
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
            휴대폰 번호<Red>*</Red>
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
                    // required
                    name="code"
                    autoComplete="off"
                  />
                  <button type="button" onClick={checkVCode}>
                    확인
                  </button>
                </div>
              )}
            </div>
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
      </Layout>
    </>
  );
};

export default KakaoAdd;
