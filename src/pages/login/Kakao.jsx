import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import { LoginAPI } from "../../tools/instance";
import { Red } from "../signUp/Styles";

const Kakao = () => {
  console.log(window.location.href);

  // 인가코드
  const PARAMS = new URL(document.location).searchParams;
  const KAKAO_CODE = PARAMS.get("code");
  console.log(KAKAO_CODE);
  useEffect(() => {
    LoginAPI.kakaoLogin(KAKAO_CODE)
      .then((res) => {
        console.log(res);
        // localStorage.setItem("token", JSON.stringify(res.data));

        // localStorage.setItem("kakaocode", KAKAO_CODE);
      })
      .catch((err) => console.log(err));
  }, []);

  //==============================================================카카오로그인
  // const {
  //   register,
  //   handleSubmit,
  //   getValues,
  //   formState: { errors },
  // } = useForm();

  // const navigate = useNavigate();

  // const onSubmit = async (data) => {
  //   SignUpAPI.signUp(data)
  //     .then((res) => {
  //       console.log(res);
  //       if (res.status === 201) {
  //         alert("회원가입을 환영합니다!");

  //       }
  //     })
  //     .catch((error) => {
  //       const errorMsg = error.response.data.code;

  //       if (errorMsg === -3) {
  //         alert("사용 중인 번호입니다");
  //       }
  //       if (errorMsg === -4) {
  //         alert("해당 추천인 ID가 없습니다");
  //       }
  //       if (errorMsg === -5) {
  //         alert("비밀번호를 확인해주세요");
  //       }
  //     });
  // };

  // // 닉네임 중복 확인
  // const checkNn = () => {
  //   const nickname = getValues("nickname");
  //   SignUpAPI.checkNickname({ nickname })
  //     .then((res) => {
  //       console.log(res);
  //       if (res.status === 200) {
  //         alert("사용 가능한 닉네임입니다");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error.response.status);
  //       if (error.response.status === 412) {
  //         alert("이미 사용 중인 닉네임입니다");
  //       }
  //     });
  // };

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
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <div>
          닉네임<Red>*</Red>
          <input
            type="text"
            // {...register("nickname", {
            //   required: true,
            //   minLegnth: 1,
            // })}
            placeholder="닉네임을 입력해주세요"
            autoComplete="off"
          />
          {/* {errors.nickname && errors.nickname.type === "required" && (
              <p>닉네임을 입력해주세요</p>
            )}
            {errors.nickname && errors.nickname.type === "minLegnth" && (
              <p>닉네임을 한 글자 이상 입력해주세요</p>
            )} */}
          <button
            type="button"
            // onClick={checkNn}
          >
            중복확인
          </button>
        </div>
        <div>
          성별<Red>*</Red>
          <input
            type="radio"
            value="female"
            // {...register("gender", { required: true })}
          />
          여성
          <input
            type="radio"
            value="male"
            // {...register("gender", { required: true })}
          />
          남성
          {/* {errors.gender && errors.gender.type === "required" && (
              <p>성별을 선택해주세요</p>
            )} */}
        </div>
        <div>
          휴대폰 번호<Red>*</Red>
          <input
            type="text"
            // {...register("phone", {
            //   required: true,
            //   minLegnth: 10,
            //   pattern: /^[0-9]{3}[0-9]{3,4}[0-9]{4}/,
            // })}
            placeholder="휴대폰 번호를 입력해주세요"
            autoComplete="off"
          />
          {/* {errors.phone && errors.phone.type === "required" && (
              <p>휴대폰 번호를 입력해주세요</p>
            )}
            {errors.phone && errors.phone.type === "pattern" && (
              <p>올바른 번호 형식이 아닙니다.</p>
            )} */}
          <button
            type="button"
            // onClick={checkPhoneNum}
          >
            중복확인
          </button>
        </div>
        <div>
          나의 운동
          <input
            type="checkbox"
            value="football"
            // {...register("sports")}
          />
          풋볼
          <input
            type="checkbox"
            value="tennis"
            // {...register("sports")}
          />
          테니스
          <input
            type="checkbox"
            value="badminton"
            // {...register("sports")}
          />
          배드민턴
        </div>
        <div>
          관심 운동
          <input
            type="checkbox"
            value="swim"
            // {...register("favSports")}
          />
          수영
          <input
            type="checkbox"
            value="baseball"
            // {...register("favSports")}
          />
          야구
          <input
            type="checkbox"
            value="health"
            // {...register("favSports")}
          />
          헬스
          <input
            type="checkbox"
            value="running"
            // {...register("favSports")}
          />
          러닝
          <input
            type="checkbox"
            value="judo"
            // {...register("favSports")}
          />
          유도
          <input
            type="checkbox"
            value="pingpong"
            // {...register("favSports")}
          />
          탁구
        </div>
        <div>
          추천인ID
          <input
            type="text"
            // {...register("recommendId", {})}
            placeholder="추천인ID를 입력해주세요"
            autoComplete="off"
          />
        </div>
        <input type="submit" />
        {/* </form> */}
      </Layout>
    </>
  );
};

export default Kakao;
